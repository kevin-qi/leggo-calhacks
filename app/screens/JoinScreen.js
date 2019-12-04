import React, { Component } from 'react';
import { TextInput, Button, View, Text } from 'react-native';

import CreateGroupButton from '../components/create_group_button'
import GroupButton from '../components/group_button';

import firebase from '../firebase_init.js';


export default class JoinScreen extends Component {
	static navigationOptions = {
		title: 'Join a group',
	};

	constructor(props) {
		super(props)
		this.state = {
			group_key : "",
			error: ""
		}
		this.joinGroup = this.joinGroup.bind(this)
	}

	joinGroup() {
		const { navigation } = this.props
 		const { navigate } = this.props.navigation;

 		const username = navigation.getParam("name");
 		const drink_limit = navigation.getParam("drink_limit");
 		const group_key = this.state.group_key;
		
		var ref = firebase.database().ref('/groups');
		ref.orderByChild("group_key")
		.equalTo(group_key.toLowerCase())
		.once("value", (snap) => {
			console.log(snap);
			console.log(group_key);
			if(snap.val() == null){
				this.setState({error: "Invalid group key"})
				return;
			}
			const key  = Object.keys(snap.val())[0];
			console.log(key);

			firebase.database().ref('/groups/' + key + "/" + username).update({
	    		"Drinks Limit" : drink_limit,
	    		"Drinks" : 0
			})
			.then((snap) => {
				console.log('Drink limit set');
				navigation.navigate("Home", {
					drinks_limit: drink_limit,
					unique_key: key,
		    		name: username,
		    		group_key: group_key});
			})
			.catch((error) => {
				console.log(error)
			});
		});
	}

	render() {
		const {navigate} = this.props.navigation;

		return (
			<View style={{ 
			   flex: 1,
			   alignItems:'center',
			   justifyContent:'center'
			}}>
				<TextInput
					style = {{height: 40}}
					placeholder = "Enter group key"
					onChangeText = {(str) => this.setState({group_key: str})}
					//value = this.state.text
				/>

				<Text style={{color:'red'}}>{this.state.error}</Text>

				< GroupButton 
					button_name="Join group" 
					name={this.props.username} 
					func={this.joinGroup} />
			</View>
		);

	};
}