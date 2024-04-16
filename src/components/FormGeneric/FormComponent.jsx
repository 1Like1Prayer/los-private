import React, { useState } from "react";
import {
  Dimensions,
  I18nManager,
  Linking,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Formik } from "formik";
import ButtonLower from "../Button/ButtonLower";
import InputComponent from "../InputGeneric/InputComponent";
import CheckBox from "../CustomCheckBox/CheckBox";
import UploadImage from "../UploadData/UploadImage";
import { useRoute } from "@react-navigation/native";
import { routes } from "../../routes/routes";
import Toast from "react-native-toast-message";
import { errorMessages } from "../../constants/errorMessages";

const windowWidth = Dimensions.get("window").width;
const isRTL = I18nManager.isRTL;

const FormComponent = ({
  fields,
  onSubmit,
  formInitValues,
  formValidationSchema,
  checkbox,
  uploadImage,
  disabled = false,
  allowToSubmit = true,
  errorMessage = "",
}) => {
  const [isChecked, setIsChecked] = useState(false);
  const [checkBoxError, setCheckBoxError] = useState(false);
  const [images, setImages] = useState([]);

  const privacyUrl = "https://www.leos.co.il/privacy-policy/";

  const validationSchema = formValidationSchema;

  const route = useRoute();
  const handleSubmit = (values) => {
    if (!isChecked && checkbox) {
      setCheckBoxError(true);
    } else {
      setCheckBoxError(false);
      onSubmit({ ...values, images });
    }
  };

  const handlePress = async () => {
    try {
      const supported = await Linking.canOpenURL(privacyUrl);
      if (supported) {
        await Linking.openURL(privacyUrl);
      } else {
        Toast.show({
          type: "error",
          text1: errorMessages[error?.response?.status] || 'שגיאה לא ידועה'
        });
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: errorMessages[error?.response?.status] || 'שגיאה לא ידועה'
      });
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
          <View
            style={{
              marginTop: windowWidth * (disabled ? 0.05 : 0.2),
            }}
          >
            {fields.map((field) => (
              <InputComponent
                key={field.name}
                field={field}
                value={values[field.name]}
                onChangeText={handleChange(field.name)}
                onBlur={handleBlur(field.name)}
                error={errors[field.name]}
                isDisabled={disabled}
              />
            ))}

            {route.name === routes.CUSTOMER_DETAILS && (
              <View>
                <Text style={{ ...styles.label, fontWeight: 900 }}>
                  לוגו חברה{" "}
                </Text>
              </View>
            )}
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
          <View style={{ marginTop: 30, marginBottom: 10 }}>
            {/* Disable the button if form is not valid */}
            {errorMessage && (
              <Text
                style={{
                  textAlign: isRTL ? "left" : "right",
                  marginBottom: 20,
                }}
              >
                {errorMessage}
              </Text>
            )}
            <ButtonLower
              isDisabled={!allowToSubmit}
              title={
                route.name !== routes.CUSTOMER_DETAILS
                  ? "שלח והתחל"
                  : "אימות נתונים"
              }
              handlePress={handleSubmit}
            />
          </View>
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
  label: {
    textAlign: isRTL ? "left" : "right",
    color: "#A020F0",
  },
});
