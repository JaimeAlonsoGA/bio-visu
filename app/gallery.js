import {
  Image,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Animated,
} from "react-native";
import React, { useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "./header";
import { mainViewStyle } from "../src/style";
import indexLogo from "../src/indexLogo.png";
import { LinearGradient } from "expo-linear-gradient";
import { ScrollView } from "react-native-gesture-handler";
import SpeciesPopUP from "../src/speciemenu";
// import { width, height } from "../src/style";
import { useModalVisible } from "../src/speciemenu";
import searchIcon from "../src/searchIcon.png";


const { width, height } = Dimensions.get("window");

const Gallery = ({ navigation, route }) => {
  const scrollY = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef();

  const scrollToItem = (index) => {
    scrollViewRef.current.scrollTo({ x: 0, y: index * 505, animated: true });
  };

  const overlayOpacity = scrollY.interpolate({
    inputRange: [0, 200],
    outputRange: [0, 0.5],
    extrapolate: "clamp",
  });

  const [modalVisible, pressModalVisible] = useModalVisible();
  const { item } = route.params;

  return (
    <SafeAreaView style={mainViewStyle}>
      <Header
        navigation={navigation}
        img={indexLogo}
        path={"Index"}
        pressModalVisible={pressModalVisible}
        rightImg={searchIcon}        
      />
      {modalVisible && (
        <SpeciesPopUP
          items={item}
          pressModalVisible={pressModalVisible}
          scrollToItem={scrollToItem}
        />
      )}
      <Animated.View style={[styles.overlay, { opacity: overlayOpacity }]}>
        <LinearGradient
          colors={["rgba(0, 0, 0, 1)", "#d9e1ff"]}
          style={{ flex: 1 }}
        />
      </Animated.View>
      <Animated.View
        style={[styles.overlayBottom, { opacity: overlayOpacity }]}
      >
        <LinearGradient
          colors={["#d9e1ff", "rgba(0, 0, 0, 1)"]}
          style={{ flex: 1 }}
        />
      </Animated.View>
      <Animated.ScrollView
        ref={scrollViewRef}
        style={styles.ScrollView}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
      >
        <View>
          <Text style={styles.sectionText}>{item.source}</Text>
          <Species item={item} />
        </View>
      </Animated.ScrollView>
    </SafeAreaView>
  );
};

const Species = ({ item }) => {
  const isArray = true;
  return item.list.map((innerItem, index) => {
    if (Array.isArray(innerItem)) {
      return <Specie key={index} species={innerItem} isArray={isArray}/>;
    } else {
      return (
        <SpecieList
          key={index}
          source={innerItem.source}
          latinName={innerItem.latinName}
          comunName={innerItem.comunName}
        />
      );
    }
  });
};

//array.map horizontally
const Specie = ({ species, isArray }) => (
  <ScrollView horizontal={true}>
    {species.map((specie, index) => (
      <SpecieList
        key={index}
        source={specie.source}
        latinName={specie.latinName}
        comunName={specie.comunName}
        isArray={isArray}
      />
    ))}
  </ScrollView>
);

const SpecieList = ({ source, latinName, comunName, isArray }) => (
  <View style={styles.container}>
    <Image source={source} style={styles.image} />
    {isArray && <View style={styles.indicator}/>}
    <Text
      style={[
        styles.pictureText,
        { fontWeight: "bold", fontStyle: "italic", fontSize: 20 },
      ]}
    >
      {latinName}
    </Text>
    <Text style={[styles.pictureText, { fontSize: 18 }]}>{comunName}</Text>
  </View>
);

export default Gallery;

const styles = StyleSheet.create({
  image: {
    width: width,
    height: height / 2,
    resizeMode: "contain",
  },
  container: {
    //marginTop: height / 5,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 500,
  },
  overlay: {
    position: "absolute",
    top: 135,
    left: 0,
    right: 0,
    height: height / 12,
  },
  overlayBottom: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: height / 12,
  },
  pictureText: {
    borderBottomWidth: 1,
    borderBottomColor: "#d9e1ff",
    textAlign: "center",
  },
  sectionText: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 50,
    marginBottom: 20,
    borderBottomWidth: 3,
    borderColor: "#cbd2ee",
    height: 80,
  },
  indicator: {
    height: 10,
    width: 10,
    borderRadius: 100,
    backgroundColor: "rgba(255, 125, 84, 0.4)",
  },
});
