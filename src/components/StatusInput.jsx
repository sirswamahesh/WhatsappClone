import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";

import { Colors } from "../theme/Colors";
import VectorIcon from "../utils/VectorIcon";
import { firebase } from "../../firebase";

const StatusInput = ({
  setStatusData,
  setShowStatusModal,
  img,
  setLoadData,
}) => {
  const [message, setMessage] = useState("");
  const [inputHeight, setInputHeigth] = useState(40);

  const MAX_HEIGHT = 100;
  const onChangeHandler = (text) => {
    setMessage(text);
  };

  const generateUniqueId = () => {
    const timestamp = new Date().getTime().toString(36);
    const randomNumber = Math.random().toString(36);
    const uniqueId = timestamp + randomNumber;
    return uniqueId;
  };

  const onSendHandler = async () => {
    const uniqueId = generateUniqueId();

    setStatusData((prev) => ({ ...prev, statusCaption: message }));
    if (!img) return;

    console.log("imgs", img, uniqueId);

    const response = await fetch(img);
    const blob = await response.blob();
    const ref = firebase.storage().ref().child(`status/${uniqueId}user.jpeg`);

    ref
      .put(blob)
      .then(async () => {
        await firebase
          .firestore()
          .collection("status")
          .add({
            caption: message,
            name: "INFINIX",
            status: `status/${uniqueId}user.jpeg`,
            timeStamp: firebase.firestore.FieldValue.serverTimestamp(),
          });
      })
      .catch((error) => {
        console.error("Error uploading image: ", error);
        alert("Error uploading image.");
      });
    setMessage("");
    setLoadData((prev) => !prev);
    setShowStatusModal(false);
  };
  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <View style={styles.row1}>
          <VectorIcon
            type="MaterialIcons"
            name="emoji-emotions"
            size={22}
            color={Colors.white}
          />
          <TextInput
            placeholder="Add Caption..."
            placeholderTextColor={Colors.textGrey}
            style={[
              styles.textInput,
              { height: Math.min(MAX_HEIGHT, inputHeight) },
            ]}
            value={message}
            onChangeText={(text) => onChangeHandler(text)}
            onContentSizeChange={(event) => {
              setInputHeigth(event.nativeEvent.contentSize.height);
            }}
            multiline={true}
            scrollEnabled={MAX_HEIGHT < inputHeight}
          />
        </View>
      </View>
      <View>
        <TouchableOpacity style={styles.sendIcon} onPress={onSendHandler}>
          <VectorIcon
            type="MaterialCommunityIcons"
            name="send"
            size={20}
            color={Colors.white}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.black,
    paddingVertical: 22,
    paddingHorizontal: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  row1: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
  },
  row2: {
    flexDirection: "row",
    gap: 20,
  },
  leftContainer: {
    width: "85%",
    flexDirection: "row",
    backgroundColor: Colors.primaryColor,
    borderRadius: 30,
    paddingHorizontal: 15,
    paddingVertical: 10,
    justifyContent: "space-between",
    alignItems: "center",
  },
  textInput: {
    fontSize: 18,
    color: Colors.white,
    maxWidth: "83%",
    minWidth: "auto",
    flex: 1,
  },
  iconStyle: {
    marginHorizontal: 25,
  },

  sendIcon: {
    backgroundColor: Colors.teal,
    padding: 12,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "cetner",
  },
  microIcon: {
    justifyContent: "center",
    alignItems: "cetner",
    backgroundColor: Colors.teal,
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 50,
  },
});

export default StatusInput;
