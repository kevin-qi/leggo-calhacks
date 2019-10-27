import React, { Component } from 'react';
import { Button, View, Text } from 'react-native';

import CreateGroupButton from '../components/create_group_button'

export default class HomeScreen extends Component {
	static navigationOptions = {
		title: 'Home',
	};

	render() {
		const { navigation } = this.props
		const name = navigation.getParam("name");
		const group_key = navigation.getParam("group_key");
		const unique_key = navigation.getParam("unique_key");

		return (
			<View style={{ 
			   flex: 1,
			   alignItems:'center',
			   justifyContent:'center'
			}}>
				<Text>
					{name} {"\n"} {group_key} {"\n"} {unique_key}
				</Text>
			</View>
		);
		
	};
}