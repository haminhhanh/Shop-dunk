import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ScreensName, RootStackScreensParams } from './types';
import OutsideRoute from './OutsideRoute';
import { useAuthenStateValue } from '@shopDunk/atom/authen';
import InsideRoute from './InsideRoute';

const RootStack = createStackNavigator<RootStackScreensParams>();

const RootStackRoute = () => {
  const authen = useAuthenStateValue();
  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      {authen.token ? (
        <RootStack.Screen name={ScreensName.Inside} component={InsideRoute} />
      ) : (
        <RootStack.Screen name={ScreensName.Outside} component={OutsideRoute} />
      )}
    </RootStack.Navigator>
  );
};

export default RootStackRoute;
