import React, {useState} from "react";
import {Dimensions, Platform, Pressable, ScrollView, StyleSheet, Text, View,} from "react-native";
import BoxItems from "./BoxItems";
import SvgGoogleIcon from "../icons/GoogleIcon";
import SvgDropDownClose from "../icons/DropDownCloseIcon";
import SvgDropDownOpen from "../icons/DropDownOpenIcon";
import DataTable from "./DataTable";
import SearchBar from "./SearchBar";

const windowWidth = Dimensions.get("window").width;

const Panel = ({title, boxData, dataTable}) => {
    const [filteredDataTable, setFilteredDataTable] = useState(dataTable ? dataTable : []);
    const [isOpen, setIsOpen] = useState(false);
    const [textInputValue, setTextInputValue] = useState("");

    const handleTextInputChange = (value) => {
        if (value) {
            setFilteredDataTable(
                dataTable.filter((element) =>
                    element?.keyword?.toLowerCase().includes(value.toLowerCase())
                )
            );
        } else {
            setFilteredDataTable(dataTable);
        }
        setTextInputValue(value);
    };

    return (
        <ScrollView>
            <View style={[styles.container, shadowStyle]}>
                <View style={styles.panelHeader}>
                    <View style={styles.panelHeaderRight}>
                        <SvgGoogleIcon style={styles.icon}/>
                        <Text>{title}</Text>
                    </View>
                    {isOpen ? (
                        <Pressable
                            style={styles.dropDownButton}
                            onPress={() => setIsOpen(!isOpen)}
                        >
                            <SvgDropDownClose ColorFill="#6226CF"/>
                        </Pressable>
                    ) : (
                        <Pressable
                            style={styles.dropDownButton}
                            onPress={() => setIsOpen(!isOpen)}
                        >
                            <SvgDropDownOpen ColorFill="#6226CF"/>
                        </Pressable>
                    )}
                </View>
                {isOpen ? (
                    <View>
                        <View style={styles.lineGray}></View>
                        <SearchBar onTextInputChange={handleTextInputChange}/>
                        <BoxItems data={boxData}/>
                        <DataTable
                            data={filteredDataTable}
                            inputValue={textInputValue}
                        />
                    </View>
                ) : null}
            </View>
        </ScrollView>
    );
};

export default Panel;

const shadowStyle = Platform.select({
    ios: {
        shadowColor: "rgba(0, 0, 0, 0.1)",
        shadowOffset: {width: 0, height: 0},
        shadowOpacity: 1,
        shadowRadius: 5,
    },
    android: {
        elevation: 5,
    },
});

const styles = StyleSheet.create({
    container: {
        display: "flex",
        padding: 15,
        flexDirection: "column",
        alignItems: "center",
        borderRadius: 10,
        backgroundColor: "white",
        marginBottom: 20,
    },
    panelHeader: {
        display: "flex",
        flexDirection: "row-reverse",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 15,
        width: windowWidth * 0.85,
    },
    panelHeaderRight: {
        display: "flex",
        flexDirection: "row-reverse",
        alignItems: "center",
        justifyContent: "flex-start",
    },
    icon: {
        marginLeft: 8,
    },
    lineGray: {
        height: 1,
        width: windowWidth * 0.806,
        backgroundColor: "#9F9F9F33",
        marginBottom: 12,
    },
    dropDownButton: {
        height: 30,
        width: 30,
    },
});
