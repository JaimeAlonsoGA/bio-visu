import { useState } from "react";
import {
  Dimensions,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { sections } from "./sections";

export const { width, height } = Dimensions.get("window");

export const useModalVisible = (initialState = false) => {
  const [modalVisible, setModalVisible] = useState(initialState);

  const pressModalVisible = () => {
    setModalVisible(!modalVisible);
  };

  return [modalVisible, pressModalVisible];
};

const VisuMenu = ({
  pressModalVisible,
  modalVisible,
  setSpecieVisu,
  randomSection,
  setIsVisuFiltered,
}) => {
  const [indexSelected, setIndexSelected] = useState([]);
  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={pressModalVisible}
      >
        <View style={styles.SectionPopUp}>
          <View style={styles.modalContent}>
            <ScrollView showsVerticalScrollIndicator={false}>
              {sections.map((section, index) => (
                <SectionButton
                  key={index}
                  name={section.source}
                  index={index}
                  indexSelected={indexSelected}
                  setIndexSelected={setIndexSelected}
                />
              ))}
              {/* <SectionButton name="TODO"/> */}
            </ScrollView>
            <TouchableOpacity
              onPress={() => {
                setSpecieVisu(
                  randomSection({ sectionsSelected: indexSelected })
                );
                setIsVisuFiltered(true);
                pressModalVisible();
              }}
            >
              <View style={styles.selectAllButton}>
                <Text
                  style={{
                    fontWeight: "bold",
                    padding: 10,
                    paddingHorizontal: 20,
                  }}
                >
                  SELECCIONAR
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => {
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

const SectionButton = ({ name, index, indexSelected, setIndexSelected }) => {
  const [selected, setSelected] = useState(false);
  return (
    <View
      style={[
        selected ? { backgroundColor: "rgba(13, 225, 73, 0.9)" } : {},
        styles.SectionButton,
      ]}
    >
      <TouchableOpacity
        onPress={() => {
          setSelected(!selected);
          if (selected) {
            const newIndexSelected = indexSelected.filter(
              (item) => item !== index
            );
            setIndexSelected(newIndexSelected);
          } else {
            const newIndexSelected = [...indexSelected, index];
            setIndexSelected(newIndexSelected);
            console.log(newIndexSelected);
          }
        }}
      >
        <View>
          <Text
            style={{
              padding: 10,
              fontSize: 20,
              fontWeight: "500",
            }}
          >
            {name}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default VisuMenu;

const styles = StyleSheet.create({
  selectAllButton: {
    borderWidth: 3,
    borderColor: "white",
    marginTop: 15,
    backgroundColor: "rgba(255, 125, 84, 1)",
    borderRadius: 5,
    marginBottom: 10,
  },
  closeButton: {
    borderWidth: 3,
    borderColor: "white",
    marginTop: 15,
    backgroundColor: "rgba(13, 225, 73, 1)",
    borderRadius: 5,
  },
  SectionPopUp: {
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
  SectionButton: {
    borderBottomWidth: 1,
    //padding: 10,
  },
});
