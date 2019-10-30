import React, { Component } from 'react';

import Modal from 'react-native-modalbox';
import Limit_Drinks from '../components/limit_drinks'
import Drink_Counter from '../components/drink_counter'

import {
  Text,
  Button,
  StyleSheet,
  ScrollView,
  View,
  Dimensions,
  TextInput
} from 'react-native';

var screen = Dimensions.get('window');

export default class Button_Control extends Component{

  constructor() {
    super();
    this.state = {
      isOpen: false,
      isDisabled: false,
      sliderValue: 0.3,
      num_drinks: 0
    };

    this.addDrink = this.addDrink.bind(this);
    this.undoDrink = this.undoDrink.bind(this);
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
    if(this.state.num_drinks >= this.drinks_limit){
      this.refs.add_modal_failed.open();
    }
    else {
      this.setState({num_drinks: this.state.num_drinks + 1});
      this.refs.add_modal_success.open();
    }
  }

  undoDrink() {
    if(this.state.num_drinks > 0){
      this.setState({num_drinks: this.state.num_drinks - 1});
      this.refs.undo_modal.open();
    }
  }

  render() {
    console.log("Hello")
    const {navigation} = this.props;
    const drinks_limit = navigation.getParam('drinks_limit')
    this.drinks_limit = drinks_limit
    var BContent = (
      <View style={[styles.btn, styles.btnModal]}>
        <Button title="X" color="white" onPress={() => this.setState({isOpen: false})}/>
      </View>
    );

    return (
      <View style={{ 
         flex: 1,
         alignItems:'center',
         justifyContent:'center'
      }}>
        <Drink_Counter num_drinks = {this.state.num_drinks}/>

        <Limit_Drinks limit={drinks_limit}/>
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
              onPress={() => this.setState({num_drinks: 0})} 
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