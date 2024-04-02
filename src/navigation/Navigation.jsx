import Splash from "../pages/splash";
import Intro from "../pages/intro";
import Login from "../pages/login";
import CustomerDetails from "../pages/customerdetails";
import {createStackNavigator} from "@react-navigation/stack";
import {DrawerNavigation} from "./DrawerNavigation";


const Stack = createStackNavigator();

const navRoutes = {
    Splash: Splash,
    Intro: Intro,
    Login: Login,
    CustomerDetails: CustomerDetails,
    MyTabs: DrawerNavigation,
}

export const MainNavigation = () =>
    (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            {Object.entries(navRoutes).map(([key, value]) => <Stack.Screen name={key} component={value} key={key}/>)}
        </Stack.Navigator>
    );
