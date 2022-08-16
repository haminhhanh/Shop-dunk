import Box from "@shopDunk/components/Box";
import { OutsideScreenProps, ScreensName } from "@shopDunk/routes/types";
import React, { useState } from "react";
import Popup, { PopUpRef } from "@shopDunk/components/Popup";
import { LayoutChangeEvent, Platform, ScrollView } from "react-native";
import useKeyboardHeight from "@shopDunk/hooks/useKeyboardHeight";
import Input from "@shopDunk/components/TForm/Input";
import Typography from "@shopDunk/components/Typography";
import TForm from "@shopDunk/components/TForm";
import { Field, useForm } from "rc-field-form";
import Button from "@shopDunk/components/Button";
import COLORS from "@shopDunk/configs/theme/colors";
import i18n from "@shopDunk/utils/i18n";
import { validatePhone } from "@shopDunk/utils/validate";

export enum ForgotSignUp {
  FORGOT_PASSWORD = "FORGOT_PASSWORD",
  SIGNUP = "SIGNUP",
}

const SignIn: React.FC<OutsideScreenProps<ScreensName.SignIn>> = ({
  navigation,
}) => {
  // const navigation = useNavigation();
  const ref = React.useRef<PopUpRef>();
  const [form] = useForm();

  // scroll input
  const scrollRef = React.useRef<ScrollView | null>();
  const [extraSpace, setExtraSpace] = useState(0);
  const getName = React.useRef<string>("");
  const input = React.useRef<{ [key: string]: number }>({});

  const _scrollTo = (name: any) => () => {
    getName.current = name;
    if (Platform.OS === "ios") {
      setExtraSpace(400);
    } else {
    }
  };
  const inputRef = (name: string) => (e: LayoutChangeEvent) => {
    input.current = {
      [name]: e.nativeEvent.layout.y,
    };
  };

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
  const _createAccount = () => {
    navigation.navigate(ScreensName.OtpScreen);
  };

  return (
    <Box padding={[0, 32]} flex={1} margin={[80, 0, 0, 0]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        ref={(r) => (scrollRef.current = r)}
        contentContainerStyle={[{ paddingBottom: extraSpace }]}
      >
        <Box flex={1}>
          <Typography type="Body-4" textAlign="center" margin={[0, 0, 144, 0]}>
            {i18n.t("sign.in.phone.title")}
          </Typography>
          <TForm form={form} onFinish={_createAccount}>
            <Field
              name="phone"
              rules={[
                {
                  required: true,
                  message: i18n.t("sign.in.phone.required"),
                },
                validatePhone,
              ]}
            >
              {({ onChange, value }, meta) => {
                return (
                  <>
                    <Input
                      placeholder={i18n.t("sign.in.phone.enter")}
                      onChange={onChange}
                      meta={meta}
                      value={value}
                      containerOnLayout={inputRef("phone")}
                      onFocus={_scrollTo("phone")}
                      required
                      textAlign="center"
                      placeholderTextColor={COLORS.NEUTRAL_BLACK_UNACTIVE}
                      margin={[0, 0, 150, 0]}
                      keyboardType="number-pad"
                    />
                  </>
                );
              }}
            </Field>
          </TForm>
        </Box>
      </ScrollView>
      <Button label="Tiếp tục" onPress={form.submit} margin={[0, 0, 36, 0]} />
      <Box justify="center" align="center" flexDirection="row">
        <Typography
          type="Body-4"
          color="NEUTRAL_BLACK_UNACTIVE"
          margin={[0, 5, 0, 0]}
        >
          {i18n.t("sign.in.no.account")}
        </Typography>
        <Typography type="Title-1" color="ACTIVE_CTA">
          {i18n.t("sign.in.signup")}
        </Typography>
      </Box>
      <Popup ref={ref} />
    </Box>
  );
};

export default SignIn;
