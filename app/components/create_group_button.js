import React, { Component } from 'react';
import { Alert, Button, View, Text } from 'react-native';
import firebase from '../firebase_init.js';
import { withNavigation } from 'react-navigation'

class CreateGroupButton extends Component{

	constructor(props){
		super(props);
		this.generateGroup = this.generateGroup.bind(this)
	}

	generateGroup() {
		const username = this.props.name;
		const {navigate} = this.props.navigation;
		firebase.database().ref('/groups').push({
			[username]: {
				"Drinks": 0,
				"Drinks Limit": 0
			}
		})
		.then((snap) => {
			console.log('Group creation successful');
			const key  = snap.key;
			navigate("Limit", {
				name: username,
				unique_key: key,
				group_key: key.slice(key.length-6,key.length)
			})
		})
		.catch((error) => {
			console.log(error)
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
					title = "Create group"
					onPress = {this.generateGroup}
				/>
			</View>
		);
	}
}

export default withNavigation(CreateGroupButton);