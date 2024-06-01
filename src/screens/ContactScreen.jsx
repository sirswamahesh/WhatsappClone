import { View, Text, ScrollView, StyleSheet } from "react-native";
import React, { useState } from "react";
import ContactHeader from "../components/ContactHeader";
import ContactList from "../components/ContactList";
import AddContact from "../components/AddContact";
const ContactScreen = (props) => {
  const { userId } = props.route.params;
  return (
    <View>
      <ContactHeader />
      <ScrollView style={styles.container}>
        <AddContact />
        <ContactList userId={userId} />
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    marginBottom: 40,
  },
});

export default ContactScreen;
