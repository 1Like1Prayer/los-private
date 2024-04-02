import React, {useEffect, useState} from 'react';
import SvgMoneyIcon from '../../icons/MoneyIcon'
import SvgHomeIcon from '../../icons/HomeIcon'
import SvgMarketPlaceIcon from '../../icons/MarketPlaceIcon'
import SvgComingSoonIcon from '../../icons/ComingSoonIcon'
import {Dimensions, I18nManager, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {routes} from "../../routes/routes";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const isRTL = I18nManager.isRTL;

const FooterMenu = ({navigation}) => {

    const [currentTab, setCurrentTab] = useState("Home");
    const handlePressTab = (tabName) => {
        if (tabName !== currentTab) {
            navigation.navigate(tabName)
        }
    }

    const navState = navigation.getState();

    useEffect(() => {
        const routes = navState.routeNames;
        setCurrentTab(routes[navState.index])
    }, [navState]);


    return (
        <View style={styles.container}>

            <View style={styles.item}>
                <TouchableOpacity style={styles.containerTouch} onPress={() => handlePressTab(routes.COMING_SOON)}>
                    <SvgComingSoonIcon style={styles.icon}
                                       ColorFill={currentTab === "ComingSoon" ? "#6226CF" : '#9F9F9F'}/>
                    <Text
                        style={[styles.text, {color: currentTab === "ComingSoon" ? "#6226CF" : '#9F9F9F'}]}>בקרוב</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.item}>
                <TouchableOpacity style={styles.containerTouch} onPress={() => handlePressTab(routes.MARKETPLACE)}>
                    <SvgMarketPlaceIcon ColorFill={currentTab === "MarketPlace" ? "#6226CF" : '#9F9F9F'}/>
                    <Text style={[styles.text, {color: currentTab === "MarketPlace" ? "#6226CF" : '#9F9F9F'}]}>זירת
                        מסחר</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.item}>
                <TouchableOpacity style={styles.containerTouch} onPress={() => handlePressTab(routes.INVOICE)}>
                    <SvgMoneyIcon ColorFill={currentTab === "Invoices" ? "#6226CF" : '#9F9F9F'}/>
                    <Text style={[styles.text, {color: currentTab === "Invoices" ? "#6226CF" : '#9F9F9F'}]}>כספים</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.item}>
                <TouchableOpacity style={styles.containerTouch} onPress={() => handlePressTab(routes.TABS_HOME)}>
                    <SvgHomeIcon ColorFill={currentTab === "TabsHome" ? "#6226CF" : '#9F9F9F'}/>
                    <Text style={[styles.text, {color: currentTab === "TabsHome" ? "#6226CF" : '#9F9F9F'}]}>בית</Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}


const styles = StyleSheet.create({
        container: {
            backgroundColor: '#FFFFFF',
            width: windowWidth,
            height: windowHeight * 0.088,
            flex: 1,
            flexDirection: isRTL ? 'row-reverse' : 'row',
            justifyContent: 'space-between',
            position: 'absolute',
            top: windowHeight - windowHeight * 0.088,
            paddingHorizontal: windowWidth * 0.04,
            borderRadius: 20,
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
            elevation: 5,
            shadowColor: 'rgba(0, 0, 0, 0.08)',
            shadowOffset: {width: 0, height: 4},
            shadowRadius: 30,
        },

        item: {
            flex: 1,
            flexDirection: 'column',
            textAlign: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            width: windowWidth * 0.191,
            height: windowHeight * 0.065,
            marginTop: windowHeight * 0.0107,

        },
        containerTouch: {
            flex: 1,
            flexDirection: 'column',
            textAlign: 'center',
            alignItems: 'center',
            justifyContent: 'center',
        },
        text: {
            fontSize: 12,
            color: '#9F9F9F',
            // fontWeight:400,
            marginTop: windowHeight * 0.006,
        },
        icon: {}


    }
);


export default FooterMenu;
