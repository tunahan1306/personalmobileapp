import { StyleSheet, Text, View } from 'react-native'
import React, {createContext, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const PostContext = createContext();

export const PostProvider = ({children}) => {

    const [posts, setPosts ] = useState({});

    const getMainPage = () =>{
        axios
      .post(`${BASE_URL}/get_`)
      .then(res => {
        setPosts(res.data);
        AsyncStorage.setItem('posts', JSON.stringify(res.data));
        console.log(res.data);
      })
      .catch(e => {
        console.log(`register error ${e}`);
      });
    }

  return (
    <PostContext.Provider
      value={{
        posts,
        getMainPage
      }}>
      {children}
    </PostContext.Provider>
  )
}


