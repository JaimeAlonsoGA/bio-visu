import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import Header from "./header";
import { mainViewStyle } from "../src/sections/style";
import { sections } from "../src/sections/sections";
import { SafeAreaView } from "react-native-safe-area-context";
import Visu from "../src/visuLogo.png";

const containerColor = [
  { color: "#ff7d54" },
  { color: "#0de149" },
  { color: "#7ee0ff" },
];

const Index = ({ navigation }) => {
  return (
    <SafeAreaView>
      <View style={mainViewStyle}>
        <Header navigation={navigation} img={Visu} path={"Visu"} />
        <Sections navigation={navigation} />
      </View>
    </SafeAreaView>
  );
};

const Sections = ({ navigation }) => {
  return (
    <FlatList
      data={sections}
      numColumns={2}
      renderItem={({ item, index }) => (
        <SectionItem
          color={containerColor[index % containerColor.length].color}
          source={item.source}
          navigation={navigation}
        />
      )}
      contentContainerStyle={{ paddingBottom: 20 }}
    />
  );
};

const SectionItem = ({ source, navigation, color }) => {
  return (
    <TouchableOpacity
      style={styles.SectionItem}
      onPress={() => navigation.navigate("Gallery")}
    >
      <Text
        style={[
          styles.SectionText,
          {
            backgroundColor: color,
            padding: 10,
            margin: "2%",
          },
        ]}
      >
        {source}
      </Text>
    </TouchableOpacity>
  );
};

export default Index;

const styles = StyleSheet.create({
  SectionItem: {
    padding: 10,
    margin: "2%",
    width: "46%",
    justifyContent: "center",
  },

  SectionText: {
    fontWeight: "bold",
    textAlign: "center",
  },
});
