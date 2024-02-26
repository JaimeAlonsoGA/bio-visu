import { useRef, useState } from "react";
import {
  Dimensions,
  Modal,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
// import { width, height } from "./style";

export const { width, height } = Dimensions.get("window");


//custom hook useModalVisible(). initial State == ModalVisible = false
export const useModalVisible = (initialState = false) => {
  const [modalVisible, setModalVisible] = useState(initialState);

  //modalVisible = change value
  const pressModalVisible = () => {
    console.log("pressModalVisible was called");
    setModalVisible(!modalVisible);
  };

  return [modalVisible, pressModalVisible];
};

// export const scrollViewRef = useRef();
// export const scrollToItem = (index) => {
//   scrollViewRef.current.scrollTo({ x: 0, y: index * height / 2, animated: true });
// };

const SpeciesPopUP = ({
  items,
  pressModalVisible,
  modalVisible,
  scrollToItem,
}) => {
  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={pressModalVisible}
      >
        <View style={styles.SpeciesPopUP}>
          <View style={styles.modalContent}>
            <ScrollView showsVerticalScrollIndicator={false}>
              {items.list.map((innerItem, index) => {
                let comunName;
                let latinName;
                    if(Array.isArray(innerItem))
                    {
                        latinName = innerItem[0].latinName;
                        comunName = innerItem[0].comunName;
                    } else {
                        latinName = innerItem.latinName;
                        comunName = innerItem.comunName;
                    }
                return (
                <SpecieButton
                  key={index}
                  index={index}
                  attributes={innerItem}
                  comunName={comunName}
                  latinName={latinName}
                  scrollToItem={scrollToItem}
                  pressModalVisible={pressModalVisible}
                />
                )
              })}
            </ScrollView>
          </View>
          <TouchableOpacity
            onPress={() => {
              console.log("TouchableOpacity was pressed");
              pressModalVisible();
            }}
          >
            <View style={styles.closeButton}>
              <Text
                style={{
                  fontWeight: "bold",
                  padding: 10,
                  paddingHorizontal: 20,
                }}
              >
                VOLVER
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const SpecieButton = ({
  index,
  attributes,
  pressModalVisible,
  scrollToItem,
  comunName,
  latinName,
}) => {
  return (
    <View style={styles.SpecieButton}>
      <TouchableOpacity
        onPress={() => {
          scrollToItem(index);
          pressModalVisible();
          console.log(attributes.comunName);
          console.log("redirecting to: " + index + " " + attributes.comunName);
        }}
      >
        <View //</TouchableOpacity>style={{borderColor: 'rgba(138, 163, 251, 1)', borderWidth: 2, borderRadius: 20, marginBottom: 1}}
        >
          <Text
            style={{
              padding: 10,
              fontSize: 20,
              fontWeight: "500",
              fontStyle: "italic",
            }}
          >
            {latinName}
          </Text>
          <Text>{comunName}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default SpeciesPopUP;

const styles = StyleSheet.create({
  closeButton: {
    borderWidth: 3,
    borderColor: "white",
    marginTop: 15,
    backgroundColor: "rgba(13, 225, 73, 1)",
    borderRadius: 5,
  },
  SpeciesPopUP: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(240, 243, 255, 0.4)", // semi-transparent background
  },
  modalContent: {
    marginTop: 20,
    backgroundColor: "rgba(240, 243, 255, 1)",
    width: width / 1.2,
    height: height / 1.6,
    justifyContent: "center",
    borderRadius: 4,
    alignItems: "center",
  },
  SpecieButton: {
    borderBottomWidth: 1,
    //padding: 10,
  },
});
