import React, { Component } from 'react';
import { TextInput, Button, View, Text } from 'react-native';

import CreateGroupButton from '../components/create_group_button'
import firebase from '../firebase_init.js';


export default class JoinScreen extends Component {
	static navigationOptions = {
		title: 'Home',
	};

	constructor(props) {
		super(props)
		this.state = {
			group_key : ""
		}
		this.joinGroup = this.joinGroup.bind(this)
	}

	joinGroup() {
		const { navigation } = this.props
 		const { navigate } = this.props.navigation;

 		const username = navigation.getParam("name");
 		const group_key = this.state.group_key;

 		
		
		var ref = firebase.database().ref('/groups');
		ref.orderByChild("group_key")
		.equalTo(group_key)
		.on("value", (snap) => {
			console.log(group_key);
			const key  = snap.val();
			console.log(snap);
			console.log(key);
			navigate("Limit", {
				name: username,
				unique_key: key,
				group_key: group_key
			})
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
					placeholder = "Enter your name"
					onChangeText = {(str) => this.setState({group_key: str})}
					//value = this.state.text
				/>

				<Button 
					title = "Create group"
					onPress = {this.joinGroup}
				/>
			</View>
		);
	};
}