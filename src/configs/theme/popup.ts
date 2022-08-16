import { ViewStyle } from 'react-native';
interface IPopupConfigs {
  default: ViewStyle;
}

const PopupStyleConfigs: IPopupConfigs = {
  default: {
    backgroundColor: '#fff',
    alignSelf: 'center',
    padding: 12,
    width: '80%',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
};

export default PopupStyleConfigs;
