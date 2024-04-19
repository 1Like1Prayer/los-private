import React, {useEffect, useState} from 'react';
import {Dimensions, Keyboard, Linking, StyleSheet, View} from 'react-native';
import SvgApplePay from '../../icons/ApplePay';
import SvgBit from '../../icons/Bit';
import SvgGooglePay from '../../icons/GooglePay';
import SvgVisaMastercard from '../../icons/VisaMastercard';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {routes} from '../../routes/routes';
import {clearCart, hasMonthlySubscription, monthlySubsPrice} from '../../store/marketSlice';
import WebView from "react-native-webview";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function CheckoutPage({route}) {
    const {cart, totalPrice} = useSelector((state) => state.cart);
    const navigator = useNavigation();
    const dispatch = useDispatch();
    const isMonthly = useSelector(hasMonthlySubscription);
    const monthlySubPrice = useSelector(monthlySubsPrice);
    const [url, setUrl] = useState('')

    useEffect(() => {
        return () => {
            if(!isMonthly) return dispatch(clearCart());
        }
    }, []);

    useEffect(() => {
        if (url.length && !isMonthly) {
            Linking.openURL(url).catch((err) =>
                console.error('An error occurred', err)
            );
            navigator.navigate(routes.MARKETPLACEHOME);
        }
    }, [url]);

    useEffect(() => {
        const formDataAPISign = new FormData();
        formDataAPISign.append('action', 'APISign');
        formDataAPISign.append('What', 'SIGN');
        formDataAPISign.append('KEY', 'd7c19db1377f260dd6122ed3a985d7ff8ca60b50');
        formDataAPISign.append('PassP', 'yCUMShJAR');
        formDataAPISign.append('Masof', '4500147832');
        formDataAPISign.append('UTF8out', 'True');
        formDataAPISign.append('UTF8', 'True');
        formDataAPISign.append('tmp', '2');
        formDataAPISign.append('PageLang', 'HEB');
        formDataAPISign.append('Pritim', 'True');
        formDataAPISign.append('Tash', `${isMonthly ? '999' : '12'}`);
        formDataAPISign.append('Amount', `${isMonthly ? monthlySubPrice : totalPrice}`);
        formDataAPISign.append(
            'heshDesc',
            `[${Object.entries(cart).filter(([key, val]) => val.price).map(([key, val]) => `0~${key}~1~${val.price}`)}]`
                .split(',')
                .map((item) => `[${item}]`)
                .join('')
        );
        formDataAPISign.append('MoreData', 'True');
        if (isMonthly) {
            formDataAPISign.append('HK', `True`);
            formDataAPISign.append('TashFirstPayment', `${totalPrice - monthlySubPrice}`);
        }
        (async () => {
            const {data} = await axios.post(
                'https://icom.yaad.net/p/',
                formDataAPISign,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );
            setUrl(`https://icom.yaad.net/p/?${data}&PassP=yCUMShJAR`);
        })();
    }, [cart]);

    const handleNavigation = (navState) => {
        const regex = /CCode=0\b/i;
        regex.test(navState.url) && navigator.navigate(routes.SUCCESS)
    };
    return (
        <View style={{width: windowWidth, height: windowHeight * 0.8}}>
            {isMonthly && <WebView source={{uri: url}} onNavigationStateChange={handleNavigation}/>}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: windowWidth,
        height: windowHeight * 0.7,
        position: 'relative',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    background: {
        backgroundColor: 'rgba(0, 0, 0, 0.7)', // Semi-transparent black background
        position: 'absolute',
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
