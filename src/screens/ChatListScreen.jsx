import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import ChatList from "../components/ChatList";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Colors } from "../theme/Colors";
import { StyleSheet } from "react-native";
import VectorIcon from "../utils/VectorIcon";
import { useNavigation } from "@react-navigation/native";
import { getDeviceId } from "../utils/helper";
import DeleteStatus from "../components/DeleteStatus";
const ChatListScreen = () => {
  const navigation = useNavigation();
  const [userId, setUserId] = useState("");
  useEffect(() => {
    let isMounted = true;

    const fetchDeviceId = () => {
      try {
        const id = getDeviceId();
        if (isMounted) {
          setUserId(id);
        }
      } catch (error) {
        console.error("Error fetching device ID:", error);
      }
    };

    fetchDeviceId();

    return () => {
      isMounted = false;
    };
  }, []);
  const navigate = () => {
    navigation.navigate("ContactScreen", { userId: userId });
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <ChatList userId={userId} />
      </ScrollView>
      {/* <DeleteStatus /> */}
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
    backgroundColor: Colors.background,
    flex: 1,
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
