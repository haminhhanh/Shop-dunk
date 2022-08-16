import { deviceWidth } from '@shopDunk/configs/theme/common';
import { ViewStyle } from 'react-native';
import COLORS from './colors';

interface IButtonConfigs {
  primary: ViewStyle;
  ghost: ViewStyle;
  add: ViewStyle;
  added: ViewStyle;
  disable:ViewStyle;
}

const ButtonStyleConfigs: IButtonConfigs = {
  primary: {
    backgroundColor: COLORS.ACTIVE_CTA,
    height: 44,
    width: deviceWidth-64,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 'auto',
    marginBottom:20,

  },
  ghost: {
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  add: {
    backgroundColor: COLORS.ACTIVE_CTA,
    height: 28,
    width: 97,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  added: {
    height: 28,
    width: 75,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  disable: {
    height: 44,
    width: deviceWidth-64,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: COLORS.NEUTRAL_BACKGROUND_BUTTON,
    marginTop: 'auto',
    marginBottom:20,

  },
};

export default ButtonStyleConfigs;
