import {StatusBar} from "expo-status-bar";
import React from "react";
import {Dimensions, Image, StyleSheet, Text, View} from "react-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;


export default function ComingSoon({navigation}) {

    return (
        <View style={styles.containerGetStarted}>
            <View style={styles.DivComingSoon}>
                <Image
                    source={require("../../../assets/images/comingSoon.png")}
                    style={styles.ComingSoon}
                    resizeMode="contain"
                />
                <Text style={styles.ComingSoonText}>
                    בקרוב תוכלו ליצור קשר איתנו ישירות באפליקציה! דברים טובים קורים בלאוס
                    :)
                </Text>
            </View>
            <StatusBar style="auto"/>
        </View>
    );
}

const styles = StyleSheet.create({
    containerGetStarted: {
        backgroundColor: "#FBF8FF",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: windowHeight,
        width: windowWidth,
    },
    DivComingSoon: {
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        top: windowHeight * 0.25,
    },

    ComingSoon: {
        width: windowWidth * 0.759,
        height: windowHeight * 0.254,
    },
    ComingSoonText: {
        fontFamily: "OpenSans",
        fontSize: 16,
        marginHorizontal: windowWidth * 0.12,
        textAlign: "center",
        color: "#19073A",
    },
});
