import { View, Text, ScrollView, StyleSheet } from "react-native";
import React from "react";
import ContactHeader from "../components/ContactHeader";
import ContactList from "../components/ContactList";
import AddContact from "../components/AddContact";
const ContactScreen = () => {
  return (
    <View>
      <ContactHeader />
      <ScrollView style={styles.container}>
        <AddContact />
        <ContactList />
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
