import React, { Component } from 'react';
import { Text } from 'react-native';

import Dashboard from '../components/dashboard';

import firebase from '../firebase_init.js';

export default class HomeScreen extends Component{
  constructor(props) {
    super(props);
    this.state = {
      group_data: null
    }
    this.sync = this.sync.bind(this);
  }

  componentDidMount() {
    const {navigation} = this.props;
    this.unique_key = navigation.getParam('unique_key');
    this.group_key = navigation.getParam('group_key');


    
    firebase.database().ref('/groups/'+this.unique_key).on('value',
      (snap, context) => {
        this.sync(snap.val());
      }
    )
  }

  sync(data){
    console.log("Syncing group data")
    console.log(data);
    delete data["group_key"];
    this.setState({group_data: data});
  }

  /*
*/

  render() {

    if(this.state.group_data != null){
      console.log(Object.keys(this.state.group_data));
      dashboards = Object.keys(this.state.group_data).map((key) => {
        return(<Dashboard key = {key}
          username = {key}
          num_drinks = {this.state.group_data[key].Drinks}
          drinks_limit = {this.state.group_data[key]["Drinks Limit"]}
          unique_key = {this.unique_key}
          group_key= {this.group_key}
        />);
      });
      console.log(dashboards);
    } else {
      dashboards = <Text>Loading</Text>;
    }

    return (
      dashboards
    );
  }
}


