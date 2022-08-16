import { ViewStyle } from 'react-native';
interface IInputConfig {
  default: ViewStyle;
}

export type inputKeys = keyof typeof inputConfigs;

const inputConfigs: IInputConfig = {
  default: {
    height: 54,
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 15,
    alignItems: 'center',
    flexDirection: 'row',
    borderColor: '#D6D5DD',
  },
};

export default inputConfigs;
