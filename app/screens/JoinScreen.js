import React, { Component } from 'react';
import { Button, View, Text } from 'react-native';

import IncrementDrinksButton from '../components/increment_drinks_button'
import CreateGroupButton from '../components/create_group_button'

export default class JoinScreen extends Component {
	static navigationOptions = {
		title: 'Home',
	};

	render() {
		return (
			< CreateGroupButton />
		);
		
	};
}