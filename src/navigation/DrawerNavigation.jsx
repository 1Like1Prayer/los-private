import {DrawerContentScrollView, DrawerItem} from "@react-navigation/drawer";
import {deleteUser} from "../core/auth";
import {View} from "react-native";
import {Image} from "react-native-elements";
import {routes} from "../routes/routes";


const labels = {
    home: 'בית',
    profile: 'הפרופיל שלי',
    logout: 'התנתק'
}

export const DrawerNavigation = ({navigation, props}) => {
    const logout = () => {
        deleteUser().catch(err => {
            console.log(err)
        }).finally(() => {
            navigation.navigate(routes.LOGIN)
        })
    }
    return (
        <DrawerContentScrollView {...props}>
            <View style={{marginLeft: 150, marginTop: 20}}>
                <Image
                    source={require("../../assets/images/Layer_1.png")}
                    resizeMode="contain"
                    style={{width: 100, height: 100}} // Adjust the width and height as per your image dimensions
                />
            </View>
            <View style={{marginLeft: 180, marginTop: 20}}>
                <DrawerItem
                    label={labels.home}
                    onPress={() => navigation.navigate(routes.MY_TABS, {screen: 'Home'})}
                />
            </View>
            <View style={{marginLeft: 150}}>
                <DrawerItem
                    label={labels.profile}
                    onPress={() => navigation.navigate(routes.CUSTOMER_DETAILS)}
                />
            </View>
            <View style={{
                borderBottomWidth: 1,
                borderBottomColor: 'grey',
                marginVertical: 10,
                marginHorizontal: 20
            }}></View>

            <View style={{marginLeft: 160}}>
                <DrawerItem
                    label={labels.logout}
                    onPress={logout}
                />
            </View>
        </DrawerContentScrollView>
    );

};
