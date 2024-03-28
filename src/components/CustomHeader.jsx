import React, {useEffect, useRef, useState} from "react";
import {Image, Pressable, SafeAreaView, StyleSheet, View} from "react-native";
import MenuIcon from "../icons/MenueIcon";
import profilePic2 from '../../assets/images/profilePic.png';
import {routes} from "../routes/routes";
import {useNavigation} from "@react-navigation/native";
import {getValue} from "../core/secureStore";
import Toast from "react-native-toast-message";

const CustomHeader = () => {
    const [profilePic, setProfilePic] = useState(' ');
    const mounted = useRef(false)
    const navigation = useNavigation()
    const [customerDataState, setCustomerDataState] = useState({})
    useEffect(() => {
        (async () => {
            const customerData = await getValue('customerData')
            setCustomerDataState(customerData);
        })()
    }, []);
    useEffect(() => {
        const fetchProfilePic = async () => {
            try {
                const avatar = await getValue('avatar');
                // Ensure the component is mounted before setting profile picture
                if (!mounted.current) {
                    setProfilePic(avatar);
                    mounted.current = true;
                }
            } catch (error) {
                console.error('Error fetching profile picture:', error);
                Toast.show({
                    type: 'error',
                    text1: error?.response?.data?.message ?? 'An error occurred while uploading image'
                });
            }
        };

        fetchProfilePic();
    }, []);


    return (
        <SafeAreaView>
            <View style={styles.headerContainer}>
                <Pressable onPress={() => {
                    navigation.navigate(routes.CUSTOMER_DETAILS, JSON.parse(customerDataState))
                }}>
                    <Image
                        source={!profilePic ? {uri: profilePic} : profilePic2}
                        resizeMode="contain"
                        style={styles.image}
                    />

                </Pressable>
                <Image
                    source={require("../../assets/images/smallIcon.png")}
                    resizeMode="contain"
                    style={styles.logo}
                />
                <Pressable onPress={() => navigation.openDrawer()}>
                    <MenuIcon ColorFill="#6226CF"/>
                </Pressable>
            </View>
        </SafeAreaView>
    );
};

export default CustomHeader;

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 40,
        paddingHorizontal: 17,
        marginTop: 5
    },
    image: {
        width: 36,
        height: 36,
    },
    logo: {
        width: 80,
        height: 36,
    },
});
