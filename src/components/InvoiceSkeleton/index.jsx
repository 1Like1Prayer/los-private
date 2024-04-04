import {Dimensions, I18nManager, View, Text, StyleSheet} from "react-native";
import React from "react";
import { LinearGradient } from 'expo-linear-gradient';
import {
	SkeletonContainer,
} from 'react-native-dynamic-skeletons';
import SvgDropDownOpen from "../../icons/DropDownOpenIcon";

const windowWidth = Dimensions.get("window").width;
const isRTL = I18nManager.isRTL;

const Gradient = (props) => <LinearGradient {...props} />;
const InvoiceSkeleton = () => {
	
	return(
		<View style={{
			width: '100%',
			justifyContent: 'center',
			alignItems: 'center',
		}}>
			<View style={styles.skeleton}>
				<View
				style={{
					flexDirection: isRTL ? 'row-reverse' : 'row',
					justifyContent: 'space-between',
				}}
			>
				<SvgDropDownOpen ColorFill="#6226CF"/>
				<View style={{
					flexDirection: 'row',
					justifyContent: !isRTL ? 'flex-end' : 'flex-start',
				}}>
					<SkeletonContainer
						isLoading={true}
						animationType="leftRight"
						duration={1000}
						colors={['#E0E0E0', '#dbd9d9']}
						Gradient={Gradient}
					>
						<View style={{ width: '55%', height: 30, borderRadius: 5, marginRight: isRTL ? 5 : 0 }}/>
					</SkeletonContainer>
					<SkeletonContainer
						isLoading={true}
						animationType="leftRight"
						duration={1000}
						colors={['#E0E0E0', '#dbd9d9']}
						Gradient={Gradient}
					>
						<View style={{ width: '15%', height: 30, borderRadius: 5, marginLeft: isRTL ? 0 : 5 }}/>
					</SkeletonContainer>
				</View>
			</View>
		</View>
			<View style={styles.skeleton}>
				<View
					style={{
						flexDirection: isRTL ? 'row-reverse' : 'row',
						justifyContent: 'space-between',
					}}
				>
					<SvgDropDownOpen ColorFill="#6226CF"/>
					<View style={{
						flexDirection: 'row',
						justifyContent: !isRTL ? 'flex-end' : 'flex-start',
					}}>
						<SkeletonContainer
							isLoading={true}
							animationType="leftRight"
							duration={1000}
							colors={['#E0E0E0', '#dbd9d9']}
							Gradient={Gradient}
						>
							<View style={{ width: '55%', height: 30, borderRadius: 5, marginRight: isRTL ? 5 : 0 }}/>
						</SkeletonContainer>
						<SkeletonContainer
							isLoading={true}
							animationType="leftRight"
							duration={1000}
							colors={['#E0E0E0', '#dbd9d9']}
							Gradient={Gradient}
						>
							<View style={{ width: '15%', height: 30, borderRadius: 5, marginLeft: isRTL ? 0 : 5 }}/>
						</SkeletonContainer>
					</View>
				</View>
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

