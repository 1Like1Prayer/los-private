import {StatusBar} from "expo-status-bar";
import React from "react";
import {Dimensions, Image, StyleSheet, Text, View} from "react-native";
import ButtonLower from "../../components/Button/ButtonLower";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function FailedPayment({navigation}) {


    return (
        <View style={styles.container}>
            <View style={styles.DivFailed}>
                <Image
                    source={require("../../../assets/images/FailedIcon.png")}
                    style={styles.FailedPng}
                    resizeMode="contain"
                />
                <Text style={styles.FailedText}>
                    התשלום נכשל, נסו שוב
                </Text>
                <ButtonLower title={"נסה שוב"} handlePress={() => {
                    navigation.navigate('CheckoutPage')
                }}/>

            </View>

            <StatusBar style="auto"/>
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
    DivFailed: {
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        top: windowHeight * 0.295,

    },

    FailedPng: {
        width: windowWidth * 0.549,
        height: windowHeight * 0.1058,
        marginBottom: windowHeight * 0.0194
    },
    FailedText: {
        fontFamily: "OpenSans-Bold",
        fontSize: 22,
        marginHorizontal: windowWidth * 0.12,
        marginTop: windowHeight * 0.0194,
        marginBottom: windowHeight * 0.107,

        textAlign: "center",
        color: "#6226CF",
    },

});
