import React, { Component } from 'react';
import { Button, View, Text } from 'react-native';
import { TextInput } from 'react-native';

export default class LimitScreen extends Component {
	/*static navigationOptions = {
		title: 'Home',
	};*/

	state = {
    	limit: 0,
    	limitError: "",
  	};

	onChanged(text){
		let limit = text.replace(/[^0-9]/g, ''),
		if (limit > 0) {
		    this.setState({
		        limit: limit,
		    });
		} else {
			this.setState({ limitError: "Limit on drinks is not greater than 0"})
		}
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
				{!!this.state.limitError && (
  					<Text style={{color: red}}>{this.state.nameError}</Text>
				)}	    	

			</View>
		);
		
	};
}

