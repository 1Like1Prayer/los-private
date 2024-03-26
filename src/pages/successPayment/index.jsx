import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Image, Text, View, Dimensions } from "react-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
import CustomHeader from "../../components/CustomHeader";
import ButtonLower from "../../components/Button/ButtonLower";

export default function SuccessPayment({ navigation }) {

  
  return (
    <View style={styles.container}>
      <View style={{ width: windowWidth }}>
        <CustomHeader />
      </View>
      <View style={styles.DivSuccess}>
        <Image
          source={require("../../../assets/images/Success.png")}
          style={styles.SuccessPng}
          resizeMode="contain"
        />
        <Text style={styles.SuccessText}>
          התשלום בוצע, תתחדשו
        </Text>
        <ButtonLower title={"סיים"} handlePress={() =>{ navigation.navigate('Home') }}/>

      </View>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FBF8FF",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: windowHeight,
    width: windowWidth,
  },
  DivSuccess: {
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: windowHeight * 0.295,

  },

  SuccessPng: {
    width: windowWidth * 0.549,
    height: windowHeight * 0.1058,
    marginBottom: windowHeight*0.0194
  },
  SuccessText: {
    fontFamily: "OpenSans-Bold",
    // fontWeight: 600,
    fontSize: 22,
    marginHorizontal: windowWidth * 0.12,
    marginTop: windowHeight * 0.0194,
    marginBottom: windowHeight * 0.107,

    textAlign: "center",
    color: "#6226CF",
  },
 
});
