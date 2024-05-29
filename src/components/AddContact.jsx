import { View, Text, StyleSheet } from "react-native";
import React from "react";
import VectorIcon from "../utils/VectorIcon";
import { Colors } from "../theme/Colors";

const AddContact = () => {
  return (
    <View style={styles.container}>
      <View style={styles.newGroup}>
        <View style={styles.iconContainer}>
          <VectorIcon
            type="AntDesign"
            name="addusergroup"
            size={25}
            color={Colors.black}
          />
        </View>
        <Text style={styles.newGroupTitle}>New Group</Text>
      </View>
      <View style={[styles.newContact, styles.newGroup]}>
        <View style={styles.iconContainer}>
          <VectorIcon
            type="AntDesign"
            name="adduser"
            size={25}
            color={Colors.black}
          />
        </View>
        <Text style={styles.newGroupTitle}>New Contact</Text>
      </View>
      <View style={styles.newGroup}>
        <View style={styles.iconContainer}>
          <VectorIcon
            type="FontAwesome5"
            name="users"
            size={25}
            color={Colors.black}
          />
        </View>
        <Text style={styles.newGroupTitle}>New Community</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  newGroup: {
    flexDirection: "row",
    gap: 15,
    alignItems: "center",
  },

  newContact: {
    marginVertical: 15,
  },
  iconContainer: {
    backgroundColor: Colors.tertiary,
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
  },
  newGroupTitle: {
    fontSize: 17,
    color: Colors.white,
  },
  container: {
    backgroundColor: Colors.background,
    padding: 16,
  },
});
export default AddContact;
