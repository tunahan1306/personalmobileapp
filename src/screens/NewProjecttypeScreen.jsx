import { StyleSheet, Text, View , SafeAreaView , ScrollView , Image } from 'react-native'
import React , { useState } from 'react'
import { Portal , useTheme , TextInput , Button} from 'react-native-paper'
import Toast from 'react-native-toast-message'
import axios from 'axios';
import { BASE_URL } from '../config';
import { launchImageLibrary }  from 'react-native-image-picker';


const NewProjecttypeScreen = ({ navigation }) => {

    const theme = useTheme()

    const [subject , setSubject] = useState('')

    const [buttonloading , setButtonloading] = useState(false)

    const [imagebuttonloading , setImagebuttonloading] = useState(false)

    const [image64 , setImage64] = useState('')

    const [fotograf ,setFotograf] = useState(false)

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

    const kaydet = () => {
      if(fotograf){
        setButtonloading(true)
        axios.post(`${BASE_URL}/set_projecttype`,{
          subject: subject,
          image:image64,
        }).then((response) => {
          console.log(response)

          setButtonloading(false)
          
          Toast.show({
            type: 'success',
            text1: 'Proje Tipi eklendi',
          });
        }).catch(function(error) {
          console.log('Hata: ' + error.message);
          setButtonloading(false)
          Toast.show({
            type: 'error',
            text1: 'Hata',
          });
          });
      }else{
        Toast.show({
          type: 'error',
          text1: 'Hata',
          text2:'Fotograf Ekle'
        });
      }
    }

  return (
    <SafeAreaView style={styles.container}>
        
        <ScrollView style={styles.wrapper}>
            
            <Text style={{textAlign:'center' , fontSize:18 , color:theme.colors.error , marginVertical:10}}>Yeni Proje Tipi Ekle</Text>
            <View
                style={{
                    borderBottomColor: 'black',
                    borderBottomWidth: StyleSheet.hairlineWidth,
                }}
            />
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
                <Button icon="content-save" mode="contained" onPress={kaydet} loading={buttonloading} disabled={buttonloading}>
                    Kaydet
                </Button>
                
            </View>
            <Button icon="arrow-left" mode="text" onPress={() => navigation.navigate('Home')}
                            style={{marginBottom:20 }}
                            textColor={theme.colors.error}>
                Ana Sayfaya Geri Dön
            </Button>
            <Portal>
                <Toast  visibilityTime={2000}/>
            </Portal>        
        </ScrollView>            
    </SafeAreaView>
  )
}

export default NewProjecttypeScreen

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