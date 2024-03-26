import { StyleSheet, Text, View, TextInput, Dimensions } from "react-native";
import React, { useState } from "react";
import InputComponent from "../InputGeneric/InputComponent";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function CreditCardForm() {
  const [name, setName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiration, setExpiration] = useState("");
  const [cvc, setCvc] = useState("");

  const handleCardNumberChange = (value) => {
    // Remove any existing spaces and non-numeric characters
    const cleanedString = value.replace(/[^0-9]/g, "");

    // Add spaces every four characters
    const spacedString = cleanedString.replace(/(\d{4})/g, "$1 ");
    setCardNumber(spacedString.trim());
  };

  const handleExpirationChange = (value) => {
    const cleanedString = value.replace(/[^0-9]/g, "");
    const formattedString = cleanedString.replace(/(\d{2})(.*)/, "$1/$2");
    setExpiration(formattedString.trim());
  };

  return (
    <View style={styles.container}>
      <View>
        <TextInput
          placeholder={"שם בעל הכרטיס"}
          onChangeText={(value) => setName(value)}
          value={name}
          style={styles.input}
        />
        <TextInput
          placeholder={"מספר כרטיס אשראי"}
          onChangeText={(value) => handleCardNumberChange(value)}
          value={cardNumber}
          keyboardType="numeric"
          maxLength={19}
          style={styles.input}
        />
        <View style={styles.inputsContainer}>
          <TextInput
            placeholder={"תוקף הכרטיס"}
            onChangeText={(value) => handleExpirationChange(value)}
            value={expiration}
            keyboardType="numeric"
            maxLength={5}
            style={styles.shortInput}
          />
          <TextInput
            placeholder={"CVC"}
            onChangeText={(value) => setCvc(value)}
            value={cvc}
            keyboardType="numeric"
            maxLength={3}
            style={styles.shortInput}
          />
        </View>
      </View>
    </View>
    //     <View style={styles.container}>
    //         <View>
    //             <Text>{creditCardData.cardExpiry}</Text>
    //         </View>
    //     <View>
    //         <TextInput
    //         style={styles.input}
    //             placeholder="שם בעל הכרטיס"
    //             onChangeText={(text) => handleCreditCardInputChange('cardHolder', text)}
    //         />
    //     </View>
    //     <View>
    //         <TextInput style={styles.input}
    //             placeholder="מספר כרטיס"
    //             onChangeText={(text) =>
    //               handleCreditCardInputChange('cardNumber', text.replace(/[^0-9]/g, ''))
    //             }
    //             keyboardType="numeric"
    //           />
    //     </View>
    //     <View style={styles.containerWithShorterInputs}>
    //         <TextInput style={styles.inputShorter}
    //             placeholder="MM/YY"
    //             onChangeText={(text) =>{
    //                 const formattedText = text.replace(/[^0-9]/g, '');
    //                 if (/^(0[1-9]|1[0-2])\d{0,2}$/.test(formattedText)) {
    //                 handleCreditCardInputChange('cardExpiry', formattedText);
    //                  }
    //             }}
    //             keyboardType="numeric"
    //             maxLength={5}
    //           />
    //            <TextInput style={styles.inputShorter}
    //             placeholder="CVC"
    //             onChangeText={(text) =>
    //               handleCreditCardInputChange('cardCVC', text.replace(/[^0-9]/g, ''))
    //             }
    //             maxLength={3}
    //             keyboardType="numeric"

    //           />
    //     </View>

    //     </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    width: windowWidth * 0.906,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    textAlign: "right",
    direction: "rtl",
    shadowColor: "rgba(0, 0, 0, 0.1)",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 24,
    borderRadius: 10,
    
  },
  input: {
    textAlign: "right",
    width: windowWidth * 0.813,
    borderBottomColor: "rgba(159, 159, 159, 0.3)",
    borderBottomWidth: 1,
    marginVertical: windowHeight * 0.0215,
    padding: 10,
    fontFamily:"OpenSans",
    fontSize:17
    
  },
  shortInput:{
    textAlign: "right",
    width: windowWidth * 0.38,
    borderBottomColor: "rgba(159, 159, 159, 0.3)",
    borderBottomWidth: 1,
    marginVertical: windowHeight * 0.0215,
    padding: 10,
    fontFamily:"OpenSans",
    fontSize:17
  },
  inputsContainer:{
    flexDirection:"row",
    justifyContent:"space-between"
  }
});
