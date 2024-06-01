import {
  View,
  Text,
  Image,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Colors } from "../theme/Colors";
import { firebase } from "../../firebase";
import { useNavigation } from "@react-navigation/native";

const ContactList = ({ userId }) => {
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(true);
  const navigation = useNavigation();

  const onNavigate = (contactId) => {
    navigation.navigate("ChatScreen", {
      userId: userId,
      contactId: contactId,
    });
  };
  console.log("userid", userId);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userRef = await firebase.firestore().collection("users").get();

        // Create an array of promises to fetch profile images
        const users = await Promise.all(
          userRef.docs
            .filter((item) => {
              return item.id !== userId;
            })
            .map(async (doc) => {
              const { name, profile, bio } = doc.data();

              // Fetch profile image URL from Firebase Storage
              const profileImageURL = await firebase
                .storage()
                .ref(profile)
                .getDownloadURL();

              return {
                id: doc.id,
                name,
                bio,
                profileImageURL,
              };
            })
        );

        setData(users);
        setLoader(false);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.whatsappContacts}>Contacts on Whatsapp</Text>
      {loader ? (
        <ActivityIndicator size="large" color="#fff" />
      ) : (
        <>
          {data.map((user, index) => (
            <TouchableOpacity
              style={styles.userBox}
              key={index}
              onPress={() => onNavigate(user.id)}
            >
              <Image
                source={{ uri: user.profileImageURL }}
                style={styles.profileImg}
              />
              <View>
                <Text style={styles.username}>{user.name}</Text>
                <Text style={styles.bio}>{user.bio}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </>
      )}
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
