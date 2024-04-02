import {createDrawerNavigator} from "@react-navigation/drawer";
import {DrawerComponent} from "./DrawerComponent";
import TabsNavigation from "./TabNavigator";

const Drawer = createDrawerNavigator();

export const DrawerNavigation = () =>
    <Drawer.Navigator screenOptions={{headerShown: false, drawerPosition: 'right'}}
                      drawerContent={props => <DrawerComponent {...props} />}>
        <Drawer.Screen name="DrawerHome" component={TabsNavigation}/>
    </Drawer.Navigator>
