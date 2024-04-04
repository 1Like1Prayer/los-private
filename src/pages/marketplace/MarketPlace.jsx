import React, {useEffect, useState} from 'react';
import {Dimensions, FlatList, Linking, StyleSheet, View, Text, SafeAreaView, Platform} from 'react-native';
import ButtonLower from '../../components/Button/ButtonLower';
import MarketplaceItem from '../../components/marketplaceItem';
import apiClient from '../../core/apiClient';
import Toast from 'react-native-toast-message';
import {routes} from '../../routes/routes';
import {useSelector} from "react-redux";
import axios from "axios";
import MarketSkeleton from "../../components/MarketSkeleton";


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


export default function MarketPlace({navigation}) {
    const [marketData, setMarketData] = useState([]);
    const [url, setUrl] = useState(' ')
	const [isLoading, setLoading] = useState(false);
    const {cart, totalPrice} = useSelector(state => state.cart)
    useEffect(() => {
        const formDataAPISign = new FormData();
        formDataAPISign.append('action', 'APISign');
        formDataAPISign.append('What', 'SIGN');
        formDataAPISign.append('KEY', 'd7c19db1377f260dd6122ed3a985d7ff8ca60b50');
        formDataAPISign.append('PassP', 'yCUMShJAR');
        formDataAPISign.append('Masof', '4500147832');
        formDataAPISign.append('UTF8out', 'True');
        formDataAPISign.append('UTF8', 'True');
        formDataAPISign.append('tmp', '4');
        formDataAPISign.append('PageLang', 'HEB');
        formDataAPISign.append('Pritim', 'True');
        formDataAPISign.append('Amount', `${totalPrice}`);
        formDataAPISign.append('heshDesc', `[${Object.entries(cart).map(([key, val]) => `0~${key}~1~${val}`)}]`.split(',').map(item => `[${item}]`).join(''));
        formDataAPISign.append('MoreData', 'True');
        (async () => {
                const {data} = await axios.post('https://icom.yaad.net/p/', formDataAPISign, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                setUrl(`https://icom.yaad.net/p/?${data}&PassP=yCUMShJAR`)
            }
        )
        ()
    }, [cart]);

    useEffect(() => {
		setLoading(true);
        (async () => {
                try {
                    const products = await apiClient.getProducts();
                    setMarketData(products.map(product => ({...product, checked: false})));
                } catch (error) {
                    console.log(error);
                    Toast.show({
                        type: 'error',
                        text1: error?.response?.data?.message ?? 'An error occurred while getting market Data'
                    });
                } finally {
	                setLoading(false);
                }
            }
        )
        ();
    }, []);

    const handleCheck = (e, index) => {
        const updateData = [...marketData];
        updateData[index].checked = e;
        setMarketData(updateData);
    };

    const handleCheckout =()=>{
        Linking.openURL(url).catch((err) => console.error('An error occurred', err));
    }

    return (
        <View style={styles.container}>
            <View style={styles.containerItems}>
	            {isLoading ? (
					<>
						<MarketSkeleton textCounter={2}/>
						<MarketSkeleton/>
					</>
	            ) : (
		            <FlatList
			            showsVerticalScrollIndicator={false}
			            data={marketData}
			            ListFooterComponent={<ButtonLower
				            title={'יאללה סיימתי'}
				            handlePress={() => marketData.some((e) => e.checked) ? navigation.navigate(routes.CHECKOUT) : Toast.show({
					            type: 'info',
					            text1: 'עלייך לסמן לפחות מוצר אחד מהתפריט'
				            })
				            }
			            />}
			            renderItem={({item, index}) => (
				            <MarketplaceItem
					            description={item.description}
					            title={item.name}
					            variations={item?.variations ? Object.entries(JSON.parse(item.variations)).map(([key, value]) => ({
						            title: key,
						            price: Number(value),
						            id: key
					            })) : []}
					            price={Number(item.price)}
					            handleCheck={(e) => handleCheck(e, index)}
				            />
			            )}
		            />
	            )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FBF8FF',
        width: windowWidth,
        height: Platform.OS === 'ios' ? '100%' : windowHeight * 0.75,
	    paddingBottom: Platform.OS === 'ios' ? windowHeight * 0.095 : 0,
        alignItems: 'center',
    },
    containerItems: {
        width: windowWidth,
        alignItems: 'center',
    },
});
