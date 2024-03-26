import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import BoxData from "./BoxData";
// import { panelData } from "../../assets/data/homePage";

const windowWidth = Dimensions.get("window").width;


const BoxItems = ({data}) => {
  // Create an array of arrays, each containing two items from panelData.boxData
  const groupedData = groupDataIntoRows(data, 2);

  return (
    <View style={styles.itemsContainer}>
      {groupedData.map((row, rowIndex) => (
        <View style={styles.rowContainer} key={rowIndex}>
          {row.map((itemData) => (
            <BoxData
              key={itemData.id}
              count={itemData.count}
              description={itemData.description}
              iconComponent={itemData.icon}
            />
          ))}
        </View>
      ))}
    </View>
  );
};

// Helper function to group data into rows
function groupDataIntoRows(data, itemsPerRow) {
  const rows = [];
  let currentRow = [];

  for (let i = 0; i < data.length; i++) {
    currentRow.push(data[i]);

    // Check if we've reached the desired number of items per row or if we're at the end of the data
    if (currentRow.length === itemsPerRow || i === data.length - 1) {
      rows.push([...currentRow]); // Add a copy of the current row
      currentRow = []; // Reset the current row
    }
  }

  return rows;
}

export default BoxItems;

const styles = StyleSheet.create({
  itemsContainer: {
    marginBottom:30
  },
  rowContainer: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    marginBottom: 15,
    width: windowWidth * 0.85
  },
});
