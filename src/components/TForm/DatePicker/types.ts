import { Spacing } from '@shopDunk/configs/theme/common';
import { ViewProps } from 'react-native';

export interface DataPickerProps extends ViewProps {
  label?: string;
  required?: boolean;
  value?: any;
  onChange?: any;
  margin?: Spacing;
  padding?: Spacing;
  placeholder?: string;
}
