import Box from "@shopDunk/components/Box";
import Icon from "@shopDunk/components/Icon";
import Typography from "@shopDunk/components/Typography";
import theme from "@shopDunk/configs/theme";
import React, { useMemo } from "react";
import { Image, StyleSheet, ViewStyle } from "react-native";
import SelectItem from "./SelectItem";
import {
  borderError,
  borderInput,
  defaultInput,
  imageStyle,
  boxShadown,
} from "./styles";
import { ScrollView } from "react-native-gesture-handler";
import { SelectProps } from "./types";
import COLORS from "@shopDunk/configs/theme/colors";

interface SelectState {
  visible: boolean;
}

const Select: React.FC<SelectProps> = ({
  label,
  required,
  options,
  margin,
  padding,
  type,
  placeholder,
  preicon,
  suficon,
  meta,
  imageApi,
  onPress,
  camera,
  ...props
}) => {
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

  const [state, setState] = React.useState<SelectState>({ visible: false });
  return (
    <>
      <Box style={StyleSheet.flatten([combinedStyle])}>
        <Box flexDirection="row">
          {label && (
            <Typography
              margin={[0, 0, 5, 0]}
              type="Body-1"
              color="NEUTRAL_BLACK_ACTIVE"
            >
              {label}
              {required ? (
                <Typography type="Title-title-module" color="ACTIVE_HOT" padding={[0,5]}>
                  *
                </Typography>
              ) : null}
            </Typography>
          )}
        </Box>
        <Box
          style={[
            defaultInput,
            props.value && borderInput,
            props.style && props.style,
            // meta && meta.errors && meta.errors[0] && borderError,
          ]}
          activePress
          onPress={() => setState({ visible: !state.visible })}
        >
          {type && type === "imageUpload" && (
            <Icon
              name="image_upload"
              size={50}
              color={COLORS.NEUTRAL_BLACK_ACTIVE}
            />
          )}
          {type && type !== "imageUpload" && (
            <Icon
              name="image_upload"
              size={25}
              color={COLORS.NEUTRAL_BLACK_ACTIVE}
            />
          )}

          {props.value && !camera ? (
            <>
              {type ? (
                <Image source={{ uri: props.value.uri }} style={imageStyle} />
              ) : (
                <Typography type="Body-1" color="NEUTRAL_BLACK_ACTIVE">
                  {props.value.label || props.value}
                </Typography>
              )}
            </>
          ) : (
            <>
              {!type && (
                <Typography type="Body-1" color="NEUTRAL_BLACK_ACTIVE">
                  {placeholder}
                </Typography>
              )}
              {type && camera && (
                <>
                  {type === "imageFront" && (
                    <Image
                      source={{
                        uri: `file://${camera}`,
                      }}
                      style={imageStyle}
                    />
                  )}
                  {type === "imageBack" && (
                    <Image
                      source={{
                        uri: `file://${camera}`,
                      }}
                      style={imageStyle}
                    />
                  )}
                </>
              )}
              {type && !camera && (
                <Typography type="Title-1" color="NEUTRAL_ICON_NORMAL">
                  {placeholder}
                </Typography>
              )}
            </>
          )}
          {!type && suficon}
          <Icon
            name="arrow_circle_left"
            size={20}
            color={COLORS.NEUTRAL_BLACK_ACTIVE}
          />
        </Box>

        {meta?.errors && (
          <Box margin={[5, 0, 0, 0]}>
            <Typography
              margin={[0, 0, 5, 0]}
              type="Body-1"
              color='ACTIVE_HOT'
            >
              {meta?.errors}
            </Typography>
          </Box>
        )}
        {state.visible && (
          <Box style={boxShadown}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <Box>
                {(options || []).map((i, index) => {
                  return (
                    <Box key={`key_${index}`}>
                      <SelectItem
                        imageApi={imageApi}
                        onChange={props.onChange}
                        option={i}
                        icon={preicon}
                        type={type}
                        setState={setState}
                        onPress={onPress}
                        value={props.value?.value}
                      />
                      {options?.length !== index + 1 && (
                        <Box
                          height={1}
                          background={"NEUTRAL_BACKGROUND"}
                          margin={[0, 16]}
                        />
                      )}
                    </Box>
                  );
                })}
              </Box>
            </ScrollView>
          </Box>
        )}
      </Box>
    </>
  );
};

export default Select;
