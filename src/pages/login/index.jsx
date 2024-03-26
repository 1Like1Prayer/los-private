import React from "react";
import {Dimensions, Image, StyleSheet, View} from "react-native";
import FormComponent from "../../components/FormGeneric/FormComponent";
import * as Yup from "yup";
import apiClient from '../../core/apiClient';
import {setUser} from '../../core/auth';
import Toast from 'react-native-toast-message';

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
        placeholder: "050877345",
        label: "מספר פלאפון",
        type: "phone",
    },
    {
        name: "password",
        placeholder: "******",
        label: "אימות סיסמא בהודעה",
        type: "password",
    },
];

const Login = ({navigation}) => {
    const formInitValues = {
        phoneNumber: "0525226939",
        // phoneNumber: "525226939",
        password: "UCrICsS1HD",
        bnNumber: "313882000",
    };
    // const formInitValues = {
    //   phoneNumber: "",
    //   password: "",
    //   bnNumber: "",
    // };
    const formValidationSchema = Yup.object().shape({
        phoneNumber: Yup.string()
            .matches(/^[0-9]{9,10}$/, {message: "פורמט לא חוקי"})
            .required("זהו שדה חובה"),
        bnNumber: Yup.string().required("זהו שדה חובה"),
        password: Yup.string().required("זהו שדה חובה")
    });
    const onSubmit = async (values) => {
        try {
            // const loginResponse = await apiClient.login('app@leos.co.il', values.password);
            // const token = loginResponse.data.token;
            // await setToken(token);
            const userInfoResponse = await apiClient.getUserInfo(values.phoneNumber, values.bnNumber);
            setUser({...userInfoResponse.data, leos_id: '94872929494729748'});
            navigation.navigate("CustomerDetails");
        } catch (error) {
            console.log(error?.response?.data?.message);
            console.log('An error occurred');
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
