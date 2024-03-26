import React from "react";
import { StyleSheet, Pressable, Text, View, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const ButtonLower = ({ title, handlePress }) => {
  return (
    <View style={styles.containerButtonLower}>
      <Pressable onPress={handlePress} style={styles.Lower}>
        <LinearGradient
          colors={["#6226CF", "#5D23C9", "#A61EDF"]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={styles.gradient}
        >
          <Text style={styles.buttonText}>{title}</Text>
        </LinearGradient>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  Lower: {
    borderRadius: 10,
    overflow: "hidden",
  },
  buttonText: {
    color: "#FFFFFF",
    fontFamily: "OpenSans",
    fontSize: 17,
    // fontWeight: 400,
    paddingVertical: windowHeight * 0.02,
  },
  gradient: {
    display: "flex",
    borderRadius: 10,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  containerButtonLower: {
    width: windowWidth * 0.9,
  },
});

export default ButtonLower;
