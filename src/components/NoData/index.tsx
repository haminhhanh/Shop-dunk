import COLORS from '@shopDunk/configs/theme/colors';
import i18n from '@shopDunk/utils/i18n';
import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import Typography from '../Typography';

const NoData: React.FC<any> = () => {
  return (
    <View style={styles.container}>
      <View style={styles.block}>
        <Image
          source={require('../../../assets/Nodata.png')}
          style={styles.image}
        />
        <Typography type="Body - Medium" color="BG_700">
          {i18n.t('no.data')}
        </Typography>
      </View>
      {/* <View style={styles.backgroundLoading} /> */}
    </View>
  );
};

export default NoData;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '90%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  block: {
    zIndex: 100,
    width: 150,
    height: 100,
    borderRadius: 10,
    alignItems: 'center',
  },
  image: {
    width: 80,
    height: 80,
    marginBottom: 15,
  },
  // backgroundLoading: {
  //   right: 0,
  //   top: 0,
  //   left: 0,
  //   bottom: 0,
  //   position: 'absolute',
  //   backgroundColor: COLORS.BG_100,
  // },
});
