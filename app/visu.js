import React, { useState } from "react";
import Header from "./header";
import indexLogo from "../src/indexLogo.png";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { mainViewStyle } from "../src/style";
import { sections } from "../src/sections";
import searchIcon from "../src/searchIcon.png";
import { useModalVisible } from "../src/visumenu";
import VisuMenu from "../src/visumenu";

const { width, height } = Dimensions.get("window");

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
}

const Visu = ({ navigation }) => {
  const [modalVisible, pressModalVisible] = useModalVisible();
  const [specieVisu, setSpecieVisu] = useState(randomSpecie());
  const [isVisuFiltered, setIsVisuFiltered] = useState(false);
  return (
    <SafeAreaView>
      <View style={mainViewStyle}>
        <Header
          navigation={navigation}
          img={indexLogo}
          path={"Index"}
          rightImg={searchIcon}
          pressModalVisible={pressModalVisible}
        />
        {modalVisible && (
          <VisuMenu
            pressModalVisible={pressModalVisible}
            setSpecieVisu={setSpecieVisu}
            randomSection={randomSection}
            setIsVisuFiltered={setIsVisuFiltered}
          />
        )}
        <View style={styles.container}>
          <SpecieVisu
            specieVisu={specieVisu}
            setSpecieVisu={setSpecieVisu}
            isVisuFiltered={isVisuFiltered}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

//Stores the total species in a number and get a random Specie in between that range
const randomSpecie = () => {
  let totalSpecies = [];
  let speciesCount = 0;
  for (let i = 0; i < sections.length; i++) {
    if (sections[i] && sections[i].list) {
      for (let j = 0; j < sections[i].list.length; j++) {
        if (Array.isArray(sections[i].list[j])) {
          for (let r = 0; r < sections[i].list[j].length; r++) {
            totalSpecies[speciesCount] = sections[i].list[j][r];
            speciesCount++;
          }
        }
        totalSpecies[speciesCount] = sections[i].list[j];
        speciesCount++;
      }
    }
  }
  const specieShownVisu = totalSpecies[getRandomInt(0, speciesCount)]
  console.log(specieShownVisu)
  return specieShownVisu;
};

export const randomSection = ({ sectionsSelected }) => {
  let totalSpeciesSection = [];
  let speciesSectionCount = 0;
  for (let s = 0; s < sectionsSelected.length; s++) {
    if (sections[sectionsSelected[s]]) {
      let currentSection = sections[sectionsSelected[s]];
      for (let i = 0; i < currentSection.list.length; i++) {
        totalSpeciesSection[speciesSectionCount] = currentSection.list[i];
        speciesSectionCount++;
      }
    }
  }
  return totalSpeciesSection[getRandomInt(0, speciesSectionCount)];
};

const randomFilteredVisuSpecie = ({ specieVisuArray }) => {
  const visuArray = [];
  return visuArray[getRandomInt(0, specieVisuArray.length)];
};

const SpecieVisu = ({ specieVisu, setSpecieVisu, isVisuFiltered }) => {
  const [nameVisible, setNameVisible] = useState(false);
  return (
    <View style={styles.specie}>
      <Pressable
        onPress={() => {
          if (nameVisible == false) {
            setNameVisible(true);
          } else if (isVisuFiltered) {
            setNameVisible(false);
            setSpecieVisu(
              randomFilteredVisuSpecie({ specieVisuArray: specieVisu })
            );
          } else {
            setNameVisible(false);
            setSpecieVisu(randomSpecie());
          }
        }}
      >
        <Image source={specieVisu.source} style={styles.image} />
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
