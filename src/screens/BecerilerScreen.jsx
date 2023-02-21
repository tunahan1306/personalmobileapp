import React, {useContext, useState , useEffect} from 'react';
import axios from 'axios';
import { BASE_URL } from '../config';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  SafeAreaView,

} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import Toast from 'react-native-toast-message';
import { List , ProgressBar, useTheme , Portal , FAB , Modal , TextInput , Button} from 'react-native-paper';
import Slider from '@react-native-community/slider';
import {Picker} from '@react-native-picker/picker';


const BecerilerScreen = () => {

  const [post, setPost] = useState(null)

  const theme = useTheme();

  const [btipieklevisible , setBtipieklevisible] = useState(false)

  const [btipiduzenlevisible , setBtipiduzenlevisible] = useState(false)

  const [btipisilvisible , setBtipisilvisible] = useState(false)

  const [beklevisible , setBeklevisible] = useState(false)

  const [bduzenlesilvisible , setBduzenlesilvisible] = useState(false)

  const [bekleslidervalue , setBekleslidervalue] = useState(0)

  const [buttonloading , setButtonloading] = useState(false)

  const [btipiekletitletext , setBtipiekletitletext] = useState()

  const [btipiekleicontext , setBtipiekleicontext] = useState()

  const [btipiduzenleselectedvalue , setBtipiduzenleselectedvalue] = useState()

  const [btipiduzenletitletext , setBtipiduzenletitletext] = useState()

  const [btipiduzenleicontext , setBtipiduzenleicontext] = useState()

  const [btipisilselectedvalue , setBtipisilselectedvalue] = useState()

  const [bduzenletitletext , setBduzenletitletext] = useState()

  const [bduzenleicontext , setBduzenleicontext] = useState()

  const [bduzenlebtipiselectedvalue , setBduzenlebtipiselectedvalue] = useState()

  const [bduzenleslidervalue , setBduzenleslidervalue] = useState()

  const [bduzenlecolorselectedvalue , setBduzenlecolorselectedvalue] = useState()

  const [beklecolorselectedvalue , setBeklecolorselectedvalue] = useState('gray')

  const [bduzenlebuttonloading , setBduzenlebuttonloading] = useState(false)

  const [bsilbuttonloading , setBsilbuttonloading] = useState(false)

  const [bduzenlesilid , setBduzenlesilid] = useState()

  const [bekletitletext , setBekletitletext] = useState()

  const [bekleicontext , setBekleicontext] = useState()

  const [beklebtipiselectedvalue , setBeklebtipiselectedvalue] = useState('')


  const btipiduzenleselection = ( value ) =>{
    setBtipiduzenleselectedvalue(value)

    if(value === ''){
      setBtipiduzenletitletext('')
      setBtipiduzenleicontext('')
    }else{
      post.map(function(item,i){
        if(item.id === value){
          setBtipiduzenletitletext(item.title)
          setBtipiduzenleicontext(item.icon)
        }
      })
    } 
  }

  const btipieklekaydetmodal = () => {
    console.log(btipiekletitletext + ' - ' + btipiekleicontext)
    setButtonloading(true)

    axios.post(`${BASE_URL}/set_skillstype`,{
      title:btipiekletitletext,
      icon:btipiekleicontext,
    }).then((response) => {
      console.log(response)

      setButtonloading(false)

      setPost(response.data.skillstype)

      setBtipieklevisible(false)

      Toast.show({
        type: 'success',
        text1: 'Yeni Beceri Tipi eklendi',
      });
    }).catch(function(error) {
      console.log('Hata: ' + error.message);
      setButtonloading(false)
      setBtipieklevisible(false)
      Toast.show({
        type: 'error',
        text1: 'Hata : ' + error.message,
      });
      });
  }

  const btipiduzenlekaydetmodal = () => {
    console.log(btipiduzenleselectedvalue + ' - ' + btipiduzenletitletext + ' - ' + btipiduzenleicontext)
    setButtonloading(true)

    axios.post(`${BASE_URL}/set_skillstype`,{
      id:btipiduzenleselectedvalue,
      title:btipiduzenletitletext,
      icon:btipiduzenleicontext,
    }).then((response) => {
      console.log(response)

      setButtonloading(false)

      setPost(response.data.skillstype)

      setBtipiduzenlevisible(false)

      Toast.show({
        type: 'success',
        text1: 'Beceri Tipi düzenlendi',
      });
    }).catch(function(error) {
      console.log('Hata: ' + error.message);
      setButtonloading(false)
      setBtipiduzenlevisible(false)
      Toast.show({
        type: 'error',
        text1: 'Hata : ' + error.message,
      });
      });
  }

  const btipisilkaydetmodal = () => {
    console.log(btipisilselectedvalue)
    setButtonloading(true)

    axios.post(`${BASE_URL}/delete_skillstype`,{
      id:btipisilselectedvalue,
    }).then((response) => {
      console.log(response)

      setButtonloading(false)

      setPost(response.data.skillstype)

      setBtipisilvisible(false)

      Toast.show({
        type: 'success',
        text1: 'Beceri Tipi silindi',
      });
    }).catch(function(error) {
      console.log('Hata: ' + error.message);
      setButtonloading(false)
      setBtipisilvisible(false)
      Toast.show({
        type: 'error',
        text1: 'Hata : ' + error.message,
      });
      });
  }

  const duzenlemodal = (event , id) => {
    console.log(id)

    setBduzenlesilid(id)

    post.map(function(item,i){
      item.skills.map(function(exper,j){
        if(exper.id === id){
          setBduzenletitletext(exper.title)
          setBduzenleicontext(exper.icon)
          setBduzenlebtipiselectedvalue(item.id)
          setBduzenlecolorselectedvalue(exper.color)
          setBduzenleslidervalue(Number(exper.value))
          setBduzenlesilvisible(true)
        }
      })
    })
  }

  const beklekaydetmodal = () =>{
    console.log(bekletitletext + ' - ' + bekleicontext + ' - ' + beklebtipiselectedvalue + ' - ' + beklecolorselectedvalue + ' - ' + bekleslidervalue)
  
    if(beklebtipiselectedvalue === ''){
      Toast.show({
        type: 'error',
        text1: 'Hata : İlgili Alanları doldurunuz.',
      });
    }else{
      setButtonloading(true)

      axios.post(`${BASE_URL}/set_skills`,{
        title:bekletitletext,
        value:bekleslidervalue,
        color:beklecolorselectedvalue,
        icon:bekleicontext,
        skills_type:beklebtipiselectedvalue,
      }).then((response) => {
        console.log(response)
  
        setButtonloading(false)
  
        setPost(response.data.skillstype)
  
        setBeklevisible(false)
  
        Toast.show({
          type: 'success',
          text1: 'Beceri Eklendi',
        });
      }).catch(function(error) {
        setButtonloading(false)
        setBeklevisible(false)
        Toast.show({
          type: 'error',
          text1: 'Hata : ' + error.message,
        });
        });
    }
  }

  const bduzenlekaydetmodal = () => {
    console.log(bduzenlesilid+ ' - ' + bduzenletitletext + ' - ' + bduzenleicontext + ' - ' + bduzenlebtipiselectedvalue + ' - ' + bduzenlecolorselectedvalue + ' - ' + bduzenleslidervalue)
  
    if(!bduzenlesilid){
      Toast.show({
        type: 'error',
        text1: 'Hata : İlgili Alanları doldurunuz.',
      });
    }else{
      setBduzenlebuttonloading(true)

      axios.post(`${BASE_URL}/set_skills`,{
        id:bduzenlesilid,
        title:bduzenletitletext,
        value:bduzenleslidervalue,
        color:bduzenlecolorselectedvalue,
        icon:bduzenleicontext,
        skills_type:bduzenlebtipiselectedvalue,
      }).then((response) => {
        console.log(response)
  
        setBduzenlebuttonloading(false)
  
        setPost(response.data.skillstype)
  
        setBduzenlesilvisible(false)
  
        Toast.show({
          type: 'success',
          text1: 'Beceri Düzenlendi',
        });
      }).catch(function(error) {
        setBduzenlebuttonloading(false)
        setBduzenlesilvisible(false)
        Toast.show({
          type: 'error',
          text1: 'Hata : ' + error.message,
        });
        });
    }
  }

  const bsilkaydetmodal = () => {
    console.log(bduzenlesilid)

    if(bduzenlesilid === ''){
      Toast.show({
        type: 'error',
        text1: 'Hata : İlgili Alanları doldurunuz.',
      });
    }else{
      setBsilbuttonloading(true)

      axios.post(`${BASE_URL}/delete_skills`,{
        id:bduzenlesilid,
      }).then((response) => {
        console.log(response)
  
        setBsilbuttonloading(false)
  
        setPost(response.data.skillstype)
  
        setBduzenlesilvisible(false)
  
        Toast.show({
          type: 'success',
          text1: 'Beceri Silindi',
        });
      }).catch(function(error) {
        setBsilbuttonloading(false)
        setBduzenlesilvisible(false)
        Toast.show({
          type: 'error',
          text1: 'Hata : ' + error.message,
        });
        });
    }
  }

  const [state, setState] = useState({ open: false });

  const onStateChange = ({ open }) => setState({ open });

  const { open } = state;

  useEffect(() => {
    axios.get(`${BASE_URL}/get_skills`).then((response) => {
      console.log(response.data.skillstype)
      setPost(response.data.skillstype);

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
                          item.skills.map(function(exper , j){
                            return  <List.Item
                            title={exper.title}
                            titleStyle={{fontWeight:'bold'}}
                            description={exper.icon}
                            right={props => <ProgressBar {...props} progress={exper.value/100} color={exper.color} style={{width:150}}/>}
                            left={props => <Text {...props}>{exper.value}</Text>}
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
                    label: 'Beceri Tipi Ekle',
                    onPress: () => setBtipieklevisible(true),
                  },
                  {
                    icon: 'pencil',
                    label: 'Beceri Tipi Düzenle',
                    onPress: () => setBtipiduzenlevisible(true),
                  },
                  {
                    icon: 'delete',
                    label: 'Beceri Tipi Sil',
                    onPress: () => setBtipisilvisible(true),
                  },
                  {
                    icon: 'briefcase-plus',
                    label: 'Beceri Ekle',
                    onPress: () => setBeklevisible(true),
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
              <Modal visible={btipieklevisible} onDismiss={() =>{setBtipieklevisible(false)}} contentContainerStyle={{marginHorizontal:20 , 
                  marginVertical:50 , backgroundColor:'white' , 
                  borderRadius:10 , shadowOffset:2 , shadowColor:'black' , 
                  justifyContent:'flex-start',paddingHorizontal:10
                  }}>
                <Text style={{textAlign:'center',fontSize:18,marginVertical:20 , fontWeight:'bold'}}>Beceri Tipi Ekle</Text>
                <View
                      style={{
                        borderBottomColor: 'black',
                        borderBottomWidth: StyleSheet.hairlineWidth,
                      }}
                />
                <TextInput
                        label="Başlık"
                        value={btipiekletitletext}
                        onChangeText={text => setBtipiekletitletext(text)}
                        style={{marginVertical:10}}
                  />
                  <TextInput
                        label="İkon"
                        value={btipiekleicontext}
                        onChangeText={text => setBtipiekleicontext(text)}
                        style={{marginVertical:10}}
                  />
                  <Button icon="content-save-edit" mode='contained' onPress={btipieklekaydetmodal} loading={buttonloading}
                    disabled={buttonloading} style={{marginVertical:10}}>
                    Kaydet
                  </Button>

              </Modal>
            </Portal>
            <Portal>
              <Modal visible={btipiduzenlevisible} onDismiss={() =>{setBtipiduzenlevisible(false)}} contentContainerStyle={{marginHorizontal:20 , 
                  marginVertical:50 , backgroundColor:'white' , 
                  borderRadius:10 , shadowOffset:2 , shadowColor:'black' , 
                  justifyContent:'flex-start',paddingHorizontal:10
                  }}>
                <Text style={{textAlign:'center',fontSize:18,marginVertical:20 , fontWeight:'bold'}}>Beceri Tipi Düzenle</Text>
                  <View
                      style={{
                        borderBottomColor: 'black',
                        borderBottomWidth: StyleSheet.hairlineWidth,
                      }}
                />
                <Picker
                      selectedValue={btipiduzenleselectedvalue}
                      style={{ backgroundColor: theme.colors.secondaryContainer,marginVertical:10}}
                      onValueChange={(itemValue, itemIndex) => btipiduzenleselection( itemValue )}
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
                        value={btipiduzenletitletext}
                        onChangeText={text => setBtipiduzenletitletext(text)}
                        style={{marginVertical:10}}
                  />
                  <TextInput
                        label="İkon"
                        value={btipiduzenleicontext}
                        onChangeText={text => setBtipiduzenleicontext(text)}
                        style={{marginVertical:10}}
                  />
                  <Button icon="content-save-edit" mode='contained' onPress={btipiduzenlekaydetmodal} loading={buttonloading}
                    disabled={buttonloading} style={{marginVertical:10}}>
                    Kaydet
                  </Button>

              </Modal>
            </Portal>
            <Portal>
              <Modal visible={btipisilvisible} onDismiss={() =>{setBtipisilvisible(false)}} contentContainerStyle={{marginHorizontal:20 , 
                  marginVertical:50 , backgroundColor:'white' , 
                  borderRadius:10 , shadowOffset:2 , shadowColor:'black' , 
                  justifyContent:'flex-start',paddingHorizontal:10
                  }}>
                <Text style={{textAlign:'center',fontSize:18,marginVertical:20 , fontWeight:'bold'}}>Beceri Tipi Sil</Text>
                <View
                      style={{
                        borderBottomColor: 'black',
                        borderBottomWidth: StyleSheet.hairlineWidth,
                      }}
                />
                <Picker
                      selectedValue={btipisilselectedvalue}
                      style={{  backgroundColor: theme.colors.secondaryContainer,marginVertical:10}}
                      onValueChange={(itemValue, itemIndex) => setBtipisilselectedvalue( itemValue )}
                    >
                      <Picker.Item label='Seçiniz' value=''/>
                      {
                        post.map(function(item,i){
                          return <Picker.Item label={item.title} value={item.id}  key={'picker' + item.id}/>
                        })
                      }
                    </Picker>
                  <Button icon="delete" mode='contained' onPress={btipisilkaydetmodal} loading={buttonloading}
                    disabled={buttonloading} style={{marginVertical:10 , backgroundColor:theme.colors.error}}>
                    Sil
                  </Button>
              </Modal>
            </Portal>
            <Portal>
              <Modal visible={beklevisible} onDismiss={() =>{setBeklevisible(false)}} contentContainerStyle={{marginHorizontal:20 , 
                  marginVertical:50 , backgroundColor:'white' , 
                  borderRadius:10 , shadowOffset:2 , shadowColor:'black' , 
                  justifyContent:'flex-start',paddingHorizontal:10
                  }}>
                <Text style={{textAlign:'center',fontSize:18,marginVertical:20 , fontWeight:'bold'}}>Beceri Ekle</Text>
                  <View
                      style={{
                        borderBottomColor: 'black',
                        borderBottomWidth: StyleSheet.hairlineWidth,
                      }}
                />
                <TextInput
                        label="Başlık"
                        value={bekletitletext}
                        onChangeText={text => setBekletitletext(text)}
                        style={{marginVertical:10}}
                />
                <TextInput
                        label="İkon"
                        value={bekleicontext}
                        onChangeText={text => setBekleicontext(text)}
                        style={{marginVertical:10}}
                />
                <View style={{flexDirection: 'row', alignItems: 'center' , backgroundColor:'#c7d2fe' , marginVertical:10}}>
                <Text style={{justifyContent:'center' , fontSize:15 , paddingStart:10 , fontWeight:'bold'}}>Arka Plan : </Text>
                <Picker
                  selectedValue={beklecolorselectedvalue}
                  style={{ flex:1 , backgroundColor:'#c7d2fe'}}
                  onValueChange={(itemValue, itemIndex) => setBeklecolorselectedvalue(itemValue)}
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
                <View style={{flexDirection:'row'}}>
                  <Slider
                      style={{width: '100%', height: 40 }}
                      minimumValue={0}
                      maximumValue={100}
                      minimumTrackTintColor={theme.colors.primary}
                      thumbTintColor={theme.colors.primary}
                      maximumTrackTintColor="#FFFFFF"
                      value={bekleslidervalue}
                      step={1}
                      onValueChange={(data) => {setBekleslidervalue(data);}}
                    />
                </View>
                <Text>{bekleslidervalue}</Text>
                <Picker
                      selectedValue={beklebtipiselectedvalue}
                      style={{ backgroundColor: theme.colors.secondaryContainer,marginVertical:10}}
                      onValueChange={(itemValue, itemIndex) => setBeklebtipiselectedvalue( itemValue )}
                    >
                      <Picker.Item label='Seçiniz' value=''/>
                      {
                        post.map(function(item,i){
                          return <Picker.Item label={item.title} value={item.id}  key={'picker' + item.id}/>
                        })
                      }
                </Picker>
                <Button icon="content-save-edit" mode='contained' onPress={beklekaydetmodal} loading={buttonloading}
                    disabled={buttonloading} style={{marginVertical:10}}>
                    Kaydet
                </Button>
              </Modal>
            </Portal>
            <Portal>
              <Modal visible={bduzenlesilvisible} onDismiss={() =>{setBduzenlesilvisible(false)}} contentContainerStyle={{marginHorizontal:20 , 
                  marginVertical:50 , backgroundColor:'white' , 
                  borderRadius:10 , shadowOffset:2 , shadowColor:'black' , 
                  justifyContent:'flex-start',paddingHorizontal:10
                  }}>
                <Text style={{textAlign:'center',fontSize:18,marginVertical:20 , fontWeight:'bold'}}>Beceri Düzenle ve Sil</Text>
                <View
                      style={{
                        borderBottomColor: 'black',
                        borderBottomWidth: StyleSheet.hairlineWidth,
                      }}
                />
                <TextInput
                        label="Başlık"
                        value={bduzenletitletext}
                        onChangeText={text => setBduzenletitletext(text)}
                        style={{marginVertical:10}}
                />
                <TextInput
                        label="İkon"
                        value={bduzenleicontext}
                        onChangeText={text => setBduzenleicontext(text)}
                        style={{marginVertical:10}}
                />
                <View style={{flexDirection: 'row', alignItems: 'center' , backgroundColor:'#c7d2fe' , marginVertical:10}}>
                  <Text style={{justifyContent:'center' , fontSize:15 , paddingStart:10 , fontWeight:'bold'}}>Arka Plan : </Text>
                  <Picker
                    selectedValue={bduzenlecolorselectedvalue}
                    style={{ flex:1 , backgroundColor:'#c7d2fe'}}
                    onValueChange={(itemValue, itemIndex) => setBduzenlecolorselectedvalue(itemValue)}
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
                <View style={{flexDirection:'row'}}>
                  <Slider
                      style={{width: '100%', height: 40 }}
                      minimumValue={0}
                      maximumValue={100}
                      minimumTrackTintColor={theme.colors.primary}
                      thumbTintColor={theme.colors.primary}
                      maximumTrackTintColor="#FFFFFF"
                      value={bduzenleslidervalue}
                      step={1}
                      onValueChange={(data) => {setBduzenleslidervalue(data);}}
                    />
                </View>
                <Text>{bduzenleslidervalue}</Text>
                <Picker
                      selectedValue={bduzenlebtipiselectedvalue}
                      style={{ backgroundColor: theme.colors.secondaryContainer,marginVertical:10}}
                      onValueChange={(itemValue, itemIndex) => setBduzenlebtipiselectedvalue( itemValue )}
                    >
                      {
                        post.map(function(item,i){
                          return <Picker.Item label={item.title} value={item.id}  key={'picker' + item.id}/>
                        })
                      }
                </Picker>
                <View style={{flexDirection:'row-reverse'}}>
                    <Button icon="close" mode='text' onPress={() => setBduzenlesilvisible(false)} style={{marginHorizontal:5 , marginVertical:10}}>
                      İptal
                    </Button>
                    <Button icon="delete" mode='contained' onPress={bsilkaydetmodal} 
                            style={{marginHorizontal:5 , marginVertical:10 , backgroundColor:theme.colors.error}}
                            loading={bsilbuttonloading} disabled={bsilbuttonloading}
                            >
                      Sil
                    </Button>
                    <Button icon="pencil" mode='contained' onPress={bduzenlekaydetmodal} 
                    style={{marginHorizontal:5 , marginVertical:10}}
                    loading={bduzenlebuttonloading} disabled={bduzenlebuttonloading}
                    >
                      Düzenle
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
    alignItems: 'center',
  },
  wrapper: {
    width: '100%',
    marginVertical:5,
    padding:5,
  },
});

export default BecerilerScreen;