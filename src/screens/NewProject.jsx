import { StyleSheet, View , SafeAreaView , ScrollView ,Image} from 'react-native'
import React , {useEffect , useState} from 'react'
import { Button , Text , TextInput , Switch , useTheme , Portal} from 'react-native-paper';
import axios from 'axios';
import { BASE_URL } from '../config';
import Spinner from 'react-native-loading-spinner-overlay/lib';
import {Picker} from '@react-native-picker/picker';
import Toast from 'react-native-toast-message';


const NewProject = ({ route, navigation }) => {

    const theme = useTheme()

    const { itemTypes } = route.params;

    const [title , setTitle] = useState('')

    const [description , setDescription] = useState('')

    const [url , setUrl] = useState('')

    const [image , setImage] = useState('')

    const [publish , setPublish] = useState(false)

    const [types , setTypes] = useState();

    const [projecttype , setProjecttype] = useState()

    const [loading , setLoading] = useState(true)

    const [duzenlebuttonloading , setDuzenlebuttonloading] = useState(false)

    

    const kaydet = () => {
        

        if(!projecttype){
            Toast.show({
                type: 'error',
                text1: 'Hata',
                text2:'Boşlukları Doldurunuz',
              });
        }else{
            setDuzenlebuttonloading(true)
            let pb = 0;

        if(publish){
            pb=1
        }

        axios.post(`${BASE_URL}/set_project`,{
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
              text1: 'Proje eklendi',
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

   
    useEffect(() => {
        axios.get(`${BASE_URL}/get_projecttypes`,{
           
        }).then((response) => {
    
          console.log(response.data)
          
          setTypes(response.data.projecttypes)

          setLoading(false)

        }).catch(function(error) {
          console.log('Hata: ' + error.message);
          });
      }, []);

  return (
    <SafeAreaView style={styles.container}>
        {
            loading ? (
                <Spinner visible={true} />
            ) :  (
                <ScrollView style={styles.wrapper}>
                    <Portal>
                        <Toast  visibilityTime={2000}/>
                    </Portal>
                    <Text style={{fontWeight:'bold' , fontSize:25 , textAlign:'center' , marginVertical:20 , color:theme.colors.error}}>Proje Ekleme Sayfası</Text>
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
                        onValueChange={(itemValue, itemIndex) => setProjecttype(itemValue)}
                        >
                            <Picker.Item label='Seçiniz' value=''/>
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
                        <Button icon="content-save-edit" mode="contained" onPress={kaydet} loading={duzenlebuttonloading} disabled={duzenlebuttonloading}>
                            Kaydet
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

export default NewProject

const styles = StyleSheet.create({
    container: {
        flex: 1,
      },
      wrapper: {
        width: '100%',
        padding:5,
        
      },
})