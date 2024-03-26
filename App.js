import React, { useEffect, useState } from 'react';
import { StyleSheet, Dimensions, View, Text } from 'react-native'; // Import Text component
import { NavigationContainer } from '@react-navigation/native';
import MainNavigation from './src/navigation/Navigation';
import Toast from 'react-native-toast-message';
import { setNavigator } from './src/navigation/NavigationService';
import * as Font from 'expo-font';

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      try {
        await Font.loadAsync({
          'OpenSans-Bold': require('./assets/fonts/OpenSans-Bold.ttf'),
          'OpenSans-Regular': require('./assets/fonts/OpenSans-Regular.ttf'),
        });
        setFontsLoaded(true);
      } catch (error) {
        console.error('Error loading fonts:', error);
      }
    }

    loadFonts();
  }, []);

  if (!fontsLoaded) {
    // Fonts are still loading, return a loading indicator or placeholder
    return <View style={styles.loadingContainer}><Text>Loading fonts...</Text></View>;
  }

  return (
    <>
      <NavigationContainer styles={styles.container} ref={navigatorRef => {
        setNavigator(navigatorRef);
      }}>
        <MainNavigation />
      </NavigationContainer>
      <Toast />
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
