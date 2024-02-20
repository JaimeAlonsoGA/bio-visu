import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "./header";
import { mainViewStyle } from "../src/sections/style";
import Gallery from '../src/gallery.png';


const Visu = ({ navigation }) => {
  return (
    <SafeAreaView>
      <View style={mainViewStyle}>
        <Header navigation={navigation} img={Gallery} path={'Index'}/>
      </View>
    </SafeAreaView>
  );
};

export default Visu;

const styles = StyleSheet.create({});
