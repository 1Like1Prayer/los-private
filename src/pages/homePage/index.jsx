import React, {useEffect, useState} from "react";
import {Dimensions, FlatList, StyleSheet, View} from "react-native";
import apiClient from '../../core/apiClient';
import Panel from "../../components/Panel";
import Toast from "react-native-toast-message";
import {useSelector} from "react-redux";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const HomePage = () => {
    const leos_id = useSelector(state => state.user.user.leos_id)
    const [clientData, setClientData] = useState([])
    useEffect(() => {
        (async () => {
            try {
                const data = await apiClient.getClientData(leos_id, 'seo')

                setClientData([data]);
            } catch (error) {
                console.log(error)
                Toast.show({
                    type: 'error',
                    text1: error?.response?.data?.message ?? 'An error occurred while getting data'
                });
            }
        })()
    }, [])
    return (
        <View style={styles.container}>
            <View style={styles.homeContainer}>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={clientData}
                    renderItem={({item}) => <Panel title={item.title} dataTable={item?.dataTable}
                                                   boxData={item.boxData}/>}
                />
            </View>
        </View>
    );
}
export default HomePage;
const styles = StyleSheet.create({
    container: {
        width: windowWidth,
        height: windowHeight * 0.85,
        backgroundColor: "#FBF8FF"
    },
    homeContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: windowHeight * 0.07,
    },
});