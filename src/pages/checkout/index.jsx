import React, {useEffect, useState} from "react";
import {Dimensions, Keyboard, Linking, StyleSheet, View} from "react-native";
import SvgApplePay from "../../icons/ApplePay";
import SvgBit from "../../icons/Bit";
import SvgGooglePay from "../../icons/GooglePay";
import SvgVisaMastercard from "../../icons/VisaMastercard";
import axios from "axios";
import {useSelector} from "react-redux";
import {useNavigation} from "@react-navigation/native";
import {routes} from "../../routes/routes";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

function CheckoutPage({route}) {
    const {cart, totalPrice} = useSelector((state) => state.cart);
    const navigator = useNavigation();
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
    const [visible, setVisible] = useState(false);
    const [creditCardData, setCreditCardData] = useState({
        cardNumber: "",
        cardHolder: "",
        cardExpiry: "",
        cardCVC: "",
    });
    useEffect(() => {
        console.log(cart)
    }, [cart])
//todo add handling for monthly payments, add functionality to choose webview, and follow the redirect.
//todo add handling parent and child items in market
    useEffect(() => {
        const formDataAPISign = new FormData();
        formDataAPISign.append("action", "APISign");
        formDataAPISign.append("What", "SIGN");
        formDataAPISign.append("KEY", "d7c19db1377f260dd6122ed3a985d7ff8ca60b50");
        formDataAPISign.append("PassP", "yCUMShJAR");
        formDataAPISign.append("Masof", "4500147832");
        formDataAPISign.append("UTF8out", "True");
        formDataAPISign.append("UTF8", "True");
        formDataAPISign.append("tmp", "4");
        formDataAPISign.append("PageLang", "HEB");
        formDataAPISign.append("Pritim", "True");
        formDataAPISign.append("Amount", `${totalPrice}`);
        formDataAPISign.append(
            "heshDesc",
            `[${Object.entries(cart).map(([key, val]) => `0~${key}~1~${val.price}`)}]`
                .split(",")
                .map((item) => `[${item}]`)
                .join("")
        );
        formDataAPISign.append("MoreData", "True");
        (async () => {
            const {data} = await axios.post(
                "https://icom.yaad.net/p/",
                formDataAPISign,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            const url = `https://icom.yaad.net/p/?${data}&PassP=yCUMShJAR`;
            await Linking.openURL(url).catch((err) =>
                console.error("An error occurred", err)
            );

            navigator.navigate(routes.MARKETPLACEHOME);
        })();
    }, [cart]);

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
        height: windowHeight,
    },
});

export default CheckoutPage;
