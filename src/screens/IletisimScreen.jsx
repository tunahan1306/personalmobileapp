import React, {useContext, useState , useEffect} from 'react';
import Toast from 'react-native-toast-message';
import {
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  StatusBar,
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { BASE_URL } from '../config';
import { Card, Modal, Portal, Text, Button, Provider , Avatar ,TextInput , Dialog , Snackbar} from 'react-native-paper';
import axios from 'axios';
import {Picker} from '@react-native-picker/picker';

const LeftContent = props => <Avatar.Icon {...props} icon="link" />

const IletisimScreen = () => {

  const [post, setPost] = useState(null)

  const [visible, setVisible] = useState(false);

  const [silvisible, setSilvisible] = useState(false);

  const [eklevisible, setEvisible] = useState(false);

  const [siluyari , setSiluyari] = useState('')

  const [duzenleplatformtext , setDuzenleplatformtext] = useState('')

  const [duzenleicontext , setDuzenleicontext] = useState('')

  const [duzenlecontenttext , setDuzenlecontenttext] = useState('')

  const [selectedValue, setSelectedValue] = useState();

  const [platformtext , setPlatformtext] = useState('')

  const [icontext , setIcontext] = useState('')

  const [contenttext , setContenttext] = useState('')

  const [ekleselectedValue, setEkleselectedValue] = useState();

  const [silid , setSilid] = useState()

  const [duzeltid , setDuzeltid] = useState()

  const [buttonloading ,setButtonloading] = useState(false)

  const duzenle = (event , id) =>{

    setDuzeltid(id)
    
    if(post){
      post.map(function(item,i){
        if(item.id === id){
          setDuzenlecontenttext(item.content)
          setDuzenleicontext(item.ikon)
          setDuzenleplatformtext(item.platform)
          setSelectedValue(item.color)
        }
      })

      setVisible(true)
    }
  }

  const sil = (event , id) =>{

    console.log(id)

    setSilid(id)

    if(post){
      post.map(function(item,i){
        if(item.id === id){
          setSiluyari(item.platform + ' silmek istediğinize emin misiniz?')
        }
      })

      setSilvisible(true)
    }
  }

  const eklemodal = () => {
    setContenttext('')
    setPlatformtext('')
    setIcontext('')
    setEkleselectedValue('gray')
    setEvisible(true)
  }

  const eklekaydetmodal = () => {
    setButtonloading(true)
    axios.post(`${BASE_URL}/set_contact`,{
      platform:platformtext,
      ikon:icontext,
      color: ekleselectedValue,
      content:'',
    }).then((response) => {
      console.log(response)

      setButtonloading(false)

      setPost(response.data.contact)

      setEvisible(false)

      Toast.show({
        type: 'success',
        text1: 'Yeni link eklendi',
      });
    }).catch(function(error) {
      console.log('Hata: ' + error.message);
      setButtonloading(false)
      setEvisible(false)
      Toast.show({
        type: 'error',
        text1: 'Hata',
      });
      });
  }

  const duzenlekaydetmodal = () => {
    setButtonloading(true)
    axios.post(`${BASE_URL}/set_contact`,{
      id:duzeltid,
      platform: duzenleplatformtext,
      ikon: duzenleicontext,
      color: selectedValue,
      content: duzenlecontenttext,
    }).then((response) => {
      console.log(response)

      setPost(response.data.contact)

      setButtonloading(false)

      setVisible(false)

      Toast.show({
        type: 'success',
        text1: 'Link düzenlendi',
      });
    }).catch(function(error) {
      console.log('Hata: ' + error.message);
      setButtonloading(false)
      setVisible(false)
      Toast.show({
        type: 'error',
        text1: 'Hata',
      });
      });
  }

  const silkaydetmodal = () => {
    setButtonloading(true)
    axios.post(`${BASE_URL}/delete_contact`,{
      id:silid,
    }).then((response) => {
      console.log(response)

      setPost(response.data.contact)

      setButtonloading(false)

      setSilvisible(false)

      Toast.show({
        type: 'success',
        text1: 'Link silindi',
      });
    }).catch(function(error) {
      console.log('Hata: ' + error.message);
      setButtonloading(false)
      setSilvisible(false)
      Toast.show({
        type: 'error',
        text1: 'Hata',
      });
      });
  }

  const showToast = () => {
    Toast.show({
      type: 'info',
      text1: 'Hello',
      text2: 'This is some something 👋'
    });
  }

  useEffect(() => {
    axios.get(`${BASE_URL}/get_contact`).then((response) => {
      console.log(response.data.contact)
      setPost(response.data.contact)

    }).catch(function(error) {
      console.log('Hata: ' + error.message);
      });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {
        !post ? (
          <Spinner visible={true} />
        ) : (
        
            
          <ScrollView style={styles.scrollView}>
            <Portal>
              <Toast  visibilityTime={2000}/>
            </Portal>
          
          <Button icon="link-plus" mode="contained" onPress={eklemodal} style={{width:'100%',marginTop:20}}>
            Yeni Link Ekle
          </Button>
          {
            post.map(function(item,i){
              return <Card style={{width:'100%',marginVertical:10}} key={'card' + item.id}>
              <Card.Title 
                title={item.platform} 
                subtitle={item.ikon}
                left={LeftContent} 
                titleStyle={{fontWeight:'bold'}} 
              />
              <Card.Content>
                <Text variant="bodyMedium">{'Url = ' + item.content}</Text>
                <Text variant="bodyMedium">{'Renk = ' + item.color}</Text>
              </Card.Content>
              <Card.Actions>
                <Button onPress={(event)=>sil(event,item.id)}>Sil</Button>
                <Button onPress={(event)=>duzenle(event,item.id)}>Düzenle</Button>
              </Card.Actions>
            </Card>
            })

          }
          <Portal>
            <Modal visible={visible} onDismiss={() => {setVisible(false)}} 
              contentContainerStyle={{marginHorizontal:20 , 
                                      marginVertical:50 , backgroundColor:'white' , 
                                      borderRadius:10 , shadowOffset:2 , shadowColor:'black' , 
                                      justifyContent:'flex-start',paddingHorizontal:10
                                      }}>
              <Text style={{textAlign:'center',fontSize:18,marginVertical:20 , fontWeight:'bold'}}>Düzenle Modal</Text>
              <View
                  style={{
                    borderBottomColor: 'black',
                    borderBottomWidth: StyleSheet.hairlineWidth,
                  }}
              />
              <TextInput
                    label="Platform"
                    value={duzenleplatformtext}
                    onChangeText={text => setDuzenleplatformtext(text)}
                    style={{marginVertical:10}}
              />
              <TextInput
                    label="İkon"
                    value={duzenleicontext}
                    onChangeText={text => setDuzenleicontext(text)}
                    style={{marginVertical:10}}
              />
              <TextInput
                    label="Content"
                    value={duzenlecontenttext}
                    multiline={true}
                    numberOfLines={3}
                    onChangeText={text => setDuzenlecontenttext(text)}
                    style={{marginVertical:10}}
              />
              <View style={{flexDirection: 'row', alignItems: 'center' , backgroundColor:'#c7d2fe' , marginVertical:10}}>
                <Text style={{justifyContent:'center' , fontSize:15 , paddingStart:10 , fontWeight:'bold'}}>Arka Plan : </Text>
                <Picker
                  selectedValue={selectedValue}
                  style={{ flex:1 , backgroundColor:'#c7d2fe'}}
                  onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                >
                  <Picker.Item label="Gray" value="gray"  style={{color:'gray', backgroundColor:'#c7d2fe'}}/>
                  <Picker.Item label="Blue" value="blue" style={{color:'blue', backgroundColor:'#c7d2fe'}}/>
                  <Picker.Item label="Purple" value="purple" style={{color:'purple', backgroundColor:'#c7d2fe'}}/>
                  <Picker.Item label="Pink" value="pink" style={{color:'pink', backgroundColor:'#c7d2fe'}}/>
                  <Picker.Item label="Red" value="red" style={{color:'red', backgroundColor:'#c7d2fe'}}/>
                  <Picker.Item label="Orange" value="orange" style={{color:'orange', backgroundColor:'#c7d2fe'}}/>
                  <Picker.Item label="Yellow" value="yellow" style={{color:'yellow', backgroundColor:'#c7d2fe'}}/>
                  <Picker.Item label="Green" value="green" style={{color:'green', backgroundColor:'#c7d2fe'}}/>
                </Picker>
              </View>
              <Button icon="content-save-edit" mode='contained' onPress={duzenlekaydetmodal} loading={buttonloading}
                disabled={buttonloading} style={{marginVertical:10}}>
                Kaydet
              </Button>
            </Modal>
          </Portal>

          <Portal>
            <Dialog visible={silvisible} onDismiss={() => {setSilvisible(false)}}>
              <Dialog.Icon icon="alert" />
              <Text style={{textAlign:'center' , fontSize:14 , fontWeight:'bold' , marginBottom:15}}>Uyarı</Text>
              <Dialog.Content>
                <Text variant="bodyMedium">{siluyari}</Text>
              </Dialog.Content>
              <Dialog.Actions>
                <Button icon="delete" mode='text' onPress={silkaydetmodal} loading={buttonloading}
                disabled={buttonloading} labelStyle={{color:'red'}}>
                  Sil
                </Button>
                <Button icon="cancel" mode='text' onPress={() => {setSilvisible(false)}} contentStyle={{paddingRight:5}}>
                  İptal
                </Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>
          
          <Portal>
            <Modal visible={eklevisible} onDismiss={() => {setEvisible(false)}} 
              contentContainerStyle={{marginHorizontal:20 , 
                                      marginVertical:50 , backgroundColor:'white' , 
                                      borderRadius:10 , shadowOffset:2 , shadowColor:'black' , 
                                      justifyContent:'flex-start',paddingHorizontal:10
                                      }}>
              <Text style={{textAlign:'center',fontSize:18,marginVertical:20 , fontWeight:'bold'}}>Ekle Modal</Text>
              <View
                  style={{
                    borderBottomColor: 'black',
                    borderBottomWidth: StyleSheet.hairlineWidth,
                  }}
              />
              <TextInput
                    label="Platform"
                    value={platformtext}
                    onChangeText={text => setPlatformtext(text)}
                    style={{marginVertical:10}}
              />
              <TextInput
                    label="İkon"
                    value={icontext}
                    onChangeText={text => setIcontext(text)}
                    style={{marginVertical:10}}
              />
              <TextInput
                    label="Content"
                    value={contenttext}
                    multiline={true}
                    numberOfLines={3}
                    onChangeText={text => setContenttext(text)}
                    style={{marginVertical:10}}
              />
              <View style={{flexDirection: 'row', alignItems: 'center' , backgroundColor:'#c7d2fe' , marginVertical:10}}>
                <Text style={{justifyContent:'center' , fontSize:15 , paddingStart:10 , fontWeight:'bold'}}>Arka Plan : </Text>
                <Picker
                  selectedValue={ekleselectedValue}
                  style={{ flex:1 , backgroundColor:'#c7d2fe'}}
                  onValueChange={(itemValue, itemIndex) => setEkleselectedValue(itemValue)}
                >
                  <Picker.Item label="Gray" value="gray"  style={{color:'gray', backgroundColor:'#c7d2fe'}}/>
                  <Picker.Item label="Blue" value="blue" style={{color:'blue', backgroundColor:'#c7d2fe'}}/>
                  <Picker.Item label="Purple" value="purple" style={{color:'purple', backgroundColor:'#c7d2fe'}}/>
                  <Picker.Item label="Pink" value="pink" style={{color:'pink', backgroundColor:'#c7d2fe'}}/>
                  <Picker.Item label="Red" value="red" style={{color:'red', backgroundColor:'#c7d2fe'}}/>
                  <Picker.Item label="Orange" value="orange" style={{color:'orange', backgroundColor:'#c7d2fe'}}/>
                  <Picker.Item label="Yellow" value="yellow" style={{color:'yellow', backgroundColor:'#c7d2fe'}}/>
                  <Picker.Item label="Green" value="green" style={{color:'green', backgroundColor:'#c7d2fe'}}/>
                </Picker>
              </View>
              <Button icon="content-save-edit" mode='contained' onPress={eklekaydetmodal} loading={buttonloading}
                disabled={buttonloading} style={{marginVertical:10}}>
                Kaydet
              </Button>
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
  scrollView: {
    paddingHorizontal: 10,
  },
});

export default IletisimScreen;