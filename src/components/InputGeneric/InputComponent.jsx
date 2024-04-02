import React, {useState} from "react";
import {Dimensions, Keyboard, StyleSheet, Text, TextInput, View, I18nManager} from "react-native";
import {TouchableWithoutFeedback} from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/Feather"; // Assuming you're using Feather icons

const windowWidth = Dimensions.get("window").width;
const isRTL = I18nManager.isRTL;


const InputComponent = ({field, value, onChangeText, onBlur, error, isDisabled}) => {
    const [showPassword, setShowPassword] = useState(false);
    const [phoneNumberError, setPhoneNumberError] = useState("");
    const handlePressOutside = () => {
        Keyboard.dismiss();
    };

    const handlePhoneNumberChange = (text) => {
        const isValidPhoneNumber = /^[0-9]*$/.test(text);
        if (!isValidPhoneNumber) {
            setPhoneNumberError("Phone number must start with a digit from 1 to 9.");
        } else {
            setPhoneNumberError("");
        }
        onChangeText(text);
    };

    const renderPrefix = () => {
        if (field.name === "phoneNumber") {
            return <Text style={styles.prefixText}>+972</Text>;
        }
        return null;
    };

    return (
        <TouchableWithoutFeedback onPress={handlePressOutside}>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>{field.label}</Text>
                <View style={styles.inputWrapper}>
                    {renderPrefix()}
                    <TextInput
                        placeholder={field.placeholder}
                        editable={!isDisabled}
                        onChangeText={(text) => {
                            if (["phoneNumber", "bnNumber"].includes(field?.name)) {
                                const phoneNumber = text.replace(/[^0-9]/g, "");
                                handlePhoneNumberChange(phoneNumber);
                            } else {
                                onChangeText(text);
                            }
                        }}
                        onBlur={onBlur}
                        value={value}
                        secureTextEntry={!showPassword && field.type === "password"}
                        style={[styles.input, field.name === "phoneNumber"]}
                        label={field.label}
                        keyboardType={
                            field && ["phoneNumber", "bnNumber"].includes(field.name)
                                ? "numeric"
                                : "default"
                        }
                    />
                    {field.type === "password" && (
                        <View style={styles.eyeIcon}>
                            <TouchableWithoutFeedback onPress={() => setShowPassword(!showPassword)}>
                                <Icon name={showPassword ? "eye" : "eye-off"} size={20} color="gray"/>
                            </TouchableWithoutFeedback>
                        </View>
                    )}
                </View>
                {error && <Text style={styles.errorText}>{error}</Text>}
                {phoneNumberError && <Text style={styles.errorText}>{phoneNumberError}</Text>}
            </View>
        </TouchableWithoutFeedback>
    );
};

export default InputComponent;

const styles = StyleSheet.create({
    label: {
        fontSize: 16,
        marginBottom: 8,
        fontFamily: "OpenSans",
        textAlign: isRTL ? "left" : "right",
    },
    input: {
        height: 56,
        marginBottom: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
        borderColor: "#9F9F9F",
        width: windowWidth * 0.9,
        fontFamily: "OpenSans",
        textAlign: "right",
        backgroundColor: "transparent",
    },
    prefixText: {
        position: "absolute",
        top: 15,
        ...(isRTL ? {right: 15} : {left: 15}),
        fontSize: 16,
        fontFamily: "OpenSans",
    },
    errorText: {
        color: "red",
    },
    inputContainer: {
        position: "relative",
    },
    inputWrapper: {
        flexDirection: "row",
        alignItems: "center",
    },
    eyeIcon: {
        position: "absolute",
        left: 15,
        top: 20,
    },
});
