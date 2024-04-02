import React from "react";
import {Dimensions, Image, StyleSheet, TouchableOpacity, View} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import FormComponent from "../../components/FormGeneric/FormComponent";
import * as Yup from "yup";
import Toast from 'react-native-toast-message';
import apiClient from '../../core/apiClient';
import {routes} from "../../routes/routes";
import {useDispatch, useSelector} from "react-redux";
import {setAvatar} from "../../store/userSlice";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const fields = [
    {
        name: "companyName",
        placeholder: "",
        label: "שם החברה",
        type: "text",
    },
    {
        name: "bnNumber",
        placeholder: "הזן ח.פ",
        label: "ח.פ",
        type: "number",
    },
    {
        name: "phoneNumber",
        placeholder: "הזן מספר פלאפון",
        label: "מספר פלאפון",
        type: "phone",
    },
];
const formValidationSchema = Yup.object().shape({
    companyName: Yup.string().required("זהו שדה חובה"),
    bnNumber: Yup.number().required("זהו שדה חובה"),
    phoneNumber: Yup.string()
        .matches(/^[0-9]{9,10}$/, "פורמט לא חוקי")
        .required("זהו שדה חובה"),
});

const CustomerDetails = ({navigation, route: {params: {companyName, bnNumber, phoneNumber}}}) => {
    const formInitValues = {
        companyName,
        bnNumber,
        phoneNumber
    };
    const leos_id = useSelector(state => state.user.leos_id)
    const dispatch = useDispatch();
    const onSubmit = async (values) => {
        try {
            if (values.images.length) {
                const {data} = await apiClient.updateClientAvatar(leos_id, values.images[0]);
                dispatch(setAvatar, data);
            }
            await navigation.navigate("MyTabs");
        } catch (error) {
            console.log('update failed:', error);
            Toast.show({
                type: 'error',
                text1: error?.response?.data?.message ?? 'An error occurred while uploading image'
            });
        }
    };

    return (
        <View style={styles.container}>
            <View
                style={{display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
                <View style={{marginRight: 20}}>
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => {
                            navigation.navigate(routes.LOGIN)
                        }}
                    >
                        <Ionicons name="arrow-back" size={24} color="black"/>
                    </TouchableOpacity>
                </View>
                <View>
                    <Image
                        source={require("../../../assets/images/Layer_1.png")}
                        style={styles.logo}
                        resizeMode="contain"
                    />
                </View>
            </View>
            <FormComponent
                fields={fields}
                onSubmit={onSubmit}
                formInitValues={formInitValues}
                formValidationSchema={formValidationSchema}
                checkbox={false}
                uploadImage={true}
                disabled={true}
            />
        </View>
    );
};

export default CustomerDetails;

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        paddingBottom: "13%",
        paddingTop: 70,
        paddingRight: windowWidth * 0.05,
        paddingLeft: windowWidth * 0.05,
        height: windowHeight,
        width: windowWidth,
    },
    backButton: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
    },
    logo: {
        width: windowWidth * 0.5,
        height: windowHeight * 0.1,
        marginLeft: 10,
    },
});
