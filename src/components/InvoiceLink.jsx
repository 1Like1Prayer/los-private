import React from "react";
import {Linking, Pressable, StyleSheet, Text, View} from "react-native";
import apiClient from '../core/apiClient';
import Toast from "react-native-toast-message";
import {useSelector} from "react-redux";

const InvoiceLink = ({invoiceId, openInvoiceModal}) => {
    const leos_id = useSelector(state => state.user.user.leos_id)
    const handleDownloadInvoice = async () => {
        try {
            openInvoiceModal(leos_id, invoiceId);
            const invoice = await apiClient.getInvoice(leos_id, invoiceId)
            await Linking.openURL(invoice);
        } catch (error) {
            console.error("Invoice not found in the response");
            Toast.show({
                type: 'error',
                text1: error?.response?.data?.message ?? 'An error occurred while getting invoice data'
            });

        }
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
        alignItems: "center",
        marginBottom: 20,

    },
    dot: {
        backgroundColor: "#6226CF",
        width: 12,
        height: 12,
        marginLeft: 12,
        borderRadius: 4,
    },
    invoiceLinkText: {
        textDecorationLine: "underline",
        fontFamily: "OpenSans",
        fontSize: 16
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,

    },

});

export default InvoiceLink;
