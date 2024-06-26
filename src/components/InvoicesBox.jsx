import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  Dimensions,
  Pressable,
} from "react-native";
import InvoiceLink from "./InvoiceLink";
import SvgDropDownClose from "../icons/DropDownCloseIcon";
import SvgDropDownOpen from "../icons/DropDownOpenIcon";

const windowWidth = Dimensions.get("window").width;

const InvoicesBox = ({ invoicesData, year, openInvoiceModal }) => {
  const monthMap = {
    1: "ינואר",
    2: "פברואר",
    3: "מרץ",
    4: "אפריל",
    5: "מאי",
    6: "יוני",
    7: "יולי",
    8: "אוגוסט",
    9: "ספטמבר",
    10: "אוקטובר",
    11: "נובמבר",
    12: "דצמבר",
  };

  const fromMonthNumberToName = (numberId) => {
    const monthName = monthMap[numberId];
    return `${monthName} ${year}`;
  };

  const [isOpen, setIsOpen] = useState(false);
  const title = fromMonthNumberToName(invoicesData.month, invoicesData.year)

  const togglePanel = () => {
    setIsOpen(!isOpen);
  };
  return (
    <View style={styles.invoiceBoxContainer}>
      <View style={styles.topContainer}>
        {isOpen ? (
          <Pressable style={styles.dropDownButton} onPress={togglePanel}>
            <SvgDropDownClose ColorFill="#6226CF" />
          </Pressable>
        ) : (
          <Pressable style={styles.dropDownButton} onPress={togglePanel}>
            <SvgDropDownOpen ColorFill="#6226CF" />
          </Pressable>
        )}
        <Text style={{ fontFamily: "OpenSans", fontSize: 16, color: isOpen? "#000":"#797285" }}>{title}</Text>
      </View>
      {isOpen ? (
        <FlatList
          style={{ alignItems: "flex-end", marginTop: 22 }}
          showsVerticalScrollIndicator={false}
          horizontal={false}
          data={invoicesData.invoices}
          renderItem={({ item }) => <InvoiceLink invoiceId={item} openInvoiceModal={openInvoiceModal} />}
        />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  invoiceBoxContainer: {
    flexDirection: "column",
    backgroundColor: "#fff",
    width: windowWidth * 0.9,
    padding: 15,
    marginBottom: 16,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "rgba(159, 159, 159, 0.5)",
  },
  topContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dropDownButton: {
    height: 30,
    width: 30,
  },
});
export default InvoicesBox;
