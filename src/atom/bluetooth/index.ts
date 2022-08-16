import { atom } from 'recoil';
import { ATOM } from '../atom';

export enum LOCK_STATE {
  IS_UNLOCKING = 'IS_UNLOCKING',
  IS_SCANNING = 'IS_SCANNING',
  IS_ERROR = 'IS_ERROR',
  IS_SUCCEED = 'IS_SUCCEED',
}

type TLockState = {
  state: LOCK_STATE | undefined;
};

const initialState: TLockState = {
  state: undefined,
};

export const bluetoothAtom = atom<TLockState>({
  key: ATOM.BLUETOOTH_SCANNER,
  default: initialState,
});
