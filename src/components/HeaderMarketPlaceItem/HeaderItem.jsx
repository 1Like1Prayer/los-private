import React, { useState } from "react";
import { StyleSheet, Dimensions, View, Text } from "react-native";
import CheckBoxMarket from "../CheckBoxMarketPlace";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const HeaderItem = ({ title, price, totalPrice, setTotalPrice ,onCheckboxChange,Check}) => {

  const [isChecked, setIsChecked] = useState(false);



  // const handleToggleCheck = async () => {
  //    setIsChecked(!isChecked);
  //    handleChangePrice(isChecked, price);
  // };

  // const handleChangePrice = (itemChecked, itemPrice) => {
  //   if (!itemChecked) {
  //     setTotalPrice(totalPrice + itemPrice);
  //   } else {
  //     if (price !== 0) setTotalPrice(totalPrice - itemPrice);
  //   }
  //   console.log(totalPrice)
  // };

  
  return (
    <View style={styles.containerOfHeader}>
    <View style={styles.header}>
      <View style={styles.containerCheckBox}>
        <CheckBoxMarket
          onPress={onCheckboxChange}
          isChecked={Check}
          price={price + "₪"}
        />
      </View>
      <View>
      <Text style={styles.title}>{title}</Text>
      </View>
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "column",
    width: windowWidth * 0.9107,
    backgroundColor: "#FFFFFF",
    marginBottom: windowHeight * 0.019,
    elevation: 5,
    shadowColor: "rgba(0, 0, 0, 0.1)",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 24,
    borderRadius: 10,
  },
  containerCheckBox: {
    marginLeft: windowWidth * 0.0467,
  },
  containerRelatedProducts: {
    elevation: 0,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
  },
  titleRelated: {
    textAlign: "right",
    width: "90%",
  },
  containerOfHeader:{
    width:windowWidth

  },

  header: {
    marginTop: windowHeight * 0.025,
    justifyContent: "space-between",
    flexDirection: "row",
    textAlign: "left",
    alignItems: "center",
    marginHorizontal: windowWidth * 0.0467,
  },
  title: {
    fontFamily: "OpenSans-Bold",
    fontSize: 18,
    // fontWeight: 600,
    color: "#19073A",
    marginHorizontal: windowWidth * 0.0467,
  },
  price: {
    fontFamily: "OpenSans-Bold",
    // fontWeight: 700,
    fontSize: 20,
    color: "#6226CF",
  },
  lineGray: {
    height: 1,
    width: windowWidth * 0.806,
    backgroundColor: "#9F9F9F33",
    marginHorizontal: windowWidth * 0.0469,
    marginVertical: windowHeight * 0.0215,
  },
  description: {
    fontSize: 16,
    fontFamily: "OpenSans",
    // fontWeight: 400,
    color: "#797285",
    textAlign: "right",
  },
  containerDescription: {
    marginBottom: windowHeight * 0.03239,
    marginHorizontal: windowWidth * 0.01635,
    alignItems: "center",
  },
});

export default HeaderItem;
