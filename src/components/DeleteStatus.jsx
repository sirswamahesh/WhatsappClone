import {
  View,
  Text,
  Button,
  TouchableOpacity,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useState } from "react";
import VectorIcon from "../utils/VectorIcon";
import { Colors } from "../theme/Colors";
import ProcessModal from "../utils/ProcessModal";

const DeleteStatus = ({ deleteStatus }) => {
  const [btnshow, setBtnShow] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const handleButtonPress = async () => {
    console.log("djskflksdf");
    await deleteStatus();
    setModalVisible(true);
    setBtnShow((prev) => !prev);
    setTimeout(() => {
      setModalVisible(false);
    }, 10000); // 5 seconds
  };
  return (
    <View>
      {btnshow ? (
        <View style={styles.btn}>
          <Button title="Delete Status" onPress={handleButtonPress} />
        </View>
      ) : (
        ""
      )}
      <TouchableOpacity onPress={() => setBtnShow((prev) => !prev)}>
        <VectorIcon
          type="Entypo"
          name="dots-three-vertical"
          size={20}
          color={Colors.tertiary}
        />
      </TouchableOpacity>
      <ProcessModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  btn: {
    position: "absolute",
    top: 20,
    right: 10,
    zIndex: 1,
    width: 150,
  },
});

export default DeleteStatus;
