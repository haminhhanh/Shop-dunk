import { Spacing } from '@shopDunk/configs/theme/common';
import { Meta } from 'rc-field-form/es/interface';
import { ReactNode } from 'react';
import { ViewProps } from 'react-native';

interface option {
  label?: string;
  value?: string | number;
}

export interface SelectProps extends ViewProps {
  meta?: Meta;
  options: option[];
  label?: string;
  required?: boolean;
  value?: any;
  onChange?: any;
  margin?: Spacing;
  padding?: Spacing;
  type?: 'imageFront' | 'imageBack' | 'imageSelf' | 'imageUpload';
  placeholder?: string;
  preicon?: ReactNode;
  suficon?: ReactNode;
  imageApi?: any;
  onPress?: any;
  camera?: any;
}
