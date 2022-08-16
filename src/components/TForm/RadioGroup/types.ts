import { Spacing } from '@shopDunk/configs/theme/common';
import { TypoKeys } from '@shopDunk/configs/theme/typography';
import { Meta } from 'rc-field-form/es/interface';
import { ViewProps, ViewStyle } from 'react-native';

interface option {
  label?: string;
  value?: string | number;
  extraData?: string;
}

export interface RadioGroupProps extends ViewProps {
  meta?: Meta;
  options: option[];
  value?: any;
  onChange?: any;
  margin?: Spacing;
  padding?: Spacing;
  horizontal?: boolean;
  isCheck?: boolean;
  TypoType?: TypoKeys;
  styleNotActive?: ViewStyle | ViewStyle[];
  styleActive?: ViewStyle | ViewStyle[];
}
