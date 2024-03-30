import React, {useEffect, useState} from 'react';
import {Dimensions, FlatList, StyleSheet, View,} from 'react-native';
import ButtonLower from '../../components/Button/ButtonLower';
import MarketplaceItem from '../../components/marketplaceItem';
import apiClient from '../../core/apiClient';
import Toast from 'react-native-toast-message';
import {routes} from '../../routes/routes';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function MarketPlace({navigation}) {

    const [totalPrice, setTotalPrice] = useState(0);
    const [marketData, setMarketData] = useState([]);

    useEffect(() => {
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

    return (
        <View style={styles.container}>
            <View style={styles.containerItems}>
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
                            setTotalPrice={setTotalPrice}
                            totalPrice={totalPrice}
                            handleCheck={(e) => handleCheck(e, index)}
                        />
                    )}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FBF8FF',
        width: windowWidth,
        height: windowHeight * 0.75,
        justifyContent: 'center',
        alignItems: 'center',
    },
    containerItems: {
        width: windowWidth,
        alignItems: 'center',
    },
});
