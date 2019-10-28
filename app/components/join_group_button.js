import React, { Component } from 'react';
import { Alert, Button, View, Text } from 'react-native';
import { withNavigation } from 'react-navigation'

class JoinGroupButton extends Component{


	render () {
		const {navigation} = this.props;

		return (
			<View style={{ 
			   flex: 1,
			   alignItems:'center',
			   justifyContent:'center'
			}}> 
				<Button 
					title = "Join group"
					onPress = {() => navigation.navigate("Join")}
				/>
			</View>
		);
	}
}

export default withNavigation(JoinGroupButton);