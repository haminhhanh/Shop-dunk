import { deviceWidth } from '@shopDunk/configs/theme/common';
import i18n from '@shopDunk/utils/i18n';
import { Field, useForm } from 'rc-field-form';
import React from 'react';
import Box from '../Box';
import TForm from '../TForm';
import Input from '../TForm/Input';
import Typography from '../Typography';

const PromoTabBar: React.FC<any> = props => {
  const state = props.state;
  const descriptors = props.descriptors;
  const navigation = props.navigation;
  const [form] = useForm();
  return (
    <Box background="WHITE" padding={[24, 30, 0, 30]}>
      <TForm form={form}>
        <Field name="money">
          {({ onChange, value }, meta) => {
            return (
              <Input
                onChange={onChange}
                meta={meta}
                value={value}
                placeholder={i18n.t('promo_placeholder')}
                allowClear
              />
            );
          }}
        </Field>
      </TForm>
      <Box padding={[12, 0, 12, 0]} flexDirection="row">
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
              margin={[0, 40, 0, 25]}
              align="center"
              activePress
              onPress={onPress}
            >
              <Typography
                type="Subheader - Regular"
                color={isFocused ? 'BRAND' : 'BG_600'}
              >
                {label}
              </Typography>
              <Box />
            </Box>
          );
        })}
      </Box>
      <Box flexDirection="row">
        {state.routes.map((route: any, index: number) => {
          const isFocused = state.index === index;

          return (
            <Box key={`key-${index}`}>
              {isFocused ? (
                <Box
                  height={2}
                  width={deviceWidth / 2 - 30}
                  background="BRAND"
                />
              ) : (
                <Box
                  height={2}
                  width={deviceWidth / 2 - 30}
                  background="BG_200"
                />
              )}
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default PromoTabBar;
