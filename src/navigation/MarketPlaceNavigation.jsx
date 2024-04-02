import {createStackNavigator} from "@react-navigation/stack";
import MarketPlace from "../pages/marketplace/MarketPlace";
import CheckoutPage from "../pages/checkout";
import SuccessPayment from "../pages/successPayment";
import FailedPayment from "../pages/failedPayment";

const Stack = createStackNavigator();

const marketStack = {
    MarketPlaceHome: MarketPlace,
    Checkout: CheckoutPage,
    Success: SuccessPayment,
    Failed: FailedPayment
}
export const MarketPlaceNavigation = () =>
    <Stack.Navigator screenOptions={{headerShown: false}}>
        {Object.entries(marketStack).map(([key, value]) => <Stack.Screen name={key} component={value} key={key}/>)}
    </Stack.Navigator>

