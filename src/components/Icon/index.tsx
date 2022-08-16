import COLORS from '@shopDunk/configs/theme/colors';
import React from 'react';
import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import { IconProps } from 'react-native-vector-icons/Icon';
import config from './icon.json';
import { IconType } from './type';
const Icomoon = createIconSetFromIcoMoon(config, 'icomoon', 'icomoon.ttf');

interface IcomoonProps extends Omit<IconProps, 'name'> {
  name: IconType;
}

const Icon: React.FC<IcomoonProps> = props => {
  return <Icomoon color={COLORS.NEUTRAL_BLACK_ACTIVE} {...props} />;
};

export default Icon;
