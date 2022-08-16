import { useNavigation } from '@react-navigation/native';
import COLORS from '@shopDunk/configs/theme/colors';
import React from 'react';
import Box from '../Box';
import Icon from '../Icon';

interface defaultPriceProps {
  marginBottom?: number;
  color?: COLORS;
  onPress?: () => any;
}

const HeaderLeftBack: React.FC<defaultPriceProps> = ({
  marginBottom = 0,
  color,
  onPress,
}) => {
  const navigation = useNavigation();

  return (
    <Box
      padding={[0, 0, marginBottom, 30]}
      activePress
      onPress={onPress ? onPress : navigation.goBack}
    >
      <Icon
        size={30}
        name="arrow_left"
        color={color ? color : COLORS.BLUE_400}
      />
    </Box>
  );
};

export default HeaderLeftBack;
