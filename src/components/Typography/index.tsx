import theme from '@shopDunk/configs/theme';
import React, { useMemo } from 'react';
import { StyleSheet, Text, TextStyle } from 'react-native';
import { TypographyProps } from './types';
import styles from './styles';
import COLORS from '@shopDunk/configs/theme/colors';

const Typography: React.FC<TypographyProps> = ({
  type,
  color,
  fontSize,
  textAlign,
  lineHeight,
  letterSpacing,
  margin,
  padding,
  underline = false,
  children,
  ...props
}) => {
  const combinedStyle: TextStyle[] = useMemo(() => {
    const styleObject: any = {
      type,
      color,
      fontSize,
      textAlign,
      lineHeight,
      letterSpacing,
      margin,
      padding,
      underline,
    };
    const style: TextStyle[] = Object.keys(styleObject)
      .map((key: any) => {
        if (styleObject[key]) {
          if (key === 'type') {
            return styles[styleObject[key]];
          }
          if (key === 'padding' || key === 'margin') {
            const values = theme.utils.styles.normalizeOptions(
              styleObject[key],
            );
            return theme.utils.styles[key](values);
          }
          return theme.utils.styles[key](styleObject[key]);
        }
      })
      .filter(e => e);
    return style;
  }, [
    underline,
    type,
    color,
    fontSize,
    textAlign,
    lineHeight,
    letterSpacing,
    margin,
    padding,
  ]);

  return (
    <Text
      allowFontScaling={false}
      {...props}
      style={[stylesDefault.default, combinedStyle, props.style]}
    >
      {children}
    </Text>
  );
};

export default Typography;

const stylesDefault = StyleSheet.create({
  default: {
    color: COLORS.NEUTRAL_BLACK_ACTIVE,
  },
});
