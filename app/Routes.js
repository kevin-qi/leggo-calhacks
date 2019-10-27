import React, { Component } from "react";
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import Home from "./screens/Home";
import LimitForm from "./screen/LimitForm"

const Navigator = createStackNavigator({
	Home : {
		screen: Home
	},
	LimitForm : {
		screen: LimitForm
	}
});

export default createAppContainer(Navigator)