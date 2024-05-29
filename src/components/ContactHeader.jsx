import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import VectorIcon from "../utils/VectorIcon";
import { Colors } from "../theme/Colors";
import { useNavigation } from "@react-navigation/native";

const ContactHeader = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.containerLeft}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <VectorIcon
            type="AntDesign"
            name="arrowleft"
            size={25}
            color="white"
          />
        </TouchableOpacity>
        <View>
          <Text style={styles.selectContact}>Select contact</Text>
          <Text style={styles.Contact}>108 contacts</Text>
        </View>
      </View>
      <View style={styles.headerIcon}>
        <VectorIcon type="AntDesign" name="search1" size={20} color="white" />
        <VectorIcon
          type="Entypo"
          name="dots-three-vertical"
          size={20}
          color="white"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: Colors.background,
  },
  containerLeft: {
    flexDirection: "row",
    gap: 20,
    alignItems: "center",
  },
  headerIcon: {
    flexDirection: "row",
    gap: 20,
  },
  selectContact: {
    color: "white",
    fontSize: 18,
  },
  Contact: {
    color: "white",
  },
});

export default ContactHeader;
