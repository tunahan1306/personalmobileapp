import React, {useContext} from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MyDrawer from '../navigations/myDrawer';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import {AuthContext} from '../contexts/AuthContext';
import SplashScreen from '../screens/SplashScreen';


const Stack = createNativeStackNavigator();

const Navigation = () => {

  const {userInfo, splashLoading} = useContext(AuthContext);

  return (
    <Stack.Navigator>
      {splashLoading ? (
          <Stack.Screen
            name="Splash Screen"
            component={SplashScreen}
            options={{headerShown: false}}
          />
        ) : userInfo.access_token ? (
          <>
             <Stack.Screen name="Drawer" component={MyDrawer}  options={{ headerShown:false }}/>
          </>
        ) :
        (
          <>
            <Stack.Screen name="Login" component={LoginScreen}  options={{ headerShown:false }} />
            <Stack.Screen name="Register" component={RegisterScreen} options={{headerShown: false}} />
          </>
        )}
        
        
      </Stack.Navigator>
  )
}

export default Navigation
