import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import { Colors } from "../theme/Colors";
import user1 from "../assets/user1.jpeg";
import VectorIcon from "../utils/VectorIcon";
import { RecentCallsData } from "../data/CallListData";

const RecentCall = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.recent}>Recent</Text>
      {RecentCallsData.map((user, index) => (
        <View style={styles.callContainer} key={index}>
          <Image source={user.profileImg} style={styles.userProfile} />
          <View style={styles.callInfoContainer}>
            <View>
              <Text style={styles.username}>Bablu</Text>
              <View style={styles.incommingAndOutGoingCall}>
                {user.incoming ? (
                  <VectorIcon
                    type="Feather"
                    name="arrow-down-left"
                    size={20}
                    color={Colors.tertiary}
                  />
                ) : (
                  <VectorIcon
                    type="Feather"
                    name="arrow-up-right"
                    size={20}
                    color="red"
                  />
                )}

                <Text style={styles.callTime}>Jan 20, 9:43 PM</Text>
              </View>
            </View>
            <View>
              {user.audio ? (
                <VectorIcon
                  type="Ionicons"
                  name="call-outline"
                  size={20}
                  color="white"
                />
              ) : (
                <VectorIcon
                  type="AntDesign"
                  name="videocamera"
                  size={20}
                  color="white"
                />
              )}
            </View>
          </View>
        </View>
      ))}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  callContainer: {
    flexDirection: "row",
    gap: 15,
    marginVertical: 10,
  },
  recent: {
    color: Colors.white,
    fontSize: 18,
    marginVertical: 16,
  },
  incommingAndOutGoingCall: {
    flexDirection: "row",
  },
  callTime: {
    color: Colors.textGrey,
  },
  username: {
    color: Colors.white,
    fontSize: 18,
  },
  userProfile: {
    width: 55,
    height: 55,
    borderRadius: 50,
  },
  callInfoContainer: {
    flexDirection: "row",
    gap: 105,
    alignItems: "center",
  },
});

export default RecentCall;
