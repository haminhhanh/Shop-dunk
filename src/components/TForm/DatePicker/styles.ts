import { StyleSheet } from 'react-native';

export const defaultInput: any = StyleSheet.create<any>({
  height: 54,
  borderWidth: 1,
  borderRadius: 8,
  paddingLeft: 16,
  borderColor: '#D6D5DD',
  alignItems: 'center',
  textAlign: 'center',
  flexDirection: 'row',
  justifyContent: 'space-between',
});

export const borderInput: any = StyleSheet.create<any>({
  borderColor: '#EDEDED',
  borderBottomWidth: 1,
});

export const borderError: any = StyleSheet.create<any>({
  borderColor: '#FF0900',
});
