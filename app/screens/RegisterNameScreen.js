import React, { Component } from 'react';
import { TextInput, Button, View, Text } from 'react-native';

import CreateGroupButton from '../components/create_group_button'

export default class RegisterNameScreen extends Component {
	constructor(props) {
		super(props)
		this.state = {
			name : ""
		}
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
					onChangeText = {(str) => this.setState({name: str})}
					//value = this.state.text
				/>

				<Button
					title = "Ok"
					onPress = {() => navigate('RegisterGroup', {name: this.state.name})}
				/>
			</View>
		);
	};
}