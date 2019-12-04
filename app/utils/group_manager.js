import React, { Component } from 'react';
import { Alert, Button, View, Text } from 'react-native';

import firebase from '../firebase_init.js';

class GroupManager{
	static joinGroup(name, drink_limit, group_key, navigate, err_func) {
 		const username = name
		
		var ref = firebase.database().ref('/groups');
		ref.orderByChild("group_key")
		.equalTo(group_key.toLowerCase())
		.once("value", (snap) => {
			console.log(snap);
			console.log(group_key);
			if(snap == null || snap.val() == null){
				err_func();
			} else {
				const key  = Object.keys(snap.val())[0];

				firebase.database().ref('/groups/' + key + "/" + username).update({
		    		"Drinks Limit" : drink_limit,
		    		"Drinks" : 0
				})
				.then((snap) => {
					console.log("group_manager unique key: "+ key)
					navigate("Home", 
	 					{
							drinks_limit: drink_limit,
							unique_key: key,
				    		name: username,
				    		group_key: group_key
				    	}
		    		);
				})
				.catch((error) => {
					console.log(error)
					return error
				});
			}				
		});
	}
}

export default GroupManager;