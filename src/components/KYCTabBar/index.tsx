import { deviceWidth } from '@shopDunk/configs/theme/common';
import React from 'react';
import Box from '../Box';
import Typography from '../Typography';

const KYCTabBar: React.FC<any> = props => {
  const state = props.state;
  const descriptors = props.descriptors;
  const navigation = props.navigation;

  return (
    <Box
      padding={[24, 0, 0, 0]}
      flexDirection="row"
      justify="space-between"
      background="WHITE"
    >
      {state.routes.map((route: any, index: number) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <Box
            key={`key-${index}`}
            align="center"
            activePress
            onPress={onPress}
          >
            <Typography
              type="Body - Medium"
              color={isFocused ? 'BRAND' : 'BG_600'}
            >
              {label}
            </Typography>
            {isFocused ? (
              <Box
                margin={[10, 0, 0, 0]}
                height={2}
                width={deviceWidth / 3}
                background="BLUE_400"
              />
            ) : (
              <Box
                margin={[10, 0, 0, 0]}
                height={2}
                width={deviceWidth / 3}
                background="BG_100"
              />
            )}
          </Box>
        );
      })}
    </Box>
  );
};

export default KYCTabBar;
