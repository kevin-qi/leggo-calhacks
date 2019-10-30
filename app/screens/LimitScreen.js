import React, { Component } from 'react';
import { Button, View, Text } from 'react-native';
import { TextInput } from 'react-native';
import firebase from '../firebase_init.js';

export default class LimitScreen extends Component {
	/*static navigationOptions = {
		title: 'Home',
	};*/

	// props = {name, group_key, unique_key}
	constructor(props){
		super(props);

		this.onChanged = this.onChanged.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.state = {
	    	limit: 0,
	    	limitError: "",
	  	};
	}

	
	onChanged(text){
		let limit = text.replace(/[^0-9]/g, '');
		const { navigation } = this.props;

		const unique_key = navigation.getParam("unique_key");
		const username = navigation.getParam("name");
		const group_key = navigation.getParam("group_key");
		
		if (limit > 0) {
		    this.setState({
		        limit: limit,
		        limitError: ""
		    });
		    
		} else {
			this.setState({ limitError: "Limit on drinks is not greater than 0"})
		}
	}

	onSubmit() {
		const { navigation } = this.props;
		const unique_key = navigation.getParam("unique_key");
		const username = navigation.getParam("name");
		const group_key = navigation.getParam("group_key");

		const drinks_limit = this.state.limit;

		console.log("Setting limit");

	    firebase.database().ref('/groups/' + unique_key + "/" + username).update({
	    		"Drinks Limit" : parseInt(this.state.limit),
	    		"Drinks" : 0
		})
		.then((snap) => {
			console.log('Drink limit set');
			navigation.navigate("Home", {
				drinks_limit: drinks_limit,
				unique_key: unique_key,
	    		name: username,
	    		group_key: group_key});
		})
		.catch((error) => {
			console.log(error)
		});
	}

	render() {
		const { navigation } = this.props;
		const unique_key = navigation.getParam("unique_key");
		const username = navigation.getParam("name");
		const group_key = navigation.getParam("group_key");

		const drinks_limit = this.state.limit;
		return (
			<View style={{ 
			   flex: 1,
			   alignItems:'center',
			   justifyContent:'center'
			}}>
			    <TextInput 
			       style={{height: 40}}
				   keyboardType='numeric'
				   placeholder = "Enter your drink limit"
				   onEndEditing = {(text)=> this.onChanged(this.state.limit)}
				   onChangeText = {(text)=> this.setState({limit: text})}
				   maxLength={10}  //setting limit of input
				/>

				{!!this.state.limitError && (
  					<Text style={{color: 'red'}}>"ERROR"</Text>
				)}

				<Button
					title="Ok"
					onPress={this.onSubmit}
				/>   	

			</View>
		);//{this.state.nameError}
		
	};
}

