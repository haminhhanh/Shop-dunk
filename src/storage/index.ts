import { MMKV } from 'react-native-mmkv';

export const storage = new MMKV();

export enum StorageKey {
  Language = 'Language',
  Authen = 'Authen',
  HistorySearch = 'HistorySearch',
}
