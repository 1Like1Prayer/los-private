import React from "react";
import {Dimensions, I18nManager, StyleSheet, Text, View} from "react-native";
import SvgLocationIcon from "../icons/LocationIcon";
import SvgSearchIcon from "../icons/SearchIcon";

const windowWidth = Dimensions.get("window").width;
const isRTL = I18nManager.isRTL;

const DataTable = ({data, inputValue}) => {
    return (
        <View>
            {/* Table Header */}
            <View style={styles.tableRow}>
                <View style={styles.svgs}>
                    <SvgLocationIcon ColorFill={"#9F9F9F"}/>
                    <SvgSearchIcon ColorFill={"#9F9F9F"}/>
                </View>
                <Text style={styles.headerText}>מילות מפתח בקידום</Text>
            </View>

            {/* Table Rows */}
            {data?.length ? (
                data.map((item, i) => (
                    <View style={styles.tableRow} key={i}>
                        <View style={styles.textData}>
                            <View style={styles.tableCell}>
                                <Text style={styles.cellText}>{item?.location}</Text>
                            </View>
                            <View style={[styles.tableCell, styles.singleColumn]}>
                                <Text style={styles.cellText}>
                                    {item?.ranks?.[0].rank}
                                </Text>
                            </View>
                            <View style={[styles.tableCell, styles.singleColumn]}>
                                <Text style={styles.cellText}>
                                    {item?.search_volume?.search_volume}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.tableCell}>
                            <Text style={[styles.nameCell, styles.cellText]}>
                                {item?.keyword}
                            </Text>
                        </View>
                    </View>
                ))
            ) : (
                <View style={styles.tableRow}>
                    <View>
                        <Text style={[styles.nameCell, styles.cellText,styles.tableCell,styles.errorText]}>
                            לא נמצא מידע אודות הלקוח
                        </Text>
                    </View>
                </View>
            )}
        </View>
    );
};

export default DataTable;

const styles = StyleSheet.create({
    table: {
        borderWidth: 1,
        borderColor: "#000",
        backgroundColor: "red",
    },
    tableRow: {
        flexDirection: isRTL ? "row-reverse" : "row",
        justifyContent: "space-between",
        marginRight: windowWidth * 0.03
    },
    svgs: {
        flexDirection: isRTL ? "row-reverse" : "row",
        justifyContent: "space-around",
        width: windowWidth * 0.25
    },
    textData: {
        flexDirection: isRTL ? "row-reverse" : "row",
        justifyContent: "space-between",
        width: windowWidth * 0.25,
    },
    headerText: {
        fontFamily: "OpenSans",
        fontSize: 16,
    },
    tableCell: {
        paddingVertical: 15,
    },
    singleColumn: {
        flex:1,
        alignItems:'center'
    },
    cellText: {
        fontFamily: "OpenSans",
    },
    nameCell: {
        color: "#797285",
    },
    errorText:{
        width:windowWidth*0.75
    }
});
