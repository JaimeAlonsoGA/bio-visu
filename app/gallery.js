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
import Header, { headerHeight } from "./header";
import { mainViewStyle } from "../src/sections/style";
import indexLogo from "../src/indexLogo.png";
import { LinearGradient } from "expo-linear-gradient";
import { ScrollView } from "react-native-gesture-handler";

const { width, height } = Dimensions.get("window");

const Gallery = ({ navigation, route }) => {
  const scrollY = useRef(new Animated.Value(0)).current;

  const overlayOpacity = scrollY.interpolate({
    inputRange: [0, 200],
    outputRange: [0, 0.5],
    extrapolate: "clamp",
  });

  const { item } = route.params;
  return (
    <SafeAreaView style={mainViewStyle}>
      <Header navigation={navigation} img={indexLogo} path={"Index"} />
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
  return item.list.map((innerItem, index) => {
    if (Array.isArray(innerItem)) {
      return <Specie key={index} species={innerItem} />;
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
const Specie = ({ species }) => (
  <ScrollView horizontal={true}>
    {species.map((specie, index) => (
      <SpecieList
        key={index}
        source={specie.source}
        latinName={specie.latinName}
        comunName={specie.comunName}
      />
    ))}
  </ScrollView>
);

const SpecieList = ({ source, latinName, comunName }) => (
  <View style={styles.container}>
    <Image source={source} style={styles.image} />
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
    marginTop: height / 5,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
});
