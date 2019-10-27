import React, { Component } from "react";
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import HomeScreen from "./screens/HomeScreen";
import RegisterNameScreen from "./screens/RegisterNameScreen";
import RegisterGroupScreen from "./screens/RegisterGroupScreen";
import JoinScreen from "./screens/JoinScreen";

const Navigator = createStackNavigator({
	Home : {
		screen: HomeScreen
	},

	RegisterName : {
		screen: RegisterNameScreen
	},

	RegisterGroup : {
		screen: RegisterGroupScreen
	},

	Join : {
		screen: JoinScreen
	},
},
{
	initialRouteName: "RegisterName"
}
);

export default createAppContainer(Navigator)