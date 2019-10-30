import React, { Component } from 'react';
import { Alert, Button, View, Text } from 'react-native';
import { withNavigation } from 'react-navigation'

class GroupButton extends Component{
	constructor(props) {
		super(props);
	}

	render () {
		const {navigation} = this.props;

		return (
			<View style={{ 
			   flex: 1,
			   alignItems:'center',
			   justifyContent:'center'
			}}> 
				<Button 
					title = {this.props.button_name}
					onPress = {this.props.func}
				/>
			</View>
		);
	}
}

export default withNavigation(GroupButton);