import {StatusBar} from "expo-status-bar";
import React, {useEffect} from "react";
import {Dimensions, Image, StyleSheet, Text, View,} from "react-native";
import ButtonLower from "../../components/Button/ButtonLower";
import {getUser} from '../../core/auth';
import {routes} from "../../routes/routes";



const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const Intro=({navigation})=> {
    const handleClick = () =>
        navigation.navigate(routes.LOGIN);
    ;
    useEffect(() => {
        getUser().then(res => {
            if (res) {
                navigation.navigate("MyTabs");
            }
        })
    }, [])
    return (
            <View style={styles.containerGetStarted}>
                <View>
                    <Image
                        source={require("../../../assets/images/Layer_1.png")}
                        style={styles.LogoPurple}
                        resizeMode="contain"
                    />
                </View>
                <View style={styles.DivIconImage}>
                    <Image
                        source={require("../../../assets/images/iconPic.png")}
                        style={styles.iconsPicture}
                        resizeMode="contain"
                    />
                    <Text style={styles.WelcomeText}>
                        ברוך הבא לעידן חדש בניהול הקמפיינים של העסק שלך
                    </Text>
                </View>
                <View>
                    <ButtonLower title={"יאללה, בואו נתחיל"} handlePress={handleClick}/>
                </View>
                <StatusBar style="auto"/>
            </View>
    );
}

const styles = StyleSheet.create({
    containerGetStarted: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        paddingBottom: "13%",
        paddingTop: "15%",
        height: windowHeight,
        width: windowWidth,
    },
    LogoPurple: {
        width: windowWidth * 0.5,
        height: windowHeight * 0.1,
    },
    DivIconImage: {
        justifyContent: "center",
        alignItems: "center",
    },
    iconsPicture: {
        width: windowWidth * 0.75,
        height: windowHeight * 0.3,
        // marginTop:windowHeight*0.1,
    },
    WelcomeText: {
        fontFamily: "OpenSans-Bold",
        // fontWeight: 700,
        //lineHeight:24.64,
        fontSize: 16,
        marginTop: windowHeight * 0.04,
        marginHorizontal: windowWidth * 0.125,
        textAlign: "center",
        color: "#19073A",
    },
});

export default Intro