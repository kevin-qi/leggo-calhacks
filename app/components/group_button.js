import React, { Component } from 'react';
import { Alert, Button, View, Text } from 'react-native';

class GroupButton extends Component{
	render () {
		return (
			<View style={{ 
			   flex: 1,
			   alignItems:'center',
			   justifyContent:'center'
			}}> 
				<Button 
					title = {this.props.button_name}
					color = '#40DDD2'
					onPress = {this.props.func}
				/>
			</View>
		);
	}
}

export default GroupButton;