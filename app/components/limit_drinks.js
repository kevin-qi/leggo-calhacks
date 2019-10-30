import React, { Component } from 'react';
import { View, Text } from 'react-native';

export default class Limit_Drinks extends Component {
  render() {
    return(
      <Text style={{
        fontSize: 20,
        flex: 1,
        fontWeight: 'bold',
        textAlign: 'center',
        backgroundColor:'white'
      }}>
      {'Drink limit: '+this.props.limit}
      </Text>
    )
  }
}