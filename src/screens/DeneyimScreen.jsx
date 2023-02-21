import React, {useContext, useState , useEffect} from 'react';
import axios from 'axios';
import {
  View,
  StyleSheet,
  ScrollView,
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { List , Text , Button , FAB ,Portal , Modal , TextInput , useTheme} from 'react-native-paper';
import { BASE_URL } from '../config';
import {Picker} from '@react-native-picker/picker';
import Toast from 'react-native-toast-message';
import DatePicker from 'react-native-date-picker'


const DeneyimScreen = () => {

  const theme = useTheme();

  const [post, setPost] = useState(null)

  const [state, setState] = React.useState({ open: false });

  const [dtipieklemodalvisible , setDtipieklemodalvisible] = useState(false)

  const [dtipiduzenlemodalvisible , setDtipiduzenlemodalvisible] = useState(false)

  const [dtipisilmodalvisible , setDtipisilmodalvisible] = useState(false)

  const [deklemodalvisible , setDeklemodalvisible] = useState(false)

  const [dduzenlemodalvisible , setDduzenlemodalvisible] = useState(false)

  const [dsilmodalvisible , setDsilmodalvisible] = useState(false)

  const [dtipititletext , setDtipititletext] = useState()

  const [dtipiicontext , setDtipiicontext] = useState()

  const [buttonloading , setButtonloading] = useState(false)

  const [dtipiselectedvalue , setDtipiselectedvalue] = useState()

  const [dtipiduzenletitletext , setDtipiduzenletitletext] = useState()

  const [dtipiduzenleicontext , setDtipiduzenleicontext] = useState()

  const [dtipisilselectedvalue , setDtipisilselectedvalue] = useState()

  const [dekledtipiselectedvalue , setDekledtipiselectedvalue] = useState()

  const [dekledate, setDekledate] = useState(new Date())

  const [dekledateopen, setDekledateopen] = useState(false)

  const [buttondate , setButtondate] = useState('')

  const [dekletitletext , setDekletitletext] = useState()
					  
  const [dekledescriptiontext , setDekledescriptiontext] = useState()

  const [dduzenletitletext , setDduzenletitletext] = useState()
					  
  const [dduzenledescriptiontext , setDduzenledescriptiontext] = useState()

  const [dduzenledtipiselectedvalue , setDduzenledtipiselectedvalue] = useState()

  const [dduzenledate, setDduzenledate] = useState(new Date())

  const [dduzenledateopen, setDduzenledateopen] = useState(false)

  const [buttonduzenledate , setButtonduzenledate] = useState('')

  const [dduzenlesilid , setDduzenlesilid] = useState()

  const [dduzenlebuttonloading , setDduzenlebuttonloading] = useState(false)

  const [dsilbuttonloading , setDsilbuttonloading] = useState(false)

  const onStateChange = ({ open }) => setState({ open });

  const { open } = state;

  const dtipieklekaydetmodal = () => {
    setButtonloading(true)
    console.log(dtipititletext + ' - ' + dtipiicontext);

    axios.post(`${BASE_URL}/set_experiencetype`,{
      title:dtipititletext,
      icon:dtipiicontext,
    }).then((response) => {
      console.log(response)

      setButtonloading(false)

      setPost(response.data.experiencetype)

      setDtipieklemodalvisible(false)

      Toast.show({
        type: 'success',
        text1: 'Yeni Deneyim Tipi eklendi',
      });
    }).catch(function(error) {
      console.log('Hata: ' + error.message);
      setButtonloading(false)
      setDtipieklemodalvisible(false)
      Toast.show({
        type: 'error',
        text1: 'Hata : ' + error.message,
      });
      });
  }



  const dtipiselection = ( value ) =>{
    setDtipiselectedvalue(value)

    if(value === ''){
      setDtipiduzenletitletext('')
      setDtipiduzenleicontext('')
    }else{
      post.map(function(item,i){
        if(item.id === value){
          setDtipiduzenletitletext(item.title)
          setDtipiduzenleicontext(item.icon)
        }
      })
    } 
  }

  const dtipiduzenlekaydetmodal = () => {
    console.log(dtipiselectedvalue)
    console.log(dtipiduzenletitletext + ' - ' + dtipiduzenleicontext)

    setButtonloading(true)

    axios.post(`${BASE_URL}/set_experiencetype`,{
      id:dtipiselectedvalue,
      title:dtipiduzenletitletext,
      icon:dtipiduzenleicontext,
    }).then((response) => {
      console.log(response)

      setButtonloading(false)

      setPost(response.data.experiencetype)

      setDtipiduzenlemodalvisible(false)

      Toast.show({
        type: 'success',
        text1: 'Deneyim tipi düzenlendi',
      });
    }).catch(function(error) {
      setButtonloading(false)
      setDtipiduzenlemodalvisible(false)
      Toast.show({
        type: 'error',
        text1: 'Hata : ' + error.message,
      });
      });

  }

  const dtipisilkaydetmodal = () => {
    console.log(dtipisilselectedvalue)

    if(dtipisilselectedvalue === ''){
      Toast.show({
        type: 'error',
        text1: 'Hata : İlgili Alanları doldurunuz.',
      });
    }else{
      setButtonloading(true)

      axios.post(`${BASE_URL}/delete_experiencetype`,{
        id:dtipisilselectedvalue,
      }).then((response) => {
        console.log(response)
  
        setButtonloading(false)
  
        setPost(response.data.experiencetype)
  
        setDtipisilmodalvisible(false)
  
        Toast.show({
          type: 'success',
          text1: 'Deneyim tipi silindi',
        });
      }).catch(function(error) {
        setButtonloading(false)
        setDtipisilmodalvisible(false)
        Toast.show({
          type: 'error',
          text1: 'Hata : ' + error.message,
        });
        });
    }

    
  }

  const deklekaydetmodal = () => {
    console.log(dekletitletext + ' - ' + dekledescriptiontext + ' - ' + buttondate + ' - ' + dekledtipiselectedvalue)

    if(dekledtipiselectedvalue === ''){
      Toast.show({
        type: 'error',
        text1: 'Hata : İlgili Alanları doldurunuz.',
      });
    }else{
      setButtonloading(true)

      axios.post(`${BASE_URL}/set_experience`,{
        title:dekletitletext,
        description:dekledescriptiontext,
        date:buttondate,
        type:dekledtipiselectedvalue,
      }).then((response) => {
        console.log(response)
  
        setButtonloading(false)
  
        setPost(response.data.experiencetype)
  
        setDeklemodalvisible(false)
  
        Toast.show({
          type: 'success',
          text1: 'Deneyim Eklendi',
        });
      }).catch(function(error) {
        setButtonloading(false)
        setDeklemodalvisible(false)
        Toast.show({
          type: 'error',
          text1: 'Hata : ' + error.message,
        });
        });
    }
  } 

  const dduzenlekaydetmodal = () => {
    console.log(dduzenlesilid + ' - ' + buttonduzenledate + ' - ' + dduzenledtipiselectedvalue + ' - ' + dduzenledescriptiontext + ' - ' + dduzenletitletext)
  
    setDduzenlebuttonloading(true)

    axios.post(`${BASE_URL}/set_experience`,{
      id:dduzenlesilid,
      title:dduzenletitletext,
      description:dduzenledescriptiontext,
      date:buttonduzenledate,
      type:dduzenledtipiselectedvalue,
    }).then((response) => {
      console.log(response)

      setDduzenlebuttonloading(false)

      setPost(response.data.experiencetype)

      setDduzenlemodalvisible(false)

      Toast.show({
        type: 'success',
        text1: 'Deneyim Düzenlendi',
      });
    }).catch(function(error) {
      setDduzenlebuttonloading(false)
      setDduzenlemodalvisible(false)
      Toast.show({
        type: 'error',
        text1: 'Hata : ' + error.message,
      });
      });

  }

  const duzenlemodal = (event , id) => {
    console.log(id)

    setDduzenlesilid(id)

    post.map(function(item,i){
      item.experience.map(function(exper,j){
        if(exper.id === id){
          setDduzenletitletext(exper.title)
          setDduzenledescriptiontext(exper.description)
          setButtonduzenledate(exper.date)
          setDduzenledtipiselectedvalue(item.id)
          setDduzenledate(new Date(exper.date))
          setDduzenlemodalvisible(true)
        }
      })
    })
  }

  const dsilkaydetmodal = () => {
    console.log(dduzenlesilid)

    setDsilbuttonloading(true)

    axios.post(`${BASE_URL}/delete_experience`,{
      id:dduzenlesilid,
    }).then((response) => {
      console.log(response)

      setDsilbuttonloading(false)

      setPost(response.data.experiencetype)

      setDduzenlemodalvisible(false)

      Toast.show({
        type: 'success',
        text1: 'Deneyim Silindi',
      });
    }).catch(function(error) {
      setDsilbuttonloading(false)
      setDduzenlemodalvisible(false)
      Toast.show({
        type: 'error',
        text1: 'Hata : ' + error.message,
      });
      });
  }

  useEffect(() => {
    axios.get(`${BASE_URL}/get_experience`).then((response) => {
      console.log(response.data.experiencetype)
      setPost(response.data.experiencetype);

    }).catch(function(error) {
      console.log('Hata: ' + error.message);
      });
  }, []);

  return (
    <View style={styles.container}>
      {
        !post ? (
          <Spinner visible={true} />
        ) : (
          <ScrollView style={{width:'100%'}}>

            <Portal>
              <Toast  visibilityTime={2000}/>
            </Portal>
            <List.AccordionGroup>
        
              <View style={{width:'100%' , marginTop:10}}>
                {
                  post.map(function(item,i){
                      return  <List.Accordion title={item.title} titleStyle={{textAlign:'center' ,fontWeight:'bold' }}
                      description={item.icon} descriptionStyle={{textAlign:'center'}}
                      left={props => <List.Icon {...props} icon="briefcase-outline" />} id={item.id} key={'accordion' + item.id}>
                        {
                          item.experience.map(function(exper , j){
                            return  <List.Item
                            title={exper.title}
                            titleStyle={{fontWeight:'bold'}}
                            description={exper.description}
                            left={props => <List.Icon {...props} icon="calendar-blank" />}
                            right={props => <Text {...props} >{exper.date}</Text>}
                            style={{width:'100%'}}
                            descriptionNumberOfLines={3}
                            onPress={(event) => duzenlemodal(event,exper.id)}
                            key={'list' + exper.id}
                          />
                          })
                        }
                      
        
                    </List.Accordion>
                
                  })
                }


              
              </View>
            </List.AccordionGroup>

            <Portal>
              <FAB.Group
                open={open}
                visible
                icon={open ? 'briefcase-variant' : 'plus'}
                actions={[
                  {
                    icon: 'plus',
                    label: 'Deneyim Tipi Ekle',
                    onPress: () => setDtipieklemodalvisible(true),
                  },
                  {
                    icon: 'pencil',
                    label: 'Deneyim Tipi Düzenle',
                    onPress: () => setDtipiduzenlemodalvisible(true),
                  },
                  {
                    icon: 'delete',
                    label: 'Deneyim Tipi Sil',
                    onPress: () => setDtipisilmodalvisible(true),
                  },
                  {
                    icon: 'briefcase-plus',
                    label: 'Deneyim Ekle',
                    onPress: () => setDeklemodalvisible(true),
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

            <Portal>
              <Modal visible={dtipieklemodalvisible} onDismiss={() =>{setDtipieklemodalvisible(false)}} 
                contentContainerStyle={{marginHorizontal:20 , 
                  marginVertical:50 , backgroundColor:'white' , 
                  borderRadius:10 , shadowOffset:2 , shadowColor:'black' , 
                  justifyContent:'flex-start',paddingHorizontal:10
                  }}
              >
              <Text style={{textAlign:'center',fontSize:18,marginVertical:20 , fontWeight:'bold'}}>Deneyim Tipi Ekle</Text>
              <View
                  style={{
                    borderBottomColor: 'black',
                    borderBottomWidth: StyleSheet.hairlineWidth,
                  }}
              />
                <TextInput
                        label="Başlık"
                        value={dtipititletext}
                        onChangeText={text => setDtipititletext(text)}
                        style={{marginVertical:10}}
                  />
                  <TextInput
                        label="İkon"
                        value={dtipiicontext}
                        onChangeText={text => setDtipiicontext(text)}
                        style={{marginVertical:10}}
                  />
                  <Button icon="content-save-edit" mode='contained' onPress={dtipieklekaydetmodal} loading={buttonloading}
                    disabled={buttonloading} style={{marginVertical:10}}>
                    Kaydet
                  </Button>
              </Modal>
            </Portal>
            <Portal>
              <Modal visible={dtipiduzenlemodalvisible} onDismiss={() =>{setDtipiduzenlemodalvisible(false)}} contentContainerStyle={{marginHorizontal:20 , 
                  marginVertical:50 , backgroundColor:'white' , 
                  borderRadius:10 , shadowOffset:2 , shadowColor:'black' , 
                  justifyContent:'flex-start',paddingHorizontal:10
                  }}>
                  <Text style={{textAlign:'center',fontSize:18,marginVertical:20 , fontWeight:'bold'}}>Deneyim Tipi Düzenle</Text>
                  <View
                      style={{
                        borderBottomColor: 'black',
                        borderBottomWidth: StyleSheet.hairlineWidth,
                      }}
                  />
                <Picker
                      selectedValue={dtipiselectedvalue}
                      style={{ backgroundColor: theme.colors.secondaryContainer,marginVertical:10}}
                      onValueChange={(itemValue, itemIndex) => dtipiselection( itemValue )}
                    >
                      <Picker.Item label='Seçiniz' value=''/>
                      {
                        post.map(function(item,i){
                          return <Picker.Item label={item.title} value={item.id}  key={'picker' + item.id}/>
                        })
                      }
                    </Picker>
                <TextInput
                        label="Başlık"
                        value={dtipiduzenletitletext}
                        onChangeText={text => setDtipiduzenletitletext(text)}
                        style={{marginVertical:10}}
                  />
                  <TextInput
                        label="İkon"
                        value={dtipiduzenleicontext}
                        onChangeText={text => setDtipiduzenleicontext(text)}
                        style={{marginVertical:10}}
                  />
                  <Button icon="content-save-edit" mode='contained' onPress={dtipiduzenlekaydetmodal} loading={buttonloading}
                    disabled={buttonloading} style={{marginVertical:10}}>
                    Kaydet
                  </Button>
              </Modal>
            </Portal>
            <Portal>
              <Modal visible={dtipisilmodalvisible} onDismiss={() =>{setDtipisilmodalvisible(false)}} contentContainerStyle={{marginHorizontal:20 , 
                  marginVertical:50 , backgroundColor:'white' , 
                  borderRadius:10 , shadowOffset:2 , shadowColor:'black' , 
                  justifyContent:'flex-start',paddingHorizontal:10
                  }}>
                  <Text style={{textAlign:'center',fontSize:18,marginVertical:20 , fontWeight:'bold'}}>Deneyim Tipi Sil</Text>
                  <View
                      style={{
                        borderBottomColor: 'black',
                        borderBottomWidth: StyleSheet.hairlineWidth,
                      }}
                  />
                   <Picker
                      selectedValue={dtipisilselectedvalue}
                      style={{  backgroundColor: theme.colors.secondaryContainer,marginVertical:10}}
                      onValueChange={(itemValue, itemIndex) => setDtipisilselectedvalue( itemValue )}
                    >
                      <Picker.Item label='Seçiniz' value=''/>
                      {
                        post.map(function(item,i){
                          return <Picker.Item label={item.title} value={item.id}  key={'picker' + item.id}/>
                        })
                      }
                    </Picker>
                  <Button icon="delete" mode='contained' onPress={dtipisilkaydetmodal} loading={buttonloading}
                    disabled={buttonloading} style={{marginVertical:10 , backgroundColor:theme.colors.error}}>
                    Sil
                  </Button>
              </Modal>
            </Portal>
            <Portal>
              <Modal visible={deklemodalvisible} onDismiss={() =>{setDeklemodalvisible(false)}} contentContainerStyle={{marginHorizontal:20 , 
                  marginVertical:50 , backgroundColor:'white' , 
                  borderRadius:10 , shadowOffset:2 , shadowColor:'black' , 
                  justifyContent:'flex-start',paddingHorizontal:10
                  }}>
                 <Text style={{textAlign:'center',fontSize:18,marginVertical:20 , fontWeight:'bold'}}>Deneyim Ekle</Text>
                  <View
                      style={{
                        borderBottomColor: 'black',
                        borderBottomWidth: StyleSheet.hairlineWidth,
                      }}
                  />
                  <Picker
                      selectedValue={dekledtipiselectedvalue}
                      style={{ backgroundColor: theme.colors.secondaryContainer,marginVertical:10}}
                      onValueChange={(itemValue, itemIndex) => setDekledtipiselectedvalue( itemValue )}
                    >
                      <Picker.Item label='Seçiniz' value=''/>
                      {
                        post.map(function(item,i){
                          return <Picker.Item label={item.title} value={item.id}  key={'picker' + item.id}/>
                        })
                      }
                  </Picker>
                  <TextInput
                        label="Başlık"
                        value={dekletitletext}
                        onChangeText={text => setDekletitletext(text)}
                        style={{marginVertical:10}}
                  />
                  <TextInput
                        label="Açıklama"
                        value={dekledescriptiontext}
                        onChangeText={text => setDekledescriptiontext(text)}
                        style={{marginVertical:10}}
                  />
                  <Button  icon='calendar-blank' style={{borderRadius:0,alignItems:'flex-start',paddingVertical:10, justifyContent:'center'}} onPress={() => setDekledateopen(true)} 
                    labelStyle={{fontSize:20 }}
                  >{buttondate === '' ? 'Tarih Seçiniz' : buttondate }</Button>
                  <DatePicker
                    modal
                    open={dekledateopen}
                    date={dekledate}
                    mode='date'
                    onConfirm={(date) => {
                      setDekledateopen(false)
                      setDekledate(date)
                      var month = ("0" + (date.getUTCMonth() + 1)).slice(-2); //months from 1-12
                      var day = ("0" + date.getUTCDate()).slice(-2);
                      var year = date.getUTCFullYear();
                      console.log(day + ' - ' + month + ' - ' + year);
                      setButtondate(year + '-' + month + '-' + day)
                    }}
                    onCancel={() => {
                      setDekledateopen(false)
                    }}
                    title='Tarih Seçiniz'
                    cancelText='İptal'
                    confirmText='Tamam'
                  />
                   <Button icon="content-save-edit" mode='contained' onPress={deklekaydetmodal} loading={buttonloading}
                    disabled={buttonloading} style={{marginVertical:10}}>
                    Kaydet
                  </Button>
              </Modal>
            </Portal>
            <Portal>
              <Modal visible={dduzenlemodalvisible} onDismiss={() =>{setDduzenlemodalvisible(false)}} contentContainerStyle={{marginHorizontal:20 , 
                  marginVertical:50 , backgroundColor:'white' , 
                  borderRadius:10 , shadowOffset:2 , shadowColor:'black' , 
                  justifyContent:'flex-start',paddingHorizontal:10
                  }}>
                <Text style={{textAlign:'center',fontSize:18,marginVertical:20 , fontWeight:'bold'}}>Deneyim Düzenle ve Sil</Text>
                <View
                      style={{
                        borderBottomColor: 'black',
                        borderBottomWidth: StyleSheet.hairlineWidth,
                      }}
                />
                <TextInput
                        label="Başlık"
                        value={dduzenletitletext}
                        onChangeText={text => setDduzenletitletext(text)}
                        style={{marginVertical:10}}
                />
                <TextInput
                        label="Açıklama"
                        value={dduzenledescriptiontext}
                        onChangeText={text => setDduzenledescriptiontext(text)}
                        style={{marginVertical:10}}
                />
                <Picker
                      selectedValue={dduzenledtipiselectedvalue}
                      style={{ backgroundColor: theme.colors.secondaryContainer,marginVertical:10}}
                      onValueChange={(itemValue, itemIndex) => setDduzenledtipiselectedvalue( itemValue )}
                    >
                      {
                        post.map(function(item,i){
                          return <Picker.Item label={item.title} value={item.id}  key={'picker' + item.id}/>
                        })
                      }
                </Picker>
                <Button  icon='calendar-blank' style={{borderRadius:0,alignItems:'flex-start',paddingVertical:10, justifyContent:'center'}} onPress={() => setDduzenledateopen(true)} 
                    labelStyle={{fontSize:20 }}
                  >{buttonduzenledate === '' ? 'Tarih Seçiniz' : buttonduzenledate }</Button>
                <DatePicker
                    modal
                    open={dduzenledateopen}
                    date={dduzenledate}
                    mode='date'
                    onConfirm={(date) => {
                      setDduzenledateopen(false)
                      setDduzenledate(date)
                      var month = ("0" + (date.getUTCMonth() + 1)).slice(-2); //months from 1-12
                      var day = ("0" + date.getUTCDate()).slice(-2);
                      var year = date.getUTCFullYear();
                      console.log(day + ' - ' + month + ' - ' + year);
                      setButtonduzenledate(year + '-' + month + '-' + day)
                    }}
                    onCancel={() => {
                      setDduzenledateopen(false)
                    }}
                    title='Tarih Seçiniz'
                    cancelText='İptal'
                    confirmText='Tamam'
                  />
                <View style={{flexDirection:'row-reverse'}}>
                    <Button icon="close" mode='text' onPress={() => setDduzenlemodalvisible(false)} style={{marginHorizontal:5 , marginVertical:10}}>
                      İptal
                    </Button>
                    <Button icon="delete" mode='contained' onPress={dsilkaydetmodal} 
                            style={{marginHorizontal:5 , marginVertical:10 , backgroundColor:theme.colors.error}}
                            loading={dsilbuttonloading} disabled={dsilbuttonloading}
                            >
                      Sil
                    </Button>
                    <Button icon="pencil" mode='contained' onPress={dduzenlekaydetmodal} 
                    style={{marginHorizontal:5 , marginVertical:10}}
                    loading={dduzenlebuttonloading} disabled={dduzenlebuttonloading}
                    >
                      Düzenle
                    </Button>
                </View>
              </Modal>
            </Portal>
            <Portal>
              <Modal visible={dsilmodalvisible} onDismiss={() =>{setDsilmodalvisible(false)}} contentContainerStyle={{marginHorizontal:20 , 
                  marginVertical:50 , backgroundColor:'white' , 
                  borderRadius:10 , shadowOffset:2 , shadowColor:'black' , 
                  justifyContent:'flex-start',paddingHorizontal:10
                  }}>
                <Text style={{textAlign:'center',fontSize:18,marginVertical:20 , fontWeight:'bold'}}>Deneyim Sil</Text>
                  <View
                      style={{
                        borderBottomColor: 'black',
                        borderBottomWidth: StyleSheet.hairlineWidth,
                      }}
                  />
              </Modal>
            </Portal>
          </ScrollView>
        
        )
      }
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  wrapper: {
    width: '100%',
    marginVertical:5,
    padding:5,
    alignItems: 'center',
  },
});

export default DeneyimScreen;