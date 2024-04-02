import React, {useState} from 'react';
import {Dimensions, FlatList, Pressable, ScrollView, StyleSheet, Text, View,} from 'react-native';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {useDispatch} from "react-redux";
import {addProduct, removeProduct} from "../../store/marketSlice";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const MarketplaceItem = ({
                             title,
                             price,
                             description,
                             variations,
                             handleCheck,
                         }) => {
    const dispatch = useDispatch();
    const initSelected = {id: ' ', price: 0};
    const [itemPrice, setItemPrice] = useState(price);
    const [checked, setChecked] = useState(false);
    const [selected, setSelected] = useState(initSelected);

    const handlePress = () => {
        !checked ? dispatch(addProduct({name: title, price: itemPrice})) : dispatch(removeProduct(title));
        handleCheck(!checked);
        setChecked((prev) => !prev);
    };

    const handleInnerPress = (id, price) => {
        if (id !== selected.id) {
            setSelected({id, price});
            setItemPrice(prev => prev - selected.price + price);
            dispatch(removeProduct(selected.id));
            dispatch(addProduct({name: id.toString(), price: price}));
        } else if (selected.id === id) {
            setSelected(initSelected);
            setItemPrice(prev => prev - selected.price);
            dispatch(removeProduct(id));
            handleCheck(!checked);
            setChecked((prev) => !prev);
        }
    };

    return <ScrollView>
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.containerCheckBox}>
                    <Pressable onPress={handlePress}>
                        <MaterialCommunityIcons
                            name={checked ?
                                'checkbox-marked' : 'checkbox-blank-outline'} size={34}
                            color={checked ? '#6226CF' : '#9F9F9F'}
                            style={{opacity: checked ? 1 : 0.5}}
                        />
                    </Pressable>
                    {!!itemPrice && <Text style={styles.price}>{itemPrice + '₪'}</Text>}
                </View>
                <View>
                    <Text style={styles.title}>{title}</Text>
                </View>
            </View>
            <View style={styles.lineGray}></View>
            <View style={styles.containerDescription}>
                <Text style={styles.description}>{description}</Text>
            </View>
            {variations.length && checked ? (
                <View style={styles.container}>
                    <View style={styles.lineGray}></View>
                    <Text style={[styles.title, styles.titleRelated]}>
                        אפשרויות
                    </Text>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        horizontal={false}
                        data={variations}
                        renderItem={({item, index}) => (
                            <View style={styles.innerContainerCheckBox}>
                                <Pressable onPress={() => handleInnerPress(item.id, item.price)}>
                                    <MaterialCommunityIcons
                                        name={selected.id === item.id ?
                                            'checkbox-marked' : 'checkbox-blank-outline'} size={34}
                                        color={selected.id === item.id ? '#6226CF' : '#9F9F9F'}
                                        style={{opacity: selected.id === item.id ? 1 : 0.5}}
                                    />
                                </Pressable>
                                {!!item.price && <Text style={styles.price}>{item.price + '₪'}</Text>}
                                <Text style={{
                                    textAlign: 'right',
                                    flex: 1,
                                    marginRight: windowWidth * 0.0467
                                }}>{item.title}</Text>
                            </View>
                        )}
                    />
                </View>
            ) : null}
        </View>
    </ScrollView>;
};


const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flexDirection: 'column',
        width: windowWidth * 0.9107,
        backgroundColor: '#FFFFFF',
        marginBottom: windowHeight * 0.019,
        elevation: 5,
        shadowColor: 'rgba(0, 0, 0, 0.1)',
        shadowOffset: {width: 0, height: 0},
        shadowOpacity: 1,
        shadowRadius: 24,
        borderRadius: 10,
    },
    containerCheckBox: {
        marginLeft: windowWidth * 0.0467,
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
    },
    innerContainerCheckBox: {
        marginLeft: windowWidth * 0.0467,
        flexDirection: 'row',
        alignItems: 'center',
        // justifyContent:'space-between',
        width: windowWidth * 0.9
    },
    containerRelatedProducts: {
        elevation: 0,
        shadowOffset: {width: 0, height: 0},
        shadowOpacity: 0,
        shadowRadius: 0,
    },
    titleRelated: {
        textAlign: 'right',
        width: '90%',
    },

    header: {
        marginTop: windowHeight * 0.025,
        justifyContent: 'space-between',
        width: '100%',
        flexDirection: 'row',
        textAlign: 'left',
        alignItems: 'center',
        marginHorizontal: windowWidth * 0.0467,
    },
    title: {
        fontFamily: 'OpenSans-Bold',
        fontSize: 16,
        color: '#19073A',
        marginHorizontal: windowWidth * 0.0467,
    },
    price: {
        fontFamily: 'OpenSans-Bold',
        fontSize: 20,
        color: '#6226CF',
    },
    lineGray: {
        height: 1,
        width: windowWidth * 0.806,
        backgroundColor: '#9F9F9F33',
        marginHorizontal: windowWidth * 0.0469,
        marginVertical: windowHeight * 0.0215,
    },
    description: {
        fontSize: 16,
        fontFamily: 'OpenSans',
        color: '#797285',
        textAlign: 'right',
    },
    containerDescription: {
        marginBottom: windowHeight * 0.03239,
        marginHorizontal: windowWidth * 0.01635,
        alignItems: 'center',
    },
});

export default MarketplaceItem;
