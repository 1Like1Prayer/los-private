import {DrawerContentScrollView, DrawerItem} from "@react-navigation/drawer";
import {deleteUser} from "../core/auth";
import {I18nManager, View} from "react-native";
import {Image} from "react-native-elements";
import {routes} from "../routes/routes";
import {useSelector} from "react-redux";
import {validityInterval} from "../pages/homePage";

const labels = {
    home: "בית",
    profile: "הפרופיל שלי",
    logout: "התנתק",
};
const isRTL = I18nManager.isRTL;

export const DrawerComponent = ({navigation, props}) => {
    const customerData = useSelector((state) => state.user.customer);

    const logout = () => {
        clearInterval(validityInterval)
        deleteUser()
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                navigation.navigate(routes.LOGIN);
            });
    };
    return (
        <DrawerContentScrollView {...props}>
            <View style={{marginLeft: 80, marginTop: 20}}>
                <Image
                    source={require("../../assets/images/Layer_1.png")}
                    resizeMode="contain"
                    style={{width: 100, height: 100}} // Adjust the width and height as per your image dimensions
                />
            </View>
            <View
                style={{
                    ...(isRTL ? {marginRight: 160} : {marginLeft: 160}),
                    marginTop: 20,
                }}
            >
                <DrawerItem
                    label={labels.home}
                    onPress={() =>
                        navigation.navigate(routes.MY_TABS, {screen: routes.TABS_HOME})
                    }
                />
            </View>
            <View
                style={{...(!isRTL ? {marginRight: 0} : {textAlign: "right"})}}
            >
                <DrawerItem
                    label={labels.profile}
                    onPress={() =>
                        navigation.navigate(routes.CUSTOMER_DETAILS, customerData)
                    }
                />
            </View>
            <View
                style={{
                    borderBottomWidth: 1,
                    borderBottomColor: "grey",
                    marginVertical: 10,
                    marginHorizontal: 20,
                }}
            ></View>

            <View style={{...(isRTL ? {marginRight: 160} : {marginLeft: 160})}}>
                <DrawerItem label={labels.logout} onPress={logout}/>
            </View>
        </DrawerContentScrollView>
    );
};
