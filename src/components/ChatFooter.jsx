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
const ChatFooter = ({ chatRef, userId }) => {
  const [message, setMessage] = useState("");
  const [sendEnable, setSendEnable] = useState(false);

  const onChangeHandler = (text) => {
    setMessage(text);
    setSendEnable(true);
  };

  const onSendHandler = async () => {
    chatRef.collection("messages").add({
      body: message,
      sender: userId,
      timeStamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setMessage("");
    setSendEnable(false);
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
            placeholder="Message..."
            placeholderTextColor={Colors.textGrey}
            style={styles.textInput}
            value={message}
            onChangeText={(text) => onChangeHandler(text)}
          />
        </View>
        <View style={styles.row2}>
          <VectorIcon
            type="Entypo"
            name="attachment"
            size={20}
            color={Colors.white}
          />
          {!sendEnable && (
            <>
              <VectorIcon
                type="FontAwesome"
                name="rupee"
                size={20}
                color={Colors.white}
              />
              <VectorIcon
                type="FontAwesome"
                name="camera"
                size={20}
                color={Colors.white}
              />
            </>
          )}
        </View>
      </View>
      <View>
        {sendEnable ? (
          <TouchableOpacity style={styles.sendIcon} onPress={onSendHandler}>
            <VectorIcon
              type="MaterialCommunityIcons"
              name="send"
              size={20}
              color={Colors.white}
            />
          </TouchableOpacity>
        ) : (
          <View style={styles.microIcon}>
            <VectorIcon
              type="FontAwesome"
              name="microphone"
              size={20}
              color={Colors.white}
            />
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.black,
    paddingVertical: 12,
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

export default ChatFooter;
