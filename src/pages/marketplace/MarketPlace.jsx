import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  FlatList,
  SafeAreaView,
} from "react-native";
// import { marketData } from "../../../assets/data/dataMarketPlace";
import ButtonLower from "../../components/Button/ButtonLower";
import MarketplaceItem from "../../components/marketplaceItem";
import { ScrollView } from "react-native-gesture-handler";
import MyTabs from "../../navigation/TabNavigator";
import { NavigationContainer } from "@react-navigation/native";
import apiClient from '../../core/apiClient';
import CustomHeader from "../../components/CustomHeader";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function MarketPlace({ navigation }) {

  const [totalPrice, setTotalPrice] = useState(0);
  const [marketData, setMarketData] = useState([]);
 

  useEffect(() => {
    loadMarketplaceData()
  }, [])

  // useEffect(() => {
  //   console.log("marketData :" , marketData)
  // }, [marketData])

  const handleCheck = (e, index) =>{
    // console.log("MarketData: " , marketData)
    const updateData = [...marketData];
    updateData[index].checked = e;
    console.log("updated Data:" , updateData[0])
    setMarketData(updateData)
  }

  const loadMarketplaceData = async () => {
    try {
      const { data } = await apiClient.getProducts()
      setMarketData(data.products.map(e => ({...e , checked: false})))
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.containerItems}>
        <View style={{ width: windowWidth }}>
          <CustomHeader />
        </View>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={marketData}
          renderItem={({ item , index } ) => (          
           <MarketplaceItem
              description={item.description}
              title={item.name}
              relatedProduct={item?.variations ? Object.entries(JSON.parse(item.variations)).map(([key, value]) => ({ title: key, price: value, id : Math.random()})) : []}
              price={item.price}
              setTotalPrice={setTotalPrice}
              totalPrice={totalPrice}
              handleCheck={(e) => handleCheck(e, index)}
            />
          )}
        />
      </View>
      <View
        style={{
          height: windowHeight * 0.2,
          paddingTop: windowHeight * 0.0224,
          paddingBottom: windowHeight * 0.0449,
        }}
      >
        <ButtonLower
          title={"יאללה סיימתי"}
          handlePress={() => marketData.some((e) => e.checked) ? navigation.navigate('CheckoutPage'): () =>{}}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FBF8FF",
    flex: 1,
    width: windowWidth,
    height: windowHeight,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    height: windowHeight * 0.11,
  },
  containerItems: {
    width: windowWidth,
    alignItems: "center",
    height: windowHeight * 0.8,
  },
});
