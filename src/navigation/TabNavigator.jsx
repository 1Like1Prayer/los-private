import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import ComingSoon from "../pages/comingSoon";
import FooterMenu from "../components/FooterMenu/footerMenu";
import Invoices from "../pages/invoices";
import MarketPlace from "../pages/marketplace/MarketPlace";
import HomePage from "../pages/homePage";
import CheckoutPage from "../pages/checkout";
import SuccessPayment from "../pages/successPayment";
import FailedPayment from "../pages/failedPayment";
import CustomHeader from "../components/CustomHeader";
import React from "react";

const Tab = createBottomTabNavigator();

const TabNavigation = {
    Home: HomePage,
    Invoices: Invoices,
    MarketPlace: MarketPlace,
    ComingSoon: ComingSoon,
    CheckoutPage: CheckoutPage,
    Success: SuccessPayment,
    Failed: FailedPayment
}

const MyTabs = () =>
    <Tab.Navigator
        tabBar={(props) => <FooterMenu {...props} />}
        screenOptions={{header: () => <CustomHeader/>, headerShown: true}}
    >
        {Object.entries(TabNavigation).map(([key, value]) => <Tab.Screen key={key} name={key} component={value}/>)}
    </Tab.Navigator>

export default MyTabs;
