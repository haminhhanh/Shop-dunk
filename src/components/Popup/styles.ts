import PopupStyleConfigs from '@shopDunk/configs/theme/popup';
import { StyleSheet, ViewStyle } from 'react-native';
import COLORS from '@shopDunk/configs/theme/colors';

type PopupStyle = {
  [key in keyof typeof PopupStyleConfigs]: ViewStyle;
};

const styles: any = StyleSheet.create<PopupStyle>(PopupStyleConfigs);

export const container: any = StyleSheet.create<any>({
  backgroundColor: 'rgba(0,0,0,0.3)',
  alignSelf: 'center',
  width: '100%',
  justifyContent: 'center',
  alignItems: 'center',
  flex: 1,
});

export const defaultBox: any = StyleSheet.create<any>({
  width: '85%',
  backgroundColor: '#fff',
  padding: 12,
  borderRadius: 8,
  justifyContent: 'center',
  alignItems: 'center',
  marginHorizontal: 10,
  borderWith: 2,
  borderColor: COLORS.NEUTRAL_400,
});

export default styles;
