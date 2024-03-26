import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  FlatList,
  ScrollView,
} from "react-native";
import CheckBoxMarket from "../CheckBoxMarketPlace";
import HeaderItem from "../HeaderMarketPlaceItem/HeaderItem";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const MarketplaceItem = ({
  title,
  price,
  description,
  relatedProduct,
  setTotalPrice,
  totalPrice,
  handleCheck,
}) => {
  //////////////////////-------------------Regular Item

  const [checked, setChecked] = useState(false);

  const relatedProducts = relatedProduct.map((el) => ({...el, checked:false}));

  //////////////////////-------------------Related Item

  const [TopCheckBox, setTopCheckBox] = useState(false); ///Related Item
  const [TopPrice, SetTopPrice] = useState(null);
  const [relatedProductsNew, setRelatedProducts] = useState(relatedProduct);
  const [currentRelatedProduct, setCurrentRelatedProduct] = useState(null)

  useEffect(() => {
    if(currentRelatedProduct){
      handleChangePrice(currentRelatedProduct?.checked, currentRelatedProduct?.price)
    }
  },[currentRelatedProduct]);

  const updateCurrentProduct = () => {
    let flag = false;
    relatedProducts?.map((product) => {
      if (product.checked) {
        flag = true;
        setCurrentRelatedProduct(product);
      }
    });
    if (!flag) {
      setCurrentRelatedProduct(null);
    }
  };



  const handleCheckboxChange = (itemId, open) => {
    let updatedRelatedProducts = [...relatedProductsNew];
    console.log('updatedRelatedProducts', updatedRelatedProducts)
    updatedRelatedProducts.map((product) => {
      if (product.id === itemId) {
        product.checked = !product.checked;
        SetTopPrice(product.price)
      }
      if (product.id !== itemId && product.checked) {
        product.checked = false;
      }
    });

    setRelatedProducts(updatedRelatedProducts);
    updateCurrentProduct();
    console.log("Related Products:", relatedProductsNew);
    // Update the checked state of the relatedProducts array
    let findChecked = updatedRelatedProducts.find((el) => el.checked)
    if(!findChecked && TopPrice !== null) {
      setTopCheckBox(false)
      SetTopPrice(null)
    } 
   
    const updatedProducts = [...relatedProducts];
    // Use a for loop to toggle the checked state of the clicked item

    // for (let i = 0; i < updatedProducts.length; i++) {
    //   if (updatedProducts[i].id === itemId) {
    //     updatedProducts[i].checked = !updatedProducts[i].checked;
    //   } else {
    //     updatedProducts[i].checked = false;
    //   }
    // }
    // let flag = false;
    // let priceView = 0;
    // // console.log('updatedProducts', updatedProducts)
    // for (let i = 0; i < updatedProducts.length; i++) {
    //   if (updatedProducts[i].checked) {
    //     priceView = updatedProducts[i].price;
    //     flag = true;
    //     // break;
    //   }
    // }
    // if (flag) {
    //   setTopCheckBox(true);
    //   SetTopPrice(priceView);
    // } else {
    //   setTopCheckBox(false);
    //   SetTopPrice(null);

    //   // setRelatedProducts(updatedProducts);
    // }
  };

  const handleTopCheckBox = async () => {
    //// handle to the main checkbox of relatedProduct
    // console.log("handleTop :");
    if (TopCheckBox) {
      handleCheck(false);
      await setTopCheckBox(false);
      await SetTopPrice(null);
      handleCheckboxChange(0, true); /// - clean all
    } else {
      handleCheck(true);
      await setTopCheckBox(true);
      handleCheckboxChange(1);

      }
      // relatedProducts.map(product =>{
      //   if(product.id === productId){
      //     currentRelatedProduct = product
      //     handleChangePrice(product.checked, product.price)
      //   }
      // })
    // }
  };

  const toggleCheckbox = async () => {
    console.log("relatedProductsNew :- ", relatedProductsNew);
    handleCheck(!checked);
    console.log("togglecheck");
    await setChecked(!checked);
    handleChangePrice(checked, price);
  };

  const handleChangePrice = (itemChecked, itemPrice) => {
    if (!itemChecked) {
      setTotalPrice(totalPrice + itemPrice);
    } else {
      if (price !== 0) setTotalPrice(totalPrice - itemPrice);
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.containerCheckBox}>
            <CheckBoxMarket
              onPress={!!relatedProductsNew ? () => handleTopCheckBox() : () => toggleCheckbox()}
              isChecked={!!relatedProductsNew ? TopCheckBox : checked}
              price={
                relatedProductsNew
                  ? TopPrice == null
                    ? ""
                    : TopPrice + "₪"
                  : price + "₪"
              }
            />
          </View>
          <View>
            <Text style={styles.title}>{title}</Text>
          </View>
        </View>
        <View style={styles.lineGray}></View>
        <View style={styles.containerDescription}>
          <Text style={styles.description}>{description}</Text>
        </View>
        {relatedProducts && TopCheckBox ? (
          <View style={[styles.container, styles.containerRelatedProducts]}>
            <View style={styles.lineGray}></View>
            <Text style={[styles.title, styles.titleRelated]}>
              Related Products
            </Text>

            <FlatList
              showsVerticalScrollIndicator={false}
              horizontal={false}
              data={relatedProductsNew}
              renderItem={({ item, index}) => (
                <HeaderItem
                  key={index}
                  title={item.title}
                  price={item.price}
                  totalPrice={totalPrice}
                  setTotalPrice={setTotalPrice}
                  onCheckboxChange={() => handleCheckboxChange(item.id)}
                  Check={item.checked}
                />
              )}
            />
          </View>
        ) : null}
        {/* {relatedProducts ? (
        <View style={[styles.container, styles.containerRelatedProducts]}>
          <View style={styles.lineGray}></View>
          <Text style={[styles.title, styles.titleRelated]}>
            Related Products
          </Text>

          <View style={styles.header}>
            <View style={styles.containerCheckBox}>
              <CheckBoxMarket
                onPress={handleCheckbox1Change}
                isChecked={checkbox1}
                price={relatedProducts[0].price + "₪"}
              />
            </View>
            <Text style={styles.title}>{relatedProducts[0].title}</Text>
          </View>
          <View style={styles.header}>
            <View style={styles.containerCheckBox}>
              <CheckBoxMarket
                onPress={handleCheckbox2Change}
                isChecked={checkbox2}
                price={relatedProducts[1].price + "₪"}
              />
            </View>

            <Text style={styles.title}>{relatedProducts[1].title}</Text>
          </View>
          <View style={styles.header}>
            <View style={styles.containerCheckBox}>
              <CheckBoxMarket
                onPress={handleCheckbox3Change}
                isChecked={checkbox3}
                price={relatedProducts[2].price + "₪"}
              />
            </View>

            <Text style={styles.title}>{relatedProducts[2].title}</Text>
          </View>
        </View>
      ) : null} */}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "column",
    width: windowWidth * 0.9107,
    backgroundColor: "#FFFFFF",
    marginBottom: windowHeight * 0.019,
    elevation: 5,
    shadowColor: "rgba(0, 0, 0, 0.1)",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 24,
    borderRadius: 10,
  },
  containerCheckBox: {
    marginLeft: windowWidth * 0.0467,
  },
  containerRelatedProducts: {
    elevation: 0,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
  },
  titleRelated: {
    textAlign: "right",
    width: "90%",
  },

  header: {
    marginTop: windowHeight * 0.025,
    justifyContent: "space-between",
    width: "100%",
    flexDirection: "row",
    textAlign: "left",
    alignItems: "center",
    marginHorizontal: windowWidth * 0.0467,
  },
  title: {
    fontFamily: "OpenSans-Bold",
    fontSize: 18,
    // fontWeight: 600,
    color: "#19073A",
    marginHorizontal: windowWidth * 0.0467,
  },
  price: {
    fontFamily: "OpenSans-Bold",
    // fontWeight: 700,
    fontSize: 20,
    color: "#6226CF",
  },
  lineGray: {
    height: 1,
    width: windowWidth * 0.806,
    backgroundColor: "#9F9F9F33",
    marginHorizontal: windowWidth * 0.0469,
    marginVertical: windowHeight * 0.0215,
  },
  description: {
    fontSize: 16,
    fontFamily: "OpenSans",
    // fontWeight: 400,
    color: "#797285",
    textAlign: "right",
  },
  containerDescription: {
    marginBottom: windowHeight * 0.03239,
    marginHorizontal: windowWidth * 0.01635,
    alignItems: "center",
  },
});

export default MarketplaceItem;
