import Box from "@shopDunk/components/Box";
import { OutsideScreenProps, ScreensName } from "@shopDunk/routes/types";
import React, { useState } from "react";
import Popup, { PopUpRef } from "@shopDunk/components/Popup";
import { Platform, ScrollView, StyleSheet } from "react-native";
import useKeyboardHeight from "@shopDunk/hooks/useKeyboardHeight";
import Typography from "@shopDunk/components/Typography";
import { useForm } from "rc-field-form";
import Button from "@shopDunk/components/Button";
import i18n from "@shopDunk/utils/i18n";
import { NumberKeyboard } from "@shopDunk/components/NumberKeyboard";
import { isIphoneX } from "react-native-iphone-x-helper";
import { deviceWidth } from "@shopDunk/configs/theme/common";
import COLORS from "@shopDunk/configs/theme/colors";

const OtpScreen: React.FC<OutsideScreenProps<ScreensName.OtpScreen>> = ({
  navigation,
}) => {
  // const navigation = useNavigation();
  const ref = React.useRef<PopUpRef>();
  const [form] = useForm();
  const [otp, setOtp] = useState(null);

  // scroll input
  const scrollRef = React.useRef<ScrollView | null>();
  const [extraSpace, setExtraSpace] = useState(0);
  const getName = React.useRef<string>("");
  const input = React.useRef<{ [key: string]: number }>({});

  useKeyboardHeight({
    onShow: () => {
      if (Platform.OS === "ios") {
        scrollRef?.current?.scrollTo({
          y: input.current[getName.current] - 200,
        });
      } else {
      }
    },

    onHide: () => {
      setExtraSpace(0);
    },
  });

  return (
    <Box padding={[0, 32]} flex={1} margin={[80, 0, 0, 0]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        ref={(r) => (scrollRef.current = r)}
        contentContainerStyle={[{ paddingBottom: extraSpace }]}
      >
        <Box margin={[0, 0, 30, 0]}>
          <Box margin={[0, 0, 144, 0]}>
            <Typography type="Body-4" textAlign="center" margin={[0, 0, 5, 0]}>
              {i18n.t("sign_in_phone_otp")}
            </Typography>
            <Typography type="Title-title-module" textAlign="center">
              0977333932
            </Typography>
          </Box>

          <NumberKeyboard
            onFinshChange={() => {}}
            onChangeKey={(value: any) => setOtp(value)}
          />
        </Box>
        <Typography
          type="Body-1"
          color="ACTIVE_CTA"
          margin={[0, 0, 121, 0]}
          textAlign="center"
        >
          {i18n.t("sign.in.send.again")}(59s)
        </Typography>
        
      </ScrollView>
      <Button label="Tiếp tục" onPress={form.submit} style={styles.button} />
      <Popup ref={ref} />
    </Box>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.ACTIVE_CTA,
    height: 44,
    width: deviceWidth - 64,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    alignSelf: "center",
    marginTop: 'auto',
    marginBottom:20,
  },
});
export default OtpScreen;
