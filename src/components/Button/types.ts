import { TextStyle } from "react-native";
import { COLORS } from "@shopDunk/configs/theme/colors";
import { BoxProps } from "./../Box/types";

type ButtonType =
  | "primary"
  | "ghost"
  | "add"
  | "added"
  | "addCard"
  | "placeholder"
  | "disable";

import { ReactNode } from "react";
import { TypoKeys } from "@shopDunk/configs/theme/typography";

export interface ButtonProps extends BoxProps {
  type?: ButtonType;
  textType?: TypoKeys;
  textColor?: keyof typeof COLORS;
  textStyle?: TextStyle;
  label?: string;
  prefix?: ReactNode;
  suffix?: ReactNode;
  loading?: boolean;
}
