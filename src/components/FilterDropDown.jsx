import React, { useState } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
const windowWidth = Dimensions.get("window").width;
import { Icon } from "react-native-elements";

export default function FilterDropDown({
  options,
  placeholderText,
  filterField,
  updateFilter,
  filter
  
}) {
  const [open, setOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const onChange = () => {
    let newFilter = filter
    newFilter[filterField] = selectedOption
    updateFilter(newFilter)
  };

  return (
    <View style={styles.dropdownContainer}>
      <DropDownPicker
        style={styles.dropdown}
        placeholderStyle={styles.text}
        labelStyle={styles.text}
        listParentLabelStyle={[styles.text, { marginRight: 5 }]}
        dropDownContainerStyle={styles.dropdown}
        itemStyle={{ color: "#9F9F9F" }}
        open={open}
        value={selectedOption}
        items={options}
        setOpen={setOpen}
        setValue={setSelectedOption}
        placeholder={placeholderText}
        onChangeValue={onChange}
        showTickIcon={false}
        ArrowUpIconComponent={() => (
          <Icon
            type="ionicon"
            name="filter-outline"
            color={"#9F9F9F"}
            size={18}
          />
        )}
        ArrowDownIconComponent={() => (
          <Icon
            type="ionicon"
            name="filter-outline"
            color={"#9F9F9F"}
            size={18}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  dropdownContainer: {
    width: windowWidth * 0.43,
  },
  dropdown: {
    borderColor: "#9F9F9F",
  },
  text: {
    color: "#9F9F9F",
    fontFamily: "OpenSans",
    fontSize: 16,
    textAlign: "right",
  },
});
