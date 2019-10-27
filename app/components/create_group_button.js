import React, { Component } from 'react';
import { Alert, Button, View, Text } from 'react-native';
import firebase from '../firebase_init.js'

export default class CreateGroupButton extends Component{
	constructor(props) {
		super(props);
		//this.addDrink = this.addDrink.bind(this)
	}

	generateGroup() {
		firebase.database().ref('/groups').push({
			"Kevin": {
				"Drinks": 0,
				"Drinks Limit": 0
			}
		});
	}

	render () {
		return (
			<View style={{ 
			   flex: 1,
			   alignItems:'center',
			   justifyContent:'center'
			}}> 
				<Button 
					title = "Add Drink"
					onPress = {this.generateGroup}
				/>
			</View>
		);
	}
}