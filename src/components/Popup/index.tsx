import React, { useImperativeHandle, useState } from 'react';
import { Modal } from 'react-native';
import Box from '../Box';
import Typography from '../Typography';
import { container, defaultBox } from './styles';
import Icon from '../Icon';
import Button from '../Button';
import COLORS from '@shopDunk/configs/theme/colors';
import i18n from '@shopDunk/utils/i18n';
import { IconType } from '../Icon/type';
import { StackActions, useNavigation } from '@react-navigation/native';

type PopupState = {
  visible: boolean;
  icon?: IconType;
  label?: string;
  color?: COLORS;
  toScreen?: string;
  popToTop?: boolean;
  goBack?: boolean;
  notification?: string;
};

export type PopUpRef =
  | {
      success: (
        success_message?: string,
        label?: string,
        goBack?: boolean,
        screenName?: string,
        popToTop?: boolean,
      ) => void;
      error: (
        error_message?: string,
        label?: string,
        screenName?: string,
        popToTop?: boolean,
      ) => void;
      dismiss: () => void;
    }
  | undefined;

interface PopupProps {}

const Popup = React.forwardRef<PopUpRef, PopupProps>(({}, ref) => {
  const navigation = useNavigation();
  const [state, setState] = useState<PopupState>({
    visible: false,
    icon: undefined,
    label: undefined,
    color: undefined,
    toScreen: undefined,
    popToTop: false,
    notification: undefined,
  });

  const error = (
    error_message?: string,
    label?: string,
    screenName?: string,
    popToTop?: boolean,
  ) => {
    setState({
      visible: true,
      icon: 'error',
      label: label,
      color: COLORS.RED_500,
      toScreen: screenName,
      popToTop: popToTop,
      notification: error_message ? error_message : undefined,
    });
  };
  const success = (
    success_message?: string,
    label?: string,
    goBack?: boolean,
    screenName?: string,
    popToTop?: boolean,
  ) => {
    setState({
      visible: true,
      icon: 'check_full_circle',
      label: label,
      color: COLORS.GREEN_500,
      toScreen: screenName,
      popToTop: popToTop,
      goBack: goBack,
      notification: success_message ? success_message : undefined,
    });
  };

  const dismiss = () => {
    setState({
      visible: false,
      icon: undefined,
      label: undefined,
      color: undefined,
    });
    if (state.toScreen) {
      if (state.popToTop === true) {
        navigation.dispatch(StackActions.popToTop());
      }

      // @ts-ignore ignore this for now but need to be fix later
      navigation.navigate(state.toScreen);
    }
    if (state.goBack) {
      navigation.goBack();
    }
  };

  useImperativeHandle(ref, () => ({ error, success, dismiss }));

  return (
    <Modal transparent={true} visible={state.visible}>
      <Box style={container}>
        <Box style={[defaultBox]}>
          {state?.icon && (
            <Icon name={state.icon} size={26} color={state.color} />
          )}
          <Typography
            textAlign="center"
            type="Body - Regular"
            margin={[12, 0, 12, 0]}
            color="NEUTRAL_900"
          >
            {state.label}
          </Typography>

          {state?.notification && (
            <Typography
              textAlign="center"
              type="Caption - Regular"
              margin={[12, 0, 12, 0]}
              color="MONO_700"
            >
              {state?.notification}
            </Typography>
          )}
          {(state?.toScreen || state?.goBack) && (
            <Button
              width={285}
              type="ghost"
              background="BRAND_400"
              label={i18n.t('next')}
              onPress={dismiss}
            />
          )}
          {!state?.toScreen && !state?.goBack && (
            <Button
              width={285}
              background="PRIMARY_200"
              label={i18n.t('close')}
              onPress={dismiss}
              textColor="BRAND"
            />
          )}
        </Box>
      </Box>
    </Modal>
  );
});
export default Popup;
