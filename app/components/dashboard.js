import React, { Component } from 'react';

import Modal from 'react-native-modalbox';
import QRCode from 'react-native-qrcode';

import { LinearGradient } from 'expo-linear-gradient';


import {
  Text,
  Button,
  StyleSheet,
  ScrollView,
  View,
  Dimensions,
  TextInput
} from 'react-native';

import DrinkCounter from './drink_counter'

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
    this.addFriends = this.addFriends.bind(this);
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
      this.syncState(this.props.num_drinks + 1);      
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
    } else {
      return;
    }
  }

  addFriends() {
    this.refs.add_friends.open();
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
    if(this.props.visible == false){
    	return (null);
    };

    return (
      <LinearGradient
        colors={['#3adae0','#F1FFFE']}
        style={{ 
          flex: 1,
          justifyContent: 'space-between',
        }}>

        <Text style={{
          fontSize: 20,
          flex: 1,
          textAlign: 'center',
          fontWeight: 'bold',
          justifyContent: 'center',
        }}>
          {this.props.username}
        </Text>

        <Text style={{
          fontSize: 20,
          flex: 1,
          textAlign: 'center',
          fontWeight: 'bold',
          justifyContent: 'center',
        }}>
          {'Drink Number:'}
        </Text>

        <DrinkCounter num_drinks = {this.props.num_drinks}
                      drink_limit = {this.props.drinks_limit}
        />

        <Text style={{
          fontSize: 20,
          flex: 1,
          fontWeight: 'bold',
          textAlign: 'center',
          justifyContent: 'center',
        }}>
          {'Drink limit: '+this.props.drinks_limit}
        </Text>


        <View style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>

          <Button title="Add a Drink" color="#40DDD2" onPress={this.addDrink} style={styles.btn}/>
          <Button title="Add Friends" color="#ddb340" onPress={this.addFriends} style={styles.btn}/>
          <Button title="Undo" color="#dd4094" onPress={this.undoDrink} style={styles.btn}/>
          

        </View>

        <Modal
          style={[styles.modal, styles.modal4]}
          ref={"add_modal_success"}
          onClosed={this.onClose}
          onOpened={this.onOpen}
          onClosingState={this.onClosingState}>
          <Text style={styles.text}>Drink Added! {'\n'}Swipe to exit</Text>
        </Modal>

        <Modal
          style={[styles.modal, styles.modal4]}
          ref={"add_modal_failed"}
          onClosed={this.onClose}
          onOpened={this.onOpen}
          onClosingState={this.onClosingState}>
          <Text style={{color: "red", fontSize:20}}>Warning! You have exceeded your drink limit!!!</Text>
        </Modal>

        <Modal isOpen={this.state.isOpen} 
          onClosed={() => this.setState({isOpen: false})} 
          ref={"undo_modal"}
          style={[styles.modal, styles.modal4]} 
          position={"center"} >
          <Text style={styles.text}>Drink undone!{'\n'}Swipe down to close</Text>
        </Modal>

        <Modal
        style={[styles.modal, styles.modal4]}
        ref={"add_friends"}
        onClosed={this.onClose}
        onOpened={this.onOpen}
        onClosingState={this.onClosingState}>
          <View style={{
            flex:1,
            justifyContent: 'space-around',
            alignItems: 'center',
          }}>
            <Text style={{justifyContent:'center', alignItems: 'center'}}>{'Group key: '+ this.props.group_key}</Text>
            <View style={{overflow:'hidden'}}>
              <QRCode
                value={this.props.group_key}
                size={150}
                fgColor='#40DDD2'
              />
            </View>

            <Text style={{justifyContent:'center', alignItems: 'center'}}>Swipe down to close</Text>
          </View>
        </Modal>
      </LinearGradient>
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
    backgroundColor:'#40DDD2',
    margin: 'auto'
  },

  modal4: {
    height: 300,
    color: 'white',
    backgroundColor:'#40DDD2',
    margin: 'auto'
  },

  btn: {
    margin: 10,
    padding: 10,
    height: 40,
  },

  text: {
    color: "white",
    fontSize: 20
  }

});

/*
<Button title="RESET" onPress={() => this.refs.reset_modal.open()} style={styles.btn}/>

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
*/