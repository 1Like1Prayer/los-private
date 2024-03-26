import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import SvgFrame from "../icons/Frame";
import SvgGraphIcon from "../icons/GraphIcon";
import SvgClickIcon from "../icons/ClickIcon";



const BoxData = ({count, description, iconComponent}) => {
  // const Icon = iconComponent || SvgFrame;
  const iconMap = {
    'area-graph': 'chart-areaspline',
    'target-two': 'target',
  };
  const iconType = iconMap[iconComponent] || 'help-circle-outline';
  return (
    <View style={styles.boxContainer}>
      <View style={styles.boxRow1}>
        <Text style={styles.count}>{count}</Text>
        <MaterialCommunityIcons name={iconType} size={27} color="#6226CF" />
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
    width:160,

  },
  boxRow1: {
    display: "flex",
    flexDirection: "row-reverse",
    justifyContent: "space-between",
  },
  description: {
    fontSize: 13,
    // fontWeight: 400,
    color: "#9F9F9F",
    textAlign:"right",
  },
  count: {
    fontFamily: "OpenSans",
    fontWeight:"bold",
    fontSize: 24,
  },
});
