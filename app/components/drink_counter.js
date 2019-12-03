import React, { Component } from 'react';
import { Alert, Button, View, Text } from 'react-native';

export default class Drink_Counter extends Component {

  render() {
    console.log(this.props.num_drinks)
    return(
      <>
        <Text style={{
          fontSize: 20,
          flex: 1,
          textAlign: 'center',
          fontWeight: 'bold',
          backgroundColor: 'white'
        }}>
        {'Drink Number:'}
        </Text>

        <Text style={{
          flex: 4,
          fontSize: 125,
          fontWeight: 'bold',
          textAlign: 'center',
          backgroundColor: 'white'
        }}>
        {this.props.num_drinks}
        </Text>
      </>
    )
  }
}
