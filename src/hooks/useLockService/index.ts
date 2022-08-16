import { useRecoilState } from 'recoil';
import { Platform } from 'react-native';
import { useRequest } from 'ahooks';
import { useEffect, useCallback, useRef } from 'react';
import { NativeEventEmitter, NativeModules } from 'react-native';
import toLower from 'lodash/toLower';
import useBluetoothPermission from '../useBluetoothPermission';
import BleManagerAS from 'react-native-ble-manager';
import CryptoJS from 'crypto-js';
import { bluetoothAtom, LOCK_STATE } from '@shopDunk/atom/bluetooth';
import * as encoding from './encoding';

const service = '0000fee7-0000-1000-8000-00805f9b34fb';

const writeCharacteristic = '000036f5-0000-1000-8000-00805f9b34fb';
const readCharacteristic = '000036f6-0000-1000-8000-00805f9b34fb';

const BleManager = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManager);

enum BLE_EVENT {
  DISCOVER = 'BleManagerDiscoverPeripheral',
  STOP_SCAN = 'BleManagerStopScan',
  CONNECT = 'BleManagerConnectPeripheral',
  DISCONNECT = 'BleManagerDisconnectPeripheral',
  DID_UPDATE = 'BleManagerDidUpdateNotificationStateFor',
  DID_UPDATE_CHAR = 'BleManagerDidUpdateValueForCharacteristic',
}

interface IAdvertising {
  isConnectable: 0 | 1;
  [key: string]: any;
}

interface IUpdatedValue {
  value: any;
  peripheral: string;
}
interface IPeripheral {
  advertising: IAdvertising;
  name?: string;
  id: string;
}

interface ILockOptions<T> {
  onSuccess?: (value?: T) => void;
  onError?: (value?: T) => void;
}

const useLockService = ({ onSuccess, onError }: ILockOptions<any>) => {
  const markedId = useRef<string | undefined>();
  const [bluetooth, setBluetoothState] = useRecoilState(bluetoothAtom);
  const refValue = useRef<string | undefined>();
  const refBluetoothState = useRef<string | undefined>();

  const handleDiscoverPeripheral = useCallback(
    async (peripheral: IPeripheral) => {
      let id = peripheral.id;
      if (Platform.OS === 'ios' && peripheral?.advertising?.manufacturerData) {
        const hex = encoding.bytesToHex(
          peripheral.advertising.manufacturerData.bytes,
        );
        id = hex.slice(4, hex.length);
      } else {
        id = id.replace(/:/g, '');
      }

      if (
        peripheral.name?.toUpperCase() === 'KKSLOCK' &&
        markedId.current &&
        toLower(markedId.current) === toLower(id)
      ) {
        try {
          await BleManagerAS.stopScan();
          await BleManagerAS.connect(peripheral.id);
          await BleManagerAS.retrieveServices(peripheral.id);
          setBluetoothState({ state: LOCK_STATE.IS_UNLOCKING });
          BleManagerAS.startNotification(
            peripheral.id,
            service,
            readCharacteristic,
          );
          await BleManagerAS.write(
            peripheral.id,
            service,
            writeCharacteristic,
            Encrypt([6, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]),
          );
        } catch (error) {
          setBluetoothState({ state: LOCK_STATE.IS_ERROR });
          BleManagerAS.disconnect(peripheral.id);
        }
      }
    },
    [setBluetoothState],
  );

  const handleStopScan = () => {
    console.log('stop scan');
  };

  const handleConnect = () => {
    console.log('connect');
  };

  const handleDisconnectedPeripheral = () => {
    markedId.current = undefined;
  };

  useEffect(() => {
    if (
      bluetooth.state === LOCK_STATE.IS_SUCCEED &&
      refBluetoothState.current !== bluetooth.state
    ) {
      onSuccess && onSuccess();
    } else if (
      bluetooth.state === LOCK_STATE.IS_ERROR &&
      refBluetoothState.current !== bluetooth.state
    ) {
      onError && onError();
    }
    refBluetoothState.current = bluetooth.state;
  });

  const handleUpdateValueForCharacteristic = useCallback(
    async ({ value, peripheral }: IUpdatedValue) => {
      if (value?.length > 0 && value.join('') !== refValue.current) {
        try {
          refValue.current = value.join('');
          const result = Decrypt(value);

          await BleManagerAS.write(
            peripheral,
            service,
            writeCharacteristic,
            Encrypt([
              5,
              1,
              6,
              // password
              0x30,
              0x30,
              0x30,
              0x30,
              0x30,
              0x30,
              // end password
              // access token
              result[3],
              result[4],
              result[5],
              result[6],
              // end accesstoken
              0,
              0,
              0,
            ]),
          );
          setBluetoothState({ state: LOCK_STATE.IS_SUCCEED });
        } catch (error) {
          setBluetoothState({ state: LOCK_STATE.IS_ERROR });
          await BleManagerAS.disconnect(peripheral);
        }
      }
    },
    [setBluetoothState],
  );

  const reset = useCallback(() => {
    setBluetoothState({ state: undefined });
    refBluetoothState.current = undefined;
    refValue.current = undefined;
  }, [setBluetoothState]);

  const bluetoothPermission = useBluetoothPermission();

  const scanRequest = useRequest(
    async (id: string) => {
      setBluetoothState({ state: LOCK_STATE.IS_SCANNING });
      markedId.current = id;
      if (!id) {
        throw new Error('Id is undefined');
      }
      await BleManagerAS.scan([], 10, true, {});
    },
    {
      manual: true,
      onError: () => {
        setBluetoothState({ state: LOCK_STATE.IS_ERROR });
      },
    },
  );

  useEffect(() => {
    if (bluetoothPermission.data === true) {
      BleManagerAS.start({});
      const eventDiscover = bleManagerEmitter.addListener(
        BLE_EVENT.DISCOVER,
        handleDiscoverPeripheral,
      );
      const eventStopScan = bleManagerEmitter.addListener(
        BLE_EVENT.STOP_SCAN,
        handleStopScan,
      );
      const eventDisconnect = bleManagerEmitter.addListener(
        BLE_EVENT.DISCONNECT,
        handleDisconnectedPeripheral,
      );

      const eventReceiveChar = bleManagerEmitter.addListener(
        BLE_EVENT.DID_UPDATE_CHAR,
        handleUpdateValueForCharacteristic,
      );
      const eventConnect = bleManagerEmitter.addListener(
        BLE_EVENT.CONNECT,
        handleConnect,
      );

      return () => {
        bleManagerEmitter?.removeSubscription(eventDiscover);
        bleManagerEmitter?.removeSubscription(eventStopScan);
        bleManagerEmitter?.removeSubscription(eventDisconnect);
        bleManagerEmitter?.removeSubscription(eventReceiveChar);
        bleManagerEmitter?.removeSubscription(eventConnect);
      };
    }
  }, [
    bluetoothPermission.data,
    handleDiscoverPeripheral,
    handleUpdateValueForCharacteristic,
  ]);

  return {
    bluetoothPermission,
    scanRequest,
    bluetooth,
    reset,
  };
};

export default useLockService;

const privateKey = new Int8Array([
  32, 87, 47, 82, 54, 75, 63, 71, 48, 80, 65, 88, 17, 99, 45, 43,
]);

const privateBytes = encoding.int8toInt32(privateKey);

const Encrypt = (src: number[]) => {
  const srcs_Int = new Int8Array(src);
  const srcsBytes = encoding.int8toInt32(srcs_Int);
  const encrypted = CryptoJS.AES.encrypt(srcsBytes, privateBytes, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.NoPadding,
    format: CryptoJS.format.Hex,
  });

  const r = encoding.hexToBytes(encrypted.toString());
  return r;
};

const Decrypt = (word: number[]) => {
  const decrypt = CryptoJS.AES.decrypt(
    encoding.bytesToBase64(word),
    privateBytes,
    {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.NoPadding,
    },
  );

  return encoding.hexToBytes(CryptoJS.enc.Hex.stringify(decrypt).toString());
};
