import React, { Component } from 'react';

import Modal from 'react-native-modalbox';
import Limit_Drinks from './limit_drinks'
import Drink_Counter from './drink_counter'

import {
  Text,
  Button,
  StyleSheet,
  ScrollView,
  View,
  Dimensions,
  TextInput
} from 'react-native';

import firebase from '../firebase_init.js';

var screen = Dimensions.get('window');

export default class Dashboard extends Component{
	/*
		props:
			name
			num_drinks
			drink_limit
			unique_key
			group_key
	*/

  constructor() {
    super();
    this.state = {
      isOpen: false,
      isDisabled: false,
      sliderValue: 0.3,
    };

    this.addDrink = this.addDrink.bind(this);
    this.undoDrink = this.undoDrink.bind(this);
    this.syncState = this.syncState.bind(this);
    this.resetDrink = this.resetDrink.bind(this);
  }

  componentDidMount() {
    this.unique_key = this.props.unique_key;
    this.username = this.props.username;
    this.group_key = this.props.group_key;
  }

  onClose() {
    console.log('Modal just closed');
  }

  onOpen() {
    console.log('Modal just opened');
  }

  onClosingState(state) {
    console.log('the open/close of the swipeToClose just changed');
  }

  addDrink() {
    if(this.props.num_drinks >= this.props.drinks_limit){
      this.refs.add_modal_failed.open();
    }
    else {
      this.syncState(this.props.num_drinks + 1);      
      console.log("Updated state");
      this.refs.add_modal_success.open();
    }
  }

  undoDrink() {
    if(this.props.num_drinks > 0){
      this.syncState(this.props.num_drinks - 1);
      this.refs.undo_modal.open();
    }
  }

  resetDrink() {
    this.syncState(0);
    this.refs.reset_modal.close();
  }

  syncState(num_drinks) {
    var db_ref = firebase.database();
    db_ref.ref("/groups/"+this.unique_key+'/'+this.username).update({
        "Drinks": num_drinks
    })

    console.log("Synced state");
  }

  render() {
    console.log("Hello")

    if(this.props.visible == false){
    	return (null);
    }

    var BContent = (
      <View style={[styles.btn, styles.btnModal]}>
        <Button title="X" color="white" onPress={() => this.setState({isOpen: false})}/>
      </View>
    );

    return (

      <View style={{ 
         flex: 1
      }}>

        <Drink_Counter num_drinks = {this.props.num_drinks}/>

        <Limit_Drinks limit={this.props.drinks_limit}/>
        

        <View style={styles.wrapper}>

          <Button title="ADD" onPress={this.addDrink} style={styles.btn}/>
          <Button title="UNDO" onPress={this.undoDrink} style={styles.btn}/>
          <Button title="RESET" onPress={() => this.refs.reset_modal.open()} style={styles.btn}/>
          
          <Modal
            style={[styles.modal, styles.modal1]}
            ref={"add_modal_success"}
            onClosed={this.onClose}
            onOpened={this.onOpen}
            onClosingState={this.onClosingState}>
              <Text style={styles.text}>Drink Added! {'\n'}Swipe to exit</Text>
          </Modal>

          <Modal
            style={[styles.modal, styles.modal1]}
            ref={"add_modal_failed"}
            onClosed={this.onClose}
            onOpened={this.onOpen}
            onClosingState={this.onClosingState}>
              <Text style={styles.text}>Limit reached! {'\n'}Swipe to exit</Text>
          </Modal>
          
          <Modal 
            style={[styles.modal, styles.modal4]} 
            position={"bottom"} 
            ref={"reset_modal"}
            onOpened={this.onOpen}
            onClosed={this.onClose}>

            <Text style={styles.text}>Are you sure? {'\n'}This will reset your drink count!</Text>
            <Button   
              title={`YES!`} 
              onPress={this.resetDrink} 
              style={styles.btn}/>

            <Button 
              title={`NO!`} 
              onPress={() => this.refs.reset_modal.close()} 

              style={styles.btn}/>
          </Modal>

          <Modal isOpen={this.state.isOpen} 
                 onClosed={() => this.setState({isOpen: false})} 
                 ref={"undo_modal"}
                 style={[styles.modal, styles.modal4]} 
                 position={"center"} 
                 backdropPressToClose={false} 
                 backdropContent={BContent}>
            <Text style={styles.text}>Drink undone!</Text>
          </Modal>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({

  wrapper: {
    paddingTop: 50,
    paddingBottom: 32,
    paddingLeft: 80,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    backgroundColor: 'white'
  },

  modal: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'slategray'
  },

  modal4: {
    height: 300,
    color: 'white'
  },

  btn: {
    margin: 10,
    backgroundColor: "#3B5998",
    color: "white",
    padding: 10
  },

  btnModal: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 50,
    height: 50,
    backgroundColor: "transparent"
  },

  text: {
    color: "white",
    fontSize: 20
  }

});