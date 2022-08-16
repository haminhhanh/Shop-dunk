import theme from '@shopDunk/configs/theme';
import React, { useMemo } from 'react';
import { StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';
import { BoxProps } from './types';

const Box: React.FC<BoxProps> = ({
  activePress,
  flexDirection,
  justify,
  align,
  alignSelf,
  flex,
  background,
  square,
  circle,
  height,
  width,
  minWidth,
  margin,
  padding,
  borderRadius,
  children,
  onPress,
  ...props
}) => {
  const combinedStyle: ViewStyle[] = useMemo(() => {
    const styleObject: any = {
      flexDirection,
      justify,
      align,
      alignSelf,
      flex,
      background,
      square,
      circle,
      height,
      width,
      minWidth,
      margin,
      padding,
      borderRadius,
    };
    const style: ViewStyle[] = Object.keys(styleObject)
      .map((key: any) => {
        if (['padding', 'margin', 'borderRadius'].includes(key)) {
          const values = theme.utils.styles.normalizeOptions(styleObject[key]);
          return theme.utils.styles[key](values);
        }
        if (styleObject[key]) {
          return theme.utils.styles[key](styleObject[key]);
        }
      })
      .filter(e => e);
    return style;
  }, [
    align,
    alignSelf,
    background,
    circle,
    flex,
    flexDirection,
    height,
    justify,
    margin,
    minWidth,
    padding,
    square,
    width,
    borderRadius,
  ]);

  if (activePress) {
    return (
      <TouchableOpacity
        {...props}
        activeOpacity={0.7}
        style={StyleSheet.flatten([combinedStyle, props.style])}
        onPress={onPress}
      >
        {children}
      </TouchableOpacity>
    );
  }

  return (
    <View {...props} style={StyleSheet.flatten([combinedStyle, props.style])}>
      {children}
    </View>
  );
};

export default Box;
