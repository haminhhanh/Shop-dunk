import { Dimensions } from 'react-native';

export const { width: deviceWidth, height: deviceHeight } =
  Dimensions.get('window');

export type FlexDirection = 'row' | 'column' | 'row-reverse' | 'column-reverse';

export type Justify =
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'space-between'
  | 'space-around'
  | 'space-evenly';

export type Align =
  | 'stretch'
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'baseline';

export type AlignSelf =
  | 'stretch'
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'baseline';

export type Spacing =
  | number
  | [number, number]
  | [number, number, number, number];

export type MarginPadding = [number, number, number, number];

export type TextAlign = 'auto' | 'left' | 'right' | 'center' | 'justify';
