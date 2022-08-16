import React, { useEffect, useRef, useState } from 'react';
import { Animated, StyleSheet } from 'react-native';
import COLORS from '@shopDunk/configs/theme/colors';
import { FontFamilyNames } from '@shopDunk/configs/theme/typography';
import i18n from '@shopDunk/utils/i18n';

import Box from '../Box';

const SettingUpLanguage = () => {
  const content = i18n.t('setting.up.language');
  const [shareVal, setShareVal] = useState(0);
  const reverse = useRef(false);

  useEffect(() => {
    let interval = setInterval(() => {
      setShareVal(prev => {
        if (!reverse.current && prev >= content.length) {
          reverse.current = true;
          return prev - 1;
        }
        if (prev === -1) {
          reverse.current = false;
          return prev + 1;
        }

        if (reverse.current && prev <= content.length && prev >= 0) {
          return prev - 1;
        }

        return prev + 1;
      });
    }, 50);

    return () => {
      clearInterval(interval);
    };
  }, [content]);

  return (
    <Box>
      <Animated.Text>
        {content.split('').map((e: any, index: number) => {
          return (
            <Animated.Text
              key={index}
              style={[
                styles.text,
                shareVal < index ? styles.hide : styles.show,
              ]}
            >
              {e}
            </Animated.Text>
          );
        })}
      </Animated.Text>
    </Box>
  );
};

export default SettingUpLanguage;

const styles = StyleSheet.create({
  text: {
    fontSize: 22,
    lineHeight: 30,
    fontFamily: FontFamilyNames.POPPINS_BLACK,
    color: COLORS.BLUE_GREY_700,
  },
  hide: {
    opacity: 0,
  },
  show: {
    opacity: 1,
  },
});
