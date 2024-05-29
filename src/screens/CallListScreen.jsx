import { View, Text, StyleSheet, ScrollView } from "react-native";
import React from "react";
import CallLink from "../components/CallLink";
import { Colors } from "../theme/Colors";
import RecentCall from "../components/RecentCall";

const CallListScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <CallLink />
      <RecentCall />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    flex: 1,
    padding: 16,
  },
});

export default CallListScreen;
