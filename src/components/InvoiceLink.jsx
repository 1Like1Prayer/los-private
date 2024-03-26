import React, { useState } from "react";
import { View, StyleSheet, Text, Pressable, Linking  } from "react-native";
import apiClient from '../core/apiClient';
import { getUser } from "../core/auth";
import { Modal } from "react-native-paper";

const InvoiceLink = ({ invoiceId , openInvoiceModal}) => {

 


  const handleDownloadInvoice = async ()=>{
    const { leos_id } = await getUser()
    openInvoiceModal(leos_id, invoiceId);
    apiClient.getInvoice(leos_id, invoiceId)
      .then((response) => {
        const { invoice } = response.data;
        if (invoice) {
          // Open the invoice URL in the default web browser
          console.log('invoice', invoice)
          Linking.openURL(invoice);
        } else {
          console.error("Invoice not found in the response");
        }
      })
      .catch((error) => {
        // Handle any errors here
        console.error("Error:", error);
      });
    }
    
  return (
    <View style={styles.invoiceLinkContainer}>

      <Pressable onPress={handleDownloadInvoice}>
      <Text style={styles.invoiceLinkText}>{invoiceId}</Text>
      </Pressable>
      <View style={styles.dot}></View>
    

      </View>
      
  );
};

const styles = StyleSheet.create({
  invoiceLinkContainer: {
    flexDirection: "row",
    width: "100%",
    alignItems:"center",
    marginBottom:20,
    
  },
  dot: {
    backgroundColor: "#6226CF",
    width: 12,
    height: 12,
    marginLeft: 12,
    borderRadius: 4,
  },
  invoiceLinkText:{
    textDecorationLine:"underline",
    fontFamily:"OpenSans",
    fontSize:16
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  
  },
  
});

export default InvoiceLink;
