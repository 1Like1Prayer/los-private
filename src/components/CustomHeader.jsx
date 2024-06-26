import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, Dimensions, View, Image, SafeAreaView, TouchableOpacity, Pressable } from "react-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
import MenuIcon from "../icons/MenueIcon";
import { getUser } from "../core/auth";
import { navigate, openDrawer } from "../navigation/NavigationService";
import profilePic2 from '../../assets/images/profilePic.png';

const CustomHeader = () => {
  const [profilePic, setProfilePic] = useState()
  const mounted = useRef(false)
  // const navigation = useNavigation();

  useEffect(() => {
    const fetchProfilePic = async () => {
      try {
        const { avatar } = await getUser();
        console.log('avatar:', avatar);

        // Ensure the component is mounted before setting profile picture
        if (!mounted.current) {
          // Assuming the avatar received is the full URL
          setProfilePic(avatar);
          mounted.current = true;
        }
      } catch (error) {
        console.error('Error fetching profile picture:', error);
      }
    };

    fetchProfilePic();
  }, []);


  
  return (
    <SafeAreaView>
      <View style={styles.headerContainer}>
      <Pressable onPress={() =>{navigate('CustomerDetails')}}>
      <Image
      source={profilePic ? { uri: profilePic } : profilePic2}
      resizeMode="contain"
      style={styles.image}
      />
      
      </Pressable>
        <Image
          source={require("../../assets/images/smallIcon.png")}
          resizeMode="contain"
          style={styles.logo}
        />
        <Pressable onPress={openDrawer}>
          <MenuIcon ColorFill="#6226CF" />
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default CustomHeader;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 40,
    paddingHorizontal: 17,
    marginTop: 5
    // backgroundColor: 'red',
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
