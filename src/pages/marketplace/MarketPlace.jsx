import React, {useEffect, useState} from "react";
import {Dimensions, FlatList, StyleSheet, View,} from "react-native";
import ButtonLower from "../../components/Button/ButtonLower";
import MarketplaceItem from "../../components/marketplaceItem";
import apiClient from '../../core/apiClient';

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function MarketPlace({navigation}) {

    const [totalPrice, setTotalPrice] = useState(0);
    const [marketData, setMarketData] = useState([]);


    useEffect(() => {
        loadMarketplaceData()
    }, [])

    const handleCheck = (e, index) => {
        // console.log("MarketData: " , marketData)
        const updateData = [...marketData];
        updateData[index].checked = e;
        console.log("updated Data:", updateData[0])
        setMarketData(updateData)
    }

    const loadMarketplaceData = async () => {
        try {
            const {data} = await apiClient.getProducts()
            setMarketData(data.products.map(e => ({...e, checked: false})))
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.containerItems}>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={marketData}
                    ListFooterComponent={<ButtonLower
                        title={"יאללה סיימתי"}
                        handlePress={() => marketData.some((e) => e.checked) ? navigation.navigate('CheckoutPage') : () => {
                        }}
                    />}
                    renderItem={({item, index}) => (
                        <MarketplaceItem
                            description={item.description}
                            title={item.name}
                            relatedProduct={item?.variations ? Object.entries(JSON.parse(item.variations)).map(([key, value]) => ({
                                title: key,
                                price: value,
                                id: Math.random()
                            })) : []}
                            price={item.price}
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
        backgroundColor: "#FBF8FF",
        width: windowWidth,
        height: windowHeight * 0.75,
        justifyContent: "center",
        alignItems: "center",
    },
    containerItems: {
        width: windowWidth,
        alignItems: "center",
    },
});
