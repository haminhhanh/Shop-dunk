import { useChangeLanguage } from '@shopDunk/atom/authen';
import COLORS from '@shopDunk/configs/theme/colors';
import { FontFamilyNames } from '@shopDunk/configs/theme/typography';
import { storage, StorageKey } from '@shopDunk/storage';
import React from 'react';
import { StyleSheet } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import Box from '../Box';

const SwitchLanguageButton: React.FC = () => {
  const val = useSharedValue(
    storage.getString(StorageKey.Language) === 'vi' ? 0 : 1,
  );
  const { changeLanguage } = useChangeLanguage();

  const handlePress = () => {
    if (val.value === 0) {
      val.value = 1;
    } else {
      val.value = 0;
    }
    setTimeout(() => {
      changeLanguage(val.value === 0 ? 'vi' : 'en');
    }, 500);
  };

  const circleAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: withTiming(val.value * 27) }],
    };
  });

  const leftTextAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: interpolate(val.value, [0, 1], [0, 4]) }],
      opacity: interpolate(val.value, [0, 1], [0, 1]),
    };
  });

  const rightTextAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: interpolate(val.value, [0, 1], [-4, 0]) }],
      opacity: interpolate(val.value, [0, 1], [1, 0]),
    };
  });

  return (
    <Box activePress activeOpacity={1} onPress={handlePress}>
      <Animated.View style={styles.button}>
        <Animated.View style={styles.container}>
          <Animated.Text style={[styles.text, leftTextAnimatedStyle]}>
            EN
          </Animated.Text>
        </Animated.View>
        <Animated.View style={[styles.container]}>
          <Animated.Text style={[styles.text, rightTextAnimatedStyle]}>
            VI
          </Animated.Text>
        </Animated.View>
        <Animated.View style={[styles.circle, circleAnimatedStyle]} />
      </Animated.View>
    </Box>
  );
};

export default SwitchLanguageButton;

const styles = StyleSheet.create({
  button: {
    width: 60,
    height: 30,
    borderRadius: 15,
    backgroundColor: COLORS.BRAND,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  circle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    top: 5,
    left: 6,
    position: 'absolute',
    backgroundColor: COLORS.NEUTRAL_100,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: COLORS.NEUTRAL_100,
    fontSize: 12,
    lineHeight: 20,
    fontFamily: FontFamilyNames.SF_PRO_DISPLAY_BOLD,
  },
});
