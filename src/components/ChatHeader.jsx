import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import Profile from "../assets/user1.jpeg";
import { Colors } from "../theme/Colors";
import Icon from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Entypo from "react-native-vector-icons/Entypo";
import { useNavigation } from "@react-navigation/native";
const ChatHeader = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <Icon name="arrow-back" size={25} color={Colors.white} onPress={()=>navigation.goBack()} />
        <Image source={Profile} style={styles.profilePhoto} />
        <Text style={styles.username}>Kaju</Text>
      </View>
      <View style={styles.rightContainer}>
        <Icon name="videocam" size={22} color={Colors.white} />
        <FontAwesome name="phone" size={22} color={Colors.white} />
        <Entypo name="dots-three-vertical" size={20} color={Colors.white} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primaryColor,
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent:"space-between"

  },
  leftContainer:{
    flexDirection: "row",
    alignItems: "center",
  },
  rightContainer:{
    flexDirection: "row",
    alignItems: "center",
    gap:20,
  },
  profilePhoto: {
    height: 40,
    width: 40,
    borderRadius: 50,
    marginLeft: 10,
  },
  username: {
    fontSize: 17,
    color: Colors.white,
    marginLeft: 10,
  },
});
export default ChatHeader;
