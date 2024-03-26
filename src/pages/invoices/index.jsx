import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Dimensions, FlatList, Pressable, Image } from "react-native";
import CustomHeader from "../../components/CustomHeader";
// import axios from "axios";
import apiClient from '../../core/apiClient';
import InvoiceSection from "../../components/InvoiceSection";
import FilterDropDown from "../../components/FilterDropDown";
import { getUser } from "../../core/auth";
import { Modal } from "react-native-paper";
import { TouchableOpacity } from "react-native-gesture-handler";
// import { grey400 } from "react-native-paper/lib/typescript/styles/themes/v2/colors";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const currentYear = new Date().getFullYear();
const startYear = 2000;


const years = [
  { label: "כל השנים", value: "all" },
  ...Array.from({ length: currentYear - startYear + 1 }, (_, i) => ({
    label: (currentYear - i).toString(),
    value: currentYear - i,
  })),
];


const months = [
  { label: "כל החודשים", value: "all" },
  { label: "ינואר", value: 1 },
  { label: "פברואר", value: 2 },
  { label: "מרץ", value: 3 },
  { label: "אפריל", value: 4 },
  { label: "מאי", value: 5 },
  { label: "יוני", value: 6 },
  { label: "יולי", value: 7 },
  { label: "אוגוסט", value: 8 },
  { label: "ספטמבר", value: 9 },
  { label: "אוקטובר", value: 10 },
  { label: "נובמבר", value: 11 },
  { label: "דצמבר", value: 12 },
];

export default function Invoices() {
  const [invoicesData, setInvoicesData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filter, setFilter] = useState({year:"all", month:"all"})

  useEffect(() => {

    (async () => {
      const { leos_id } = await getUser()
      apiClient.getClientInvoices(leos_id)
        .then((response) => {
          function groupInvoicesByYearAndMonth(invoices) {
            const groupedData = [];

            invoices.forEach((invoice) => {
              const date = new Date(invoice.date);
              const year = date.getFullYear();
              const month = date.getMonth() + 1; // Adding 1 to match the 1-12 format

              // Check if the year exists in the grouped data
              const yearIndex = groupedData.findIndex(
                (item) => item.year === year
              );

              if (yearIndex === -1) {
                // If the year doesn't exist, create a new entry for it
                groupedData.push({
                  year,
                  data: [{ month, invoices: [invoice.invoice_id] }],
                });
              } else {
                // If the year exists, check if the month exists for that year
                const monthIndex = groupedData[yearIndex].data.findIndex(
                  (item) => item.month === month
                );

                if (monthIndex === -1) {
                  // If the month doesn't exist, create a new entry for it
                  groupedData[yearIndex].data.push({
                    month,
                    invoices: [invoice.invoice_id],
                  });
                } else {
                  // If the month exists, add the invoice to it
                  groupedData[yearIndex].data[monthIndex].invoices.push(
                    invoice.invoice_id
                  );
                }
              }
            });

            return groupedData;
          }

          // Call the function with the invoices data
          const newData = groupInvoicesByYearAndMonth(
            response.data.invoices
          );

          setInvoicesData(newData);
          setFilteredData(newData);
        })
        .catch((error) => {
          // Handle any errors here
          console.error("Error:", error);
        });
    })()
  }, []);

  const handleFilterData = () => {
    if (invoicesData && filter) {
      // Create a copy of the original data
      let filteredDataCopy = JSON.parse(JSON.stringify(invoicesData));
  
      // Filter by year
      if (filter.year !== "all") {
        filteredDataCopy = filteredDataCopy.filter(
          (item) => item.year === filter.year
        );
      }
  
      // Filter by month
      if (filter.month !== "all") {
        filteredDataCopy.forEach((yearData) => {
          yearData.data = yearData.data.filter(
            (monthData) => monthData.month === filter.month
          );
        });
  
        // Remove years with no data
        filteredDataCopy = filteredDataCopy.filter(
          (yearData) => yearData.data.length > 0
        );
      }
  
      // Set the filtered data
      setFilteredData(filteredDataCopy);
    }
  };
  

  const updateFilter = (newFilter) =>{
    setFilter(newFilter)
    handleFilterData()
    
  }

  const [modalVisible, setModalVisible] = useState(false); 

  
  const openInvoiceModal = (leosId, invoiceId) => {
    apiClient.getInvoice(leosId, invoiceId)
      .then((response) => {
        const { invoice } = response.data;
        if (invoice) {
          console.log('Invoice:', invoice);
          Linking.openURL(invoice)
            .catch((error) => {
              console.error('Failed to open URL:', error);
            });
        } else {
          console.error('Invoice not found in the response');
        }
      })
      .catch((error) => {
        console.error('Error fetching invoice:', error);
      });
  };

  downloadPDF = () => {
    // const { url } = this.state;
    const localFilePath = `${RNFS.DocumentDirectoryPath}/downloadedFile.pdf`;

    RNFS.downloadFile({
      fromUrl: "https://yaad-prod.s3.eu-central-1.amazonaws.com/PDFInvoices/4500748231/2023/07/XXTE9WS0E2.pdf",
      toFile: localFilePath,
    }).promise.then((response) => {
      if (response.statusCode === 200) {
        this.setState({ filePath: localFilePath });
      }
    }).catch((error) => {
      console.log('Error downloading file: ', error);
    });
  };

  return (
    <View style={styles.container}>
      <View style={{ width: windowWidth }}>
        <CustomHeader />
      </View>
      <View style={styles.filerContainer}>
        <FilterDropDown options={months} placeholderText={"סנן לפי חודש"} filterField={"month"} updateFilter={updateFilter} filter={filter}/>
        <FilterDropDown options={years} placeholderText={"סנן לפי שנה"}  filterField={"year"} updateFilter={updateFilter} filter={filter}/>
      </View>

      <View style={styles.dataContainer}>
        <FlatList
          showsVerticalScrollIndicator={false}
          horizontal={false}
          data={filteredData}
          renderItem={({ item }) => (
            <InvoiceSection invoices={item.data} year={item.year} openInvoiceModal={openInvoiceModal}/>
          )}
        />
      </View>
      {/* <View style={styles.centeredView}> */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>

          {/* <Text>
          <iframe src="https://yaad-prod.s3.eu-central-1.amazonaws.com/PDFInvoices/4500748231/2023/07/XXTE9WS0E2.pdf" title=""> </iframe>
          </Text>  */}

            <View style={{display: "flex", flexDirection: "row", justifyContent: "space-evenly", marginRight: 100}}>
    <TouchableOpacity onPress={openInvoiceModal}>
      <Image
        source={require("../../../assets/images/download.png")}
        style={styles.download}
        resizeMode="contain"
      />
    </TouchableOpacity>
            <Image
          source={require("../../../assets/images/LogoPurple.png")}
          style={styles.LogoPurple}
          resizeMode="contain"
        />


            </View>

            <View style={{display: "flex", alignItems: "flex-end", margin: 5}}>
              <Text>חשבונית </Text>
            </View>

            <View style={{display: "flex", flexDirection: "row", justifyContent: "flex-end", alignItems: "flex-end", margin: 5}}>
            <Text style={styles.textspace}>2022-02-03 18:34:28</Text>
              <Text>תאריך הוצאת חשבונית</Text>
              
            </View>

            <View style={{display: "flex", flexDirection: "row", justifyContent: "flex-end", alignItems: "flex-end", margin: 5}}>
            <Text style={styles.textspace}>team-c</Text>
              <Text>תאריך הוצאת חשבונית</Text>
              
            </View>

            <View style={{display: "flex", flexDirection: "row", justifyContent: "flex-end", alignItems: "flex-end", margin: 5}}>
            <Text style={styles.textspace}>653457</Text>
              <Text style={styles.textspace2}>תאריך הוצאת חשבונית</Text>
              
            </View>

            <View style={styles.horizontalLine} />

            <View style={{display: "flex", alignItems: "flex-end", margin: 5}}>
              <Text>מוצרים:</Text>
            </View>

            <View style={{display: "flex", flexDirection: "row", justifyContent: "flex-end", alignItems: "flex-end", margin: 5}}>
            <Text style={styles.textspace}>1000 ש״ח</Text>
              <Text>ביית אתר</Text>
              
            </View>

            <View style={{display: "flex", flexDirection: "row", justifyContent: "flex-end", alignItems: "flex-end", margin: 5}}>
            <Text style={styles.textspace}>170 ש״ח</Text>
              <Text>מע״מ</Text>
              
            </View>

          

            <View style={{marginBottom: 60}}></View>

            <View style={styles.horizontalLine} />

            <View style={{display: "flex", flexDirection: "row", justifyContent: "flex-end", alignItems: "flex-end", margin: 5}}>
            <Text style={styles.textspace}>1170 ₪</Text>
              <Text>סך הכל לתשלום</Text>
              
            </View>

            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() =>setModalVisible(!modalVisible) }
              >
              <Text style={styles.textStyle}>Hide Modal</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    {/* </View> */}

    
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FBF8FF",
    width: windowWidth,
    height: windowHeight,
    paddingBottom: 60,
  },
  dataContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  filerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal:windowWidth*0.05,
    marginBottom:30,
    zIndex:3
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    width: 330,
    height: 400,
    // margin: 20,
    // marginTop: 10,
    backgroundColor: 'white',
    borderRadius: 20,
    // padding: 35,
    // alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    // alignItems: "center",
    // justifyContent: "center",
   
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    width: 150
  },
  buttonOpen: {
    // backgroundColor: '#F194FF',
  },
  buttonClose: {
    // backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  LogoPurple: {
    width: 50,
    height: 50
  },
  download:{
    margin: 5,
    padding: 10
  },
  horizontalLine: {
    borderBottomColor: 'lightgrey',
    borderBottomWidth: 1,
    marginVertical: 10, 
    marginHorizontal:10
  },
  textspace:{
    marginRight: 30
  },
  
});
