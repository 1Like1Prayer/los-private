import { Dimensions, I18nManager, View } from "react-native";
import React, { useId } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { SkeletonContainer } from "react-native-dynamic-skeletons";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const isRTL = I18nManager.isRTL;

const Gradient = (props) => <LinearGradient {...props} />;
const HomeSkeleton = ({ textCounter }) => {
  const id = useId();
  return (
    <View
      style={{
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View
        style={{
          flexDirection: "column",
          width: windowWidth * 0.9107,
          backgroundColor: "#fff",
          marginBottom: windowHeight * 0.019,
          elevation: 5,
          padding: windowWidth * 0.0467,
          shadowColor: "rgba(0, 0, 0, 0.1)",
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 1,
          shadowRadius: 24,
          borderRadius: 10,
        }}
      >
        <View
          style={{
            height: 70,
            flexDirection: isRTL ? "row-reverse" : "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <SkeletonContainer
            isLoading={true}
            animationType="leftRight"
            duration={1000}
            colors={["#E0E0E0", "#dbd9d9"]}
            Gradient={Gradient}
          >
            <View
              style={{
                height: 30,
                width: 30,
                borderRadius: 5,
              }}
            />
          </SkeletonContainer>
          <SkeletonContainer
            isLoading={true}
            animationType="leftRight"
            duration={1000}
            colors={["#E0E0E0", "#dbd9d9"]}
            Gradient={Gradient}
          >
            <View style={{ width: "50%", height: 30, borderRadius: 5 }} />
          </SkeletonContainer>
        </View>
      </View>
    </View>
  );
};

export default HomeSkeleton;
