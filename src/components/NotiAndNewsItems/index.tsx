import Box from '@shopDunk/components/Box';
import Icon from '@shopDunk/components/Icon';
import Typography from '@shopDunk/components/Typography';
import COLORS from '@shopDunk/configs/theme/colors';
import { deviceWidth } from '@shopDunk/configs/theme/common';
import i18n from '@shopDunk/utils/i18n';
import dayjs from 'dayjs';
import React, { useState } from 'react';
import { Image, StyleSheet } from 'react-native';

interface props {
  data?: any;
  onPress?: () => void;
}

const NotificationAndNewsItem: React.FC<props> = ({ data, onPress }) => {
  return (
    <Box flexDirection="row" align="center" activePress onPress={onPress}>
      <Image
        source={require('../../../assets/dummy/logo.png')}
        style={{ width: 40, height: 25 }}
      />
      <Box margin={[0, 0, 0, 15]} width={deviceWidth - 115}>
        <Typography type="Small - Regular" color="MONO_500">
          {dayjs(data?.createdAt).format('HH:mm, DD-MM-YYYY')}
        </Typography>
        <Typography margin={[12, 0, 12, 0]} type="Body - Medium">
          {data?.title}
        </Typography>
        <Typography type="Caption - Regular" color="MONO_700">
          {data?.description}
        </Typography>
      </Box>
    </Box>
  );
};
export default NotificationAndNewsItem;

const styles = StyleSheet.create({
  boxStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
