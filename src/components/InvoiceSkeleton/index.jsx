import SkeletonLoader from "expo-skeleton-loader";
import {Dimensions, I18nManager, View, Text, StyleSheet} from "react-native";
import React from "react";
import SvgDropDownOpen from "../../icons/DropDownOpenIcon";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get('window').height;
const isRTL = I18nManager.isRTL;

const InvoiceSkeleton = () => {
	
	return(
		<View style={{
			width: '100%',
			justifyContent: 'center',
			alignItems: 'center',
		}}>
			<View style={styles.skeleton}>
				<SkeletonLoader
					boneColor='#E0E0E0'
					highlightColor='#dbd9d9'
					duration={800}
				>
					<SkeletonLoader.Container
						style={{
							flexDirection: isRTL ? 'row-reverse' : 'row',
							justifyContent: 'space-between',
						}}
					>
						<SvgDropDownOpen ColorFill="#6226CF"/>
						<SkeletonLoader.Container style={{
							width: '80%',
							flexDirection: 'row',
							justifyContent: isRTL ? 'flex-start' : 'flex-end',
						}}>
							<SkeletonLoader.Item
								style={{ width: '35%', height: 30, borderRadius: 5, marginRight: isRTL ? 0 : 5 }}
							/>
							<SkeletonLoader.Item
								style={{ width: '15%', height: 30, borderRadius: 5, marginRight: isRTL ? 0 : 5 }}
							/>
						</SkeletonLoader.Container>
						
					</SkeletonLoader.Container>
				</SkeletonLoader>
			</View>
			<View style={styles.skeleton}>
				<SkeletonLoader
					boneColor='#E0E0E0'
					highlightColor='#dbd9d9'
					duration={800}
				>
					<SkeletonLoader.Container
						style={{
							flexDirection: isRTL ? 'row-reverse' : 'row',
							justifyContent: 'space-between',
						}}
					>
						<SvgDropDownOpen ColorFill="#6226CF"/>
						<SkeletonLoader.Container style={{
							width: '80%',
							flexDirection: 'row',
							justifyContent: isRTL ? 'flex-start' : 'flex-end',
						}}>
							<SkeletonLoader.Item
								style={{ width: '35%', height: 30, borderRadius: 5, marginRight: isRTL ? 0 : 5 }}
							/>
							<SkeletonLoader.Item
								style={{ width: '15%', height: 30, borderRadius: 5, marginRight: isRTL ? 0 : 5 }}
							/>
						</SkeletonLoader.Container>
					
					</SkeletonLoader.Container>
				</SkeletonLoader>
			</View>
		</View>
	)
};

const styles = StyleSheet.create({
	skeleton: {
		flexDirection: "column",
		backgroundColor: "#fff",
		width: windowWidth * 0.9,
		padding: 15,
		marginBottom: 16,
		borderRadius: 6,
		borderWidth: 1,
		borderColor: "rgba(159, 159, 159, 0.5)",
	}
})

export default InvoiceSkeleton;

