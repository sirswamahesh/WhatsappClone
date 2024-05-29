import { View, Text, Image, ScrollView, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import ContactListData from "../data/ContactListData";
import { Colors } from "../theme/Colors";
import { firebase } from "../../firebase";

const ContactList = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const snapshot = await firebase.firestore().collection("users").get();
        const userData = snapshot.docs.map((doc) => doc.data());
        setData(userData);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.whatsappContacts}>Contacts on Whatsapp</Text>
      {data.map((user) => (
        <View style={styles.userBox} key={user.id}>
          <Image source={user.userImg} style={styles.profile} />
          <View>
            <Text style={styles.username}>{user.name}</Text>
            {/* <Text style={styles.bio}>{user.bio}</Text> */}
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: Colors.background,
    marginBottom: 20,
  },
  userBox: {
    flexDirection: "row",
    paddingVertical: 10,
    gap: 20,
  },
  profileImg: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  whatsappContacts: {
    marginBottom: 15,
    color: Colors.textGrey,
  },
  username: {
    fontSize: 16,
    color: Colors.white,
  },
  bio: {
    fontSize: 13,
    color: Colors.textGrey,
  },
});

export default ContactList;
