import Box from '@shopDunk/components/Box';
import Icon from '@shopDunk/components/Icon';
import { IconType } from '@shopDunk/components/Icon/type';
import Typography from '@shopDunk/components/Typography';
import COLORS from '@shopDunk/configs/theme/colors';
import React from 'react';
import { Image, StyleSheet } from 'react-native';

interface CardProps {
  imageName?: string;
  belowIcon?: IconType;
  color?: COLORS;
  label?: string;
}
const cardWith = 77;
const Card: React.FC<CardProps> = ({
  imageName,
  belowIcon = 'check_full_circle',
  label,
  color = COLORS.GREEN_500,
}) => {
  return (
    <Box width={cardWith} align="center">
      <Box style={imageName !== 'Second' ? styles.boxStyle : styles.boxStyle2}>
        {imageName === 'First' && (
          <Image
            source={require('../../../assets/ID_card.png')}
            style={styles.image}
          />
        )}
        {imageName === 'Second' && (
          <Image
            source={require('../../../assets/ID_card1.png')}
            style={styles.image2}
          />
        )}
        {imageName === 'Third' && (
          <Image
            source={require('../../../assets/ID_card2.png')}
            style={styles.image}
          />
        )}

        {imageName === 'Fourth' && (
          <Image
            source={require('../../../assets/ID_card3.png')}
            style={styles.image}
          />
        )}

        <Box style={styles.iconStyle}>
          <Icon name={belowIcon} size={20} color={color} />
        </Box>
      </Box>

      <Typography margin={[12, 0, 0, 0]} type="Small - Regular">
        {label}
      </Typography>
    </Box>
  );
};
export default Card;

const styles = StyleSheet.create({
  boxStyle: {
    height: 56,
    width: cardWith,
    backgroundColor: '#E7ECFF',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxStyle2: {
    height: 56,
    width: cardWith,
    backgroundColor: '#E7ECFF',
    borderRadius: 12,
  },
  iconStyle: {
    position: 'absolute',
    bottom: -8,
    left: (cardWith - 20) / 2,
    zIndex: 100,
  },
  image: {
    height: 33,
    width: cardWith,
    resizeMode: 'contain',
  },
  image2: {
    position: 'absolute',
    top: 0,
    right: 0,
    height: 33,
    width: 57,
  },
});
