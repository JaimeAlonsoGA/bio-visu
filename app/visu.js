import React from "react";
import Header from "./header";
import indexLogo from '../src/indexLogo.png';
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { mainViewStyle } from "../src/style";


const Visu = ({ navigation }) => {
  return (
    <SafeAreaView>
      <View style={mainViewStyle}>
        <Header navigation={navigation} img={indexLogo} path={'Index'}/>
      </View>
    </SafeAreaView>
  );
};

export default Visu;

const styles = StyleSheet.create({});
