import { deviceHeight, deviceWidth } from '@shopDunk/configs/theme/common';
import React from 'react';
import { Image, StyleSheet } from 'react-native';
import Box from '../Box';

const LogoHeaderLeft: React.FC<any> = () => {
  return (
    <Image
      source={require('../../../assets/dummy/logo.png')}
      style={{
        width: deviceWidth / 2,
        height: deviceHeight / 10,
        resizeMode: 'contain',
      }}
    />
  );
};

export default LogoHeaderLeft;
