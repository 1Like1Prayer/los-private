import React, { useRef, useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  Modal,
  View,
  Dimensions,
} from 'react-native';
import { Icon } from 'react-native-elements';
import { RadioButton, IconButton } from 'react-native-paper';
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const PaymentMethodDropDown = ({ label, data, onSelect, visible, setVisible }) => {
  const DropdownButton = useRef();
  const [selected, setSelected] = useState(undefined);
  const [dropdownTop, setDropdownTop] = useState(0);

  const toggleDropdown = () => {
    visible ? setVisible(false) : openDropdown();
  };

  const openDropdown = () => {
    DropdownButton.current.measure((_fx, _fy, _w, h, _px, py) => {
      setDropdownTop(py + h + 10);
    });
    setVisible(true);
  };

  const onItemPress = (item) => {
    setSelected(item);
    onSelect(item);
    setVisible(false);
  };

 const renderItem = ({ item, index }) => (
  <TouchableOpacity style={styles.item} onPress={() => onItemPress(item)}>
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      {/* {item.icon && React.cloneElement(item.icon, { width: 100, height: 20 })} */}

        <Text style={{ textAlign: 'right', marginLeft: 210 }}>{item.icon}</Text>
      </View>
      <RadioButton
          value={item.value}
          status={selected === item.value ? 'checked' : 'unchecked'}
          onPress={() => onItemPress(item)}
        />
    </View>
  </TouchableOpacity>
);
  const renderDropdown = () => {
    return (
      <Modal visible={visible} transparent animationType="none">
        <TouchableOpacity
          style={styles.overlay}
          onPress={() => setVisible(false)}
        >
          <View style={[styles.dropdown,]}>
            <FlatList
              data={data}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    );
  };

  return (
    <View>
        <Text style={{textAlign:"right", fontFamily:"OpenSans", fontSize:16, marginBottom:13}}>בחר שיטת תשלום</Text>
        <TouchableOpacity
      ref={DropdownButton}
      style={styles.button}
      onPress={toggleDropdown}
    >
      {renderDropdown()}
      <Icon style={styles.icon} type="font-awesome" name="angle-down" color={"#9F9F9F"} size={30}/>

      <Text style={styles.buttonText}>
        {(selected && selected.label) || label}
      </Text>
      
    </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    height: 50,
    zIndex: 1,
    width: windowWidth * 0.906,
    justifyContent:"space-between",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(159, 159, 159, 0.50)',
    marginBottom:24
  },
  buttonText: {
    flex: 1,
    textAlign: "right",
    marginRight:20,
    color:"#9F9F9F",
    fontFamily:"OpenSans",
    fontSize:16
  },
  icon: {
    marginLeft: 20,
  },
  dropdown: {
    position: 'absolute',
    top: '40%',
    transform: [{ translateY: -windowHeight*0.5 }],
    left: windowWidth * 0.54,
    backgroundColor: '#fff',
    width: windowWidth * 0.92,
    borderRadius:10
  },
  overlay: {
    width: '100%',
    height: '100%',
  },
  item: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    textAlign:"right"
  },
});

export default PaymentMethodDropDown;
