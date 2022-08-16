import React, { createRef, useEffect, useMemo, useRef, useState } from 'react';
import {
  Platform,
  StyleSheet,
  TextInput,
  TextInputKeyPressEventData,
} from 'react-native';
import Box from '../Box';
import COLORS from '@shopDunk/configs/theme/colors';

const otpLength = 6;
const otpArray = new Array(otpLength).fill('');

const styles = StyleSheet.create({
  box: {
    width: 40,
    borderBottomWidth:2,
    borderBottomColor:COLORS.NEUTRAL_BACKGROUND_BUTTON,
    marginHorizontal: 5,
  },
  input: {
    flex: 1,
    padding: 0,
    fontSize: 36,
    fontWeight: '500',
    color: COLORS.NEUTRAL_BLACK_ACTIVE,
  },
});

type OtpInputProps = {
  isClear?: boolean;
  isWrong?: boolean;
  onChangeKey?: (text?: string) => void;
  onFinshChange?: () => void;
};
export enum TIMES {
  MS1 = 1,
  MS10 = 10,
  MS100 = 100,
  SECOND = 1000,
  MINUTE = 1000 * 60,
  HOUR = 1000 * 60 * 60,
  DAY = 1000 * 60 * 60 * 24,
  WEEK = 1000 * 60 * 60 * 24 * 7,
  MONTH = 1000 * 60 * 60 * 24 * 30,
  QUARTER = 1000 * 60 * 60 * 24 * 30 * 3,
  YEAR = 1000 * 60 * 60 * 24 * 30 * 3 * 4,
}

export const NumberKeyboard = React.memo((props: OtpInputProps) => {
  const { isClear, isWrong, onChangeKey, onFinshChange } = props;
  const [value, setValue] = useState(useMemo(() => otpArray.map(() => ''), []));
  const ref = useRef(
    useMemo(() => otpArray.map(() => createRef<TextInput>()), []),
  ).current;

  const focus = (index: number) => {
    ref[index]?.current?.focus();
  };

  const getBorderColor = (index: number) => {
    if (isWrong && value[otpLength - 1] !== '') {
      return COLORS.ACTIVE_HOT;
    }
    if (value[index] === '' && (index === 0 || value[index - 1] !== '')) {
      return COLORS.ACTIVE_HOT;
    }
    return COLORS.ACTIVE_HOT;
  };

  const handleOnFocus = (index: number) => {
    if (value[index] === '' && value[index - 1] === '') {
      focus(index - 1);
    } else {
      setValue(value.map((it, id) => (id < index ? it : '')));
    }
  };

  const handleOnPressKey = (index: number, key: string = '') => {
    const newVal = [...value];
    newVal[index] = key;
    setValue(newVal);
  };

  const handleOnKeyPress = (
    index: number,
    event: TextInputKeyPressEventData,
  ) => {
    const key = event.key;
    if (!/[0-9]|Backspace/.test(key)) {
      return;
    }
    if (key === 'Backspace') {
      handleOnPressKey(index);
      value[index] === '' && focus(index - 1);
    } else {
      handleOnPressKey(index, key);
      focus(index + 1);
    }
  };

  const handleOnChangeText = (index: number, text: string) => {
    if (Platform.OS === 'ios') {
      return;
    }
    if (!/[0-9]/.test(text)) {
      return;
    }
    handleOnPressKey(index, text);
    focus(index + 1);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      focus(0);
      clearTimeout(timeout);
    }, TIMES.SECOND / 2);
  }, []);

  useEffect(() => {
    isClear && setValue(value.map(() => ''));
  }, [isClear]);

  useEffect(() => {
    onChangeKey && onChangeKey(value.reduce((prev, curr) => prev + curr));
    if (value.reduce((prev, curr) => prev + curr).length === otpLength) {
      onFinshChange && onFinshChange();
    }
  }, [value]);

  return (
    <Box flexDirection="row" align="center" justify="center">
      {otpArray.map((_, index) => (
        <Box
          key={index}
          style={{
            ...styles.box,
            borderColor: getBorderColor(index),
          }}
        >
          <TextInput
            caretHidden
            contextMenuHidden
            maxLength={1}
            textAlign={'center'}
            keyboardType={'number-pad'}
            ref={ref[index]}
            value={value[index]}
            style={{
              ...styles.input,
            }}
            onFocus={() => handleOnFocus(index)}
            onKeyPress={({ nativeEvent }) =>
              handleOnKeyPress(index, nativeEvent)
            }
            onChangeText={text => handleOnChangeText(index, text)}
          />
        </Box>
      ))}
    </Box>
  );
});
