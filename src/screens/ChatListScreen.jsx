import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import ChatList from "../components/ChatList";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Colors } from "../theme/Colors";
import { StyleSheet } from "react-native";
import VectorIcon from "../utils/VectorIcon";
import { useNavigation } from "@react-navigation/native";
const ChatListScreen = () => {
  const navigation = useNavigation();
  const navigate = () => {
    navigation.navigate("ContactScreen");
  };
  return (
    <View style={styles.container}>
      <ScrollView>
        <ChatList />
      </ScrollView>

      <TouchableOpacity style={styles.contectIcon} onPress={navigate}>
        <VectorIcon
          type="MaterialCommunityIcons"
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
