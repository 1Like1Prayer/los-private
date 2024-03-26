import { Pressable, StyleSheet, Text, View,Dimensions } from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const CheckBoxMarket = (props) => {
	const iconName = props.isChecked ?
		"checkbox-marked" : "checkbox-blank-outline";

	return (
		<View style={styles.container}>
			<Pressable style={styles.clickContainer} onPress={props.onPress} >
				<MaterialCommunityIcons
					name={iconName} size={34} color={props.isChecked ? "#6226CF": "#9F9F9F"} 
					style = {{opacity : props.isChecked ? 1 : 0.5 }}
                     />
			</Pressable>
			<Text style={styles.price}>{props.price}</Text>
		</View>
	);
};

export default CheckBoxMarket;

const styles = StyleSheet.create({
	container: {
        flex:1,
		alignItems: "center",
		flexDirection: "row",
	},
	price: {
        fontFamily:'OpenSans-Bold',
		fontSize: 20,
		color: "#6226CF",
        // fontWeight:700,
        marginLeft:windowWidth*0.028,
	},
   
});
