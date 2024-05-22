import React from "react";
import { Text, View, Image, StyleSheet } from "react-native";
import Whatsapp_logo from "../assets/WhatsApp_logo.png";
import { Colors } from "../theme/Colors";
import Icon from "react-native-vector-icons/Ionicons";

const Header = () => {
  return (
    <View style={styles.container}>
      <Image source={Whatsapp_logo} style={styles.logoStyle} />
      <View style={styles.headerIcons}>
        <Icon name="camera-outline" size={25} color={Colors.secondaryColor} />
        <Icon name="search" size={25} color={Colors.secondaryColor} />
        <Icon
          name="ellipsis-vertical"
          size={25}
          color={Colors.secondaryColor}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primaryColor,
    padding: 16,
    flexDirection:"row",
    justifyContent:"space-between"
  },
  logoStyle: {
    height: 25,
    width: 110,
  },
  headerIcons:{
    flexDirection:"row",
    gap:15
  }
});

export default Header;
