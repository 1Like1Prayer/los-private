import React, {useEffect, useState} from "react";
import {Dimensions, Keyboard, Linking, StyleSheet, TouchableWithoutFeedback, View,} from "react-native";
import ButtonLower from "../../components/Button/ButtonLower";
import CreditCardForm from "../../components/CreditCardForm";
import PaymentMethodDropDown from "../../components/PaymentMethodDropDown";
import SvgApplePay from "../../icons/ApplePay";
import SvgBit from "../../icons/Bit";
import SvgGooglePay from "../../icons/GooglePay";
import SvgVisaMastercard from "../../icons/VisaMastercard";
import WebView from "react-native-webview";

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
    // const url = 'https://icom.yaad.net/p/?Amount=0&Masof=4500147832&MoreData=True&PageLang=HEB&Pritim=True&UTF8=True&UTF8out=True&action=pay&heshDesc=%255B0~%25D7%2597%25D7%2591%25D7%2599%25D7%259C%25D7%25AA%2520%25D7%2590%25D7%2597%25D7%25A1%25D7%2595%25D7%259F%2520100MB~1~35.1%255D&tmp=4&signature=0553c87637a970f892c085a2f130c418e540ed27d58ec72c9f901eabca7a51d9&PassP=yCUMShJAR'
    useEffect(() => {
        console.log('inside on init');
        const url = 'https://icom.yaad.net/p/?Amount=0.1&Masof=4500147832&MoreData=True&PageLang=HEB&Pritim=True&UTF8=True&UTF8out=True&action=pay&heshDesc=%255B0~%25D7%2597%25D7%2591%25D7%2599%25D7%259C%25D7%25AA%2520%25D7%2590%25D7%2597%25D7%25A1%25D7%2595%25D7%259F%2520100MB~1~0.1%255D&tmp=3&signature=b4616ee2705d1fdd2b7af522bd6a675a3162897dbd5de51044ef10dbd8d415b3&PassP=yCUMShJAR'
        Linking.openURL(url).catch((err) => console.error('An error occurred', err));

    }, []);
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
        <View style={{width: windowWidth, height: windowHeight}}>
            {/*<WebView source={{uri:url}} />*/}
        </View>
        //     <TouchableWithoutFeedback onPress={handlePressOutside}>
        //     <View style={styles.container}>
        //         {visible ? <View style={styles.background}/> : null}
        //
        //         <View>
        //             <PaymentMethodDropDown
        //                 label="פרטי אשראי"
        //                 data={paymentMethods}
        //                 onSelect={setSelected}
        //                 setVisible={setVisible}
        //                 visible={visible}
        //             />
        //             <CreditCardForm/>
        //         </View>
        //
        //         <ButtonLower title="בצע תשלום" onPress={handlePaymentSubmission}/>
        //     </View>
        // </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        width: windowWidth,
        height: windowHeight * 0.7,
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