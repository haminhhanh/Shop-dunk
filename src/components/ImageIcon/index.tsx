import React from 'react';
import { Image, ImageStyle } from 'react-native';
import Box from '../Box';
import { BoxProps } from '../Box/types';
import resources from './resources';

type ImageIconName = 'logo' | 'vi' | 'en' | 'crown' | string;

const ImageIcon = ({
  name,
  boxProps,
  style,
}: {
  style: ImageStyle;
  name: ImageIconName;
  boxProps?: BoxProps;
}) => {
  return (
    <Box {...boxProps}>
      <Image source={resources[name]} style={style} />
    </Box>
  );
};

export default ImageIcon;
