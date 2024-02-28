import React, { useEffect, useState } from "react";
import Header from "./header";
import indexLogo from "../src/indexLogo.png";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { mainViewStyle } from "../src/style";
import { sections } from "../src/sections";
import searchIcon from "../src/searchIcon.png";
import { useModalVisible } from "../src/visumenu";
import VisuMenu from "../src/visumenu";

const { width, height } = Dimensions.get("window");

const useSections = (initialState = []) => {
  const [selectedSections, setSelectedSections] = useState(initialState);

  const save = (selectedElements) => {
    setSelectedSections(
      sections.filter((item) => selectedElements.includes(item.title))
    );
  };

  return [selectedSections, save];
};

const Visu = ({ navigation }) => {
  const [modalVisible, toggleModalVisible] = useModalVisible();
  const [specieVisu, setSpecieVisu] = useState(null);
  const [selectedSections, save] = useSections(sections);

  const selectRandomItemFromSelectedSections = () => {
    const randomSection =
      selectedSections[Math.floor(Math.random() * selectedSections.length)];
    const randomItem =
      randomSection.list[Math.floor(Math.random() * randomSection.list.length)];
    setSpecieVisu(randomItem);
  };

  // ciclo de vida del componente: 3 fases
  useEffect(() => {
    //siempre se llama cuando se monta el componente
    selectRandomItemFromSelectedSections();
  }, [selectedSections]);
  //siempre se llama cuando un elemento de las dependencias se actualiza

  return (
    <SafeAreaView>
      <View style={mainViewStyle}>
        <Header
          navigation={navigation}
          img={indexLogo}
          path={"Index"}
          rightImg={searchIcon}
          pressModalVisible={toggleModalVisible}
        />
        <VisuMenu
          toggleModalVisible={toggleModalVisible}
          modalVisible={modalVisible}
          save={save}
          currentSelections={selectedSections.map((item) => item.title)}
        />
        <View style={styles.container}>
          {specieVisu && (
            <SpecieVisu
              specieVisu={specieVisu}
              next={selectRandomItemFromSelectedSections}
            />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

const SpecieVisu = ({ specieVisu, next }) => {
  const [nameVisible, setNameVisible] = useState(false);

  const handlePress = () => {
    if (nameVisible) next();
    setNameVisible(true);
  };

  useEffect(() => {
    setNameVisible(false);
  }, [specieVisu]);

  return (
    <View style={styles.specie}>
      <Pressable onPress={handlePress}>
        <Image
          source={specieVisu.images[Math.random(specieVisu.images.length)].src}
          style={styles.image}
        />
      </Pressable>
      {nameVisible && <SpecieInfo specieVisu={specieVisu} />}
    </View>
  );
};

const SpecieInfo = ({ specieVisu }) => (
  <View style={styles.info}>
    <Text style={styles.name}>{specieVisu.latinName}</Text>
    <Text>{specieVisu.comunName}</Text>
  </View>
);

export default Visu;

const styles = StyleSheet.create({
  info: {
    alignItems: "center",
  },
  image: {
    width: width,
    height: height / 2,
    resizeMode: "contain",
  },
  name: {
    fontWeight: "bold",
    fontSize: 30,
    marginBottom: 10,
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  specie: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
  },
});
