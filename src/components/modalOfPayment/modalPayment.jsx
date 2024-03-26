import React, { useState } from 'react';
import { Modal, View, Text,StyleSheet,Dimensions } from 'react-native';
import { RadioButton, IconButton } from 'react-native-paper';
import SvgApplePay from '../../icons/ApplePay';
import SvgGooglePay from '../../icons/GooglePay';
import SvgVisaMastercard from '../../icons/VisaMastercard';
import SvgBit from '../../icons/Bit';

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const RadioModal = ({ visible, onDismiss }) => {

  const [selected, setSelected] = useState(null);

  return (
    <View style={styles.modal}>
    <Modal visible={visible}
    onBackdropPress={onDismiss}
    backdropOpacity={0.5}>
    
   
      <View style={styles.container}>
        <RadioButton.Group
          onValueChange={(value) => setSelected(value)}
          value={selected}
        >
          <View style={styles.containerOfSelects}>
            <View style={styles.select}>
              <RadioButton value="applePay" style={styles.radio} />
              <SvgApplePay onPress={() => setSelected('applePay')}></SvgApplePay>
            </View>
            <View style={styles.select}>
              <RadioButton value="googlePay" style={styles.radio} />
              <SvgGooglePay onPress={() => setSelected('googlePay')}></SvgGooglePay>
            </View>
            <View style={styles.select}>
              <RadioButton value="visaMastercard" style={styles.radio} />
              <SvgVisaMastercard onPress={() => setSelected('visaMastercard')}></SvgVisaMastercard>
            </View>
            <View style={styles.select}>
              <RadioButton value="bit" style={styles.radio}/>
              <SvgBit onPress={() => setSelected('bit')}></SvgBit>
            </View>
          </View>
        </RadioButton.Group>
      </View>
    </Modal></View>
  );
};

const styles = StyleSheet.create({
    container: {


    },
    modal: {
        justifyContent: 'center',
        alignItems: 'center',
       
      },
      containerOfSelects:{
        flexDirection: 'column',

      },
    select:{
        flexDirection: 'row-reverse',
        alignItems: 'center',

    },
    radio:{
    }
    
  });



export default RadioModal;
