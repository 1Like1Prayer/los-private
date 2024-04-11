import React from "react";
import { Dimensions, I18nManager, StyleSheet, Text, View } from "react-native";
import SvgLocationIcon from "../icons/LocationIcon";
import SvgSearchIcon from "../icons/SearchIcon";

const windowWidth = Dimensions.get("window").width;
const isRTL = I18nManager.isRTL;

const DataTable = ({ data, inputValue }) => {
  return (
    <View>
      {/* Table Header */}
      <View style={styles.tableRow}>
        <View style={styles.tableHeaderCell}>
          <SvgLocationIcon ColorFill={"#9F9F9F"} />
        </View>
        <View style={styles.tableHeaderCell}>
          <SvgSearchIcon ColorFill={"#9F9F9F"} />
        </View>
        <View style={styles.tableHeaderCellRight}>
          <Text style={styles.headerText}>מילות מפתח בקידום</Text>
        </View>
      </View>

      {/* Table Rows */}
      {data?.length ? (
        data.map((item, i) => (
          <View style={styles.tableRow} key={i}>
            <View style={styles.tableCell}>
              <Text style={styles.cellText}>{item?.location}</Text>
            </View>
            <View style={styles.tableCell}>
              <Text style={styles.cellText}>
                {item?.search_volume?.search_volume}
              </Text>
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
            <Text style={[styles.nameCell, styles.cellText]}>
              No Data Found
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
  },
  tableHeaderCell: {
    width: windowWidth * 0.06,
    marginLeft: windowWidth * 0.045,
    flexDirection: isRTL ? "row-reverse" : "row",
  },
  tableHeaderCellRight: {
    width: windowWidth * 0.38,
    marginLeft: windowWidth * 0.27,
    flexDirection: isRTL ? "row-reverse" : "row",
  },
  headerText: {
    fontFamily: "OpenSans",
    fontSize: 16,
  },
  tableCell: {
    // flex: 1,
    paddingVertical: 15,
    width: windowWidth * 0.1,
    flexDirection: isRTL ? "row-reverse" : "row",
  },
  cellText: {
    fontFamily: "OpenSans",
    textAlign: isRTL ? "left" : "right",
    flexDirection: isRTL ? "row-reverse" : "row",
  },
  nameCell: {
    color: "#797285",
    width: windowWidth * 0.3,
    marginLeft: windowWidth * 0.33,
  },
});
