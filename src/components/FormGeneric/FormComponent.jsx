import React, { useEffect, useState } from "react";
import { View, StyleSheet, Dimensions, Text } from "react-native";
import { Formik, useFormik } from "formik";

import ButtonLower from "../Button/ButtonLower";
import InputComponent from "../InputGeneric/InputComponent";
import CheckBox from "../CustomCheckBox/CheckBox";
import UploadImage from "../UploadData/UploadImage";
import {Linking} from 'react-native';
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from '@expo/vector-icons';
import { useRoute } from "@react-navigation/native";

const windowWidth = Dimensions.get("window").width;

const FormComponent = ({
  fields,
  onSubmit,
  formInitValues,
  formValidationSchema,
  checkbox,
  uploadImage,
}) => {
  const [isChecked, setIsChecked] = useState(false);
  const [checkBoxError, setCheckBoxError] = useState(false);
  const [images, setImages] = useState([]);

  const privacyUrl = "https://www.leos.co.il/privacy-policy/";

  const validationSchema = formValidationSchema;

  const route = useRoute();

  useEffect(() => {
    console.log('Current route name:', route.name);
  }, [route]);

  const formik = useFormik({
    initialValues: formInitValues,
    validationSchema: validationSchema,
    onSubmit: handleSubmit, // Change here
  });

  const handleSubmit = () => {
    
    if (!isChecked && checkbox) {
      setCheckBoxError(true);
    } else {
      setCheckBoxError(false);
      onSubmit({ ...formik.values, images });
    }
  };

  const handlePress = async () => {
    try {
      console.log('hanlde pric')
      const supported = await Linking.canOpenURL(privacyUrl);
      // console.log("Privacy:" , privacyUrl);

      if (supported) {
        await Linking.openURL(privacyUrl);
      } else {
        console.log("Cannot open URL:", privacyUrl);
      }
    } catch (error) {
      console.error("Error opening URL:", error);
    }
  };
  

  return (
    <Formik
      initialValues={formInitValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
        <View style={styles.container}>
          <View style={styles.inputs}>
            {fields.map((field) => (
              <InputComponent
                key={field.name}
                field={field}
                value={values[field.name]}
                onChangeText={handleChange(field.name)}
                onBlur={handleBlur(field.name)}
                error={ errors[field.name]}
              />
            ))}
            
        {route.name === "CustomerDetails" && <View >
           <Text style={styles.label}>לוגו חברה </Text>
           </View>  }
           
          </View>
          {checkbox ? (
            <CheckBox
              onPress={() => {
                setIsChecked(!isChecked);
                setCheckBoxError(false);
              }}
              onLabelPress={handlePress}
              
              title="- לחץ כאן לקריאה"
              title2="אני מאשר את התקנון"
              isChecked={isChecked}
            />
          ) : null}
          {checkbox && checkBoxError && (
            <Text style={styles.errorText} onPress={handlePress}>
              חובה לאשר את התקנון לפני המשך ההרשמה
            </Text>
          )}

          {uploadImage ? <UploadImage onChange={setImages} /> : null}
          <View style={{marginTop: 30, marginBottom: 10}}>
            {/* Disable the button if form is not valid */}
            <ButtonLower title={"שלח והתחל"} handlePress={handleSubmit} />
          </View>
         
         {route.name == "CustomerDetails" &&
          <View style={{ alignItems: 'center', marginTop: 10, flexDirection: 'row', justifyContent: 'center',  }}>
          <Ionicons name="pencil" size={24} color="black" style={{color: "#6226CF"}} />
          <Text style={{ fontSize: 16, marginRight: 5 ,color: "#6226CF"}}>עריכת פרטים</Text>
         </View>
}
        </View>
      )}
    </Formik>
  );
};

export default FormComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  inputs: {
    marginTop: windowWidth * 0.2,
  },
  checkboxContainer: {
    flexDirection: "row-reverse",
    alignItems: "flex-start",
  },
  checkbox: {
    backgroundColor: "#6226CF",
    color: "#6226CF",
  },
  label: {
    textAlign: "right",
    
  }
});
