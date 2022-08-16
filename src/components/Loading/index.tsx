import COLORS from '@shopDunk/configs/theme/colors';
import AnimatedLottieView from 'lottie-react-native';
import React from 'react';
import { StyleSheet, View } from 'react-native';

const LoadingScreen: React.FC<any> = () => {
  return (
    <View style={styles.container}>
      <View style={styles.block}>
        <AnimatedLottieView
          autoPlay={true}
          loop={true}
          style={styles.image}
          source={require('../../../assets/loading.json')}
        />
      </View>
      <View style={styles.backgroundLoading} />
    </View>
  );
};

export default LoadingScreen;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  block: {
    zIndex: 100,
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  image: {
    width: 80,
    height: 80,
  },
  backgroundLoading: {
    right: 0,
    top: 0,
    left: 0,
    bottom: 0,
    position: 'absolute',
    backgroundColor: COLORS.NEUTRAL_200,
  },
});
