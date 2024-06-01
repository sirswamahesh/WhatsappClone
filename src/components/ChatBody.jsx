import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { StyleSheet } from "react-native";
import { Colors } from "../theme/Colors";
import VectorIcon from "../utils/VectorIcon";
import MessagesData from "../data/MessageData";
import { firebase } from "../../firebase";
const ChatBody = ({ userId, chatId }) => {
  const scrollViewRef = useRef();
  // const userId = "1jdfnvchjkd";
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    try {
      firebase
        .firestore()
        .collection("chats")
        .doc(chatId)
        .collection("messages")
        .orderBy("timeStamp")
        .onSnapshot((snapShot) => {
          const allMessages = snapShot.docs.map((snap) => {
            return snap.data();
          });
          setMessages(allMessages);
        });
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  }, [chatId]);

  const UserMessageView = ({ message, fullTime }) => {
    const time = fullTime?.toDate().toTimeString().slice(0, 5);
    return (
      <View style={styles.userContainer}>
        <View style={styles.userInnnerContainer}>
          <Text style={styles.message}>{message}</Text>
          <Text style={styles.time}>{time}</Text>
          <VectorIcon
            type="FontAwesome6"
            name="check-double"
            color={Colors.blue}
            size={12}
          />
        </View>
      </View>
    );
  };

  const OtherUserMessageView = ({ message, fullTime }) => {
    const time = fullTime?.toDate().toTimeString().slice(0, 5);
    return (
      <View style={styles.otherUserContainer}>
        <View style={styles.otherUserInnnerContainer}>
          <Text style={styles.message}>{message}</Text>
          <Text style={styles.time}>{time}</Text>
          <VectorIcon
            type="FontAwesome6"
            name="check-double"
            color={Colors.blue}
            size={12}
          />
        </View>
      </View>
    );
  };

  const scrollToBottom = () => {
    scrollViewRef.current.scrollToEnd({ animated: true });
  };
  return (
    <>
      <ScrollView
        ref={scrollViewRef}
        showsVerticalScrollIndicator={false}
        onContentSizeChange={scrollToBottom}
      >
        {messages.map((item, index) => (
          <View style={styles.messageContainer} key={index}>
            {item.sender === userId ? (
              <UserMessageView message={item.body} fullTime={item.timeStamp} />
            ) : (
              <OtherUserMessageView
                message={item.body}
                fullTime={item.timeStamp}
              />
            )}
          </View>
        ))}
      </ScrollView>
      <TouchableOpacity
        style={styles.scroolDownArrow}
        onPress={() => scrollToBottom()}
      >
        <VectorIcon
          type="Fontisto"
          name="angle-dobule-down"
          color={Colors.white}
          size={12}
        />
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  userContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  otherUserContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  userInnnerContainer: {
    backgroundColor: Colors.teal,
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderTopLeftRadius: 30,
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
    flexDirection: "row",
    alignItems: "center",
  },
  message: {
    fontSize: 13,
    color: Colors.white,
  },

  time: {
    fontSize: 10,
    color: Colors.white,
    marginHorizontal: 5,
  },
  otherUserInnnerContainer: {
    backgroundColor: Colors.primaryColor,
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderTopRightRadius: 30,
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
    flexDirection: "row",
    alignItems: "center",
  },
  messageContainer: {
    gap: 5,
    marginBottom: 5,
  },
  scroolDownArrow: {
    backgroundColor: Colors.primaryColor,
    borderRadius: 50,
    height: 40,
    width: 40,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 10,
    right: 10,
  },
});

export default ChatBody;
