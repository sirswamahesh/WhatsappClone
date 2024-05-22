import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import user1 from "../assets/user1.jpeg";
import { Colors } from "../theme/Colors";
import { RecentStatusData } from "../data/RecentStatusData";
import FullModel from "../utils/FullModal";

const RecentStatus = () => {
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [user, setUser] = useState(null);

  const statusModel = (id) => {
    setShowStatusModal(true);

    const user = RecentStatusData.find((u) => u.id === id);
    setUser(user);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.recentStatus}>RecentStatus</Text>
      {RecentStatusData.map((user) => (
        <View key={user.id}>
          <TouchableOpacity
            style={styles.statusInfo}
            key={user.id}
            onPress={() => statusModel(user.id)}
          >
            <View style={styles.statusImgContainer}>
              <Image source={user.storyImg} style={styles.statusImg} />
            </View>
            <View>
              <Text style={styles.username}>{user.name}</Text>
              <Text style={styles.time}>{user.time}</Text>
            </View>
          </TouchableOpacity>
        </View>
      ))}
      {!!user && (
        <FullModel
          showStatusModal={showStatusModal}
          setShowStatusModal={setShowStatusModal}
          item={user}
          setTimeUp={user?.time}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
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
