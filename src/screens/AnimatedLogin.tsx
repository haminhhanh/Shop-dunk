//
import React, { useEffect, useState } from 'react';
import { StyleSheet, Image } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import { deviceHeight, deviceWidth } from '@shopDunk/configs/theme/common';
import Box from '@shopDunk/components/Box';
import COLORS from '@shopDunk/configs/theme/colors';

const AnimatedLogin = () => {
  const colorRgba = useSharedValue(51);
  const withAnimated = useSharedValue(1);
  // const imgLogo = useSharedValue('../../../assets/logoShopDunk.png');
  const [imgLogo, setImgLogo]: any = useState(
    require('../../assets/Logo-SD.png'),
  );

  const animatedStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: `rgba(${colorRgba.value},${colorRgba.value},${colorRgba.value},${colorRgba.value})`,
    };
  }, []);

  const animatedRingStyle = useAnimatedStyle(() => {
    return {
      width: withAnimated.value,
      height: withAnimated.value,
    };
  }, []);

  useEffect(() => {
    colorRgba.value = withRepeat(withTiming(241, { duration: 2000 }), 1, true);
    withAnimated.value = withRepeat(
      withTiming(deviceHeight, { duration: 2000 }),
      1,
      true,
    );
    let timer = setTimeout(
      () => setImgLogo(require('../../assets/Logo-SD-black.png')),
      1000,
    );
    return () => {
      clearTimeout(timer);
    };
  }, [colorRgba, withAnimated]);

  return (
    <Animated.View style={[styles.que, animatedStyle]}>
      <Animated.View style={[animatedRingStyle, styles.ring]} />
      <Box align="center" justify="center">
        <Image source={imgLogo} style={styles.image} />
        {/* <Box flexDirection="row" align="center" margin={[0, 0, 18, 0]}>
          <Image source={require('../../../assets/shop.png')} />
          <Image source={require('../../../assets/dunk.png')} />
        </Box>
        <Typography type="Body-1" color="NEUTRAL_WHITE">
          Đại lý ủy quyền chính hãng Apple
        </Typography> */}
      </Box>
    </Animated.View>
  );
};

export default AnimatedLogin;

const styles = StyleSheet.create({
  que: {
    width: deviceWidth,
    height: deviceHeight,
    alignSelf: 'center',
    justifyContent: 'center',
    flex: 1,
    position: 'relative',
    // backgroundColor: COLORS.NEUTRAL_BLACK_ACTIVE,
  },
  image: {
    width: 202,
    height: 121,
    marginBottom: 13,
  },
  ring: {
    backgroundColor: COLORS.NEUTRAL_BACKGROUND,
    alignSelf: 'center',
    justifyContent: 'center',
    position: 'absolute',
    borderRadius: 1000,
  },
});
