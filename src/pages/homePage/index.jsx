import React, {useEffect, useState} from "react";
import {Dimensions, FlatList, StyleSheet, View} from "react-native";
import apiClient from "../../core/apiClient";
import Panel from "../../components/Panel";
import Toast from "react-native-toast-message";
import {useSelector} from "react-redux";
import HomeSkeleton from "../../components/HomeSkeleton";
import {deleteUser, getUser} from "../../core/auth";
import {routes} from "../../routes/routes";
import { errorMessages } from "../../constants/errorMessages";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
export let validityInterval;
const HomePage = ({navigation}) => {
    const checkUserValidity = async () => {
        const {phoneNumber, bnNumber} = await getUser()
        const success = await apiClient.getUserValidity(phoneNumber, bnNumber);
        success ? console.log('user is valid') : console.log('user is not valid')
        if (!success) {
            clearInterval(validityInterval)
            deleteUser()
                .catch((err) => {
                    console.log(err);
                })
                .finally(() => {
                    Toast.show({
                        type: 'error',
                        text1:'User is not allowed!'
                    });
                    navigation.navigate(routes.LOGIN);
                });
        }
    }
    const leos_id = useSelector((state) => state.user.user.leos_id);
    const [clientData, setClientData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        validityInterval = setInterval(async () => {
            checkUserValidity()
        }, 10000)
        return () => clearInterval(validityInterval)
    }, [])

    useEffect(() => {
        (async () => {
            setIsLoading(true);
            try {
                const data = await apiClient.getClientData(leos_id, "seo");

                setClientData([data]);
            } catch (error) {
                console.log(error);
                Toast.show({
                    type: "error",
                    text1: errorMessages[error?.response?.status] || 'שגיאה לא ידועה'
                });
            } finally {
                setIsLoading(false);
            }
        })();
    }, []);
    return (
        <View style={styles.container}>
            <View style={styles.homeContainer}>
                {isLoading ? (
                    <>
                        <HomeSkeleton/>
                    </>
                ) : (
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={clientData}
                        renderItem={({item}) => (
                            <Panel
                                title={item.title}
                                dataTable={item?.dataTable}
                                boxData={item.boxData}
                            />
                        )}
                    />
                )}
            </View>
        </View>
    );
};
export default HomePage;
const styles = StyleSheet.create({
    container: {
        width: windowWidth,
        height: windowHeight * 0.85,
        backgroundColor: "#FBF8FF",
    },
    homeContainer: {
        flex: 1,
        alignItems: "center",
        marginBottom: windowHeight * 0.07,
    },
});
