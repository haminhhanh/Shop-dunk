import React, { useRef, useCallback } from 'react';
import { Animated, StyleSheet } from 'react-native';
import Box from '../Box';
import { useMount } from 'ahooks';

const ScaleCircle: React.FC<any> = () => {
  const scaleRef = useRef(new Animated.Value(1)).current;
  const nextValue = useRef(1.2);

  const animateLoop = useCallback(() => {
    Animated.timing(scaleRef, {
      toValue: nextValue.current,
      duration: 1000,
      useNativeDriver: true,
    }).start(({ finished }) => {
      if (finished) {
        nextValue.current = nextValue.current === 1 ? 1.2 : 1;
        animateLoop();
      }
    });
  }, [scaleRef]);

  useMount(() => {
    animateLoop();
  });

  return (
    <Animated.View style={[{ transform: [{ scale: scaleRef }] }]}>
      <Box align="center" justify="center" width={60} height={60}>
        <Box background="RED_500" style={styles.outterCircle} />
        <Box circle={24} background="RED_500" style={styles.insideCircle1} />
        <Box
          justify="center"
          align="center"
          circle={16}
          background="WHITE"
          style={styles.insideCircle2}
        />
        <Box
          justify="center"
          align="center"
          circle={16}
          background="RED_600"
          style={styles.insideCircle3}
        />
      </Box>
    </Animated.View>
  );
};

export default ScaleCircle;

const styles = StyleSheet.create({
  outterCircle: {
    width: 50,
    height: 50,
    borderRadius: 75,
    opacity: 0.1,
  },
  insideCircle1: {
    position: 'absolute',
    width: 30,
    height: 30,
    borderRadius: 75,
    opacity: 0.5,
  },
  insideCircle2: {
    position: 'absolute',
    width: 20,
    height: 20,
    borderRadius: 75,
    opacity: 0.8,
  },
  insideCircle3: {
    position: 'absolute',
    width: 15,
    height: 15,
    borderRadius: 75,
  },
});
