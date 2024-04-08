import {Dimensions, I18nManager, StyleSheet, View} from "react-native";
import React, {useId} from "react";
import {LinearGradient} from 'expo-linear-gradient';
import {SkeletonContainer,} from 'react-native-dynamic-skeletons';

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get('window').height;
const isRTL = I18nManager.isRTL;

const Gradient = (props) => <LinearGradient {...props} />;
const MarketSkeleton = ({textCounter}) => {
  const id = useId();
  const array = new Array(textCounter || 3);
  array.fill(0);
  
  return (
    <View style={{
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <View style={{
        flexDirection: 'column',
        width: windowWidth * 0.9107,
        backgroundColor: '#fff',
        marginBottom: windowHeight * 0.019,
        elevation: 5,
        padding: windowWidth * 0.0467,
        shadowColor: 'rgba(0, 0, 0, 0.1)',
        shadowOffset: {width: 0, height: 0},
        shadowOpacity: 1,
        shadowRadius: 24,
        borderRadius: 10,
      }}>
        <View style={{
          flexDirection: isRTL ? 'row-reverse' : 'row',
          alignItems: "center",
          justifyContent: "space-between",
        }}>
          <SkeletonContainer
            isLoading={true}
            animationType="leftRight"
            duration={1000}
            colors={['#E0E0E0', '#dbd9d9']}
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
            colors={['#E0E0E0', '#dbd9d9']}
            Gradient={Gradient}
          >
            <View
              style={{width: '50%', height: 30, borderRadius: 5}}
            />
          </SkeletonContainer>
        </View>
        <View style={styles.lineGray}/>
        <View>
          <SkeletonContainer
            isLoading={true}
            animationType="leftRight"
            duration={1000}
            colors={['#E0E0E0', '#dbd9d9']}
            Gradient={Gradient}
          >
            {array.map((_, index) => {
              return (
                <View
                  key={`${id}-${index}`}
                  style={{width: '100%', height: 30, borderRadius: 5, marginBottom: 5,}}
                />
              )
            })}
          </SkeletonContainer>
        </View>
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  lineGray: {
    height: 1,
    width: '100%',
    backgroundColor: '#9F9F9F33',
    marginVertical: windowHeight * 0.0215,
  },
});

export default MarketSkeleton;

