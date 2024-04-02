import React from 'react';
import {Dimensions, StyleSheet} from 'react-native'; // Import Text component
import {NavigationContainer} from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import {MainNavigation} from "./src/navigation/Navigation";
import {Provider} from "react-redux";
import {store} from "./src/store/state";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function App() {
    return (
        <>
            <Provider store={store}>
                <NavigationContainer styles={styles.container}>
                    <MainNavigation/>
                </NavigationContainer>
                <Toast/>
            </Provider>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: windowWidth,
        height: windowHeight,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FBF8FF',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});
