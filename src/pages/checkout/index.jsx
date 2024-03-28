import React, {useState} from "react";
import {Dimensions, Keyboard, StyleSheet, TouchableWithoutFeedback, View,} from "react-native";
import ButtonLower from "../../components/Button/ButtonLower";
import CreditCardForm from "../../components/CreditCardForm";
import PaymentMethodDropDown from "../../components/PaymentMethodDropDown";
import SvgApplePay from "../../icons/ApplePay";
import SvgBit from "../../icons/Bit";
import SvgGooglePay from "../../icons/GooglePay";
import SvgVisaMastercard from "../../icons/VisaMastercard";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

function CheckoutPage() {
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
    const [visible, setVisible] = useState(false);
    const [creditCardData, setCreditCardData] = useState({
        cardNumber: "",
        cardHolder: "",
        cardExpiry: "",
        cardCVC: "",
    });

    const [selected, setSelected] = useState(undefined);
    const paymentMethods = [
        {label: "Google Pay", value: "google", icon: <SvgGooglePay/>},
        {label: "Apple Pay", value: "apple", icon: <SvgApplePay/>},
        {label: "Visa/MasterCard", value: "visa", icon: <SvgVisaMastercard/>},
        {label: "Bit", value: "bit", icon: <SvgBit/>},
    ];

    const handlePressOutside = () => {
        Keyboard.dismiss();
    };

    const handlePaymentSubmission = () => {
        if (selectedPaymentMethod === "Visa/MasterCard") {
            // Process Visa/MasterCard payment using creditCardData
            console.log("Visa/MasterCard Payment Submitted", creditCardData);
        } else {
            // Handle other payment methods
            // console.log(${selectedPaymentMethod} Payment Submitted);
        }
    };

    return (
        <TouchableWithoutFeedback onPress={handlePressOutside}>
            <View style={styles.container}>
                {visible ? <View style={styles.background}/> : null}

                <View>
                    <PaymentMethodDropDown
                        label="פרטי אשראי"
                        data={paymentMethods}
                        onSelect={setSelected}
                        setVisible={setVisible}
                        visible={visible}
                    />
                    <CreditCardForm/>
                </View>

                <ButtonLower title="בצע תשלום" onPress={handlePaymentSubmission}/>
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        width: windowWidth,
        height: windowHeight*0.7,
        position: "relative",
        justifyContent: "space-between",
        alignItems: "center",
    },
    background: {
        backgroundColor: "rgba(0, 0, 0, 0.7)", // Semi-transparent black background
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 2,
        width: windowWidth,
        height: windowHeight
    }
});

export default CheckoutPage;