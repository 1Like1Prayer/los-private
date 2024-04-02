import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import ComingSoon from "../pages/comingSoon";
import FooterMenu from "../components/FooterMenu/footerMenu";
import Invoices from "../pages/invoices";
import HomePage from "../pages/homePage";
import CustomHeader from "../components/CustomHeader";
import React from "react";
import {MarketPlaceNavigation} from "./MarketPlaceNavigation";

const Tab = createBottomTabNavigator();

const TabNavigation = {
    TabsHome: HomePage,
    Invoices: Invoices,
    MarketPlace: MarketPlaceNavigation,
    ComingSoon: ComingSoon,
}

const TabsNavigation = () =>
    <Tab.Navigator
        initialRouteName={'TabsHome'}
        tabBar={(props) => <FooterMenu {...props} />}
        screenOptions={{header: () => <CustomHeader/>, headerShown: true}}
    >
        {Object.entries(TabNavigation).map(([key, value]) => <Tab.Screen key={key} name={key} component={value}/>)}
    </Tab.Navigator>

export default TabsNavigation;
