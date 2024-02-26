import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useRef } from "react";
import Header from "./header";
import Visu from "../src/visuLogo.png";
import { mainViewStyle } from "../src/style";
import { sections } from "../src/sections";
import { SafeAreaView } from "react-native-safe-area-context";
import { useModalVisible } from "../src/speciemenu";
// import { containerColor } from "../src/style";
import SpeciesPopUP from "../src/speciemenu";

const containerColor = [
  { color: "#ff7d54" },
  { color: "#0de149" },
  { color: "#7ee0ff" },
];

const Index = ({ navigation }) => {
  const [modalVisible, pressModalVisible] = useModalVisible();
  const allSectionSpecies = sections.map((section, index) => {
    return {
      comunName: section.comunName,
      latinName: section.latinName,
      index: index,
    };
  });

  return (
    <SafeAreaView>
      <View style={mainViewStyle}>
        <Header
          navigation={navigation}
          img={Visu}
          path={"Visu"}
          pressModalVisible={pressModalVisible}
        />
        {/* {modalVisible && (
          <SpeciesPopUP
            items={sections}
            pressModalVisible={pressModalVisible}
            navigation={navigation}
          />
        )} */}
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
          item={item}
        />
      )}
      contentContainerStyle={{ paddingBottom: 300 }}
    />
  );
};

const SectionItem = ({ source, navigation, color, item }) => {
  return (
    <TouchableOpacity
      style={styles.buttons}
      onPress={() => navigation.navigate("Gallery", { item })}
    >
      <Text
        style={[
          styles.SectionText,
          {
            backgroundColor: color,
            padding: 10,
            margin: "2%",
            borderRadius: 4,
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
  buttons: {
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
