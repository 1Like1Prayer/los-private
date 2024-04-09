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
              <Text style={{ ...styles.cellText, marginLeft: 20 }}>
                {item?.search_volume?.search_volume}
              </Text>
            </View>
            <View style={styles.tableCellRight}>
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
  tableRow: {
    flexDirection: "row",
    paddingVertical: 10,
  },
  tableHeaderCell: {
    width: "15%",
    justifyContent: "center",
    alignItems: "center",
  },
  tableHeaderCellRight: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-end",
  },
  headerText: {
    fontFamily: "OpenSans",
    fontSize: 16,
    textAlign: "center",
  },
  tableCell: {
    width: "15%",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  tableCellRight: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-end",
  },
  cellText: {
    fontFamily: "OpenSans",
    textAlign: "center",
  },
  nameCell: {
    color: "#797285",
    textAlign: "right",
  },
});
