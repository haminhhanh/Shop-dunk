import COLORS from '@shopDunk/configs/theme/colors';
import { FontFamilyNames } from '@shopDunk/configs/theme/typography';
import React, { useRef } from 'react';
import { StyleSheet, Animated, TouchableOpacity, Easing } from 'react-native';
import { animatedButtonProps } from './types';

const AnimatedTouchableBox = Animated.createAnimatedComponent(TouchableOpacity);

const AnimatedSlideButton: React.FC<animatedButtonProps> = ({
  defaultValue,
}) => {
  const valueRef = useRef(defaultValue);
  const [open, setOpen] = React.useState(true);
  const animatedValue = useRef(
    new Animated.Value(defaultValue ? 1 : 0),
  ).current;

  const toggle = () => {
    if (valueRef?.current) {
      Animated.parallel([
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 250,
          easing: Easing.linear,
          useNativeDriver: false,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 250,
          easing: Easing.linear,
          useNativeDriver: false,
        }),
      ]).start(({ finished }) => {
        if (finished) {
          valueRef.current = false;
          setOpen(false);
        }
      });
    } else {
      Animated.parallel([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 250,
          easing: Easing.linear,
          useNativeDriver: false,
        }),
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 250,
          easing: Easing.linear,
          useNativeDriver: false,
        }),
      ]).start(({ finished }) => {
        if (finished) {
          valueRef.current = true;
          setOpen(true);
        }
      });
    }
  };

  return (
    <AnimatedTouchableBox
      onPress={toggle}
      style={[
        styles.buttonContainer,
        {
          backgroundColor: animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: [COLORS.NEUTRAL_600, COLORS.BRAND],
            extrapolate: 'clamp',
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          }),
        },
      ]}
    >
      <Animated.Text
        style={[
          styles.text,
          {
            transform: [
              {
                translateX: animatedValue.interpolate({
                  inputRange: [0, 1],
                  outputRange: [27, 8],
                  extrapolate: 'clamp',
                  extrapolateLeft: 'clamp',
                  extrapolateRight: 'clamp',
                }),
              },
            ],
          },
        ]}
      >
        {open ? 'ON' : 'OFF'}
      </Animated.Text>
      <Animated.View
        style={[
          styles.iconButton,
          {
            backgroundColor: animatedValue.interpolate({
              inputRange: [0, 1],
              outputRange: [COLORS.NEUTRAL_100, COLORS.NEUTRAL_100],
              extrapolate: 'clamp',
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            }),
          },
          {
            transform: [
              {
                translateX: animatedValue.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 30],
                  extrapolate: 'clamp',
                  extrapolateLeft: 'clamp',
                  extrapolateRight: 'clamp',
                }),
              },
            ],
          },
        ]}
      />
    </AnimatedTouchableBox>
  );
};

export default AnimatedSlideButton;

const styles = StyleSheet.create({
  buttonContainer: {
    height: 30,
    width: 60,
    borderRadius: 40,
    justifyContent: 'center',
  },
  iconButton: {
    position: 'absolute',
    height: 20,
    width: 20,
    top: 5,
    left: 5,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 14,
    lineHeight: 22,
    fontFamily: FontFamilyNames.SF_PRO_DISPLAY_BOLD,
    color: COLORS.NEUTRAL_100,
  },
});
