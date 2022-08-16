import React from 'react';
import { StyleSheet } from 'react-native';
import Box from '../Box';
import LogoHeaderLeft from '../LogoHeaderLeft';
import HeaderLeftBack from '../HeaderLeftBack';

const NavBar: React.FC<any> = () => {
  return (
    <Box style={styles.boxContent}>
      <HeaderLeftBack marginBottom={0} />
      <Box onPress={() => {}} style={styles.logo}>
        <LogoHeaderLeft />
      </Box>
    </Box>
  );
};

export default NavBar;

const styles = StyleSheet.create({
  boxContent: {
    position: 'relative',
    marginTop: 80,
    marginBottom: 120,
  },
  logo: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
});
