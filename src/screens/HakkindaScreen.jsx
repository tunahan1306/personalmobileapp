import React, {useContext , useEffect , useState} from 'react';
import axios from 'axios';
import {
  View,
  StyleSheet,
  Image,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { Card, Text , Button , TextInput } from 'react-native-paper';
import { launchImageLibrary }  from 'react-native-image-picker';
import { BASE_URL } from '../config';

const AnaSayfaScreen = ({navigation}) => {

  const [id , setId] = useState(null)

  const [post, setPost] = useState(null)

  const [title, setTitle] = useState('')

  const [description , setDescription] = useState('')

  const [image64 , setImage64] = useState('')

  const [loading ,setLoading] = useState(false)

  const [fotograf ,setFotograf] = useState(false)

  const captureTradeLicenseImage = () => {
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
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else{
        response.assets.map(function(item,i){
          console.log('data:'+item.type+';base64,'+item.base64)
          setImage64('data:'+item.type+';base64,'+item.base64)
          setFotograf(true)
        })
        
      }
      

      
    })
    
    
  }


  const kaydet = () => {
    setLoading(true)
    if(fotograf){
      axios.post(`${BASE_URL}/set_about`,{
            id:id,
            title:title,
            description:description,
            image:image64,
          }).then((response) => {
            console.log(response)

            setLoading(false)
          }).catch(function(error) {
            console.log('Hata: ' + error.message);
            });
    }else{
      axios.post(`${BASE_URL}/set_about`,{
            id:id,
            title:title,
            description:description,
            image:'',
          }).then((response) => {
            console.log(response)

            setLoading(false)
          }).catch(function(error) {
            console.log('Hata: ' + error.message);
            });
    }
    

    
  }

    useEffect(() => {
      axios.get(`${BASE_URL}/get_about`).then((response) => {
        console.log(response.data.about)
        setPost(response.data.about);

        response.data.about.map(function(item,i){
          setId(item.id)
          setTitle(item.title)
          setDescription(item.description)
          setImage64(item.image)
        })
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
          <ScrollView style={styles.wrapper}>
            
            {
              post.map(function(item,i){
                
                return <View key={i} style={{width:'100%',alignItems: 'center',}}>
                  <Image style={{width:200 , height:300 ,marginBottom:5}}
                  source={image64 ? {uri:image64} : {uri:'https://www.shutterstock.com/image-vector/camera-icon-flat-style-isolated-260nw-1048035055.jpg'}}/>
                
                <Button icon="camera" mode="contained" onPress={captureTradeLicenseImage}>
                  Fotoğraf Yükle
                </Button>

                <TextInput
                  label="Başlık"
                  value={title}
                  onChangeText={text => setTitle(text)}
                  style={{width:'100%',marginTop:5}}
                />

                <TextInput
                  label="Açıklama"
                  value={description}
                  multiline={true}
                  numberOfLines={10}
                  onChangeText={text => setDescription(text)}
                  style={{width:'100%',marginVertical:5}}
                />

                <Button icon="content-save-edit"
                 mode='elevated' 
                 onPress={kaydet} 
                 style={{width:'100%',marginVertical:10}}
                 loading={loading}
                disabled={loading}
                 >
                  Kaydet
                </Button>

                </View>
              })
            }
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
    marginVertical:5,
    padding:5,
  },
});

export default AnaSayfaScreen;