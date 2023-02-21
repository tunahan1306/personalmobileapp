import React, {useContext, useState} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {AuthContext} from '../contexts/AuthContext';
import { TextInput , Button , useTheme} from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';


const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const {isLoading, login} = useContext(AuthContext);

  const theme = useTheme()

  return (
    <>
     <View style={styles.container}>
      <Spinner visible={isLoading} />
      <View style={styles.wrapper}>
        <Text style={styles.maintext}>tunahancakir.com</Text>
        <Text style={{
    textAlign:'center',
    color:theme.colors.primary,
    fontSize:14,
    }}>Admin Panel</Text>
      <TextInput
          mode="outlined"
          label="Email"
          value={email}
          onChangeText={text => setEmail(text)}
        />

        <TextInput
          mode="outlined"
          label="Şifre Giriniz"
          value={password}
          right={<Ionicons name='eye' style={{ color: 'red' , fontSize: 12 }}/>}
          onChangeText={text => setPassword(text)}
          secureTextEntry
        />

        <Button 
          mode="contained-tonal"
          textColor='white'
          style={{
            marginTop: 5,
            backgroundColor: theme.colors.primary,
          }}
          onPress={() => {
            login(email, password);
          }}
        > Giriş Yap
          </Button>

        
      </View>
    </View>
    </>
   
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'white'
  },
  wrapper: {
    width: '80%',
  },
  input: {
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#bbb',
    borderRadius: 5,
    paddingHorizontal: 14,
  },
  link: {
    color: 'blue',
  },
  button:{
    marginTop: 5,
    backgroundColor: 'blue',
  },
  maintext:{
    fontSize:25,
    fontWeight: 'bold',
    textAlign:'center',
    color:'black',
    textShadowOffset:{
      width:12,
      height:12
    },
    textDecorationStyle:'solid',
  },
  alttext:{
    textAlign:'center',
    color:'blue',
    fontSize:14,
    
  },
  submit:{ 
    color: 'red' , 
    fontSize: 14 , 
   marginEnd:25,
  }
});

export default LoginScreen;