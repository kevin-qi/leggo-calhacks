import React, { Component } from 'react';
import { View , Button , Text } from 'react-native';
import Swiper from 'react-native-swiper'

import Dashboard from '../components/dashboard';

import firebase from '../firebase_init.js';

export default class HomeScreen extends Component{
  constructor(props) {
    super(props);
    this.state = {
      group_data: null,
      page_name: null
    }
    this.sync = this.sync.bind(this);
    this.nextPage = this.nextPage.bind(this);
  }

  componentDidMount() {
    const {navigation} = this.props;
    this.unique_key = navigation.getParam('unique_key');
    this.group_key = navigation.getParam('group_key');
    this.setState({page_name: navigation.getParam('name')});

    
    firebase.database().ref('/groups/'+this.unique_key).on('value',
      (snap, context) => {
        this.sync(snap.val());
      }
    )
  }

  sync(data){
    /*<View style={{ 
         flex: 1,
         alignItems:'center',
         justifyContent:'center'
      }}>
        <Button 
          title = "Next page"
          onPress = {this.nextPage}
        />
        <Text>{"Group key: "+this.group_key}</Text>
        {dashboards}
      </View>*/
    console.log("Syncing group data")
    console.log(data);
    delete data["group_key"];
    this.setState({group_data: data});
  }

  nextPage(){
    var keys = Object.keys(this.state.group_data)
    if(keys.length > 1){
      console.log(keys);
      var index = keys.findIndex((key) => {return key == this.state.page_name;})
      console.log(index);
      var index = (index + 1) % keys.length;
      console.log(index);
      this.setState({page_name: keys[index]});
    }
  }

  render() {
    if(this.state.group_data != null && this.state.page_name != null){
      var keys = Object.keys(this.state.group_data);

      var dashboards = keys.map((key) => {
        return(<Dashboard 
          key = {key}
          visible = {true}
          username = {key}
          num_drinks = {this.state.group_data[key].Drinks}
          drinks_limit = {this.state.group_data[key]["Drinks Limit"]}
          unique_key = {this.unique_key}
          group_key= {this.group_key} />
        );
      });
      console.log(dashboards);
    } else {
      var dashboards = <Text>Loading</Text>;
    }
    console.log(this.group_key);
    return (
      <Swiper
        loop={false}
        showsPagination={true}
        index={1}>
        {dashboards}
      </Swiper>

    );
  }
}


