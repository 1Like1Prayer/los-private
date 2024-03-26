import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import StartScreen from "../pages/startScreen";
import GetStarted from "../pages/getStarted";
import Login from "../pages/login";
import CustomerDetails from "../pages/customerdetails/CustomerDetails";
import MyTabs from "./TabNavigator";
import { navigate } from "../navigation/NavigationService"
import SuccessPayment from "../pages/successPayment";
import DrawerNavigation from "./DrawerNavigation";
import { DrawerContentScrollView, DrawerItem, DrawerItemList, createDrawerNavigator } from "@react-navigation/drawer";
import { View } from "react-native-animatable";
import { DrawerActions } from '@react-navigation/native';
import { Image } from "react-native-elements";
import { deleteUser } from "../core/auth";


const Drawer = createDrawerNavigator();

const getLabel = (name) => {
  if (name == 'Home') {
    return "בית"
  }
  if (name == 'Profile') {
    return "הפרופיל שלי"
  }
  if (name == "Logout") {
    return "להתנתק"
  }
  else {
    return name
  }
}
function CustomDrawerContent(props) {
  const logout = () => {
    deleteUser().catch(err => {
      console.log(err)
    }).finally(() => {
      navigate('Login')
    })
  }
  return (
    <DrawerContentScrollView {...props}>
      <View style={{ marginLeft: 150, marginTop: 20 }}>
        <Image
          source={require("../../assets/images/Layer_1.png")}
          resizeMode="contain"
          style={{ width: 100, height: 100 }} // Adjust the width and height as per your image dimensions
        />
      </View>
      <View style={{ marginLeft: 180, marginTop: 20 }}>
        <DrawerItem
          label={getLabel("Home")}
          onPress={() => navigate('MyTabs', { screen: 'Home' })}
        />
      </View>
      <View style={{ marginLeft: 150 }}>
        <DrawerItem
          label={getLabel("Profile")}
          onPress={() => navigate('CustomerDetails')}
        />
      </View>
      <View style={{ borderBottomWidth: 1, borderBottomColor: 'grey', marginVertical: 10, marginHorizontal: 20 }}></View>

      <View style={{ marginLeft: 160 }}>
        <DrawerItem
          label={getLabel("Logout")}
          onPress={logout}
        />
      </View>
    </DrawerContentScrollView>
  );
}


const MainNavigation = () => {

  return (
    <Drawer.Navigator screenOptions={{ headerShown: false, drawerPosition: 'right' }} drawerContent={props => <CustomDrawerContent {...props} />}>
      {/* <Drawer.Screen initialParams={'MyTabs'} name="Splash" component={StartScreen} /> */}
      <Drawer.Screen name="Intro" component={GetStarted} />
      <Drawer.Screen name="Login" component={Login} />
      <Drawer.Screen name="CustomerDetails" component={CustomerDetails} />
      <Drawer.Screen name="MyTabs" component={MyTabs} />
    </Drawer.Navigator>
  );
};

export default MainNavigation;
