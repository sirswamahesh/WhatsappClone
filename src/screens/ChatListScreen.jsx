import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import ChatList from "../components/ChatList";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Colors } from "../theme/Colors";
import { StyleSheet } from "react-native";
const ChatListScreen = () => {
  return (
    <View style={styles.container}>
      <ScrollView>
        <ChatList />
      </ScrollView>

      <TouchableOpacity style={styles.contectIcon}>
        <MaterialCommunityIcons
          name="message-reply-text"
          size={25}
          color={Colors.black}
        />
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    position: "relative",
  },
  contectIcon: {
    backgroundColor: Colors.tertiary,
    height: 60,
    width: 60,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 20,
    right: 20,
  },
});
export default ChatListScreen;
