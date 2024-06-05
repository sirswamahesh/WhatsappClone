import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import Profile from "../assets/user1.jpeg";
import { StyleSheet } from "react-native";
import { Colors } from "../theme/Colors";
import VectorIcon from "../utils/VectorIcon";
import * as ImagePicker from "expo-image-picker";
import ModalGo from "../utils/ModalGo";

const MyStatus = ({ setLoadData }) => {
  const [statusImg, setStatusImg] = useState();

  const [statusData, setStatusData] = useState({
    statusImg: "",
    statusCaption: "",
  });

  const [showStatusModal, setShowStatusModal] = useState(false);
  const getImgFromDevice = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      quality: 1,
      allowsEditing: true,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      console.log("uri", uri);
      setStatusData((prev) => ({ ...prev, statusImg: uri }));
      setStatusImg(uri);
      setShowStatusModal(true);
    }
  };

  return (
    <>
      <TouchableOpacity style={styles.container} onPress={getImgFromDevice}>
        <Image source={Profile} style={styles.profileImg} />
        <View style={styles.addIcon}>
          <VectorIcon
            type="AntDesign"
            name="pluscircle"
            size={20}
            color={Colors.white}
          />
        </View>
        <View style={styles.innerStatusContainer}>
          <Text style={styles.myStatus}>MyStatus</Text>
          <Text style={styles.addStatus}>Tap to add status update</Text>
        </View>
      </TouchableOpacity>
      {showStatusModal ? (
        <ModalGo
          img={statusImg}
          setShowStatusModal={setShowStatusModal}
          showStatusModal={showStatusModal}
          setStatusData={setStatusData}
          setLoadData={setLoadData}
        />
      ) : (
        ""
      )}
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 15,
    padding: 16,
  },
  profileImg: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },

  myStatus: {
    fontSize: 16,
    color: Colors.white,
  },
  addStatus: {
    fontSize: 13,
    color: Colors.tertiary,
  },
  addIcon: {
    backgroundColor: Colors.textGrey,
    width: 20,
    height: 20,
    borderRadius: 50,
    position: "absolute",
    bottom: 14,
    left: 48,
  },
});
export default MyStatus;
