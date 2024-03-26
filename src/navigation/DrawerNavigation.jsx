import { createDrawerNavigator } from "@react-navigation/drawer";
import HomePage from "../pages/homePage"; 

const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={HomePage} />
      {/* Add more drawer screens as needed */}
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;
