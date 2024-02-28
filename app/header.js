import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Pressable,
} from "react-native";
import React from "react";

//export const headerHeight = 135;

const Header = ({ navigation, pressModalVisible, img, path, rightImg }) => {
  return (
  <View style={styles.header}>
    <GoTo navigation={navigation} img={img} path={path} />
    <Text style={styles.headerText}>VISU</Text>
    <Search pressModalVisible={pressModalVisible} rightImg={rightImg}/>

    {/* <TouchableOpacity onPress={() => { pressModalVisible() }} >
      <Image source={searchIcon} style={styles.goTo} />
    </TouchableOpacity> */}
  </View>
)};

const GoTo = ({ navigation, img, path }) => (
  <TouchableOpacity onPress={() => navigation.navigate(path)}>
    <Image source={img} style={styles.goTo} />
  </TouchableOpacity>
);

const Search = ({ pressModalVisible, rightImg }) => (
  <TouchableOpacity onPress={() => { pressModalVisible() }}>
    <Image source={rightImg} style={styles.goTo} />
  </TouchableOpacity>
)

export default Header;

const styles = StyleSheet.create({
  goTo: {
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
