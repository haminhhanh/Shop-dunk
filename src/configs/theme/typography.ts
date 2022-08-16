import { TextStyle } from 'react-native';
import COLORS from './colors';
export interface ITextConfigs {
  'Title-1': TextStyle;
  'Title-2': TextStyle;
  'Title-3': TextStyle;
  'Title-title-module': TextStyle;
  'Title-screen': TextStyle;
  'Title-module': TextStyle;
  'Title-big': TextStyle;
  'Body-1': TextStyle;
  'Body-2': TextStyle;
  'Body-3': TextStyle;
  'Body-4': TextStyle;
}

export enum FontFamilyNames {
  ARIAL = 'arial',
}

export type TypoKeys = keyof typeof TextConfigs;

 const TextConfigs: ITextConfigs = {
  'Title-1': {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: FontFamilyNames.ARIAL,
    color: COLORS.NEUTRAL_BLACK_ACTIVE,
    fontWeight: '700',
  },
  'Title-2': {
    fontSize: 14,
    lineHeight: 21,
    fontFamily: FontFamilyNames.ARIAL,
    color: COLORS.NEUTRAL_BLACK_ACTIVE,
    fontWeight: '700',
  },
  'Title-3': {
    fontSize: 12,
    lineHeight: 18,
    fontFamily: FontFamilyNames.ARIAL,
    color: COLORS.NEUTRAL_BLACK_ACTIVE,
    fontWeight: '700',
  },
  'Title-title-module': {
    fontSize: 20,
    lineHeight: 30,
    fontFamily: FontFamilyNames.ARIAL,
    color: COLORS.NEUTRAL_BLACK_ACTIVE,
    fontWeight: '700',
  },
  'Title-screen': {
    fontSize: 18,
    lineHeight: 27,
    fontFamily: FontFamilyNames.ARIAL,
    color: COLORS.NEUTRAL_BLACK_ACTIVE,
    fontWeight: '700',
  },
  'Title-module': {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: FontFamilyNames.ARIAL,
    color: COLORS.NEUTRAL_BLACK_ACTIVE,
    fontWeight: '700',
  },
  'Title-big': {
    fontSize: 22,
    lineHeight: 30,
    fontFamily: FontFamilyNames.ARIAL,
    color: COLORS.NEUTRAL_BLACK_ACTIVE,
    fontWeight: '700',
  },
  'Body-1': {
    fontSize: 14,
    lineHeight: 21,
    fontFamily: FontFamilyNames.ARIAL,
    color: COLORS.NEUTRAL_BLACK_ACTIVE,
    fontWeight: '400',
  },
  'Body-2': {
    fontSize: 12,
    lineHeight: 18,
    fontFamily: FontFamilyNames.ARIAL,
    color: COLORS.NEUTRAL_BLACK_ACTIVE,
    fontWeight: '400',
  },
  'Body-3': {
    fontSize: 10,
    lineHeight: 16,
    fontFamily: FontFamilyNames.ARIAL,
    color: COLORS.NEUTRAL_BLACK_ACTIVE,
    fontWeight: '400',
  },
  'Body-4': {
    fontSize: 16,
    lineHeight: 25,
    fontFamily: FontFamilyNames.ARIAL,
    color: COLORS.NEUTRAL_BLACK_ACTIVE,
    fontWeight: '400',
  },
};

export default TextConfigs;
