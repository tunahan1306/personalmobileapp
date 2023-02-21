import { StyleSheet, Text, View , SafeAreaView , ScrollView , Image } from 'react-native'
import React , { useState } from 'react'
import { Portal , useTheme , TextInput , Button} from 'react-native-paper'
import Toast from 'react-native-toast-message'
import axios from 'axios';
import { BASE_URL } from '../config';
import { launchImageLibrary }  from 'react-native-image-picker';
import {Picker} from '@react-native-picker/picker';

const ProjecttypeEditDelete = ({ route, navigation }) => {

    const theme = useTheme()

    const { itemTypes } = route.params;

    const [projecttype , setProjecttype] = useState()

    const [post , setPost] = useState(itemTypes)

    const [subject , setSubject] = useState('')

    const [duzenlebuttonloading , setDuzenlebuttonloading] = useState(false)

    const [silbuttonloading , setSilbuttonloading] = useState(false)

    const [imagebuttonloading , setImagebuttonloading] = useState(false)

    const [image64 , setImage64] = useState('')

    const [fotograf ,setFotograf] = useState(false)

    const [hide , setHide] = useState(true)

  

    const captureTradeLicenseImage = () => {

        setImagebuttonloading(true)

        const option = {
            multiple: true,
            width: 300,
            height: 300,
            includeBase64: true,
            includeExif: true,
        }
    
        launchImageLibrary(option , response => {
          if (response.didCancel) {
            console.log('User cancelled image picker');
            setImagebuttonloading(false)
          }
          else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
            setImagebuttonloading(false)
          }
          else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
            setImagebuttonloading(false)
          }
          else{
            response.assets.map(function(item,i){
              console.log('data:'+item.type+';base64,'+item.base64)
              setImage64('data:'+item.type+';base64,'+item.base64)
              setFotograf(true)
              setImagebuttonloading(false)
            })
            
          }
        })
      }
       
      const select = (itemValue, itemIndex) =>{

        if(itemValue === ''){
            setImage64('')
            setSubject('')
            setProjecttype(itemValue)
            setHide(true)
        }else{
            post.map(function(item , i){
                if(item.id === itemValue){
                    setImage64(item.image)
                    setSubject(item.subject)
                    setProjecttype(itemValue)
                    setHide(false)
                }
            })
        }

        
        
      }

      const duzenle = () => {
        if(fotograf){
            setDuzenlebuttonloading(true)
            axios.post(`${BASE_URL}/set_projecttype`,{
              id:projecttype,
              subject: subject,
              image:image64,
            }).then((response) => {
              console.log(response)
                
              setDuzenlebuttonloading(false)
              
              setPost(response.data.projecttypes)

              Toast.show({
                type: 'success',
                text1: 'Proje Tipi düzenlendi',
              });
            }).catch(function(error) {
              console.log('Hata: ' + error.message);
              setDuzenlebuttonloading(false)
              Toast.show({
                type: 'error',
                text1: 'Hata',
              });
              });
          }else{
            setDuzenlebuttonloading(true)
            axios.post(`${BASE_URL}/set_projecttype`,{
              id:projecttype,
              subject: subject,
            }).then((response) => {
              console.log(response)
                
              setDuzenlebuttonloading(false)
              
              setPost(response.data.projecttypes)

              Toast.show({
                type: 'success',
                text1: 'Proje Tipi düzenlendi',
              });
            }).catch(function(error) {
              console.log('Hata: ' + error.message);
              setDuzenlebuttonloading(false)
              Toast.show({
                type: 'error',
                text1: 'Hata',
              });
              });
          }
      }

      const  sil = () => {
        if(projecttype !== ''){
            setSilbuttonloading(true)
            axios.post(`${BASE_URL}/delete_projecttype`,{
              id:projecttype,
            }).then((response) => {
              console.log(response)
    
              setPost(response.data.projecttypes)

              setSilbuttonloading(false)
              
              setImage64('')
              setSubject('')
              setHide(true)
              Toast.show({
                type: 'success',
                text1: 'Proje Tipi silindi',
              });
            }).catch(function(error) {
              console.log('Hata: ' + error.message);
              setSilbuttonloading(false)
              Toast.show({
                type: 'error',
                text1: 'Hata',
              });
              });
          }else{
            Toast.show({
              type: 'error',
              text1: 'Hata',
              text2:'Proje tipi seçiniz.'
            });
          }
      }
  return (
    <SafeAreaView style={styles.container}>
         <ScrollView style={styles.wrapper}>
            <Portal>
                <Toast  visibilityTime={2000}/>
            </Portal>
            <Text style={{textAlign:'center' , fontSize:18 , color:theme.colors.error , marginVertical:10}}>Proje Tipi Düzenle</Text>
            <View
                style={{
                    borderBottomColor: 'black',
                    borderBottomWidth: StyleSheet.hairlineWidth,
                }}
            />
            <View style={{flexDirection: 'row', alignItems: 'center' , backgroundColor:'#c7d2fe' , marginVertical:10}}>
                            <Text style={{justifyContent:'center' , fontSize:15 , paddingStart:10 , fontWeight:'bold'}}>Proje Tipi : </Text>
                            <Picker
                            selectedValue={projecttype}
                            style={{ flex:1 , backgroundColor:'#c7d2fe'}}
                            onValueChange={select}
                            >
                                <Picker.Item label='Seçiniz' value=''/>
                                {
                                    post.map(function(item,i){
                                        return <Picker.Item label={item.subject} value={item.id} key={'type' + item.id}/>
                                    })
                                }
                            </Picker>
            </View>
            <View style={ !hide ? '' : {display:'none'} }>
                
                <View style={{width:'100%',alignItems: 'center',}}>
                    <Image style={{width:400 , height:300 , marginVertical:10 }}
                        source={image64 ? {uri:image64} : {uri:'https://www.shutterstock.com/image-vector/camera-icon-flat-style-isolated-260nw-1048035055.jpg'}}/>
                        
                    <Button icon="camera" mode='elevated' onPress={captureTradeLicenseImage} disabled={imagebuttonloading}>
                        Fotoğraf Yükle
                    </Button>
                </View>
                <TextInput
                    label="Konu"
                    value={subject}
                    onChangeText={text => setSubject(text)}
                    style={{marginTop:10}}        
                />
                <View style={{flex:1 , flexDirection:'row' , marginTop:20 , gap:4 , justifyContent:'center'}}>
                    <Button icon="content-save-edit" mode="contained" onPress={duzenle} loading={duzenlebuttonloading} disabled={duzenlebuttonloading}>
                        Düzenle
                    </Button>
                    <Button icon="delete" mode="contained" buttonColor={theme.colors.error} onPress={sil} loading={silbuttonloading} disabled={silbuttonloading}>
                        Sil
                    </Button>
                </View>
            </View>
            
            <Button icon="arrow-left" mode="text" onPress={() => navigation.navigate('Home')}
                            style={{marginBottom:20 }}
                            textColor={theme.colors.error}>
                Ana Sayfaya Geri Dön
            </Button>
              
         </ScrollView>
    </SafeAreaView>
  )
}

export default ProjecttypeEditDelete

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
})