import Box from '@shopDunk/components/Box';
import Icon from '@shopDunk/components/Icon';
import Typography from '@shopDunk/components/Typography';
import theme from '@shopDunk/configs/theme';
import COLORS from '@shopDunk/configs/theme/colors';
import React, { useMemo } from 'react';
import { StyleSheet, ViewStyle } from 'react-native';

import { RadioGroupProps } from './types';

const RadioGroup: React.FC<RadioGroupProps> = ({
  horizontal,
  options,
  margin,
  padding,
  styleNotActive,
  styleActive,
  ...props
}) => {
  const combinedStyle: ViewStyle[] = useMemo(() => {
    const styleObject: any = {
      margin,
      padding,
    };
    const style: ViewStyle[] = Object.keys(styleObject)
      .map((key: any) => {
        if (styleObject[key]) {
          if (['margin', 'padding'].includes(key)) {
            const normalizeOptions = theme.utils.styles.normalizeOptions(
              styleObject[key],
            );
            return theme.utils.styles[key](normalizeOptions);
          }

          return theme.utils.styles[key](styleObject[key]);
        }
      })
      .filter(e => e);
    return style;
  }, [margin, padding]);

  return (
    <>
      <Box style={[combinedStyle, horizontal && styles.horizontal]}>
        {(options || []).map((i, index) => {
          return (
            <Box
              key={`key-${index}`}
              margin={[0, 0, 32, 0]}
              activePress
              onPress={() => props.onChange(i.value)}
              style={i.value === props.value ? styleActive : styleNotActive}
              justify="space-between"
            >
              <Typography margin={[0, 15, 0, 0]} type="Subheader - Medium">
                {i.label}
              </Typography>
              <Box flexDirection="row">
                <Typography
                  margin={[0, 15, 0, 0]}
                  type="Caption - Regular"
                  color="BG_500"
                >
                  {i.extraData}
                </Typography>
                {i.value !== props.value ? (
                  <Box style={styles.box} />
                ) : (
                  <Icon
                    name="check_full_circle"
                    size={20}
                    color={COLORS.BRAND}
                  />
                )}
              </Box>
            </Box>
          );
        })}
      </Box>
    </>
  );
};

export default RadioGroup;

const styles = StyleSheet.create({
  horizontal: {
    flexDirection: 'row',
  },
  box: {
    height: 20,
    width: 20,
    borderWidth: 1,
    borderColor: COLORS.BG_600,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inner: {
    height: 12,
    width: 12,
    borderRadius: 12,
    backgroundColor: COLORS.BLACK,
  },
});
