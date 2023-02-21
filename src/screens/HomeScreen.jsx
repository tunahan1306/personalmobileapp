import { StyleSheet , View , SafeAreaView , ScrollView} from 'react-native'
import React, {useContext , useRef, useState} from 'react';
import { Appbar ,  Button, Dialog, Portal, Provider, 
  Avatar,
  Title,
  Caption,
  Paragraph,
  Drawer,
  Card,
  Text,
  TouchableRipple,
  Switch,
  useTheme
} from 'react-native-paper';
  import { AuthContext } from '../contexts/AuthContext';
  import Ionicons from 'react-native-vector-icons/Ionicons';
  import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
  import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const HomeScreen = ({navigation}) => {

  const {userInfo, isLoading, logout} = useContext(AuthContext);

  const [lighttheme , setLighttheme] = useState(true)

  const changeTheme = () => {
    if(lighttheme){
      setLighttheme(false)
    }else{
      setLighttheme(true)
    }
  }

  const theme = useTheme();

  return (
    <SafeAreaView style={styles.container}>
      <Appbar.Header statusBarHeight={1} style={{shadowOffset:{width:12,height:12} , width:'100%'}}>
        <Appbar.Action icon="menu"  onPress={() => navigation.openDrawer()}/>
        <Appbar.Content title="tunahancakir.com" titleStyle={{fontSize:15,fontWeight:"bold",textAlign:'center'}} />
        <Appbar.Action icon={lighttheme ? "weather-sunny": "weather-night"}  onPress={changeTheme}/>
      </Appbar.Header>

      <ScrollView style={styles.wrapper}>
        <Text style={{textAlign:'center',fontSize:25,fontWeight:'bold',marginTop:15,color:'black'}}>{userInfo.user.name}</Text>
        <Text style={{textAlign:'center',fontSize:13,fontWeight:'normal',marginBottom:15,color: theme.colors.primary}}>Admin</Text>
        <View
          style={{
            borderBottomColor: 'blue',
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        />
        <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap'}}>
        <TouchableRipple
            onPress={() => navigation.navigate('AnaSayfa')}
            rippleColor="rgba(0, 0, 0, .32)"
            style={{ width: '50%',borderWidth: 1,
            borderColor: "gray",
            shadowColor: '#000',
              shadowOffset: { width: 2, height: 2 },
              shadowOpacity: 0.8,
              shadowRadius: 1, 
            borderRadius: 2,padding:2 , marginTop:1 }}
          >
            <View style={{textAlign:'center',paddingVertical:50,alignItems: 'center',}}>
              <Ionicons name='home' style={{ color: theme.colors.primary , fontSize: 20 }}/>
              <Text style={{ color: theme.colors.primary }}>Ana Sayfa</Text>
            </View>
            
          </TouchableRipple>
        <TouchableRipple
            onPress={() => navigation.navigate('Hakkinda')}
            rippleColor="rgba(0, 0, 0, .32)"
            style={{ width: '50%',borderWidth: 1,
            borderColor: "gray",
            borderRadius: 2,padding:2 , marginTop:1}}
          >
            <View style={{textAlign:'center',paddingVertical:50,alignItems: 'center',}}>
              <FontAwesome5 name='user-cog' style={{ color: theme.colors.primary , fontSize: 20 }}/>
              <Text style={{ color: theme.colors.primary }}>Hakkında</Text>
            </View>
            
          </TouchableRipple>
          <TouchableRipple
           onPress={() => navigation.navigate('Iletisim')}
            rippleColor="rgba(0, 0, 0, .32)"
            style={{ width: '50%',borderWidth: 1,
            borderColor: "gray",
            shadowColor: '#000',
              shadowOffset: { width: 2, height: 2 },
              shadowOpacity: 0.8,
              shadowRadius: 1, 
            borderRadius: 2,padding:2 , marginTop:1 }}
          >
            <View style={{textAlign:'center',paddingVertical:50,alignItems: 'center',}}>
              <MaterialIcons name='contacts' style={{ color: theme.colors.primary , fontSize: 20 }}/>
              <Text style={{ color: theme.colors.primary }}>İletişim</Text>
            </View>
            
          </TouchableRipple>
          <TouchableRipple
            onPress={() => navigation.navigate('Deneyim')}
            rippleColor="rgba(0, 0, 0, .32)"
            style={{ width: '50%',borderWidth: 1,
            borderColor: "gray",
            shadowColor: '#000',
              shadowOffset: { width: 2, height: 2 },
              shadowOpacity: 0.8,
              shadowRadius: 1, 
            borderRadius: 2,padding:2 , marginTop:1 }}
          >
            <View style={{textAlign:'center',paddingVertical:50,alignItems: 'center',}}>
              <FontAwesome5 name='laptop-code' style={{ color: theme.colors.primary , fontSize: 20 }}/>
              <Text style={{ color: theme.colors.primary }}>Deneyim</Text>
            </View>
            
          </TouchableRipple>
          
          <TouchableRipple
            onPress={() => navigation.navigate('Beceri')}
            rippleColor="rgba(0, 0, 0, .32)"
            style={{ width: '50%',borderWidth: 1,
            borderColor: "gray",
            shadowColor: '#000',
              shadowOffset: { width: 2, height: 2 },
              shadowOpacity: 0.8,
              shadowRadius: 1, 
            borderRadius: 2,padding:2 , marginTop:1 }}
          >
            <View style={{textAlign:'center',paddingVertical:50,alignItems: 'center',}}>
              <Ionicons name='information-circle' style={{ color: theme.colors.primary , fontSize: 20 }}/>
              <Text style={{ color: theme.colors.primary }}>Beceriler</Text>
            </View>
            
          </TouchableRipple>

          <TouchableRipple
            onPress={() => navigation.navigate('Projeler')}
            rippleColor="rgba(0, 0, 0, .32)"
            style={{ width: '50%',borderWidth: 1,
            borderColor: "gray",
            shadowColor: '#000',
              shadowOffset: { width: 2, height: 2 },
              shadowOpacity: 0.8,
              shadowRadius: 1, 
            borderRadius: 2,padding:2 , marginTop:1 }}
          >
            <View style={{textAlign:'center',paddingVertical:50,alignItems: 'center',}}>
              <Ionicons name='file-tray-full' style={{ color: theme.colors.primary , fontSize: 20 }}/>
              <Text style={{ color: theme.colors.primary }}>Projeler</Text>
            </View>
            
          </TouchableRipple>

          <TouchableRipple
            onPress={() => navigation.navigate('Mesaj')}
            rippleColor="rgba(0, 0, 0, .32)"
            style={{ width: '50%',borderWidth: 1,
            borderColor: "gray",
            shadowColor: '#000',
              shadowOffset: { width: 2, height: 2 },
              shadowOpacity: 0.8,
              shadowRadius: 1, 
            borderRadius: 2,padding:2 , marginTop:1 }}
          >
            <View style={{textAlign:'center',paddingVertical:50,alignItems: 'center',}}>
              <MaterialIcons name='message' style={{ color: theme.colors.primary , fontSize: 20 }}/>
              <Text style={{ color: theme.colors.primary }}>Mesajlar</Text>
            </View>
            
          </TouchableRipple>
        </View>
    
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  wrapper: {
    width: '100%',
    marginVertical:5,
    padding:5,
  },
  welcome: {
    fontSize: 18,
    marginBottom: 8,
  },
  navigationContainer: {
    backgroundColor: '#ecf0f1',
  },
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    marginTop: 20,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});

export default HomeScreen
