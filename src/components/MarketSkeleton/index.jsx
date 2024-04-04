import SkeletonLoader from "expo-skeleton-loader";
import {Dimensions, I18nManager, View, Text, StyleSheet} from "react-native";
import React, {useId} from "react";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get('window').height;
const isRTL = I18nManager.isRTL;

const MarketSkeleton = ({textCounter}) => {
	const id = useId();
	const array = new Array(textCounter || 3);
	array.fill(0);
	
	return(
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
				<SkeletonLoader
					boneColor='#E0E0E0'
					highlightColor='#dbd9d9'
					duration={800}
				>
					<SkeletonLoader.Container
						style={{
							flexDirection: isRTL ? 'row-reverse' : 'row',
							alignItems: "center",
							justifyContent: "space-between",
						}}
					>
						<SkeletonLoader.Item
							style={{ width: 30, height: 30, borderRadius: 5 }}
						/>
						<SkeletonLoader.Item
							style={{ width: '50%', height: 30, borderRadius: 5 }}
						/>
					</SkeletonLoader.Container>
					<View style={styles.lineGray}/>
					<SkeletonLoader.Container>
						{array.map((_, index) => {
							return (
								<SkeletonLoader.Item
									key={`${id}-${index}`}
									style={{ width: '100%', height: 30, borderRadius: 5, marginBottom: 5, }}
								/>
							)
						})}
					</SkeletonLoader.Container>
				</SkeletonLoader>
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

