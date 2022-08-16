import React, { useCallback } from 'react';
import Box from '@shopDunk/components/Box';
import Typography from '@shopDunk/components/Typography';
import { launchImageLibrary } from 'react-native-image-picker';
import Icon from '@shopDunk/components/Icon';
// import { Camera } from 'react-native-vision-camera';
import { Linking } from 'react-native';
import COLORS from '@shopDunk/configs/theme/colors';

const SelectItem: React.FC<any> = ({
  option,
  onChange,
  icon,
  type,
  setState,
  imageApi,
  onPress,
  value,
}) => {
  const _openLibrary = async () => {
    try {
      const { assets } = await launchImageLibrary({
        mediaType: 'photo',
        includeBase64: false,
        selectionLimit: 1,
        maxWidth: 1024,
        maxHeight: 1024,
      });
      onChange && assets && onChange(assets[0]);
    } catch (e) {}
  };
  const _handlePress = useCallback(() => {
    Linking.openSettings();
  }, []);

  const handlePress = async () => {
    if (!type) {
      await onChange(option);
    } else {
      if (option.value === 'image_upload') {
        await _openLibrary();
      }
      //  else {
      //   const cameraPecrmission = await Camera.getCameraPermissionStatus();
      //   const newCameraPermission = await Camera.requestCameraPermission();
      //   if (newCameraPermission === 'denied') {
      //     _handlePress();
      //   }

      //   if (
      //     cameraPecrmission === 'authorized' ||
      //     newCameraPermission === 'authorized'
      //   ) {
      //     onPress(type);
      //   }
      // }
    }
    setState({ visible: false });
  };
  return (
    <Box
      activePress
      onPress={handlePress}
      flexDirection="row"
      align="center"
      justify={icon ? 'flex-start' : 'space-between'}
      padding={[12, 16]}
    >
      {icon && <Icon name={option.value} size={25} />}
      <Typography type='Title-1' color='NEUTRAL_BLACK_UNACTIVE'>{option && option.label}</Typography>
      {value === option.value && (
        <Icon name="check_circle" size={18} color={COLORS.ACTIVE_YES} />
      )}
    </Box>
  );
};

export default SelectItem;
