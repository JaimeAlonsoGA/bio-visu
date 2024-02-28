import { useEffect, useState } from "react";
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
import { randomSection } from "../app/visu";

export const { width, height } = Dimensions.get("window");

export const useModalVisible = (initialState = false) => {
  const [modalVisible, setModalVisible] = useState(initialState);

  const toggleModalVisible = () => {
    setModalVisible(!modalVisible);
  };

  return [modalVisible, toggleModalVisible];
};

const useSelectSections = (initialState = []) => {
  const [selectedSections, setSelectedSections] = useState(initialState);

  useEffect(() => {
    console.log("selectedSections", selectedSections);
  }, [selectedSections]);

  const toggleSelectedSections = (title) => {
    if (selectedSections.includes(title)) {
      setSelectedSections(
        selectedSections.filter((section) => section !== title)
      );
    } else {
      setSelectedSections([...selectedSections, title]);
    }
  };

  return [selectedSections, toggleSelectedSections];
};

const VisuMenu = ({
  toggleModalVisible,
  modalVisible,
  save,
  currentSelections,
}) => {
  const [selectedSections, toggleSelectedSections] =
    useSelectSections(currentSelections);
  const saveChanges = () => {
    save(selectedSections);
    toggleModalVisible();
  };

  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={toggleModalVisible}
      >
        <View style={styles.SectionPopUp}>
          <View style={styles.modalContent}>
            <ScrollView showsVerticalScrollIndicator={false}>
              {sections.map((section, index) => (
                <SectionButton
                  key={index}
                  name={section.title}
                  selected={selectedSections.includes(section.title)}
                  toggleSelect={() => toggleSelectedSections(section.title)}
                />
              ))}
              {/* <SectionButton name="TODO"/> */}
            </ScrollView>
            <TouchableOpacity onPress={saveChanges}>
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
              toggleModalVisible();
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

const SectionButton = ({ name, selected, toggleSelect }) => {
  return (
    <View
      style={[
        selected ? { backgroundColor: "rgba(13, 225, 73, 0.9)" } : {},
        styles.SectionButton,
      ]}
    >
      <TouchableOpacity onPress={toggleSelect}>
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
