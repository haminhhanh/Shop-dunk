import Box from '@shopDunk/components/Box';
import Icon from '@shopDunk/components/Icon';
import Typography from '@shopDunk/components/Typography';
import COLORS from '@shopDunk/configs/theme/colors';
import React, { useState } from 'react';
import DatePicker from 'react-native-date-picker';
import { defaultInput } from './styles';
import { DataPickerProps } from './types';
import dayjs from 'dayjs';

const DataPickerComponent: React.FC<DataPickerProps> = ({
  label,
  required,
  placeholder,
  onChange,
}) => {
  const newDate = new Date();
  const [opentCalender, setOpentCalender] = useState(false);
  const [date, setDate] = useState(newDate);

  return (
    <>
      <Box>
        <Box flexDirection="row">
          {label && (
            <Typography
              margin={[0, 0, 5, 0]}
              type="Caption - Regular"
              color="MONO_700"
            >
              {label}
            </Typography>
          )}
          {required ? (
            <Typography type="Body - Semibold" color="RED_500">
              {' '}
              *
            </Typography>
          ) : null}
        </Box>
        <Box style={defaultInput}>
          {date && date === newDate ? (
            <>
              <Typography type="Subheader - Regular" color="MONO_300">
                {placeholder}
              </Typography>
            </>
          ) : (
            <>
              <Typography type="Subheader - Regular">
                {dayjs(date).format('DD/MM/YYYY')}
              </Typography>
            </>
          )}
          <Box
            onPress={() => {
              setOpentCalender(true);
            }}
            activePress
            padding={[0, 10, 0, 0]}
          >
            <Icon name="calendar" size={24} color={COLORS.MONO_700} />
          </Box>
        </Box>
        <DatePicker
          modal
          mode="date"
          open={opentCalender}
          date={date}
          onConfirm={date => {
            setOpentCalender(false);
            setDate(date);
            onChange(date);
          }}
          onCancel={() => {
            setOpentCalender(false);
          }}
        />
      </Box>
    </>
  );
};

export default DataPickerComponent;
