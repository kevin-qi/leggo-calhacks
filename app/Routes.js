import React, { Component } from "react";
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import HomeScreen from "./screens/HomeScreen";
import RegisterNameScreen from "./screens/RegisterNameScreen";
import RegisterGroupScreen from "./screens/RegisterGroupScreen";
import JoinScreen from "./screens/JoinScreen";
import LimitScreen from "./screens/LimitScreen";
import QRScreen from "./screens/QRScreen";

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

	Limit : {
		screen: LimitScreen
	},

	QR : {
		screen: QRScreen
	}
},
{
	initialRouteName: "RegisterName"
}
);

export default createAppContainer(Navigator)