import React from 'react';
import {ActivityIndicator, View} from 'react-native';
import { useTheme } from 'react-native-paper';

const SplashScreen = () => {
  const theme = useTheme()
  return (
    <View
      style={{flex: 1, justifyContent: 'center', backgroundColor: theme.colors.primary}}>
      <ActivityIndicator size="large" color={theme.colors.onPrimary} />
    </View>
  );
};

export default SplashScreen;