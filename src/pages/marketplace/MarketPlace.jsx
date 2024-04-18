import React, {useEffect, useState, useFo} from "react";
import {
    Dimensions,
    FlatList,
    Linking,
    Platform,
    StyleSheet,
    View,
} from "react-native";
import ButtonLower from "../../components/Button/ButtonLower";
import MarketplaceItem from "../../components/marketplaceItem";
import apiClient from "../../core/apiClient";
import Toast from "react-native-toast-message";
import {routes} from "../../routes/routes";
import {useSelector} from "react-redux";
import axios from "axios";
import MarketSkeleton from "../../components/MarketSkeleton";
import {useIsFocused} from "@react-navigation/native";
import {errorMessages} from "../../constants/errorMessages";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function MarketPlace({navigation, route}) {
    const isFocused = useIsFocused();
    const totalPrice = useSelector(state => state.cart.totalPrice)
    const [marketData, setMarketData] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const loadingFunc = async () => {
        setLoading(true);
        try {
            const products = await apiClient.getProducts();
            setMarketData(
                products.map((product) => ({...product, checked: false}))
            );
        } catch (error) {
            console.log(error);
            Toast.show({
                type: "error",
                text1: errorMessages[error?.response?.status] || 'שגיאה לא ידועה'
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        isFocused && loadingFunc();
    }, [isFocused]);

    const handleCheck = (e, index) => {
        const updateData = [...marketData];
        updateData[index].checked = e;
        setMarketData(updateData);
    };

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
                        ListFooterComponent={
                            <View style={styles.button}>
                                <ButtonLower
                                    title={"יאללה סיימתי"}
                                    handlePress={() =>
                                        marketData.some((e) => e.checked) && totalPrice
                                            ? navigation.navigate(routes.CHECKOUT)
                                            : Toast.show({
                                                type: "info",
                                                text1: "עלייך לסמן לפחות מוצר אחד מהתפריט",
                                            })
                                    }
                                />
                            </View>
                        }
                        renderItem={({item, index}) => (
                            <MarketplaceItem
                                description={item.description}
                                title={item.name}
                                isMonthly={!!item.monthly_payment}
                                variations={
                                    item?.variations
                                        ? Object.entries(JSON.parse(item.variations)).map(
                                            ([key, value]) => ({
                                                title: key,
                                                price: Number(value),
                                                id: key,
                                            })
                                        )
                                        : []
                                }
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
        backgroundColor: "#FBF8FF",
        width: windowWidth,
        height: Platform.OS === "ios" ? "100%" : windowHeight * 0.75,
        paddingBottom: Platform.OS === "ios" ? windowHeight * 0.095 : 0,
        alignItems: "center",
    },
    containerItems: {
        width: windowWidth,
        alignItems: "center",
    },
    button: {
        paddingBottom: Platform.OS === "ios" ? 0 : 30,
        alignItems: "center",
    },
});
