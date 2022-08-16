import {
  FlexDirection,
  Align,
  AlignSelf,
  Spacing,
  Justify,
} from '@shopDunk/configs/theme/common';
import COLORS from '@shopDunk/configs/theme/colors';
import { TouchableOpacityProps, ViewProps } from 'react-native';
import { ReactNode } from 'react';

type BackgroundColor = keyof typeof COLORS;

export interface BoxProps extends ViewProps, TouchableOpacityProps {
  background?: BackgroundColor;
  flexDirection?: FlexDirection;
  justify?: Justify;
  align?: Align;
  alignSelf?: AlignSelf;
  flex?: number;
  square?: number;
  circle?: number;
  width?: string | number;
  height?: string | number;
  minWidth?: string | number;
  minHeight?: string | number;
  margin?: Spacing;
  padding?: Spacing;
  activePress?: boolean;
  borderRadius?: Spacing;
  children?: ReactNode;
}
