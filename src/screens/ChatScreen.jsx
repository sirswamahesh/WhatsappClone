import { View, Text, ImageBackground } from "react-native";
import React from "react";
import ChatHeader from "../components/ChatHeader";
import ChatBody from "../components/ChatBody";
import ChatFooter from "../components/ChatFooter";
import wallpaper from "../assets/wallpaper.jpeg";
import { StyleSheet } from "react-native";
import { firebase } from "../../firebase";

const ChatScreen = (props) => {
  const { userId, contactId } = props.route.params;

  console.log("contact id :", contactId);
  console.log("device id : ", userId);

  const generateChatId = () => {
    const sortIds = [userId, contactId].sort();
    const chatId = sortIds.join("_");
    return chatId;
  };
  const chatId = generateChatId();

  const chatRef = firebase.firestore().collection("chats").doc(chatId);

  const userRef = firebase.firestore().collection("users").doc(userId);

  const contactUserRef = firebase
    .firestore()
    .collection("users")
    .doc(contactId);

  const createChatRoom = async () => {
    const chatSnapShot = await chatRef.get();
    if (!chatSnapShot.exists) {
      const participents = [userRef, contactUserRef];
      await chatRef.set({ participents });
    }
  };

  createChatRoom();
  return (
    <View style={styles.container}>
      <ChatHeader contactUserRef={contactUserRef} />
      <ImageBackground style={styles.bodyStyle} source={wallpaper}>
        <ChatBody userId={userId} chatId={chatId} />
      </ImageBackground>
      <ChatFooter chatRef={chatRef} userId={userId} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bodyStyle: {
    flex: 1,
    paddingHorizontal: 12,
    paddingTop: 5,
  },
});
export default ChatScreen;
