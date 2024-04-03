import React, {useEffect, useState} from "react";
import {Button, Dimensions, Image, Modal, StyleSheet, Text, TextInput, View} from "react-native";
import FormComponent from "../../components/FormGeneric/FormComponent";
import * as Yup from "yup";
import apiClient from '../../core/apiClient';
import Toast from 'react-native-toast-message';
import {routes} from "../../routes/routes";
import {useDispatch, useSelector} from "react-redux";
import {setCustomer, setUser as setStoreUser} from '../../store/userSlice'
import axios from "axios";
import {encode} from 'base-64';
import { setUser } from "../../core/auth";

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
];

//testing 0525226939 - 313882557
const formInitValues = {
    phoneNumber: "",
    bnNumber: "",
};
const formValidationSchema = Yup.object().shape({
    phoneNumber: Yup.string()
        .matches(/^[0-9]{9,10}$/, {message: "פורמט לא חוקי"})
        .required("זהו שדה חובה"),
    bnNumber: Yup.string().required("זהו שדה חובה"),
});

const Login = ({navigation}) => {
        const dispatch = useDispatch();
        const customerData = useSelector(state => state.user.customer)
        const [isOpen, setIsOpen] = useState(false);
        const [otp, setOtp] = useState('')
        const [randomPass, setRandomPass] = useState('')
		const [dataToSave, setDataToSave] = useState({
			bnNumber: '',
			phoneNumber: '',
		});
	
        const onSubmit = async (values) => {
            try {
	            setDataToSave(() => {
		            return {
			            bnNumber: values.bnNumber,
			            phoneNumber: values.phoneNumber,
		            }
	            })
                const userInfo = await apiClient.getUserInfo(values.phoneNumber, values.bnNumber);
                const customerData = {
                    bnNumber: values.bnNumber,
                    phoneNumber: values.phoneNumber,
                    companyName: userInfo.name
                }
                const tempRand = (String(Math.floor(Math.random() * 9000) + 1000))
	            console.log(tempRand)
	            setRandomPass(tempRand)
                setIsOpen(prev => !prev)
                await axios.post('https://capi.inforu.co.il/api/v2/SMS/SendSms', JSON.stringify({
                    Data: {
                        Message: `הסיסמא החד פעמית שלך היא - ${tempRand}`,
                        Recipients: [
                            {
                                Phone: `${values.phoneNumber}`,
                            },
                        ],
                        Settings: {
                            Sender: 'Leos',
                        },
                    }
                }), {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization':
                            `Basic ${encode('leosapp:7504a046-7952-4dfc-a2d1-ab8f04a8557f')}`
                    }
                })
                dispatch(setStoreUser(userInfo))
                dispatch(setCustomer(customerData))
            } catch
                (error) {
                console.log(error)
                console.log('An error occurred', error?.response?.data?.message);
                Toast.show({
                    type: 'error',
                    text1: error?.response?.data?.message ?? 'An error occurred while fetching user'
                });
            }
        };
        const onOtpSubmit = async () => {
            try {
                if (randomPass===otp) {
                    setIsOpen(false);
	                await setUser(dataToSave);
                    await navigation.navigate(routes.CUSTOMER_DETAILS, {...customerData,cameFromLogin:true});
                } else {

                    Toast.show({
                        type: 'error',
                        text1: 'Wrong Password! Try again'
                    })
                    setOtp('');
                    setIsOpen(false);
                }
            } catch (error) {
                console.log('An error occurred', error?.response?.data?.message);
                Toast.show({
                    type: 'error',
                    text1: error?.response?.data?.message ?? 'An error occurred while fetching user'
                })
            }
        }
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
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={isOpen}
                    onRequestClose={() => {
                        setIsOpen(!isOpen);
                    }}
                >
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>הזמן סיסמא חד פעמית</Text>
                        <TextInput
                            style={styles.modalInput}
                            onChangeText={setOtp}
                            value={otp}
                            keyboardType="numeric"
                        />
                        <Button
                            title="שלח לאימות"
                            onPress={onOtpSubmit}
                        />
                    </View>
                </Modal>
            </View>
        );
    }
;

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
    modalView: {
        margin: 20,
        marginTop:windowHeight*0.25,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center",
        flexWrap: 'wrap',
    },
    modalInput: {
        marginBottom: 15,
        borderWidth: 1,
        borderColor: "#ddd",
        padding: 10,
        width: "80%"
    },
});
