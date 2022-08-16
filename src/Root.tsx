/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import Routes from '@shopDunk/routes';
import React from 'react';
import { Platform, StatusBar } from 'react-native';

const Root = () => {
  return (
    <>
      <StatusBar
        translucent
        backgroundColor={Platform.OS === 'android' ? '#fff' : undefined}
        barStyle={'dark-content'}
      />
      <Routes />
    </>
  );
};

export default Root;
