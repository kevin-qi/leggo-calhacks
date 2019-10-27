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

		this.onChanged = this.onChanged.bind(this)

		this.state = {
	    	limit: 0,
	    	limitError: "",
	  	};
	}

	
	onChanged(text){
		let limit = text.replace(/[^0-9]/g, '');
		const { navigation } = this.props;

		const unique_key = JSON.stringify(navigation.getParam("unique_key"));
		const username = JSON.stringify(navigation.getParam("name"));
		const group_key = JSON.stringify(navigation.getParam("group_key"));
		
		if (limit > 0) {
		    this.setState({
		        limit: limit,
		        limitError: ""
		    });

		    firebase.database().ref('/groups/' + unique_key + "/" + username).set({
		    		"Drinks Limit" : this.state.limit
			})
			.then((snap) => {
				console.log('Drink limit set');
				navigation.navigate("Home", {
					name: username,
					unique_key: unique_key,
					group_key: group_key
				})
			})
			.catch((error) => {
				console.log(error)
			});
		} else {
			this.setState({ limitError: "Limit on drinks is not greater than 0"})
		}
	}
	render() {
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

			</View>
		);//{this.state.nameError}
		
	};
}

