import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const RadioButton = ({ label, selected, onPress }) => (
  <TouchableOpacity style={styles.radioButton} onPress={onPress}>
    <View style={[styles.radioCircle, { backgroundColor: selected ? 'blue' : 'white' }]} />
    <Text>{label}</Text>
  </TouchableOpacity>
);

const RadioGroup = () => {
  const [selectedOption, setSelectedOption] = useState('Option 1');

  const handleRadioPress = (option) => {
    setSelectedOption(option);
  };

  return (
    <View>
      <RadioButton
        label="Option 1"
        selected={selectedOption === 'Option 1'}
        onPress={() => handleRadioPress('Option 1')}
      />
      <RadioButton
        label="Option 2"
        selected={selectedOption === 'Option 2'}
        onPress={() => handleRadioPress('Option 2')}
      />
      <RadioButton
        label="Option 3"
        selected={selectedOption === 'Option 3'}
        onPress={() => handleRadioPress('Option 3')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'blue',
    marginRight: 10,
  },
});

export default RadioGroup;
