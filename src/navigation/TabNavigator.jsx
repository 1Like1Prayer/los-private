import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ComingSoon from "../pages/comingSoon";
import FooterMenu from "../components/FooterMenu/footerMenu";
import Invoices from "../pages/invoices";
import MarketPlace from "../pages/marketplace/MarketPlace";
import HomePage from "../pages/homePage";
import CheckoutPage from "../pages/checkout";
import DrawerNavigation from "./DrawerNavigation";
import SuccessPayment from "../pages/successPayment";
import FailedPayment from "../pages/failedPayment";

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      tabBar={(props) => <FooterMenu {...props} />}
      screenOptions={{ header: () => null, headerShown: false }}
    >

      <Tab.Screen name="Home" component={HomePage} />

      <Tab.Screen name="Invoices" component={Invoices} />

      <Tab.Screen name="MarketPlace" component={MarketPlace} />

      <Tab.Screen name="ComingSoon" component={ComingSoon} />

      <Tab.Screen name="CheckoutPage" component={CheckoutPage} />

      <Tab.Screen name="Success" component={SuccessPayment} />

      <Tab.Screen name="Failed" component={FailedPayment} />

      {/* <Tab.Screen name="Drawer" component={DrawerNavigation} /> */}

    </Tab.Navigator>
  );
}

export default MyTabs;
