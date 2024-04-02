import React from "react";
import {Dimensions, FlatList, I18nManager, StyleSheet, Text, View} from "react-native";
import InvoicesBox from "./InvoicesBox";

const windowWidth = Dimensions.get("window").width;
const isRTL = I18nManager.isRTL;

const InvoiceSection = ({year, invoices, openInvoiceModal}) =>
    (<View>
        <View style={styles.title}>
            <Text style={styles.titleText}>{`חשבוניות עבור ${year}`}</Text>
        </View>
        <FlatList
            showsVerticalScrollIndicator={false}
            horizontal={false}
            data={invoices}
            renderItem={({item}) => (
                <InvoicesBox invoicesData={item} year={year} openInvoiceModal={openInvoiceModal}/>
            )}
        />
    </View>)


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
        textAlign: isRTL?"left":"right",
        ...(isRTL ? { marginLeft: 15 } : { marginRight: 15 }),

    },

});
