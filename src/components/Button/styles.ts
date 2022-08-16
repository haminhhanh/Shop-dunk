import ButtonStyleConfigs from '@shopDunk/configs/theme/button';
import { StyleSheet, ViewStyle } from 'react-native';

type ButtonStyle = {
  [key in keyof typeof ButtonStyleConfigs]: ViewStyle;
};

const styles: any = StyleSheet.create<ButtonStyle>(ButtonStyleConfigs);

export default styles;
