import React, { Component } from 'react';
import { Button, View, Text } from 'react-native';

import CreateGroupButton from '../components/create_group_button';
import JoinGroupButton from '../components/join_group_button';
import GroupButton from '../components/group_button';
import firebase from '../firebase_init.js';


export default class RegisterGroupScreen extends Component {
	constructor(props){
		super(props);
		this.generateGroup = this.generateGroup.bind(this);

	}

	static navigationOptions = {
		title: 'Home',
	};

	generateGroup() {
		const username = this.props.navigation.getParam('name');
		const {navigate} = this.props.navigation;
		var db_ref = firebase.database();
		
		db_ref.ref('/groups').push({
			[username]: {
				"Drinks": 0,
				"Drinks Limit": 0
			}
		})
		.then((snap) => {
			console.log(snap);
			const key  = snap.key;
			const group_key = key.slice(key.length-6,key.length)
			db_ref.ref("/groups/"+key).update({
				"group_key": group_key
			})
			.then((snap) => {
				console.log('Group creation successful');

				navigate("Limit", {
					name: username,
					unique_key: key,
					group_key: group_key
				})
			})
		})
		.catch((error) => {
			console.log(error)
		});
	}

	render() {
		const { navigation } = this.props;
		const username = navigation.getParam('name', "Null");
		
		return (
			<View style={{ 
			   flex: 1,
			   alignItems:'center',
			   justifyContent:'center'
			}}>
				< GroupButton button_name="Create group" name={username} func={this.generateGroup}/>
				< GroupButton button_name="Join group" name={username} func={() => navigation.navigate("Join", {name: username})} />
			</View>
			
		);
	};
}