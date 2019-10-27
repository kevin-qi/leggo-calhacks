import React, { Component } from 'react';
import { Button, View, Text } from 'react-native';

import CreateGroupButton from '../components/create_group_button'

export default class RegisterGroupScreen extends Component {
	static navigationOptions = {
		title: 'Home',
	};

	render() {
		const { navigation } = this.props;
		const username = navigation.getParam('name', "Null");
		return (
			< CreateGroupButton name = {username}/>
		);
	};
}