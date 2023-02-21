import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from '../screens/HomeScreen';
import CustomDrawer from '../components/CustomDrawer';

const Drawer = createDrawerNavigator();

import MainStackNavigator from '../navigations/mainStackNavigator';

function MyDrawer() {
  return (
    <Drawer.Navigator drawerContent={props => <CustomDrawer {...props} />}>
      <Drawer.Screen
        name="Stack"
        component={MainStackNavigator}
        options={{ headerShown:false }}
      />
    </Drawer.Navigator>
  );
}

export default MyDrawer