import React, {useContext , useEffect , useState} from 'react';
import axios from 'axios';
import {
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Linking,
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { BASE_URL } from '../config';
import { List, MD3Colors , useTheme ,  Modal, Portal, Text, Button, } from 'react-native-paper';

const MesajlarScreen = ({navigation}) => {

  const [post, setPost] = useState(null)

  const [visible, setVisible] =  useState(false);

  const [name , setName] = useState('')

  const [email , setEmail] = useState('')

  const [message , setMessage] = useState('')

  const theme = useTheme()

  const oku = (event , id) =>{
    console.log(id);

    Object.keys(post).map(function(item,i){
      post[item].map(function(tex,t){
        if(tex.id === id){
          setName(tex.name)
          setEmail(tex.email)
          setMessage(tex.message)
          setVisible(true)
        }
      })
    })
  } 

  const postoku = (event , id) =>{
    console.log(id);

    axios.post(`${BASE_URL}/read_messages`,{
      id:id,
      read:1,
    }).then((response) => {
      console.log(response)

      setPost(response.data.messages)

    }).catch(function(error) {
     console.log(error)
      });

    Object.keys(post).map(function(item,i){
      post[item].map(function(tex,t){
        if(tex.id === id){
          setName(tex.name)
          setEmail(tex.email)
          setMessage(tex.message)
          setVisible(true)
        }
      })
    })

  } 

  const mailat = () => {

    Linking.openURL(`mailto:` + email)

  }

  useEffect(() => {
    axios.get(`${BASE_URL}/get_messages`).then((response) => {

      console.log(Object.keys(response.data.messages).length)

      Object.keys(response.data.messages).map(function(item,i){
        console.log(item)
      })

      setPost(response.data.messages);
    }).catch(function(error) {
      console.log('Hata: ' + error.message);
      });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {
        !post ? (
          <Spinner visible={true} />
        ) :(
          <ScrollView style={styles.wrapper}>
            
            <List.Section>
            {
                Object.keys(post).map(function(item,i){
                  const myArray = item.split(" ");
                  let text = '';
                  if(myArray[1] === 'Jan'){
                    text = myArray[0] + ' Ocak ' + myArray[2];
                  }else if(myArray[1] === 'Feb'){
                    text = myArray[0] + ' Şubat ' + myArray[2];
                  }else if(myArray[1] === 'Mar'){
                    text = myArray[0] + ' Mart ' + myArray[2];
                  }else if(myArray[1] === 'Apr'){
                    text = myArray[0] + ' Nisan ' + myArray[2];
                  }else if(myArray[1] === 'May'){
                    text = myArray[0] + ' Mayıs ' + myArray[2];
                  }else if(myArray[1] === 'Jun'){
                    text = myArray[0] + ' Haziran ' + myArray[2];
                  }else if(myArray[1] === 'Jul'){
                    text = myArray[0] + ' Temmuz ' + myArray[2];
                  }else if(myArray[1] === 'Aug'){
                    text = myArray[0] + ' Ağustos ' + myArray[2];
                  }else if(myArray[1] === 'Sep'){
                    text = myArray[0] + ' Eylül ' + myArray[2];
                  }else if(myArray[1] === 'Oct'){
                    text = myArray[0] + ' Ekim ' + myArray[2];
                  }else if(myArray[1] === 'Nov'){
                    text = myArray[0] + ' Kasım ' + myArray[2];
                  }else if(myArray[1] === 'Dec'){
                    text = myArray[0] + ' Aralık ' + myArray[2];
                  }

                  return <View key={'tarih' + i}>
                      <Text style={{backgroundColor:theme.colors.secondary , 
                      color:theme.colors.onSecondary , 
                      paddingVertical:3 , textAlign:'center'}}>{text}
                    </Text>
                    {
                      post[item].map(function(tex,t){
                        return ( tex.read === '1' ? <List.Item
                          key={'read' + tex.id}
                          title={tex.name}
                          titleStyle={{fontWeight:'bold'}}
                          description={tex.message}
                          left={props => <List.Icon {...props} icon="email-newsletter" style={{justifyContent:'center'}}/>}
                          onPress={(event) => oku(event,tex.id)}
                          />: 
                          <List.Item
                            key={'unread' + tex.id}
                            title={tex.name}
                            titleStyle={{fontWeight:'bold'}}
                            description={tex.message}
                            left={props => <List.Icon {...props} icon="email" style={{justifyContent:'center'}}/>}
                            right={props => <List.Icon {...props} icon="exclamation" color={theme.colors.onSecondary} style={{justifyContent:'center' , backgroundColor:theme.colors.error , borderRadius:2 , height:25 , width:25 , marginTop:10 ,borderRadius:100 }}/>}
                            onPress={(event) => postoku(event,tex.id)}
                      />) 
                      })
                    }
                    
                    
                  </View>
                })
            }
              
              
              
            </List.Section>

            <Portal>
              <Modal visible={visible} onDismiss={() => {setVisible(false)}} contentContainerStyle={{marginHorizontal:20 , 
                                      marginVertical:50 , backgroundColor:'white' , 
                                      borderRadius:10 , shadowOffset:2 , shadowColor:'black' , 
                                      justifyContent:'flex-start',paddingHorizontal:10
                                      }}>
                <Text style={{textAlign:'center',paddingTop:10,fontSize:18,fontWeight:'bold'}}>{name}</Text>
                <Text style={{textAlign:'center',paddingBottom:10}}>{email}</Text>
                <View
                  style={{
                    borderBottomColor: 'black',
                    borderBottomWidth: StyleSheet.hairlineWidth,
                  }}
                />
                <Text style={{fontSize:18,paddingVertical:10}}>{'    ' + message}</Text>
                <View style={{flexDirection:'row-reverse'}}>
                    <Button icon="close" mode='text' onPress={() => setVisible(false)} style={{marginHorizontal:5 , marginVertical:10}}>
                      İptal
                    </Button>
                    <Button icon="email-send" mode='contained' onPress={mailat} 
                    style={{marginHorizontal:5 , marginVertical:10}}
                    >
                      Mail Gönder
                    </Button>
                </View>
              </Modal>
            </Portal>
            
          </ScrollView>
        )
      }
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    width: '100%',
    padding:5,
  },
});

export default MesajlarScreen;