import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  Dimensions,
} from "react-native";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";
import SvgGoogleIcon from "../../icons/GoogleIcon";

const graphStyle = {
  marginVertical: 8,
  borderRadius: 0,
  marginTop:20,
};

const chartConfig = {
  backgroundColor: "#fff",
  backgroundGradientFrom: "#fff",
  backgroundGradientTo: "#fff",
  decimalPlaces: 2,
  color: (opacity = 0) => "#6226CF",
  labelColor: (opacity = 1) => "#72777B",
  style: {
    borderRadius: 16,
  },
};

const data = {
  labels: ["יָנוּאָר", "פברואר", "לְקַלְקֵל", "אפריל", "מאי", "יוני", "יולי"],
  datasets: [
    {
      data: [100, 200, 600, 300, 1000, 400, 800],
    },
  ],
};

const calculateHeight = (dataLength) => {
  return dataLength * 40; // Adjust this value as needed
};
const reverseDataOrder = (data) => {
  // Reverse the order of data
  const reversedData = { ...data };
  reversedData.datasets[0].data = reversedData.datasets[0].data.reverse();
  reversedData.labels = reversedData.labels.reverse();
  return reversedData;
};

const ChartSection = () => {
  const [isVisible, setIsVisible] = useState(true);
  const reversedData = reverseDataOrder(data);

  const height = calculateHeight(data.labels.length);
  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <View>
      <View style={styles.container}>
        <Pressable
          onPress={toggleVisibility}
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottomWidth: !isVisible ? 1 : 0,
            paddingVertical: 20,
            borderRadius: 10,
            borderColor: "#9F9F9F33",
          }}
        >
          <Image
            source={require("../../../assets/images/dropdownIcon.png")}
            style={{
              transform: [{ rotate: isVisible ? "180deg" : "0deg" }],
            }}
          />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 10,
            }}
          >
            <Text style={[styles.smallText, { color: "#000" }]}>
              קמפיין ממומן
            </Text>
            <SvgGoogleIcon style={styles.icon} />
          </View>
        </Pressable>

        {!isVisible && (
          <View>
            <View style={styles.rowContainer}>
              <View
                style={[
                  styles.itemContainer,
                  { alignItems: "center", justifyContent: "flex-end", gap: 20 },
                ]}
              >
                <Text style={styles.text}>
                  <Image
                    source={require("../../../assets/images/CategoryIcon.png")}
                  />{" "}
                  סנן לפי קמפיין
                </Text>
              </View>
              <View
                style={[
                  styles.itemContainer,
                  { alignItems: "center", justifyContent: "flex-end", gap: 20 },
                ]}
              >
                <Text style={styles.text}>
                  <Image
                    source={require("../../../assets/images/CategoryIcon.png")}
                  />{" "}
                  סינון לפי זמן
                </Text>
              </View>
            </View>
            <View style={[styles.rowContainer, { marginTop: 10 }]}>
              <View style={styles.itemContainer}>
                <Image source={require("../../../assets/images/Growth.png")} />
                <View style={styles.textContainer}>
                  <Text style={styles.largeText}>0% </Text>
                  <Text style={styles.smallText}>המרות</Text>
                </View>
              </View>
              <View style={styles.itemContainer}>
                <Image
                  source={require("../../../assets/images/DollarBuild.png")}
                />
                <View style={styles.textContainer}>
                  <Text style={styles.largeText}>0 </Text>
                  <Text style={styles.smallText}>הכנסות</Text>
                </View>
              </View>
              <View style={styles.itemContainer}>
                <Image
                  source={require("../../../assets/images/MouseArrowClick.png")}
                />
                <View style={styles.textContainer}>
                  <Text style={styles.largeText}>34.44</Text>
                  <Text style={styles.smallText}>קליקים</Text>
                </View>
              </View>
              <View style={styles.itemContainer}>
                <Image
                  source={require("../../../assets/images/CallIcon.png")}
                />
                <View style={styles.textContainer}>
                  <Text style={styles.largeText}>8807</Text>
                  <Text style={styles.smallText}>טלפונים</Text>
                </View>
              </View>
            </View>
            <View style={styles.centerLink}>
              <Text
                style={[
                  styles.smallText,
                  { color: "#6226CF", textDecorationLine: "underline" },
                ]}
              >
                הצג עוד נתונים
              </Text>
            </View>
            <View>
              <BarChart
                style={graphStyle}
                data={reversedData}
                width={365}
                height={height}
                chartConfig={chartConfig}
                verticalLabelRotation={30}
                contentInset={{ right: 30 }} // Adjust this value to move yAxisLabel to the right
              />
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "auto",
    width: "100%",
    backgroundColor: "#fff",
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 7 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 10,
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    gap: 10,
    flexWrap: "wrap",
    marginTop: 20,
    padding:10,
  },
  itemContainer: {
    height: "auto",
    width: "48%",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 5,
    borderWidth: 1,
    borderColor: "#9F9F9F80",
    borderRadius: 8,
    alignItems: "flex-end",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  textContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 18,
    color: "#9F9F9F",
  },
  largeText: {
    fontSize: 28,
    color: "#000",
    fontWeight: "700",
  },
  smallText: {
    fontSize: 18,
    color: "#9F9F9F",
  },
  centerLink: {
    marginTop: "10%",
    width: "100%",
    height: "auto",
    alignItems: "center",
  },
  icon: {
    marginLeft: 8,
  },
});

export default ChartSection;