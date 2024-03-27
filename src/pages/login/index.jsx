import React from "react";
import {Dimensions, Image, StyleSheet, View} from "react-native";
import FormComponent from "../../components/FormGeneric/FormComponent";
import * as Yup from "yup";
import apiClient from '../../core/apiClient';
import {setUser} from '../../core/auth';
import Toast from 'react-native-toast-message';
import {routes} from "../../routes/routes";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const fields = [
    {
        name: "bnNumber",
        placeholder: "כתוב כאן ח.פ",
        label: "ח.פ",
        type: "number",
    },
    {
        name: "phoneNumber",
        placeholder: "כתוב כאן מספר טלפון",
        label: "מספר פלאפון",
        type: "phone",
    },
    // {
    //     name: "password",
    //     placeholder: "******",
    //     label: "אימות סיסמא בהודעה",
    //     type: "password",
    // },
];

const formInitValues = {
    phoneNumber: "0525226939",
    bnNumber: "313882557",
    // password: "UCrICsS1HD",
};
const formValidationSchema = Yup.object().shape({
    phoneNumber: Yup.string()
        .matches(/^[0-9]{9,10}$/, {message: "פורמט לא חוקי"})
        .required("זהו שדה חובה"),
    bnNumber: Yup.string().required("זהו שדה חובה"),
    // password: Yup.string().required("זהו שדה חובה")
});

const Login = ({navigation}) => {
    const onSubmit = async (values) => {
        try {
            const userInfo = await apiClient.getUserInfo(values.phoneNumber, values.bnNumber);
            console.log(userInfo)
            // setUser({...userInfoResponse.data, leos_id: '94872929494729748'});
            await setUser(userInfo);
            navigation.navigate(routes.CUSTOMER_DETAILS,{companyName:userInfo.name,bnNumber:values.bnNumber,phoneNumber:values.phoneNumber});
        } catch (error) {
            console.log('An error occurred',error?.response?.data?.message);
            Toast.show({
                type: 'error',
                text1: error?.response?.data?.message ?? 'An error occurred'
            });
        }
    };
    return (
        <View style={styles.container}>
            <View>
                <Image
                    source={require("../../../assets/images/Layer_1.png")}
                    style={styles.LogoPurple}
                    resizeMode="contain"
                />
            </View>
            <FormComponent
                fields={fields}
                onSubmit={onSubmit}
                formInitValues={formInitValues}
                formValidationSchema={formValidationSchema}
                checkbox={true}
                uploadImage={false}
            />
        </View>
    );
};

export default Login;

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
    LogoPurple: {
        width: windowWidth * 0.5,
        height: windowHeight * 0.1,
    },
});
