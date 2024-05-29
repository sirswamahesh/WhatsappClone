import { View, Text, StyleSheet } from "react-native";
import React from "react";
import VectorIcon from "../utils/VectorIcon";
import { Colors } from "../theme/Colors";

const CallLink = () => {
  return (
    <View style={styles.container}>
      <View style={styles.linkIcon}>
        <VectorIcon type="Feather" name="link-2" size={25} color="black" />
      </View>
      <View>
        <Text style={styles.createCallLinkText}>Create call link</Text>
        <Text style={styles.shareCallLinkText}>
          Share a link for your Whatsapp call
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },

  linkIcon: {
    backgroundColor: Colors.tertiary,
    width: 55,
    height: 55,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
  },
  createCallLinkText: {
    color: Colors.white,
    fontSize: 18,
  },
  shareCallLinkText: {
    color: Colors.textGrey,
    fontSize: 15,
  },
});
export default CallLink;
