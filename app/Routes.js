import React, { Component } from "react";
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import Home from "./screens/Home";

const Navigator = createStackNavigator({
	Home : {
		screen: Home
	},
});

export default createAppContainer(Navigator)