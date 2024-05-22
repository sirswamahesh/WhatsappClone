import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Colors } from "../theme/Colors";
import { ViewedStatusData } from "../data/ViewedStatusData";
import FullModel from "../utils/FullModal";

const ViewedStatus = () => {
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [user, setUser] = useState(null);

  const statusModel = (id) => {
    console.log("???????", id);
    setShowStatusModal(true);
    const user = ViewedStatusData.find((user) => user.id === id);
    setUser(user);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.viewedStatus}>ViewedStatus</Text>
      {ViewedStatusData.map((user) => (
        <TouchableOpacity key={user.id} onPress={() => statusModel(user.id)}>
          <View style={styles.statusInfo}>
            <View style={styles.statusImgContainer}>
              <Image source={user.storyImg} style={styles.statusImg} />
            </View>
            <View>
              <Text style={styles.username}>{user.name}</Text>
              <Text style={styles.time}>{user.time}</Text>
            </View>
          </View>
        </TouchableOpacity>
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
    marginTop: 5,
    marginBottom: 15,
  },
  viewedStatus: {
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

export default ViewedStatus;
