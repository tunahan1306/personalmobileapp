import React , {useState , useEffect} from 'react'
import { Text ,List, MD3Colors , useTheme , FAB , Portal , } from 'react-native-paper'
import Spinner from 'react-native-loading-spinner-overlay/lib';
import axios from 'axios';
import { BASE_URL } from '../config';
import {
    View,
    StyleSheet,
    ScrollView,
    SafeAreaView,
  
  } from 'react-native';

const Projects = ({ navigation }) => {

    const theme = useTheme()

    const [loading , setLoading] = useState(true)

    const [post0 ,setPost0] = useState()

    const [post1 ,setPost1] = useState()

    const [types , setTypes] = useState()

    const [state, setState] = React.useState({ open: false });

    const onStateChange = ({ open }) => setState({ open });

    const { open } = state;

    useEffect(() => {
        axios.get(`${BASE_URL}/get_fullprojects`).then((response) => {
    
          console.log(response.data)
            
          setPost0(response.data.projects0)
          setPost1(response.data.projects1)
          setTypes(response.data.projecttypes)
          setLoading(false);
        }).catch(function(error) {
          console.log('Hata: ' + error.message);
          });
      }, []);

  return (
    <SafeAreaView style={styles.container}>
        {
            loading ? (
                <Spinner visible={true} />
            ) : (
                <ScrollView style={styles.wrapper}>
                    <Text style={{backgroundColor:theme.colors.secondary , 
                                color:theme.colors.onSecondary , 
                                paddingVertical:3 , textAlign:'center'}}>Yayınlanan Projeler
                                </Text>
                    {
                        post1.length === 0 ? (
                            <Text style={{textAlign:'center' , fontWeight:'bold' , marginVertical:15 , color:theme.colors.error}}>
                                Yayınlanan Proje Yok
                            </Text>
                        ) : post1.map(function(item,i){ 
                          let img = '';
                          let tip = '';
                          let pbl;

                          if(item.publish === '0'){
                            pbl = false
                          }else if(item.publish === '1'){
                            pbl = true
                          }

                          item.projecttype.map(function(cos , x){
                            tip = cos.id
                            img = cos.image
                          })                         
                            return <List.Item title={item.title} 
                            titleStyle={{color:theme.colors.primary}}
                            description={item.description}
                            descriptionNumberOfLines={3}
                            left={props => <List.Icon {...props} icon="file-document-outline" color={theme.colors.primary} style={{alignItems:'center'}}/>}
                            key={'yayınlanan' + item.id}
                            onPress={() => {navigation.navigate('Proje', {
                              itemId: item.id,
                              itemData:item,
                              itemTypes:types,
                              itemType:tip,
                              itemImage:img,
                              itemPublish:pbl
                              
                              });}}/>
                        })
                        
                    }
                        
                        

                    <Text style={{backgroundColor:theme.colors.secondary , 
                                color:theme.colors.onSecondary , 
                                paddingVertical:3 , textAlign:'center'}}>Yayınlanmayan Projeler
                                </Text>
                    {
                        post0.length === 0 ? (
                            <Text style={{textAlign:'center' , fontWeight:'bold' , marginVertical:15 , color:theme.colors.primary}}>
                                Yayınlanan Proje Yok
                            </Text>
                        ) : post0.map(function(item,i){
                          let img = '';
                          let tip = '';
                          let pbl;

                          if(item.publish === '0'){
                            pbl = false
                          }else if(item.publish === '1'){
                            pbl = true
                          }

                          item.projecttype.map(function(cos , x){
                            tip = cos.id
                            img = cos.image
                          })
                            return <List.Item title={item.title} 
                            titleStyle={{color:theme.colors.primary}}
                            description={item.description}
                            descriptionNumberOfLines={3}
                            left={props => <List.Icon {...props} icon="file-document-outline" color={theme.colors.primary} style={{alignItems:'center'}}/>}
                            key={'yayınlanan' + item.id}
                            onPress={() => {navigation.navigate('Proje', {
                              itemId: item.id,
                              itemData:item,
                              itemTypes:types,
                              itemType:tip,
                              itemImage:img,
                              itemPublish:pbl
                              });}}/>
                        })
                        
                    }
                
                    </ScrollView>
            )
        }
        <Portal>
          <FAB.Group
            open={open}
            visible
            icon={open ? 'calendar-today' : 'plus'}
            actions={[
              {
                icon: 'plus',
                label: 'Yeni Proje Ekle',
                onPress: () => navigation.navigate('NewProje',{itemTypes:types,}),
              },
              {
                icon: 'email',
                label: 'Yeni Proje Tipi Ekle',
                onPress: () => navigation.navigate('NewProjeTipi'),
              },
              {
                icon: 'bell',
                label: 'Proje Tipi Düzenle Sil',
                onPress: () => navigation.navigate('ProjeTipiDuzenleSil',{itemTypes:types,}),
              },
            ]}
            onStateChange={onStateChange}
            onPress={() => {
              if (open) {
                // do something if the speed dial is open
              }
            }}
          />
        </Portal>
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
  });
  

export default Projects
