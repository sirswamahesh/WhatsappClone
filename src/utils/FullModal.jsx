import {
  View,
  StyleSheet,
  Modal,
  Image,
  Text,
  TouchableOpacity,
  TouchableHighlight,
} from "react-native";
import React from "react";
import { Colors } from "../theme/Colors";
import VectorIcon from "../utils/VectorIcon";
import { useNavigation } from "@react-navigation/native";
import ProgressBar from "../utils/ProgressBar";
import DeleteStatus from "../components/DeleteStatus";
import { firebase } from "../../firebase";
const FullModal = (props) => {
  const navigation = useNavigation();
  const { showStatusModal, setShowStatusModal, item, setTimeUp } = props;

  const updateModalStatus = () => {
    setShowStatusModal(false);
  };
  console.log("hekllod", item);

  const deleteStatus = () => {
    // console.log("Status successfully deleted");
    const imageRef = firebase
      .storage()
      .ref()
      .child(`status/${item.profileImageURL}`);
    console.log("imagre", imageRef);
    imageRef
      .delete()
      .then(function () {
        console.log("imageRef successfully deleted");
      })
      .catch(function (error) {
        console.error("Error deleting imageRef: ", error);
      });
    // const statusRef = firebase
    //   .firestore()
    //   .collection("status")
    //   .doc(`${item.id}`);
    // console.log("statis", statusRef);

    // statusRef
    //   .delete()
    //   .then(function () {
    //     console.log("Status successfully deleted");
    //   })
    //   .catch(function (error) {
    //     console.error("Error deleting status: ", error);
    //   });
  };
  return (
    <Modal
      animationType="fade"
      visible={showStatusModal}
      onRequestClose={updateModalStatus}
    >
      <View style={styles.container}>
        <ProgressBar setTimeUp={setTimeUp} />
        <View style={styles.topContainer}>
          <View style={styles.profileSection}>
            <TouchableOpacity onPress={updateModalStatus}>
              <VectorIcon
                name="arrow-back"
                type="Ionicons"
                size={24}
                color={Colors.white}
              />
            </TouchableOpacity>
            <Image
              source={{ uri: item.profileImageURL }}
              style={styles.profileImg}
            />
            <View style={styles.info}>
              <Text style={styles.username}>{item.name}</Text>
              <Text style={styles.time}>
                {item.timeStamp.toDate().toTimeString().slice(0, 5)}PM
              </Text>
            </View>
          </View>
          <View
            style={{
              flex: 1,

              position: "absolute",
              top: 5,
              right: 5,
              // left: 100,
              zIndex: 50,
            }}
          >
            <DeleteStatus deleteStatus={deleteStatus} />
          </View>
        </View>
        <Image source={{ uri: item.profileImageURL }} style={styles.storyImg} />
        <Text style={styles.storyMsg}>{item.caption}</Text>
        <View style={styles.replySection}>
          <VectorIcon
            type="Entypo"
            name="chevron-small-up"
            color={Colors.white}
            size={24}
          />
          <Text style={styles.reply}>Reply</Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  storyImg: {
    height: "75%",
    width: "100%",
  },
  storyMsg: {
    fontSize: 17,
    color: Colors.white,
    textAlign: "center",
  },
  container: {
    backgroundColor: Colors.primaryColor,
    height: "100%",
    justifyContent: "space-between",
  },
  profileImg: {
    height: 40,
    width: 40,
    borderRadius: 50,
    marginLeft: 5,
  },
  username: {
    fontSize: 17,
    color: Colors.white,
  },
  time: {
    color: Colors.tertiary,
  },
  topContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 10,
    justifyContent: "space-between",
  },
  info: {
    marginLeft: 20,
  },
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  reply: {
    fontSize: 15,
    color: Colors.white,
    textAlign: "center",
    marginBottom: 10,
  },
  replySection: {
    alignItems: "center",
  },
});

export default FullModal;
