import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "../theme/Colors";
import { RecentStatusData } from "../data/RecentStatusData";
import FullModel from "../utils/FullModal";
import { firebase } from "../../firebase";
import { ActivityIndicator } from "react-native";
const RecentStatus = ({ loadData, setLoadData }) => {
  const [showStatusModal, setShowStatusModal] = useState(true);
  const [user, setUser] = useState(null);
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(true);
  const statusModel = (id) => {
    setShowStatusModal(true);

    const user = data.find((u) => u.id === id);
    setUser(user);
  };

  const setTimeUp = () => {
    setShowStatusModal(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userRef = await firebase.firestore().collection("status").get();

        // Create an array of promises to fetch profile images
        const users = await Promise.all(
          userRef.docs.map(async (doc) => {
            const { name, caption, status, timeStamp } = doc.data();

            // Fetch profile image URL from Firebase Storage
            const profileImageURL = await firebase
              .storage()
              .ref(status)
              .getDownloadURL();

            return {
              id: doc.id,
              name,
              caption,
              profileImageURL,
              timeStamp,
            };
          })
        );

        setData(users);
        setLoader(false);
      } catch (error) {
        console.log("hello");
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, [loadData]);
  return (
    <View style={styles.container}>
      <Text style={styles.recentStatus}>RecentStatus</Text>

      {loader ? (
        <ActivityIndicator />
      ) : (
        <View>
          {data.map((user) => (
            <TouchableOpacity
              style={styles.statusInfo}
              key={user.id}
              onPress={() => statusModel(user.id)}
            >
              <View style={styles.statusImgContainer}>
                <Image
                  source={{ uri: user.profileImageURL }}
                  style={styles.statusImg}
                />
              </View>
              <View>
                <Text style={styles.username}>{user.name}</Text>
                <Text style={styles.time}>
                  {user.timeStamp?.toDate().toTimeString().slice(0, 5)} PM
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {!!user && (
        <FullModel
          showStatusModal={showStatusModal}
          setShowStatusModal={setShowStatusModal}
          item={user}
          setTimeUp={setTimeUp}
          setLoadData={setLoadData}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // marginTop: 15,
    paddingHorizontal: 16,
  },
  recentStatus: {
    color: Colors.tertiary,
    marginBottom: 15,
  },
  statusImg: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  statusImgContainer: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    width: 55,
    height: 55,
    borderColor: Colors.tertiary,
    borderRadius: 50,
  },
  username: {
    color: Colors.white,
  },
  time: {
    color: Colors.tertiary,
    marginTop: 3,
  },
  statusInfo: {
    flexDirection: "row",
    gap: 15,
    marginBottom: 10,
  },
});
export default RecentStatus;
