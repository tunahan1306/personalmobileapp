import { StyleSheet, View , SafeAreaView , ScrollView ,Image} from 'react-native'
import React , {useEffect , useState} from 'react'
import { Button , Text , TextInput , Switch , useTheme , Portal} from 'react-native-paper';
import axios from 'axios';
import { BASE_URL } from '../config';
import Spinner from 'react-native-loading-spinner-overlay/lib';
import {Picker} from '@react-native-picker/picker';
import Toast from 'react-native-toast-message';


const Project = ({ route, navigation }) => {

    const theme = useTheme()

    const { itemId , itemData , itemTypes , itemType , itemImage , itemPublish } = route.params;

    console.log(itemPublish);

    const [title , setTitle] = useState('' + itemData.title)

    const [description , setDescription] = useState('' + itemData.description)

    const [url , setUrl] = useState('' + itemData.url)

    const [image , setImage] = useState('' + itemImage)

    const [projecttype , setProjecttype] = useState(Number(itemType))

    const [publish , setPublish] = useState(itemPublish)

    const [error , setError] = useState(false)

    const [loading , setLoading] = useState(false)

    const [duzenlebuttonloading , setDuzenlebuttonloading] = useState(false)

    const [silbuttonloading , setSilbuttonloading] = useState(false)

    const duzenle = () => {
        setDuzenlebuttonloading(true)

        let pb = 0;

        if(publish){
            pb=1
        }

        axios.post(`${BASE_URL}/set_project`,{
            id:itemId,
            title: title,
            description: description,
            type:projecttype,
            url:url,
            publish:pb,
          }).then((response) => {
            console.log(response)
            setDuzenlebuttonloading(false)
            Toast.show({
              type: 'success',
              text1: 'Proje düzenlendi',
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

    const sil = () => {
        setSilbuttonloading(true)

        axios.post(`${BASE_URL}/delete_project`,{
            id:itemId,
          }).then((response) => {
            console.log(response)
      
            setSilbuttonloading(false)
            Toast.show({
              type: 'success',
              text1: 'Proje Silindi',
            });
          }).catch(function(error) {
            console.log('Hata: ' + error.message);
            setSilbuttonloading(false)
            Toast.show({
              type: 'error',
              text1: 'Hata',
            });
            });
    }

    

  return (
    <SafeAreaView style={styles.container}>
        {
            loading ? (
                <Spinner visible={true} />
            ) : error ? (
                <Text>Proje Bulunamadı</Text>
            ) : (
                <ScrollView style={styles.wrapper}>
                    <Portal>
                        <Toast  visibilityTime={2000}/>
                    </Portal>
                    <Text style={{fontWeight:'bold' , fontSize:25 , textAlign:'center' , marginVertical:20 , color:theme.colors.error}}>{itemData.title}</Text>
                    <View
                        style={{
                            borderBottomColor: 'black',
                            borderBottomWidth: StyleSheet.hairlineWidth,
                        }}
                    />
                    {
                        image === '' ? null :  <View style={{ alignItems: 'center' }}>
                        <Image
                            style={{height:200 , width:200 , }}
                            source={ image !== '' ? {uri:image} : null}
                        />
                    </View> 
                    }
                    
                    <TextInput
                        label="Başlık"
                        value={title}
                        onChangeText={text => setTitle(text)}
                        style={{marginTop:10}}
                        />
                    <TextInput
                        label="Açıklama"
                        value={description}
                        multiline={true}
                        numberOfLines={40}
                        onChangeText={text => setDescription(text)}
                        style={{marginTop:10}}
                        />
                    <TextInput
                        label="Url"
                        value={url}
                        multiline={true}
                        numberOfLines={3}
                        onChangeText={text => setUrl(text)}
                        style={{marginTop:10}}
                        />
                    <View style={{flexDirection: 'row', alignItems: 'center' , backgroundColor:'#c7d2fe' , marginVertical:10}}>
                        <Text style={{justifyContent:'center' , fontSize:15 , paddingStart:10 , fontWeight:'bold'}}>Proje Tipi : </Text>
                        <Picker
                        selectedValue={projecttype}
                        style={{ flex:1 , backgroundColor:'#c7d2fe'}}
                        onValueChange={(itemValue, itemIndex) => {setProjecttype(itemValue); console.log(itemValue)}}
                        >
                            {
                              itemTypes.map(function(item,i){
                                return <Picker.Item label={item.subject} value={item.id} key={'type' + item.id}/>
                                })      
                             
                            }
                        </Picker>
                    </View>
                    <View style={{flex:1 , flexDirection:'row' , justifyContent:'space-between' , paddingVertical:'auto' ,marginTop:10}}>
                        <Text style={{fontSize:15 , paddingLeft:10 , fontWeight:'bold'}}>Yayınlandı mı</Text>
                        <Switch value={publish} onValueChange={() => {setPublish(!publish)}} />
                    </View>
                    
                    <View style={{flex:1 , flexDirection:'row' , marginTop:20 , gap:4 , justifyContent:'center'}}>
                        <Button icon="pencil" mode="contained" onPress={duzenle} loading={duzenlebuttonloading} disabled={duzenlebuttonloading}>
                            Düzenle
                        </Button>
                        <Button icon="delete" mode="contained" onPress={sil} buttonColor={theme.colors.error}
                             loading={silbuttonloading} disabled={silbuttonloading}
                        >
                            Sil
                        </Button>
                    </View>
                   
                    <Button icon="arrow-left" mode="text" onPress={() => navigation.navigate('Home')}
                            style={{marginBottom:20 }}
                            textColor={theme.colors.error}
                       
                        >
                            Ana Sayfaya Geri Dön
                    </Button>
                    
                </ScrollView>
            )
                
                    
                        
                    
                
            
        }
      
    </SafeAreaView>
  )
}

export default Project

const styles = StyleSheet.create({
    container: {
        flex: 1,
      },
      wrapper: {
        width: '100%',
        padding:5,
        
      },
})