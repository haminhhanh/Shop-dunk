import {
  AlignSelf,
  FlexDirection,
  MarginPadding,
  Justify,
  Align,
  Spacing,
  TextAlign,
} from '@shopDunk/configs/theme/common';
import { ViewStyle, TextStyle } from 'react-native';
import COLORS from './colors';

const styles: any = {
  normalizeOptions: (inputs: Spacing): MarginPadding => {
    if (!Array.isArray(inputs)) {
      const value = inputs;
      return [value, value, value, value];
    }
    if (inputs.length === 2) {
      const value1 = inputs[0],
        value2 = inputs[1];
      return [value1, value2, value1, value2];
    }
    if (inputs.length === 4) {
      const value1 = inputs[0],
        value2 = inputs[1],
        value3 = inputs[2],
        value4 = inputs[3];
      return [value1, value2, value3, value4];
    }
    return inputs;
  },
  minWidth: (minWidth: string | number): ViewStyle => {
    return { minWidth };
  },
  background: (color: keyof typeof COLORS): ViewStyle => {
    return { backgroundColor: COLORS[color] };
  },
  color: (color: keyof typeof COLORS): TextStyle => {
    return { color: COLORS[color] };
  },
  fontSize: (fontSize: number): TextStyle => {
    return { fontSize };
  },

  lineHeight: (lineHeight: number): TextStyle => {
    return { lineHeight };
  },
  letterSpacing: (letterSpacing: number): TextStyle => {
    return { letterSpacing };
  },
  textAlign: (alignment: TextAlign): TextStyle => {
    return {
      textAlign: alignment,
    };
  },
  width: (width: string | number): ViewStyle => {
    return { width };
  },
  height: (height: string | number): ViewStyle => {
    return { height };
  },
  flex: (number: number): ViewStyle => {
    return { flex: number };
  },
  flexDirection: (direction: FlexDirection): ViewStyle => {
    return {
      flexDirection: direction,
    };
  },
  justify: (alignment: Justify): ViewStyle => {
    return {
      justifyContent: alignment,
    };
  },
  align: (alignment: Align): ViewStyle => {
    return {
      alignItems: alignment,
    };
  },
  alignSelf: (alignment: AlignSelf): ViewStyle => {
    return {
      alignSelf: alignment,
    };
  },
  square: (number: string | number): ViewStyle => {
    return {
      height: number,
      width: number,
    };
  },
  circle: (number: number): ViewStyle => {
    return {
      height: number,
      width: number,
      borderRadius: number / 2,
    };
  },
  margin: ([top, right, bottom, left]: MarginPadding):
    | ViewStyle
    | TextStyle => {
    return {
      marginTop: top,
      marginBottom: bottom,
      marginLeft: left,
      marginRight: right,
    };
  },
  padding: ([top, right, bottom, left]: MarginPadding):
    | ViewStyle
    | TextStyle => {
    return {
      paddingTop: top,
      paddingBottom: bottom,
      paddingLeft: left,
      paddingRight: right,
    };
  },
  borderRadius: ([
    topLeft,
    topRight,
    bottomLeft,
    bottomRight,
  ]: MarginPadding): ViewStyle => {
    return {
      borderTopLeftRadius: topLeft,
      borderTopRightRadius: topRight,
      borderBottomLeftRadius: bottomLeft,
      borderBottomRightRadius: bottomRight,
    };
  },
  underline: (): TextStyle => {
    return {
      textDecorationStyle: 'solid',
      textDecorationLine: 'underline',
    };
  },
};

const utils = { styles };

export default utils;
