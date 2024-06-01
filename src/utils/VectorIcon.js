import React from "react";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Entypo from "react-native-vector-icons/Entypo";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";
import Fontisto from "react-native-vector-icons/Fontisto";
import AntDesign from "react-native-vector-icons/AntDesign";
import Ionicons from "react-native-vector-icons/Ionicons";
import Feather from "react-native-vector-icons/Feather";

const iconSets = {
  MaterialIcons,
  Ionicons,
  Entypo,
  Fontisto,
  FontAwesome,
  FontAwesome5,
  FontAwesome6,
  AntDesign,
  Feather,
  MaterialCommunityIcons,
};

const VectorIcon = ({ type, name, size, color }) => {
  const IconComponent = iconSets[type];
  return <IconComponent name={name} size={size} color={color} />;
};

export default VectorIcon;
