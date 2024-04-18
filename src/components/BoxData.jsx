import React from "react";
import {Dimensions, I18nManager, StyleSheet, Text, View} from "react-native";
import {MaterialCommunityIcons} from "@expo/vector-icons";

const windowWidth = Dimensions.get("window").width;
const isRTL = I18nManager.isRTL;


const BoxData = ({count, description, iconComponent}) => {
    const iconMap = {
        'area-graph': 'chart-areaspline',
        'target-two': 'target',
    };
    const iconType = iconMap[iconComponent] || 'help-circle-outline';
    return (
        <View style={styles.boxContainer}>
            <View style={styles.boxRow1}>
                <Text style={styles.count}>{count}</Text>
                <MaterialCommunityIcons name={iconType} size={27} color="#6226CF"/>
                {/* <Icon ColorFill="#6226CF"/> */}
            </View>
            <Text style={styles.description}>{description}</Text>
        </View>
    );
};

export default BoxData;

const styles = StyleSheet.create({
    boxContainer: {
        fontFamily: "OpenSans",
        padding: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "rgba(159, 159, 159, 0.50)",
        width: windowWidth * 0.38,

    },
    boxRow1: {
        display: "flex",
        flexDirection: isRTL ? "row" : "row-reverse",
        justifyContent: "space-between",
    },
    description: {
        fontSize: 13,
        // fontWeight: 400,
        color: "#9F9F9F",
        textAlign: isRTL?"left":"right",
    },
    count: {
        fontFamily: "OpenSans",
        fontWeight: "bold",
        fontSize: 24,
    },
});
