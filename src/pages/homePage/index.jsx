import React, { useEffect, useState } from "react";
import { View, StyleSheet, Dimensions, FlatList } from "react-native";
import apiClient from '../../core/apiClient';
import Panel from "../../components/Panel";
import { panelData } from "../../../assets/data/homePage";
import { tableDataJson } from "../../../assets/data/tableDataJson";
import CustomHeader from "../../components/CustomHeader";
import { getUser } from "../../core/auth";
import ChartSection from "./ChartSection";
import { ScrollView } from "react-native-gesture-handler";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function HomePage() {
  const [clientData, setClientData] = useState([])
  //TODO send panel data as props
  const test = [
    "Google SEO",
    "קמפיין ממומן",
  ];
  useEffect(() => {
    (async () => {
      try {
        const { leos_id } = await getUser();
        const { data } = await apiClient.getClientData(leos_id, 'seo')
        setClientData([data.original.data]);
        console.log("api data:", JSON.stringify(data.original.data))
      } catch (error) {
        console.log(error)
      }
    })()
  }, [])
  return (
    <View style={styles.container}>
       {/* <Panel title={"Google SEO"} /> */}
        {/* <Panel title={"קמפיין ממומן"} />  */}
      <CustomHeader />
      <View style={styles.homeContainer}>
        <ScrollView style={{height:'auto', width:'90%'}}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={clientData}
          renderItem={({ item }) => <Panel title={item.title} dataTable={item?.dataTable} boxData={item.boxData} />}
        />
        {/* <ChartSection/> */}
        </ScrollView>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: windowWidth,
    height: windowHeight,
    backgroundColor:"#FBF8FF"
  },
  homeContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: windowHeight * 0.07,
  },
});