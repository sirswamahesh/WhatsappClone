import { View, Text, ImageBackground } from "react-native";
import React from "react";
import ChatHeader from "../components/ChatHeader";
import ChatBody from "../components/ChatBody";
import ChatFooter from "../components/ChatFooter";
import  wallpaper from '../assets/wallpaper.jpeg'
import { StyleSheet } from "react-native";

const ChatScreen = () => {
  return (
    <View style={styles.container}>
      <ChatHeader />
      <ImageBackground style={styles.bodyStyle} source={wallpaper}>
    
        <ChatBody />

      </ImageBackground>
      <ChatFooter />
    </View>
  );
};

const styles = StyleSheet.create({
  container:{
    flex:1,
  },
  bodyStyle:{
    flex:1,
    paddingHorizontal:12,
    paddingTop:5,
  }
})
export default ChatScreen;
