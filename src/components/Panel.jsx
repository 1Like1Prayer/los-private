import React, { useState } from "react";
import {
  Dimensions,
  I18nManager,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import BoxItems from "./BoxItems";
import SvgGoogleIcon from "../icons/GoogleIcon";
import SvgDropDownClose from "../icons/DropDownCloseIcon";
import SvgDropDownOpen from "../icons/DropDownOpenIcon";
import DataTable from "./DataTable";
import SearchBar from "./SearchBar";

const windowWidth = Dimensions.get("window").width;
const isRTL = I18nManager.isRTL;

const Panel = ({ title, boxData, dataTable }) => {
  const [filteredDataTable, setFilteredDataTable] = useState(
      dataTable ? dataTable : []
  );
  const [isOpen, setIsOpen] = useState(false);
  const [textInputValue, setTextInputValue] = useState("");

  const handleTextInputChange = (value) => {
    if (value) {
      setFilteredDataTable(
        dataTable.filter((element) =>
          element?.keyword?.toLowerCase().includes(value.toLowerCase())
        )
      );
    } else {
      setFilteredDataTable(dataTable);
    }
    setTextInputValue(value);
  };

  return (
      <ScrollView>
        <View style={styles.container}>
          <View style={[styles.shadowContainer, styles.shadow]}>
            <View style={styles.shadowContainer}>
              <View style={styles.panelHeader}>
                <View style={styles.panelHeaderRight}>
                  <SvgGoogleIcon style={styles.icon} />
                  <Text>{title}</Text>
                </View>
                {isOpen ? (
                    <Pressable
                        style={styles.dropDownButton}
                        onPress={() => setIsOpen(!isOpen)}
                    >
                      <SvgDropDownClose ColorFill="#6226CF" />
                    </Pressable>
                ) : (
                    <Pressable
                        style={styles.dropDownButton}
                        onPress={() => setIsOpen(!isOpen)}
                    >
                      <SvgDropDownOpen ColorFill="#6226CF" />
                    </Pressable>
                )}
              </View>
              {isOpen ? (
                    <View style={styles.openDropDown}>

                    <View style={styles.lineGray}></View>
                    <SearchBar onTextInputChange={handleTextInputChange} />
                    <BoxItems data={boxData} />
                    <DataTable data={filteredDataTable} inputValue={textInputValue} />
                    </View>
              ) : null}
            </View>
          </View>
        </View>
      </ScrollView>
  );
};

export default Panel;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    padding: 15,
    flexDirection: "column",
    alignItems: "center",
    borderRadius: 10,
    marginBottom: 20,
  },
  shadowContainer: {
    backgroundColor: "white",
    borderRadius: 10,
  },
  openDropDown:{
    paddingHorizontal: 10,
    maxWidth: windowWidth * 0.85,
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  panelHeader: {
    display: "flex",
    flexDirection: isRTL ? "row" : "row-reverse",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 15,
    width: windowWidth * 0.85,
    padding: 10

  },
  panelHeaderRight: {
    display: "flex",
    flexDirection: isRTL ? "row" : "row-reverse",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  icon: {
    margin: 8,
  },
  lineGray: {
    height: 1,
    width: windowWidth * 0.806,
    backgroundColor: "#9F9F9F33",
    marginBottom: 12,
  },
  dropDownButton: {
    height: 30,
    width: 30,
  },
});