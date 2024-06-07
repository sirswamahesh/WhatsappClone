import * as React from "react";
import { View, StyleSheet } from "react-native";
import {
  Provider as PaperProvider,
  Menu,
  IconButton,
  ActivityIndicator,
  Button,
} from "react-native-paper";
import { Colors } from "../theme/Colors";

const DeleteStatus = ({ deleteStatus, loader }) => {
  const [visible, setVisible] = React.useState(false);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  return (
    <PaperProvider>
      <View style={styles.container}>
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={
            <View style={styles.container}>
              {loader ? (
                <Button style={styles.menuContent}>
                  <ActivityIndicator />
                </Button>
              ) : (
                <IconButton
                  icon="dots-vertical"
                  size={24}
                  onPress={openMenu}
                  iconColor={Colors.secondaryColor} // Use 'color' instead of 'iconColor'
                />
              )}
            </View>
          }
          contentStyle={styles.menuContent}
        >
          <Menu.Item
            onPress={() => {
              deleteStatus();
            }}
            title="Delete Status"
          />
        </Menu>
      </View>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  menuContent: {
    position: "relative",
    top: 10,
    right: 320,
    backgroundColor: "#FF6347", // Custom background color for all menu items
  },
});

export default DeleteStatus;
