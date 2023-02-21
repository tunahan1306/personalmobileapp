import { StyleSheet, View } from 'react-native'
import React, {createContext, useContext} from 'react';

import {
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerContent,
    DrawerItemList,
    DrawerItem,
  } from '@react-navigation/drawer';
  import { Appbar ,  Button, Dialog, Portal, Provider, 
    Avatar,
    Title,
    Caption,
    Paragraph,
    Drawer,
    Text,
    TouchableRipple,
    Switch,
    IconButton,
    MD3Colors,
    useTheme
  } from 'react-native-paper';
  import { AuthContext } from '../contexts/AuthContext';

  
  

const CustomDrawer = (props ) => {

  const theme = useTheme()
    
  const {userInfo, isLoading, logout} = useContext(AuthContext);

  const [isSwitchOn, setIsSwitchOn] = React.useState(false);

  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);

  const [visible, setVisible] = React.useState(false);


  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.drawerContent}>
      <Button
    mode='text'
    icon="close"
    iconColor={MD3Colors.error50}
    size={50}
    style={{borderRadius:0,alignItems:'flex-end'}}
    onPress={() => props.navigation.closeDrawer()}
  />
        <View style={styles.userInfoSection}>
            <Avatar.Icon size={50} icon="account" color='black' style={{backgroundColor:'transparent'
            ,margin:0,padding:0}}/>
            <Title style={styles.title}>{userInfo.user.name}</Title>
        </View>

      <Button icon="logout" mode="contained" buttonColor={theme.colors.error} style={{marginHorizontal:10,marginTop:30}} onPress={showDialog} >
        Çıkış Yap
        </Button>

        <Portal>
          <Dialog visible={visible} onDismiss={hideDialog}>
            <Dialog.Icon icon="alert" />
            <Dialog.Content style={{textAlign:'center',marginTop:15,}}>
              <Text>Çıkış yapmak istediğinize emin misiniz?</Text>   
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={hideDialog}>İptal</Button>
              <Button onPress={logout}>Çıkış Yap</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
      
    </DrawerContentScrollView>
  )
}

export default CustomDrawer

const styles = StyleSheet.create({
    drawerContent: {
        flex: 1,
      },
      userInfoSection: {
        paddingLeft: 20,
        alignItems: 'center',
      },
      title: {
        fontWeight: 'bold',
        textAlign:'center',
        marginTop:5,
      },
      preference: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16,
        alignItems: 'center',
      },
})