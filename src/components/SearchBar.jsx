import React, { useEffect, useState } from "react";
import { View, TextInput, FlatList, Text, StyleSheet, Dimensions } from "react-native";
import { Ionicons } from '@expo/vector-icons';
// import { grey100 } from "react-native-paper/lib/typescript/styles/themes/v2/colors";

const windowWidth = Dimensions.get("window").width;

const SearchBar = ({  onTextInputChange }) => {
  const [searchQuery, setSearchQuery] = useState("");

  // const handleSearch = (text) => {
  //   // setSearchQuery(text);
  //   onTextInputChange(value);
  //   // setFilteredData(filteredBoxData);
  // };

 
  const handleChange = (value) => {
    setSearchQuery(value);
    onTextInputChange(value)
  };

  useEffect(() => {
  
  }, [searchQuery])

 

  return (
    <View style={styles.container}>
      <Ionicons name="search" size={24} color="black" style={styles.searchIcon} />
      <TextInput 
        style={styles.input}
        placeholder="סינון לפי מילה"
        value={searchQuery}
        onChangeText={text => handleChange(text)}
      />
      {/* <FlatList
        data={filteredData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Text style={styles.item}>{item}</Text>
        )}
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display:"flex",
    position:'relative'
  },
  input: {
    height: 40,
    borderColor: "rgba(159, 159, 159, 0.50)",
    borderWidth: 1,
    borderRadius:5,
    padding: 8,
    fontFamily: "OpenSans",
    textAlign: "right",
    width:windowWidth*0.84,
    marginBottom:45
  },
  item: {
    padding: 10,
    fontSize: 18,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  searchIcon: {
    position: "absolute",
    top:7,
    left:10,
    color: "lightgrey"
  }
});
export default SearchBar;
