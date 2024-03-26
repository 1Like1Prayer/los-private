import React, {useEffect,useState } from 'react';
import { StyleSheet,Image,Dimensions  } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import * as Font from 'expo-font';

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function StartScreen({navigation}) {

     const [loadingComplete, setLoadingComplete] = useState(false);

     useEffect(() => {


         async function loadFonts() {
         try{
         await Font.loadAsync({
           'OpenSans-Bold': require('../../../assets/fonts/OpenSans-Bold.ttf'),
           'OpenSans': require('../../../assets/fonts/OpenSans-Regular.ttf'),
         });
         setLoadingComplete(true);
       }
       catch(error){
         console.error('Error loading fonts:', error);
       }
       }
       loadFonts();
    
       }, []);
    
    
        useEffect(()=>{
          if(loadingComplete){
             setTimeout(() => {
                 navigation.navigate('Intro');
             }, 4000);
           }
         },[loadingComplete]);

            
    return (
    <LinearGradient
      colors={['#6226CF', '#5D23C9', '#A61EDF']}
      start={{ x: 0.5, y: 0 }} // Start at the top center
       end={{ x: 0.5, y: 1 }}  
       style={styles.gradient}
        >
        <Image
        source={require("../../../assets/images/logo.png")}
        resizeMode="contain"
        style = {styles.image}/>

       </LinearGradient>

      
    )
}


  const styles = StyleSheet.create({
	gradient:{
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
        display:'flex',
        backgroundColor:'transparent'
    
      },
      image:{
        width:  windowWidth*0.48,
        height: windowHeight*0.09

      },
      
      safeArea:{
        flex:1,
      }
});