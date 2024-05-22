import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { Colors } from "../theme/Colors";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { ChatListData } from "../data/ChatListData";
import { useNavigation } from "@react-navigation/native";

const ChatList = () => {
  const navigation = useNavigation();
  const onNavigate = () => {
    navigation.navigate("ChatScreen");
  };
  return (
    <>
      {ChatListData.map((user) => (
        <View key={user.id}>

          <TouchableOpacity onPress={onNavigate}  style={styles.container}>
            <View style={styles.leftContainer}>
              <Image source={user.profile} style={styles.profileImg} />
              <View>
                <Text style={styles.username}>{user.name}</Text>
                <Text style={styles.message}>{user.message}</Text>
              </View>
            </View>
            <View style={styles.rightContainer}>
              <Text style={styles.timeStamp}>{user.time}</Text>
              {user.mute ? (
                <MaterialCommunityIcons
                  style={styles.muteIcon}
                  name="volume-variant-off"
                  size={22}
                  color={Colors.secondaryColor}
                />
              ) : (
                ""
              )}
            </View>
          </TouchableOpacity>
        </View>
       
      ))}
    </>
  );
};

const styles = StyleSheet.create({
  profileImg: {
    borderRadius: 50,
    height: 40,
    width: 40,
    marginRight: 15,
  },
  container: {
    backgroundColor: Colors.background,
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  username: {
    color: Colors.textColor,
    fontSize: 16,
  },
  message: {
    color: Colors.textGrey,
    fontSize: 14,
    marginTop: 5,
  },
  leftContainer: {
    flexDirection: "row",
  },
  timeStamp: {
    color: Colors.textGrey,
    fontSize: 12,
  },
  muteIcon: {
    marginTop: 5,
    marginLeft: 20,
  },
});

export default ChatList;
