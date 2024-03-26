import React, { useState, useEffect } from "react";
import { View, Image, Pressable, Text, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { AntDesign } from "@expo/vector-icons";

const UploadImage = ({ onChange = (e) => {} }) => {
  const [imageUri, setImageUri] = useState(null);

  useEffect(() => {
    // Check and request permissions if necessary
    (async () => {
      if (Platform.OS !== "web") {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
    });
  
    if (!result.cancelled) {
      // Check image file size and type
      const allowedFileTypes = ['jpeg', 'jpg', 'png'];
      const format = result.assets[0].uri.split('.');
      if (!allowedFileTypes.includes(format[format.length - 1].toLowerCase())) {
        alert("Only JPG, JPEG, and PNG images are allowed.");
        return;
      }
      if (result.assets[0].fileSize && result.assets[0].fileSize < (5 * 1024 * 1024)) {
        setImageUri(result.assets[0].uri);
        onChange(
          result.assets.map((file) => ({
            uri: file.uri,
            name: file.fileName ?? 'profile.jpg',
            type: 'image/jpg',
          }))
        );
      } else {
        alert("Image must be less than 5MB.");
      }
    }
  };
  
  const removeImage = () => {
    setImageUri(null);
    onChange([]); // Clear the selected image
  };

  return (
    <View style={styles.fileContainer}>
      <Pressable onPress={pickImage} style={styles.uploadButton}>
        <Text style={styles.textContainer}>
          <Text style={styles.uploadFileText}>צרף קובץ</Text>
          <Text style={{ color:"#797285" }}> (PNG, JPG) </Text>
          {'\n'}
          <Text style={{ color:"#9F9F9F", fontSize: 13 }}> מקסימום 5MB</Text>
        </Text>
      </Pressable>
      {imageUri && (
        <View style={styles.profileImageWrapper}>
          <Image source={{ uri: imageUri }} style={styles.profileImage} />
          <Pressable style={styles.deleteIcon} onPress={removeImage}>
            <AntDesign name="close" size={24} color="white" />
          </Pressable>
        </View>
      )}
    </View>
  );
};

export default UploadImage;

const styles = StyleSheet.create({
  fileContainer: {
    padding: 30,
    borderRadius: 10,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "rgba(159, 159, 159, 0.50)",
  },
  uploadButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  textContainer:{
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    fontFamily: "OpenSans",
    fontSize: 14,
  },
  uploadFileText:{
    color:"#6226CF",
    textDecorationLine:"underline"
  },
  profileImageWrapper:{
    position: 'relative',
    textAlign:'center',
    display:'flex',
    alignItems:'center'
  },
  profileImage: {
    width: 100,
    height: 100,
  },
  deleteIcon: {
    position: 'absolute',
    top: 0,
    right: 70,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    // color: black,
    borderRadius: 12,
    padding: 5,
  },
});

