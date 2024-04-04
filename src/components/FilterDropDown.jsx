import React, {useState} from "react";
import {View, StyleSheet, Dimensions, I18nManager, Platform} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { Dropdown } from 'react-native-element-dropdown';

const windowWidth = Dimensions.get("window").width;
const isRTL = I18nManager.isRTL;

import {Icon} from "react-native-elements";

const data = [
	{ label: 'Item 1', value: '1' },
	{ label: 'Item 2', value: '2' },
	{ label: 'Item 3', value: '3' },
	{ label: 'Item 4', value: '4' },
	{ label: 'Item 5', value: '5' },
	{ label: 'Item 6', value: '6' },
	{ label: 'Item 7', value: '7' },
	{ label: 'Item 8', value: '8' },
];

export default function FilterDropDown({
                                           options,
                                           placeholderText,
                                           filterField,
                                           updateFilter,
                                           filter

                                       }) {
    const [selectedOption, setSelectedOption] = useState(null);

    const onChange = (value) => {
	    console.log(value);
	    setSelectedOption(value);
        let newFilter = filter
        newFilter[filterField] = value
        updateFilter(newFilter)
    };

    return (
        <View style={styles.dropdownContainer}>
	        <Dropdown
		        style={[styles.dropdown]}
		        placeholderStyle={[styles.text, {marginRight: 8}]}
		        selectedTextStyle={[styles.text, {marginRight: 8}]}
		        itemTextStyle={styles.text}
		        activeColor={'transparent'}
		        inputSearchStyle={styles.inputSearchStyle}
		        iconStyle={styles.iconStyle}
		        data={options}
		        maxHeight={250}
		        labelField="label"
		        valueField="value"
		        placeholder={placeholderText}
		        value={selectedOption}
		        onChange={(item) => onChange(item.value)}
		        containerStyle={styles.list}
		        dropdownPosition={'bottom'}
		        renderRightIcon={() => <Icon
			        type="ionicon"
			        name="filter-outline"
			        color={"#9F9F9F"}
			        size={18}
		        />}
	        />
        </View>
    );
}

const styles = StyleSheet.create({
    dropdownContainer: {
        width: windowWidth * 0.43,
    },
    text: {
        color: "#9F9F9F",
        fontFamily: "OpenSans",
        fontSize: 16,
        textAlign: isRTL ? "left" : "right",
    },
	dropdown: {
		borderColor: "#9F9F9F",
		borderWidth: 0.5,
		borderRadius: 8,
		paddingHorizontal: 10,
		backgroundColor: "#fff",
		paddingVertical: 6,
		overflowY: "hidden",
	},
	list: {
		borderColor: "#9F9F9F",
		borderWidth: 0.5,
		borderRadius: 8,
		marginTop: Platform.OS === 'android' ? -25 : 0,
		overflowY: "hidden",
	}
});
