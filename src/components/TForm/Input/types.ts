import { TextInputProps } from 'react-native';
import { ReactNode } from 'react';
import { Spacing } from '@shopDunk/configs/theme/common';
import { Meta } from 'rc-field-form/es/interface';

export interface InputProps extends Omit<TextInputProps, 'onChange'> {
  meta?: Meta;
  label?: string;
  required?: boolean;
  disabled?: boolean;
  allowClear?: boolean;
  onChange?: (text: string) => void;
  onFocus?: any;
  margin?: Spacing;
  padding?: Spacing;
  suffix?: ReactNode;
  prefix?: ReactNode;
  containerOnLayout?: any;
  type?: 'password';
  value?: any;
  dontShowErrorMessage?: boolean;
  loading?: boolean;
  // ref?: void;
}
