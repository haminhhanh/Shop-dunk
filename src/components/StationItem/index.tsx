import Box from '@shopDunk/components/Box';
import Icon from '@shopDunk/components/Icon';
import Typography from '@shopDunk/components/Typography';
import COLORS from '@shopDunk/configs/theme/colors';
import { ScreensName } from '@shopDunk/routes/types';
import i18n from '@shopDunk/utils/i18n';
import React from 'react';
import { StyleSheet } from 'react-native';

interface prop {
  navigation?: any;
  item?: any;
}

const StationItem: React.FC<prop> = ({ navigation, item }) => {
  const toLocation = (e: any) => {
    navigation.popToTop();
    navigation.navigate(ScreensName.HomeScreen, { location: e });
  };
  return (
    <>
      <Box
        padding={[12, 16, 12, 16]}
        style={styles.container}
        activePress
        onPress={() => toLocation(item)}
      >
        <Box flexDirection="row" justify="space-between">
          <Box width={'75%'}>
            <Typography type="Subheader - Semibold">{item?.name}</Typography>
          </Box>
          <Typography type="Subheader - Regular">
            {`${item?.distance?.toFixed(1)} km`}
          </Typography>
        </Box>
        <Box flexDirection="row" justify="space-between" align="center">
          <Box width={'75%'}>
            <Box margin={[10, 0, 0, 0]} flexDirection="row">
              <Icon name="location_point" size={20} color={COLORS.BRAND} />
              <Typography margin={[0, 0, 0, 12]} type="Subheader - Regular">
                {item?.address}
              </Typography>
            </Box>
            <Box margin={[5, 0, 0, 0]} flexDirection="row">
              <Icon name="bicycle" size={20} color={COLORS.BRAND} />
              <Typography
                margin={[0, 0, 0, 12]}
                type="Subheader - Regular"
                color="BG_500"
              >
                {i18n.t('bike')} {item?.bicycles?.length}
              </Typography>
            </Box>
            <Box margin={[5, 0, 0, 0]} flexDirection="row">
              <Icon name="map_pin" size={20} color={COLORS.BRAND} />
              <Typography
                margin={[0, 0, 0, 12]}
                type="Subheader - Regular"
                color="BG_500"
              >
                {i18n.t('parking')} {item?.parking}
              </Typography>
            </Box>
          </Box>
          <Icon name="direction" size={50} color={COLORS.BRAND} />
        </Box>
      </Box>
    </>
  );
};
export default StationItem;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 12,
    width: '100%',
    borderColor: COLORS.BG_300,
    marginBottom: 20,
  },
});
