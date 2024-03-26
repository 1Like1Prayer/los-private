import React, { useEffect, useState } from "react";
import { View, Image, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Formik } from "formik";
import FormComponent from "../../components/FormGeneric/FormComponent";
import * as Yup from "yup";
import Toast from 'react-native-toast-message';
import apiClient from '../../core/apiClient';
import { getUser, setUser } from '../../core/auth';
import { navigate } from "../../navigation/NavigationService";

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
    placeholder: "",
    label: "ח.פ",
    type: "number",
  },
  {
    name: "phoneNumber",
    placeholder: "",
    label: "מספר פלאפון",
    type: "phone",
  },
];

const CustomerDetails = ({ navigation }) => {
  const [userData, setUserData] = useState({})
  const formInitValues = {
    companyName: "שעוני יוקרה בע״מ",
    bnNumber: "",
    phoneNumber: "",
  };
  const formValidationSchema = Yup.object().shape({
    companyName: Yup.string().required("זהו שדה חובה"),
    bnNumber: Yup.number().required("זהו שדה חובה"),
    phoneNumber: Yup.string()
    .matches(/^[0-9]{9}$/, "פורמט לא חוקי")
    .required("זהו שדה חובה"),
  });

  const onSubmit = async (values) => {
    console.log('values :- ', values)
    try {
      if (values.images.length) {
        console.log("userData leos :" , userData.leos_id)
        console.log("images leos :" , values.images[0])
        const res = await apiClient.updateClientAvatar(userData.leos_id, values.images[0]);

        setUser({...userData, ...res.data});
        navigation.navigate("MyTabs");
      } else {
        navigation.navigate("MyTabs");
      }
    } catch (error) {
      console.log('update failed:', error);
      Toast.show({
        type: 'error',
        text1: error?.response?.data?.message ?? 'An error occurred'
      });
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const user = await getUser();
        setUserData(user)
      } catch (error) {
        console.log('Error getting user data');
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      <View style={{display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
      <View style={{marginRight: 20}}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() =>{navigate('Login')}}
      >
        <Ionicons name="arrow-back" size={24} color="black" />
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
