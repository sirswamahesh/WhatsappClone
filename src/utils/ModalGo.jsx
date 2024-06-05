import {
  View,
  StyleSheet,
  Modal,
  Image,
  Text,
  TouchableOpacity,
  TouchableHighlight,
} from "react-native";
import React, { useState } from "react";
import { Colors } from "../theme/Colors";
import VectorIcon from "./VectorIcon";
import { useNavigation } from "@react-navigation/native";
import ChatFooter from "../components/ChatFooter";
import StatusInput from "../components/StatusInput";

const ModalGo = (props) => {
  const navigation = useNavigation();

  const {
    showStatusModal,
    setShowStatusModal,
    img,
    setStatusData,
    setLoadData,
  } = props;

  const updateModalStatus = () => {
    setShowStatusModal(false);
  };

  // console.log(">>>>>>>>>>>>>", statusData);
  return (
    <Modal
      animationType="fade"
      visible={showStatusModal}
      onRequestClose={updateModalStatus}
    >
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <View style={styles.profileSection}>
            <TouchableOpacity onPress={updateModalStatus}>
              <VectorIcon
                name="cross"
                type="Entypo"
                size={24}
                color={Colors.white}
              />
            </TouchableOpacity>
            <Image source={{ uri: img }} style={styles.profileImg} />
            <Text style={styles.username}>My Status</Text>
          </View>
        </View>
        <View style={styles.imgBox}>
          <Image source={{ uri: img }} style={styles.storyImg} />
        </View>
        <View style={styles.footer}>
          <StatusInput
            img={img}
            setStatusData={setStatusData}
            setShowStatusModal={setShowStatusModal}
            setLoadData={setLoadData}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  imgBox: {
    height: "80%",
  },
  storyImg: {
    height: "100%",
    width: "100%",
  },
  footer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
  storyMsg: {
    fontSize: 17,
    color: Colors.white,
    textAlign: "center",
  },
  container: {
    backgroundColor: Colors.primaryColor,
    flex: 1,
    // justifyContent: "space-between",
  },
  profileImg: {
    height: 40,
    width: 40,
    borderRadius: 50,
    marginLeft: 5,
  },
  username: {
    fontSize: 17,
    color: Colors.white,
    marginLeft: 10,
  },
  topContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 10,
    justifyContent: "space-between",
  },
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
    // marginBottom: 20,
  },
  reply: {
    fontSize: 15,
    color: Colors.white,
    textAlign: "center",
    marginBottom: 10,
  },
  replySection: {
    alignItems: "center",
  },
});

export default ModalGo;
