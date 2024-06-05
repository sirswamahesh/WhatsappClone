import { View, Text, StyleSheet, ScrollView } from "react-native";
import React, { useState } from "react";
import MyStatus from "../components/MyStatus";
import RecentStatus from "../components/RecentStatus";
import ViewedStatus from "../components/ViewedStatus";
import { Colors } from "../theme/Colors";

const StatusListScreen = () => {
  const [loadData, setLoadData] = useState(null);
  return (
    <ScrollView style={styles.container}>
      <MyStatus setLoadData={setLoadData} />
      <RecentStatus loadData={loadData} />
      <ViewedStatus />
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    // padding: 16,
  },
});

export default StatusListScreen;
