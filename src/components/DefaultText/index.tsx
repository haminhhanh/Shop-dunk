import Box from '@shopDunk/components/Box';
import Icon from '@shopDunk/components/Icon';
import { IconType } from '@shopDunk/components/Icon/type';
import Typography from '@shopDunk/components/Typography';
import COLORS from '@shopDunk/configs/theme/colors';
import { TypoKeys } from '@shopDunk/configs/theme/typography';
import React from 'react';

interface Props {
  icon?: IconType;
  label?: string;
  color?: COLORS;
  type?: TypoKeys;
}
const DefaultText: React.FC<Props> = ({
  icon = 'check_circle',
  label,
  color = COLORS.GREEN_600,
  type,
}) => {
  return (
    <Box
      flex={1}
      align="flex-start"
      flexDirection="row"
      margin={[0, 10, 22, 10]}
      padding={[0, 10, 0, 5]}
    >
      <Icon name={icon} size={15} color={color} />

      <Typography
        margin={[0, 20, 0, 12]}
        type={type ? type : 'Body - Regular'}
        color={type ? 'BLUE_GREY_700' : 'BLACK'}
      >
        {label}
      </Typography>
    </Box>
  );
};
export default DefaultText;
