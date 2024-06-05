import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import React, { useState, useEffect } from "react";
import { firebase } from "../../firebase";
import { ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "../theme/Colors";

const ChatList = ({ userId }) => {
  const [chatList, setChatList] = useState([]);
  const [loader, setLoader] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    getChatList()
      .then((res) => {
        setChatList(res);
        setLoader(false);
      })
      .catch((error) => console.log(error));
  }, [userId]);

  const onNavigate = (contactId) => {
    navigation.navigate("ChatScreen", {
      userId: userId,
      contactId: contactId,
    });
  };
  const getChatList = async () => {
    const userRef = firebase.firestore().collection("users").doc(userId);
    // console.log("userREf",userRef);

    const allChatDoc = await firebase
      .firestore()
      .collection("chats")
      .where("participents", "array-contains", userRef)
      .get();
    // console.log("ALLCHATdOC",allChatDoc)

    const chatData = await Promise.all(
      allChatDoc.docs.map(async (chatDoc) => {
        const data = chatDoc.data();

        const participents = await Promise.all(
          data.participents
            .filter((item) => {
              return item.id != userId;
            })
            .map(async (user) => {
              const userDoc = await user.get();
              const userData = userDoc.data();

              const id = user?.id;
              const name = userData?.name;
              const profile = await firebase
                .storage()
                .ref(userData?.profile)
                .getDownloadURL();

              // console.log("user",id ,' ', name,' ' ," ", profile)
              return { id, name, profile };
            })
        );

        const chatDocRef = chatDoc.ref;
        const lastMessageDoc = await chatDocRef
          .collection("messages")
          .orderBy("timeStamp", "desc")
          .limit(1)
          .get();

        //   console.log(lastMessageDoc?.docs?.length)
        const lastMessage = lastMessageDoc?.docs?.length
          ? lastMessageDoc.docs[0].data()
          : {};
        // console.log("participents ", participents[0]);
        return {
          lastMessage,
          otherUser: participents[0],
        };
      })
    );

    return chatData;
  };

  return (
    <View>
      {loader ? (
        <ActivityIndicator size="large" color="red" />
      ) : (
        <View>
          {chatList.map((item) => {
            return (
              <View key={item.otherUser?.id}>
                <TouchableOpacity
                  style={styles.container}
                  onPress={() => onNavigate(item.otherUser?.id)}
                >
                  <View style={styles.leftContainer}>
                    {item.otherUser?.profile && (
                      <Image
                        source={{ uri: item.otherUser?.profile }}
                        style={styles.profileImg}
                      />
                    )}
                    <View>
                      <Text style={styles.username}>
                        {item.otherUser?.name}
                      </Text>
                      <Text style={styles.message}>
                        {item.lastMessage?.body.length < 10
                          ? item.lastMessage?.body
                          : item.lastMessage?.body.slice(0, 10)}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.rightContainer}>
                    <Text style={styles.timeStamp}>
                      {item.lastMessage?.timeStamp.toDate().toDateString()}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  profileImg: {
    borderRadius: 50,
    height: 40,
    width: 40,
    marginRight: 15,
  },
  container: {
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  username: {
    color: "white",
    fontSize: 16,
  },
  message: {
    color: Colors.tertiary,
    fontSize: 14,
    marginTop: 5,
  },
  leftContainer: {
    flexDirection: "row",
  },
  timeStamp: {
    color: Colors.tertiary,
    fontSize: 12,
  },
  muteIcon: {
    marginTop: 5,
    marginLeft: 20,
  },
});

export default ChatList;
