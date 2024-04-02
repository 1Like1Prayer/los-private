import {I18nManager, Pressable, StyleSheet, Text, View} from "react-native";
import React from "react";
import {MaterialCommunityIcons} from "@expo/vector-icons";

const isRTL = I18nManager.isRTL;
const CheckBox = ({
                      onLabelPress = () => {
                      }, ...props
                  }) => {
    const iconName = props.isChecked ?
        "checkbox-marked" : "checkbox-blank-outline";

    return (
        <View style={styles.container}>
            <Pressable onPress={props.onPress}>
                <MaterialCommunityIcons
                    name={iconName} size={24} color="#6226CF"/>
            </Pressable>

            <Pressable onPress={onLabelPress}>
                {/* <span> */}
                <View style={styles.container2}>
                    <Text style={styles.title}>{props.title}</Text>
                    <Text style={styles.title2}>{props.title2}</Text>
                </View>
            </Pressable>
        </View>
    );
};

export default CheckBox;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "flex-start",
        flexDirection: isRTL ? "row" : "row-reverse",
    },
    title: {
        fontSize: 14,
        color: "#000",
        marginRight: 5,
    },
    title2: {
        fontSize: 14,
        color: "#6226CF",
        textDecorationLine: 'underline',
        marginRight: 5,
    },
    container2: {
        flexDirection: 'row', // This ensures the texts are in the same line
        alignItems: 'center', // Adjust as per your layout needs
    },
});
