import React, {useState} from 'react';
import {Dimensions, I18nManager, Image, Pressable, SafeAreaView, StyleSheet, View} from 'react-native';
import MenuIcon from '../icons/MenueIcon';
import profilePic2 from '../../assets/images/accountBig.png';
import {routes} from '../routes/routes';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';

const isRTL = I18nManager.isRTL;
const windowHeight = Dimensions.get("window").height;
const IMAGE_URL = 'https://leos-zone.fra1.digitaloceanspaces.com';

const CustomHeader = () => {
    const [profilePic, setProfilePic] = useState(' ');
    const navigation = useNavigation();
    const customerData = useSelector(state => state.user.customer);
    const avatar = useSelector(state => state.user.user.avatar);

    return (
        <SafeAreaView>
            <View style={styles.headerContainer}>
                <Pressable onPress={() => {
                    navigation.navigate(routes.CUSTOMER_DETAILS, customerData);
                }}>
                    <Image
                        source={avatar ? {uri: `${IMAGE_URL}/${avatar}`} : profilePic2}
                        resizeMode="contain"
                        style={styles.image}
                    />

                </Pressable>
                <Image
                    source={require('../../assets/images/smallIcon.png')}
                    resizeMode="contain"
                    style={styles.logo}
                />
                <Pressable onPress={() => navigation.openDrawer()}>
                    <MenuIcon ColorFill="#6226CF"/>
                </Pressable>
            </View>
        </SafeAreaView>
    );
};

export default CustomHeader;

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: isRTL ? 'row-reverse' : 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height:windowHeight*0.13,
        paddingHorizontal: 17,
        paddingTop: 30
    },
    image: {
        width: 36,
        height: 36,
    },
    logo: {
        width: 80,
        height: 36,
    },
});
