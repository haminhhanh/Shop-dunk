import { useRequest } from 'ahooks';
import { NativeModules, PermissionsAndroid, Platform } from 'react-native';
import RNPemissions, { RESULTS } from 'react-native-permissions';
const BleManager = NativeModules.BleManager;

const requestPermissionIOS = async () => {
  const checkResult = await RNPemissions.check(
    RNPemissions.PERMISSIONS.IOS.BLUETOOTH_PERIPHERAL,
  );
  if (checkResult === RNPemissions.RESULTS.GRANTED) {
    return true;
  } else if (checkResult === RNPemissions.RESULTS.BLOCKED) {
    return false;
  } else if (checkResult === RNPemissions.RESULTS.DENIED) {
    const request = await RNPemissions.request(
      RNPemissions.PERMISSIONS.IOS.BLUETOOTH_PERIPHERAL,
    );
    if (request === RESULTS.GRANTED) {
      return true;
    }
    return false;
  }
  return false;
};

const requestPermissionAndroid = async () => {
  try {
    const result = await new Promise(async (fulfill, reject) => {
      const permissionLocation = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      if (permissionLocation !== 'granted') {
        return reject('Location Permission is not granted');
      }
      BleManager.enableBluetooth((error: any) => {
        if (error) {
          reject(error);
        } else {
          fulfill('connected');
        }
      });
    });
    if (result) {
      return true;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
  return true;
};

const useBluetoothPermission = () => {
  const requestPermission = useRequest(
    async () => {
      let result;
      if (Platform.OS === 'ios') {
        result = await requestPermissionIOS();
      } else {
        result = await requestPermissionAndroid();
      }
      return result;
    },
    { manual: true },
  );

  return requestPermission;
};

export default useBluetoothPermission;
