import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Box from '@shopDunk/components/Box';
import Icon from '@shopDunk/components/Icon';
import { IconType } from '@shopDunk/components/Icon/type';
import COLORS from '@shopDunk/configs/theme/colors';
import i18n from '@shopDunk/utils/i18n';
import React, { useEffect } from 'react';
import { Alert, Platform } from 'react-native';
import { isIphoneX } from 'react-native-iphone-x-helper';
import { InsideScreenParams, ScreensName } from '../types';
// import messaging from '@react-native-firebase/messaging';

const RootTabs = createBottomTabNavigator<InsideScreenParams>();

const InsideRoute = () => {
  async function requestUserPermission() {
    // const authStatus = await messaging().requestPermission();
    // const enabled =
    //   authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    //   authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    // if (enabled) {
    //   console.log('Authorization status:', authStatus);
    // }
  }
  // useEffect(() => {
  //   requestUserPermission();
  //   const unsubscribe = messaging().onMessage(async remoteMessage => {
  //     Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
  //   });
  //   return unsubscribe;
  // }, []);
  return (
  <></>
  );
};

export default InsideRoute;
