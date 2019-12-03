import React, { Component } from 'react';
import { Alert, Button, View, Text } from 'react-native';

class GroupButton extends Component{
	render () {
		return (
			<Button 
				title = {this.props.button_name}
				color = '#40DDD2'
				onPress = {this.props.func}
			/>
		);
	}
}

export default GroupButton;