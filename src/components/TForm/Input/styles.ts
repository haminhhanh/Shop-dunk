import { FontFamilyNames } from "@shopDunk/configs/theme/typography";
import COLORS from "@shopDunk/configs/theme/colors";
import inputConfigs, { inputKeys } from "@shopDunk/configs/theme/input";
import { StyleSheet, ViewStyle } from "react-native";

type inputStyle = {
  [key in inputKeys]: ViewStyle;
};

const styles: any = StyleSheet.create<inputStyle>(inputConfigs);
export const defaultInput: any = StyleSheet.create<any>({
  height: 50,
  borderRadius: 8,
  paddingLeft: 16,
  paddingRight: 16,
  alignItems: "center",
  flexDirection: "row",
  backgroundColor: COLORS.NEUTRAL_WHITE,
});

export const stylesText: any = StyleSheet.create<any>({
  flexWrap: "wrap",
  fontSize: 16,
  backgroundColor: COLORS.NEUTRAL_WHITE,
  color: COLORS.NEUTRAL_BLACK_ACTIVE,
  fontFamily: FontFamilyNames.ARIAL,
  lineHeight: 24,
  fontWeight:'700',
});
// export const borderInput: any = StyleSheet.create<any>({
//   borderColor: COLORS.BG_700,
// });

export const borderError: any = StyleSheet.create<any>({
  borderColor: "#FF0900",
});

export default styles;
