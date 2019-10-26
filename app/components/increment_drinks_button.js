import React, { Component } from 'react';
import { Alert, Button, View, Text } from 'react-native';

export default class IncrementDrinksButton extends Component{
	render () {
		return (
			<View style={{ 
			   flex: 1,
			   alignItems:'center',
			   justifyContent:'center'
			}}> 
				<Button 
					title = "Add Drink"
					onPress = {() => Alert.alert("Drink added")}
				/>
			</View>
		);
	}
}