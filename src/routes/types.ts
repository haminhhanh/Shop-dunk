import { NavigatorScreenParams } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { ForgotSignUp } from '@shopDunk/screens/SignIn';

// import { LatLng } from 'react-native-maps';

export enum ScreensName {
  Inside = 'Inside',
  Outside = 'Outside',
  SignIn = 'SignIn',
  SignUp = 'SignUp',
  OtpScreen='OtpScreen',
  AnimatedLogin='AnimatedLogin'
}



export type OutsideScreenParams = {
  [ScreensName.SignIn]: undefined;
  [ScreensName.OtpScreen]: undefined;
  [ScreensName.SignUp]: { type: ForgotSignUp };
  [ScreensName.AnimatedLogin]: { type: undefined };

};

export type OutsideScreenProps<T extends keyof OutsideScreenParams> =
  StackScreenProps<OutsideScreenParams, T>;

export type RootStackScreensParams = {
  [ScreensName.Outside]: undefined;
  [ScreensName.Inside]: undefined;
};

export type RootStacksScreenProps<T extends keyof RootStackScreensParams> =
  StackScreenProps<RootStackScreensParams, T>;
