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
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { mainViewStyle } from "../src/style";
import { sections } from "../src/sections";

const { width, height } = Dimensions.get("window");

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
}

const Visu = ({ navigation }) => {
  return (
    <SafeAreaView>
      <View style={mainViewStyle}>
        <Header navigation={navigation} img={indexLogo} path={"Index"} />
        <View style={styles.container}>
          <SpecieVisu />
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
        if(Array.isArray(sections[i].list[j])){
          for(let r = 0; r < sections[i].list[j].length; r++)
          {
            totalSpecies[speciesCount] = sections[i].list[j][r];
            speciesCount++;
          }
        }
        totalSpecies[speciesCount] = sections[i].list[j];
        speciesCount++;
      }
    }
  }

  return totalSpecies[getRandomInt(0, speciesCount)];
};

const SpecieVisu = () => {
  const [nameVisible, setNameVisible] = useState(false);
  const [specieVisu, setSpecieVisu] = useState(randomSpecie());
  return (
    <View style={styles.specie}>
      <TouchableOpacity
        onPress={() => {
          if (nameVisible == false) {
            setNameVisible(true);
          } else {
            setNameVisible(false);
            setSpecieVisu(randomSpecie());
          }
        }}
      >
        <Image source={specieVisu.source} style={styles.image} />
      </TouchableOpacity>
      {nameVisible && <SpecieInfo specieVisu={specieVisu}/>}
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
  info:{
    alignItems: 'center',
  },
  image: {
    width: width,
    height: height / 2,
    resizeMode: "contain",
  },
  name: {
    fontWeight: 'bold',
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
