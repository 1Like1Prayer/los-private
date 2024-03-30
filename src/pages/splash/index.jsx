import React, {useEffect} from 'react';
import {Dimensions, Image, StyleSheet} from 'react-native';
import * as Font from 'expo-font';
import {LinearGradient} from 'expo-linear-gradient';
import {routes} from '../../routes/routes';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Splash = ({navigation}) => {
    useEffect(() => {
        const loadFonts = async () => {
            await Font.loadAsync({
                'OpenSans-Bold': require('../../../assets/fonts/OpenSans-Bold.ttf'),
                'OpenSans': require('../../../assets/fonts/OpenSans-Regular.ttf'),
            });
        };
        loadFonts().then(() => {
            setTimeout(() => navigation.navigate(routes.INTRO), 4000);
        }).catch((error) => console.error('Error loading fonts:', error));
    }, []);
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
