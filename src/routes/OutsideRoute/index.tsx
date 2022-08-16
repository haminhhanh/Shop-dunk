import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import COLORS from '@shopDunk/configs/theme/colors';
import i18n from '@shopDunk/utils/i18n';
import { OutsideScreenParams, ScreensName } from '../types';
import SignIn from '@shopDunk/screens/SignIn';
import HeaderLeftBack from '@shopDunk/components/HeaderLeftBack';
import AnimatedLogin from '@shopDunk/screens/AnimatedLogin';
import OtpScreen from '@shopDunk/screens/SignIn/OtpScreen';
import SignUp from '@shopDunk/screens/SignUp';

const OutsideStack = createStackNavigator<OutsideScreenParams>();

const OutsideRoute = () => {
  return (
    <OutsideStack.Navigator
      initialRouteName={ScreensName.SignUp}
      screenOptions={{
        headerLeft: () => <HeaderLeftBack />,
        headerTitle: () => null,
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: COLORS.NEUTRAL_BACKGROUND,
        },
      }}
    >
       <OutsideStack.Screen
        name={ScreensName.AnimatedLogin}
        component={AnimatedLogin}
        options={{
          headerShown: false,
        }}
      />
      <OutsideStack.Screen
        name={ScreensName.SignIn}
        component={SignIn}
        options={{
          headerShown: false,
        }}
      />
       <OutsideStack.Screen
        name={ScreensName.OtpScreen}
        component={OtpScreen}
        options={{
          headerShown: false,
        }}
      />
      <OutsideStack.Screen
        name={ScreensName.SignUp}
        component={SignUp}
        options={{
          headerShown: false,
        }}
      />
     
    </OutsideStack.Navigator>
  );
};

export default OutsideRoute;
