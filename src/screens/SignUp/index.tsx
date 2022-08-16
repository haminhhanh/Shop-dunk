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
import i18n from "@shopDunk/utils/i18n";
import { validatePhone } from "@shopDunk/utils/validate";
import Select from "@shopDunk/components/TForm/Select";

export enum ForgotSignUp {
  FORGOT_PASSWORD = "FORGOT_PASSWORD",
  SIGNUP = "SIGNUP",
}

const SignUp: React.FC<OutsideScreenProps<ScreensName.SignIn>> = ({
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

  // select gender

  const listGender = [
    {
      value: "male",
      label: i18n.t("male"),
    },
    {
      value: "female",
      label: i18n.t("female"),
    },
    {
      value: "gender_3",
      label: i18n.t("gender_3"),
    },
  ];

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
  };

  return (
    <Box padding={[0, 32]} flex={1}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        ref={(r) => (scrollRef.current = r)}
      >
        <Typography type="Body-4" textAlign="center" margin={[0, 0, 27, 0]}>
          {i18n.t("sign_up_title")}
        </Typography>
        <Box margin={[0, 0, 131, 0]}>
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
                      keyboardType="number-pad"
                      label={i18n.t("phone")}
                    />
                  </>
                );
              }}
            </Field>
            <Field
              name="name"
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
                      placeholder={i18n.t("name")}
                      onChange={onChange}
                      meta={meta}
                      value={value}
                      containerOnLayout={inputRef("name")}
                      onFocus={_scrollTo("name")}
                      required
                      label={i18n.t("enter_phone")}
                    />
                  </>
                );
              }}
            </Field>
            <Field
              name="gender"
              rules={[
                {
                  required: true,
                  message: i18n.t("sign.in.phone.required"),
                },
              ]}
            >
              {({ onChange, value }, meta) => {
                return (
                  <>
                    <Select
                      options={listGender}
                      label={i18n.t("gender")}
                      required
                      placeholder={i18n.t("please_enter")}
                      meta={meta}
                      onPress
                      value={value}
                      onChange={onChange}
                    />
                  </>
                );
              }}
            </Field>
          </TForm>
        </Box>
       
        <Box margin={[0, 0, 20, 0]}>
          <Typography
            type="Body-1"
            color="NEUTRAL_BLACK_UNACTIVE"
            margin={[0, 5, 0, 0]}
          >
            Bằng việc tiếp tục, bạn đã đồng ý với
            <Typography type="Body-1" color="ACTIVE_CTA" margin={[0, 5, 0, 0]}>
              Điều khoản & Điều kiện
            </Typography>
            ,
            <Typography type="Body-1" color="ACTIVE_CTA" margin={[0, 5, 0, 0]}>
              Chính sách bảo mật và chia sẻ thông tin
            </Typography>
            của ShopDunk
          </Typography>
        </Box>
      </ScrollView>

      <Button label="Tiếp tục" onPress={form.submit} margin={[0, 0, 36, 0]} />

      <Popup ref={ref} />
    </Box>
  );
};

export default SignUp;
