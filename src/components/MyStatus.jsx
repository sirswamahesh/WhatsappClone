import { View, Text, Image } from "react-native";
import React from "react";
import Profile from "../assets/user1.jpeg";
import { StyleSheet } from "react-native";
import { Colors } from "../theme/Colors";
import VectorIcon from "../utils/VectorIcon";

const MyStatus = () => {
  return (
    <View style={styles.container}>
      <Image source={Profile} style={styles.profileImg} />
      <View style={styles.addIcon}>

    <VectorIcon type="AntDesign" name="pluscircle" size={20} color={Colors.white}/>
      </View>
      <View style={styles.innerStatusContainer}>
        <Text style={styles.myStatus}>MyStatus</Text>
        <Text style={styles.addStatus}>Tap to add status update</Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 15,
   
  },
  profileImg: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  innerStatusContainer: {},
  myStatus: {
    fontSize: 16,
    color: Colors.white,
  },
  addStatus: {
    fontSize: 13,
    color: Colors.tertiary,
  },
  addIcon:{
    backgroundColor:Colors.textGrey,
    width:20,
    height:20,
    borderRadius:50,
    position:"absolute",
    bottom:0,
    left:33,
  }
});
export default MyStatus;
