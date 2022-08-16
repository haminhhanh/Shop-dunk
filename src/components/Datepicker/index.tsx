import Box from '@shopDunk/components/Box';
import COLORS from '@shopDunk/configs/theme/colors';
import { deviceHeight, deviceWidth } from '@shopDunk/configs/theme/common';
import i18n from '@shopDunk/utils/i18n';
import dayjs from 'dayjs';
import React, { useRef } from 'react';
import { Platform, StyleSheet } from 'react-native';
import { isIphoneX } from 'react-native-iphone-x-helper';
import { Modalize } from 'react-native-modalize';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import Button from '../Button';
import Typography from '../Typography';

const Datepicker = () => {
  const sx = useSharedValue(0);
  const sy = useSharedValue(0);
  const sz = useSharedValue(0);
  const scrollHandlerx = useAnimatedScrollHandler(
    {
      onScroll: event => {
        sx.value = event?.contentOffset?.y;
      },
    },
    [],
  );
  const scrollHandlery = useAnimatedScrollHandler(
    {
      onScroll: event => {
        sy.value = event?.contentOffset?.y;
      },
    },
    [],
  );
  const scrollHandlerz = useAnimatedScrollHandler(
    {
      onScroll: event => {
        sz.value = event?.contentOffset?.y;
      },
    },
    [],
  );
  const modalizeRef = useRef<Modalize>(null);
  const onOpen = () => {
    modalizeRef?.current?.open();
  };
  const day = [undefined, undefined];
  const month = [
    undefined,
    undefined,
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
    undefined,
    undefined,
  ];
  const years = [undefined, undefined];
  for (let i: any = 1; i < 31; i++) {
    day?.push(i);
  }
  for (let i: any = 1950; i < dayjs().year() - 16; i++) {
    years?.push(i);
  }
  years?.push(undefined, undefined);
  day?.push(undefined, undefined);
  const onFinish = () => {
    console.log(day[sx.value / 50 + 2]);
    console.log(month[sy.value / 50 + 2]);
    console.log(years[sz.value / 50 + 2]);
  };
  return (
    <Box flex={1}>
      <Modalize
        ref={modalizeRef}
        modalHeight={deviceHeight / 2}
        snapPoint={deviceHeight / 2}
        overlayStyle={styles.modalContainer}
        modalStyle={styles.modalContainer}
        childrenStyle={styles.itemContainer}
        withHandle={false}
        useNativeDriver
      >
        <Box
          align="center"
          background="WHITE"
          margin={[0, 0, 0, 30]}
          borderRadius={8}
        >
          <Box width="95%" height={50} style={styles.bg} background="BG_100" />
          <Typography padding={10} type="Title - Regular" color="MONO_500">
            {i18n.t('dob')}
          </Typography>
          <Box width="100%" height={1} background="BG_200" />
          <Box flexDirection="row">
            <Animated.View style={{ height: 250 }}>
              <Animated.ScrollView
                onScroll={scrollHandlerx}
                showsVerticalScrollIndicator={false}
                scrollEventThrottle={16}
                snapToAlignment={'center'}
                snapToInterval={50}
              >
                {day.map((e, index) => (
                  <Animated.View key={`key-${index}`}>
                    <AnimatedComponent index={index} sv={sx} e={e} />
                  </Animated.View>
                ))}
              </Animated.ScrollView>
            </Animated.View>
            <Animated.View style={{ height: 250 }}>
              <Animated.ScrollView
                onScroll={scrollHandlery}
                showsVerticalScrollIndicator={false}
                scrollEventThrottle={16}
                snapToAlignment={'center'}
                snapToInterval={50}
              >
                {month.map((e, index) => (
                  <Animated.View key={`key-${index}`}>
                    <AnimatedComponent index={index} sv={sy} e={e} />
                  </Animated.View>
                ))}
              </Animated.ScrollView>
            </Animated.View>
            <Animated.View style={{ height: 250 }}>
              <Animated.ScrollView
                onScroll={scrollHandlerz}
                showsVerticalScrollIndicator={false}
                scrollEventThrottle={16}
                snapToAlignment={'center'}
                snapToInterval={50}
              >
                {years.map((e, index) => (
                  <Animated.View key={`key-${index}`}>
                    <AnimatedComponent index={index} sv={sz} e={e} />
                  </Animated.View>
                ))}
              </Animated.ScrollView>
            </Animated.View>
          </Box>
          <Box
            margin={[0, 0, 10, 0]}
            height={1}
            width={'100%'}
            background="BG_200"
          />
          <Box margin={[10, 0, 10, 0]} activePress onPress={onFinish}>
            <Typography color="PRIMARY_500" type="Body - Semibold">
              {i18n.t('confirm')}
            </Typography>
          </Box>
        </Box>

        <Button
          onPress={() => modalizeRef.current?.close()}
          type="primary"
          label="Huỷ bỏ"
          style={styles.button3}
        />
      </Modalize>
      <Button onPress={() => onOpen()} type="primary" style={styles.button} />
    </Box>
  );
};
interface Props {
  sv?: any;
  index?: any;
  e?: any;
}

const AnimatedComponent: React.FC<Props> = ({ sv, index, e }) => {
  const stylez = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: interpolate(
            sv.value,
            [
              (index - 4) * 50,
              (index - 3) * 50,
              (index - 2) * 50,
              (index - 1) * 50,
              index * 50,
            ],
            [1, 1, 1.6, 1, 1],
            Extrapolate.CLAMP,
          ),
        },
      ],
    };
  });

  return (
    <Animated.View style={[styles.content, stylez]}>
      <Typography>{e}</Typography>
    </Animated.View>
  );
};

export default Datepicker;

const styles = StyleSheet.create({
  content: {
    height: 50,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contain: {
    height: 50,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: { backgroundColor: 'transparent' },
  bg: { position: 'absolute', top: 150, zIndex: 0, borderRadius: 12 },
  button: {
    position: 'absolute',
    bottom: Platform.select({
      ios: isIphoneX() ? 40 : 20,
      android: 20,
    }),
    backgroundColor: COLORS.BRAND,
    height: 54,
    width: deviceWidth - 60,
    marginLeft: 30,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  button2: {},
  button3: {
    marginTop: 65,
    backgroundColor: COLORS.BRAND,
    height: 54,
    width: deviceWidth - 60,
    marginLeft: 30,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  itemContainer: {
    position: 'absolute',
    bottom: Platform.select({
      ios: isIphoneX() ? 40 : 20,
      android: 20,
    }),
  },
});
