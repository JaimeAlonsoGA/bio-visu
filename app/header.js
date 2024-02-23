import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";

//export const headerHeight = 135;

const Header = ({ navigation, img, path }) => (
  <View style={styles.header}>
    <Text style={styles.headerText}>VISU</Text>
    <GoTo navigation={navigation} img={img} path={path} />
  </View>
);

const GoTo = ({ navigation, img, path }) => (
  <TouchableOpacity onPress={() => navigation.navigate(path)}>
    <Image source={img} style={styles.VisuLogo} />
  </TouchableOpacity>
);

export default Header;

const styles = StyleSheet.create({
  VisuLogo: {
    width: 70,
    height: 70,
    resizeMode: "contain",
    margin: 8,
  },

  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 3,
    borderColor: "#cbd2ee",
    height: 100,
  },
  headerText: {
    color: "black",
    marginTop: 10,
    padding: 20,
    fontWeight: "bold",
    fontSize: 40,
  },
  // goTo: {
  //   position: 'absolute',
  //   right: 0,
  // },
});
