import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Animated,
} from "react-native";
import React, { useRef, useState } from "react";
import { Colors } from "../theme/Colors";
import { ViewedStatusData } from "../data/ViewedStatusData";
import FullModel from "../utils/FullModal";
import VectorIcon from "../utils/VectorIcon";

const ViewedStatus = () => {
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [user, setUser] = useState(null);
  const [showViewedStatus, setShowViewedStatus] = useState(false);
  const rotation = useRef(new Animated.Value(0)).current;
  const setTimeUp = () => {
    setShowStatusModal(false);
  };

  const rotateIcon = () => {
    Animated.timing(rotation, {
      toValue: rotation._value === 0 ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const rotateInterpolate = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
  });

  const iconStyle = {
    transform: [{ rotate: rotateInterpolate }],
  };

  const statusModel = (id) => {
    setShowStatusModal(true);
    const user = ViewedStatusData.find((user) => user.id === id);
    setUser(user);
  };

  const toggleViewedStatus = () => {
    setShowViewedStatus((prev) => !prev);
    rotateIcon();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleViewedStatus}>
        <View style={styles.viewedStatusHeader}>
          <Text style={styles.viewedStatus}>ViewedStatus</Text>
          <TouchableOpacity onPress={toggleViewedStatus}>
            <Animated.View style={iconStyle}>
              <VectorIcon
                type="AntDesign"
                name="down"
                size={18}
                color={Colors.tertiary}
              />
            </Animated.View>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
      {showViewedStatus && (
        <>
          {ViewedStatusData.map((user) => (
            <TouchableOpacity
              key={user.id}
              onPress={() => statusModel(user.id)}
            >
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
        </>
      )}

      {!!user && (
        <FullModel
          showStatusModal={showStatusModal}
          setShowStatusModal={setShowStatusModal}
          item={user}
          setTimeUp={setTimeUp}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
    borderBottomColor: Colors.textGrey,
    borderBottomWidth: 1,
    paddingHorizontal: 16,
  },
  viewedStatus: {
    color: Colors.tertiary,
    marginBottom: 10,
  },
  viewedStatusHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
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
