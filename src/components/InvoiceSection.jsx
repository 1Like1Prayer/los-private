import React, { useState } from "react";
import { View, Text, StyleSheet, Dimensions, FlatList, Pressable } from "react-native";
import InvoicesBox from "./InvoicesBox";
import { Modal } from "react-native-paper";
import { set } from "react-hook-form";

const windowWidth = Dimensions.get("window").width;

const InvoiceSection = ({ year, invoices, openInvoiceModal}) => {
  

  return (
    <>
    
   

      <View>
      <View style={styles.title}>
        <Text style={styles.titleText}>{`חשבוניות עבור ${year}`}</Text>
      </View>

      

      <FlatList
        showsVerticalScrollIndicator={false}
        horizontal={false}
        data={invoices}
        renderItem={({ item }) => (
          <InvoicesBox invoicesData={item} year={year} openInvoiceModal={openInvoiceModal}/>
        )}
      />
    </View>

    </>

  
  );
};

export default InvoiceSection;

const styles = StyleSheet.create({
  title: {
    backgroundColor: "#6226CF",
    width: windowWidth * 0.9,
    paddingVertical: 18,
    borderRadius: 6,
    marginBottom: 18,
  },
  titleText: {
    color: "#fff",
    fontFamily: "OpenSans",
    fontSize: 16,
    textAlign: "right",
    marginRight:15
  },
 
});
