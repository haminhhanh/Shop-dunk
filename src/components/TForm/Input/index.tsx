import Box from "@shopDunk/components/Box";
import Icon from "@shopDunk/components/Icon";
import Typography from "@shopDunk/components/Typography";
import theme from "@shopDunk/configs/theme";
import COLORS from "@shopDunk/configs/theme/colors";
import React, { useMemo } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  TextInput,
  View,
  ViewStyle,
} from "react-native";
import { borderError, defaultInput, stylesText } from "./styles";

import { InputProps } from "./types";

const Input: React.FC<InputProps> = ({
  label,
  meta,
  required,
  onChange,
  // required,
  disabled,
  onFocus,
  allowClear,
  containerOnLayout,
  prefix,
  suffix,
  margin,
  padding,
  type,
  dontShowErrorMessage = false,
  loading,
  ...props
}) =>
  // ref,
  {
    // const inputRef = React.useRef();
    // useImperativeHandle(ref, () => inputRef.current);

    const combinedStyle: ViewStyle[] = useMemo(() => {
      const styleObject: any = {
        margin,
        padding,
      };
      const style: ViewStyle[] = Object.keys(styleObject)
        .map((key: any) => {
          if (styleObject[key]) {
            if (["margin", "padding"].includes(key)) {
              const normalizeOptions = theme.utils.styles.normalizeOptions(
                styleObject[key]
              );
              return theme.utils.styles[key](normalizeOptions);
            }

            return theme.utils.styles[key](styleObject[key]);
          }
        })
        .filter((e) => e);
      return style;
    }, [margin, padding]);

    const onClear = () => {
      onChange && onChange("");
    };
    const [secure, setSecure] = React.useState(
      type === "password" ? true : false
    );
    const toggle = () => {
      setSecure(!secure);
    };

    return (
      <>
        <View
          style={StyleSheet.flatten([combinedStyle])}
          onLayout={containerOnLayout}
        >
          {label && (
            <Typography
              margin={[0, 0, 9, 0]}
              type="Body-1"
              color="NEUTRAL_BLACK_ACTIVE"
            >
              {label}
              {required ? (
                <Typography
                  type="Title-title-module"
                  color="ACTIVE_HOT"
                  margin={[0, 5]}
                >
                  *
                </Typography>
              ) : null}
            </Typography>
          )}
          <Box
            style={StyleSheet.flatten([
              defaultInput,
              props.style && props.style,
              meta && meta.errors && meta.errors[0] && borderError,
            ])}
          >
            {prefix}
            <Box flex={1}>
              {loading ? (
                <ActivityIndicator
                  size="small"
                  color={COLORS.NEUTRAL_BLACK_ACTIVE}
                />
              ) : (
                <TextInput
                  // ref={ref}
                  allowFontScaling={false}
                  numberOfLines={1}
                  underlineColorAndroid="transparent"
                  placeholderTextColor={COLORS.NEUTRAL_ICON_NORMAL}
                  autoComplete={"off"}
                  onFocus={onFocus}
                  autoCapitalize={"none"}
                  selectionColor={"rgba(0,0,0,0.3)"}
                  autoCorrect={false}
                  clearTextOnFocus={false}
                  secureTextEntry={secure}
                  onChangeText={(text) => onChange && onChange(text)}
                  value={props.value}
                  editable={!disabled}
                  {...props}
                  style={StyleSheet.flatten([
                    stylesText,
                    props.style && props.style,
                  ])}
                />
              )}
            </Box>
            {type === "password" && (
              <Box activePress onPress={toggle}>
                <Icon
                  name={secure ? "eye" : "eye_close"}
                  size={24}
                  color={COLORS.NEUTRAL_BLACK_ACTIVE}
                />
              </Box>
            )}
            {suffix}

            {allowClear && (
              <Box activePress onPress={onClear}>
                <Icon name="x" size={24} color={COLORS.NEUTRAL_BLACK_ACTIVE} />
              </Box>
            )}
          </Box>

          {meta?.errors && !dontShowErrorMessage && (
            <Box margin={[5, 0, 0, 0]}>
              <Typography
                margin={[0, 0, 5, 0]}
                type="Body-2"
                color="ACTIVE_HOT"
                textAlign="center"
              >
                {meta?.errors}
              </Typography>
            </Box>
          )}
        </View>
      </>
    );
  };

export default Input;
