import React, {useEffect} from 'react';
import {Dimensions, Image, StyleSheet} from 'react-native';
import * as Font from 'expo-font';
import {LinearGradient} from 'expo-linear-gradient';
import {routes} from '../../routes/routes';
import {useDispatch} from "react-redux";
import {getUser} from "../../core/auth";
import apiClient from "../../core/apiClient";
import {setCustomer, setUser as setStoreUser} from "../../store/userSlice";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Splash = ({navigation}) => {
	const dispatch = useDispatch();
	
    useEffect(() => {
        const loadFonts = async () => {
            await Font.loadAsync({
                'OpenSans-Bold': require('../../../assets/fonts/OpenSans-Bold.ttf'),
                'OpenSans': require('../../../assets/fonts/OpenSans-Regular.ttf'),
            });
        };
        loadFonts().then(() => {
	        checkUser().then((isUserExist)=>{
                setTimeout(() => {
                    if (isUserExist) {
                        navigation.navigate(routes.TABS);
                    } else {
                        navigation.navigate(routes.INTRO);
                    }
                }, 4000);
            });
        }).catch((error) => console.error('Error loading fonts:', error));
    }, []);
	
	const checkUser = async () => {
		const values = await getUser();
		
		if (values) {
			const userInfo = await apiClient.getUserInfo(values.phoneNumber, values.bnNumber);
			
			if (userInfo) {
				const customerData = {
					bnNumber: values.bnNumber,
					phoneNumber: values.phoneNumber,
					companyName: userInfo.name
				}
				
				dispatch(setStoreUser(userInfo))
				dispatch(setCustomer(customerData))
				
				return true;
			}
			
			return false;
		}
		
		return false;
	}
	
    return (
        <LinearGradient
            colors={['#6226CF', '#5D23C9', '#A61EDF']}
            start={{x: 0.5, y: 0}} // Start at the top center
            end={{x: 0.5, y: 1}}
            style={styles.gradient}
        >
            <Image
                source={require('../../../assets/images/LogoWhiteNew.png')}
                resizeMode="contain"
                style={styles.image}/>

        </LinearGradient>
    );
};


const styles = StyleSheet.create({
    gradient: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',
        backgroundColor: 'transparent'

    },
    image: {
        width: windowWidth * 0.48,
        height: windowHeight * 0.09

    },

    safeArea: {
        flex: 1,
    }
});

export default Splash;
