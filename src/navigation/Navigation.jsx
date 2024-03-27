import Splash from "../pages/splash";
import Intro from "../pages/intro";
import Login from "../pages/login";
import CustomerDetails from "../pages/customerdetails";
import MyTabs from "./TabNavigator";
import {DrawerNavigation} from "./DrawerNavigation";
import {createDrawerNavigator} from "@react-navigation/drawer";


const Drawer = createDrawerNavigator();

const navRoutes = {
    Splash: Splash,
    Intro: Intro,
    Login: Login,
    CustomerDetails: CustomerDetails,
    MyTabs: MyTabs
}

export const MainNavigation = () =>
    (
        <Drawer.Navigator screenOptions={{headerShown: false, drawerPosition: 'right'}}
                          drawerContent={props => <DrawerNavigation {...props} />}>
            {Object.entries(navRoutes).map(([key, value]) => <Drawer.Screen name={key} component={value} key={key}/>)}
        </Drawer.Navigator>
    );
