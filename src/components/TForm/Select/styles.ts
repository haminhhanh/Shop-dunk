import { COLORS } from "@shopDunk/configs/theme/colors";
import { deviceWidth } from "@shopDunk/configs/theme/common";
import { StyleSheet } from "react-native";

export const defaultContainer: any = StyleSheet.create<any>({
  backgroundColor: "rgba(0,0,0,0.5)",
  flex: 1,
  position: "absolute",
});

export const smallerContainer: any = StyleSheet.create<any>({
  backgroundColor: "#fff",
});
export const listContainer: any = StyleSheet.create<any>({
  paddingBottom: 16,
  marginHorizontal: 16,
});

export const defaultInput: any = StyleSheet.create<any>({
  justifyContent: "space-between",
  borderRadius: 12,
  borderColor: "#D6D5DD",
  alignItems: "flex-start",
  textAlign: "center",
  paddingHorizontal: 16,
  backgroundColor: COLORS.NEUTRAL_WHITE,
  flexDirection: "row",
  paddingVertical: 10,
});

export const bottomSheetHeader: any = StyleSheet.create<any>({
  alignItems: "center",
  marginBottom: 12,
});

export const bottomSheet: any = StyleSheet.create<any>({
  position: "absolute",
  bottom: 0,
  left: 0,
  right: 0,
  width: deviceWidth,
  borderTopLeftRadius: 16,
  borderTopRightRadius: 16,
  padding: 16,
  backgroundColor: "white",
  zIndex: 10,
});
export const imageStyle: any = StyleSheet.create<any>({
  width: "100%",
  height: "100%",
  borderRadius: 12,
  position: "absolute",
});

export const borderInput: any = StyleSheet.create<any>({
  borderColor: "#EDEDED",
  borderBottomWidth: 1,
});

export const borderError: any = StyleSheet.create<any>({
  borderColor: "#FF0900",
});

export const boxShadown: any = StyleSheet.create<any>({
  shadowColor: "#000",
  shadowOffset: { width: -2, height: 4 },
  shadowOpacity: 0.2,
  shadowRadius: 12,
  elevation: 6,
  backgroundColor: COLORS.NEUTRAL_WHITE,
  borderRadius: 12,
  marginTop: 1,
});
