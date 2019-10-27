import React, { Component } from 'react';
import { Button, View, Text } from 'react-native';
import { TextInput } from 'react-native';

export default class Form extends Component {
	/*static navigationOptions = {
		title: 'Home',
	};*/
	onChanged(text){
	    this.setState({
	        mobile: text.replace(/[^0-9]/g, ''),
	    });

	    // TODO : change submission adds this to firebase
	}
	render() {
		return (
			<View style={styles.container}>
			     <Text style={styles.headerText}>
			     	Please enter your limit.
        		</Text>

				<TextInput 
				   style={styles.textInput}
				   keyboardType='numeric'
				   onChangeText={(text)=> this.onChanged(text)}
				   value={this.state.myNumber}
				   maxLength={10}  //setting limit of input
				/>      	

			</View>
		);
		
	};
}

