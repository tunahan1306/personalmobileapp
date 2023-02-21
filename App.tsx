import React from 'react'
import { StatusBar } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import 'react-native-gesture-handler';
import Navigation from './src/components/Navigation'
import {AuthProvider} from './src/contexts/AuthContext';
import { Provider as PaperProvider , useTheme} from 'react-native-paper';

const App = () => {

  const theme = useTheme()
  return (
    <AuthProvider>
      <PaperProvider>
        <StatusBar backgroundColor={theme.colors.primary} />
        <NavigationContainer>
          <Navigation />
        </NavigationContainer>
      </PaperProvider>
      
    </AuthProvider>
    
  )
}

export default App
