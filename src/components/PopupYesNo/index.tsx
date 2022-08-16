import React, { useImperativeHandle, useState } from 'react';
import { Modal, StyleSheet } from 'react-native';
import Box from '../Box';
import Typography from '../Typography';
import Icon from '../Icon';
import Button from '../Button';
import COLORS from '@shopDunk/configs/theme/colors';
import i18n from '@shopDunk/utils/i18n';
import { deviceWidth } from '@shopDunk/configs/theme/common';

type PopupState = {
  visible: boolean;
  onPress?: any;
  label?: string;
  description?: string;
};

export type PopUpYesNoRef =
  | {
      open: (onPress?: any, label?: string, description?: string) => void;
      dismiss: () => void;
    }
  | undefined;

interface PopupProps {}

const PopupYesNo = React.forwardRef<PopUpYesNoRef, PopupProps>(({}, ref) => {
  const [state, setState] = useState<PopupState>({
    visible: false,
    onPress: () => undefined,
    label: '',
    description: '',
  });

  const open = (onPress?: any, label?: string, description?: string) => {
    setState({
      visible: true,
      onPress: onPress,
      label: label,
      description: description,
    });
  };

  const dismiss = () => {
    setState({
      visible: false,
      onPress: undefined,
      label: '',
      description: '',
    });
  };
  useImperativeHandle(ref, () => ({ open, dismiss }));

  const yesOption = () => {
    state.onPress();
    setState({
      visible: false,
    });
  };

  return (
    <Modal transparent={true} visible={state.visible}>
      <Box style={styles.container}>
        <Box style={styles.defaultBox}>
          <Typography type="Body - Semibold">{state.label}</Typography>
          <Box style={styles.closeButton} activePress onPress={dismiss}>
            <Icon name="fail_full_circle" color={COLORS.BG_200} size={20} />
          </Box>
          <Box margin={[20, 0, 0, 0]} flexDirection="row" align="center">
            <Box
              margin={[0, 20, 0, 0]}
              padding={[8, 0, 8, 0]}
              width={(deviceWidth - 120) / 2}
              style={styles.noBox}
              align="center"
              justify="center"
              activePress
              onPress={dismiss}
            >
              <Typography type="Body - Semibold">{i18n.t('no')}</Typography>
            </Box>
            <Box
              padding={[8, 0, 8, 0]}
              width={(deviceWidth - 120) / 2}
              style={styles.yesBox}
              align="center"
              justify="center"
              activePress
              onPress={yesOption}
            >
              <Typography type="Body - Semibold" color="WHITE">
                {i18n.t('yes')}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
});
export default PopupYesNo;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    alignSelf: 'center',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  defaultBox: {
    backgroundColor: '#fff',
    padding: 25,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWith: 2,
    borderColor: COLORS.NEUTRAL_400,
  },
  closeButton: {
    position: 'absolute',
    top: 6,
    right: 10,
  },
  noBox: {
    borderWidth: 1,
    borderRadius: 20,
    borderColor: COLORS.BRAND,
  },
  yesBox: {
    borderWidth: 1,
    borderRadius: 20,
    backgroundColor: COLORS.BRAND,
  },
});
