import React, { Component } from 'react';
import { TextInput, Button, View, Text, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

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
					title = "Start drinking! (Safely)"
					disabled
					onPress = {() => {navigate('RegisterGroup', 
								{name: this.state.name,
								 drink_limit: this.state.limit})}}
					/>)
			} else {
				return (<Button
					title = "Start drinking! (Safely)"
					color = '#40DDD2'
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
			   justifyContent:'center',
			   backgroundColor: '#F1FFFE'
			}}>
				<View style={{ 
				   flex: 1,
				   alignItems:'center',
				   justifyContent:'center'
				}}>
				</View>

				<View style={{ 
				   flex: 2,
				   alignItems:'center',
				   justifyContent:'space-around'
				}}>

					<TextInput
						style = {styles.textInput}
						placeholder = "Enter your name"
						onChangeText = {(str) => this.setState({name: str})}
						//value = this.state.text
					/>
					

					<TextInput 
				       style={styles.textInput}
					   keyboardType='numeric'
					   placeholder = "Enter your drink limit"
					   onEndEditing = {(text)=> this.onChanged(this.state.limit)}
					   onChangeText = {(text)=> this.setState({limit: text})}
					   maxLength={10}  //setting limit of input
					/>

					{!!this.state.limitError && (
	  					<Text style={{color: 'black'}}>"Please enter a valid drink limit"</Text>
					)}

					<SmartButton />
				</View>
				

				<View style={{ 
				   flex: 1,
				   alignItems:'center',
				   justifyContent:'center'
				}}>
				</View>
				
				
				
			</View>
		);
	};
}

const styles = StyleSheet.create({

  textInput: {
	height: 40,
	paddingLeft: 0,
	paddingRight: 0,
	borderBottomWidth: 1,
	borderBottomColor: '#B8FFF9',
  }

});