import React, { Component } from 'react';
import { TextInput, Button, View, Text } from 'react-native';

import CreateGroupButton from '../components/create_group_button'

export default class RegisterNameScreen extends Component {
	constructor(props) {
		super(props)
		this.onChanged = this.onChanged.bind(this);
		this.state = {
	    	limit: 0,
	    	limitError: "",
	    	name : ""
	  	};
	}

	onChanged(text){
		let limit = text.replace(/[^0-9]/g, '');

		if (limit > 0) {
		    this.setState({
		        limit: limit,
		        limitError: ""
		    });
		    
		} else {
			this.setState({ limitError: "Drink limit must be positive"})
		}
	}

	render() {
		const {navigate} = this.props.navigation;

		const SmartButton = () => {
			if(this.state.name == "" || this.state.limit <= 0){
				return (<Button
					title = "Ok"
					disabled
					onPress = {() => {navigate('RegisterGroup', 
								{name: this.state.name,
								 drink_limit: this.state.limit})}}
					/>)
			} else {
				return (<Button
					title = "Ok"
					onPress = {() => {navigate('RegisterGroup', 
								{name: this.state.name,
								 drink_limit: this.state.limit})}}
					/>)
			}
		}

		return (
			<View style={{ 
			   flex: 1,
			   alignItems:'center',
			   justifyContent:'center'
			}}>
				<TextInput
					style = {{height: 40}}
					placeholder = "Enter your name"
					onChangeText = {(str) => this.setState({name: str})}
					//value = this.state.text
				/>

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
				
				<SmartButton />
				
			</View>
		);
	};
}