import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "../screens/HomeScreen";
import AnaSayfaScreen from '../screens/AnaSayfaScreen';
import HakkindaScreen from '../screens/HakkindaScreen';
import IletisimScreen from '../screens/IletisimScreen';
import DeneyimScreen from '../screens/DeneyimScreen';
import BecerilerScreen from '../screens/BecerilerScreen';
import MesajlarScreen from '../screens/MesajlarScreen';
import Projects from "../screens/Projects";
import Project from "../screens/Project";
import NewProject from "../screens/NewProject";
import NewProjecttypeScreen from "../screens/NewProjecttypeScreen";
import ProjecttypeEditDelete from "../screens/ProjecttypeEditDelete";

const Stack = createStackNavigator();

const MainStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen}  options={{ headerShown:false }}/>
      <Stack.Screen name="AnaSayfa" component={AnaSayfaScreen} options={{ title:'Ana Sayfa Düzenleme Sayfası'}}/>
      <Stack.Screen name="Hakkinda" component={HakkindaScreen} options={{ title:'Hakkında Düzenleme Sayfası'}} />
      <Stack.Screen name="Deneyim" component={DeneyimScreen} options={{ title:'Deneyim Düzenleme Sayfası'}}  />
      <Stack.Screen name="Beceri" component={BecerilerScreen} options={{ title:'Beceriler Düzenleme Sayfası'}} />
      <Stack.Screen name="Mesaj" component={MesajlarScreen} options={{ title:'Mesajlar'}} />
      <Stack.Screen name="Iletisim" component={IletisimScreen} options={{ title:'İletişim Düzenleme Sayfası'}} />      
      <Stack.Screen name="Projeler" component={Projects} options={{ title:'Projeler'}} />   
      <Stack.Screen name="Proje" component={Project} options={{ headerShown:false }} />  
      <Stack.Screen name="NewProje" component={NewProject} options={{ headerShown:false }} />  
      <Stack.Screen name="NewProjeTipi" component={NewProjecttypeScreen} options={{ headerShown:false }}  />  
      <Stack.Screen name="ProjeTipiDuzenleSil" component={ProjecttypeEditDelete} options={{ headerShown:false }}  />  
    </Stack.Navigator>
  );
}

export default MainStackNavigator;