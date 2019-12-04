import React, { Component } from 'react';
import { TextInput, Button, View, Text } from 'react-native';

import CreateGroupButton from '../components/create_group_button';
import GroupButton from '../components/group_button';
import GroupManager from '../utils/group_manager.js';
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
		this.error_func = this.error_func.bind(this)
	}


	error_func() {
		this.setState({error: "Invalid group key"});
	}


	render() {
		const { navigation } = this.props
 		const username = navigation.getParam("name");
 		const drink_limit = navigation.getParam("drink_limit");
 		const group_key = this.state.group_key;

 		const joinGroup = () => {
 			GroupManager.joinGroup(username, drink_limit, group_key, navigation.navigate, this.error_func);
 		}

		return (
			<View style={{ 
			   flex: 1,
			   alignItems:'center',
			   justifyContent:'space-around'
			}}>
				<View style={{ 
				   flex: 1,
				   alignItems:'center',
				   justifyContent:'center'
				}}>
					<GroupButton
						button_name="Scan QR Code"
						name={this.props.username}
						func={() => {navigation.navigate("QR", {
							name: username,
							drink_limit: drink_limit
						})}}
					/>
				</View>

				<View style={{flexDirection: 'row'}}>
				    <View style={{backgroundColor: '#B8FFF9', height: 1, flex: 1, alignSelf: 'center'}} />
				</View>
					
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

					<GroupButton 
						button_name="Join with key" 
						name={this.props.username} 
						func={joinGroup}
					/>
				</View>
				
			</View>
		);

	};
}