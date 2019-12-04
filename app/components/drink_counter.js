import React, { Component } from 'react';
import { Alert, Button, View, Text } from 'react-native';
import Swiper from 'react-native-swiper';

export default class DrinkCounter extends Component {

  render() {
    var style= {
          flex: 5,
          fontSize: 125,
          fontWeight: 'bold',
          textAlign: 'center',
          justifyContent: 'center',
          color: 'black'
        }
    console.log(this.props.num_drinks)
    console.log(this.props.drink_limit)
    if(this.props.num_drinks>=this.props.drink_limit){
      
      style={
          flex: 5,
          fontSize: 125,
          fontWeight: 'bold',
          textAlign: 'center',
          justifyContent: 'center',
          color: 'red'
        }
    };
    console.log(style)
    return(
      <Text style={style}>{this.props.num_drinks}</Text>
    )
  }
}
