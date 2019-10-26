import React, { Component } from 'react';
import { Button, View, Text } from 'react-native';

import IncrementDrinksButton from '../components/increment_drinks_button'

export default class Home extends Component {
	static navigationOptions = {
		title: 'Home',
	};

	render() {
		return (
			< IncrementDrinksButton />
		);
		
	};
}