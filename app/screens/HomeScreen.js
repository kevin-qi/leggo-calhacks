import React from 'react';
import Modal from 'react-native-modalbox';
import Slider from 'react-native-slider';

import {
  Text,
  Button,
  StyleSheet,
  ScrollView,
  View,
  Dimensions,
  TextInput
} from 'react-native';

import CreateGroupButton from '../components/create_group_button'

export default class HomeScreen extends Component {

	static navigationOptions = {
		title: 'Home',
	};

  constructor() {
    super();
    this.state = {
      isOpen: false,
      isDisabled: false,
      swipeToClose: true,
      sliderValue: 0.3
    };
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

	render() {
    	return (
    		<>
    		<>
    		<Limit_Drinks/>
    		</>
    		<Drink_Counter/>
	      <View style={styles.wrapper}>
	        <Button title="ADD" onPress={() => this.refs.modal1.open()} style={styles.btn}/>
	        <Button title="UNDO" onPress={() => this.setState({isOpen: true})} style={styles.btn}/>
	        <Button title="RESET" onPress={() => this.refs.modal4.open()} style={styles.btn}/>
	        <Modal
	          style={[styles.modal, styles.modal1]}
	          ref={"modal1"}
	          swipeToClose={this.state.swipeToClose}
	          onClosed={this.onClose}
	          onOpened={this.onOpen}
	          onClosingState={this.onClosingState}>
	            <Text style={styles.text}>Drink added! {'\n'}Swipe to exit</Text>
	        </Modal>
	        <Modal style={[styles.modal, styles.modal4]} position={"bottom"} ref={"modal4"}>
	          <Text style={styles.text}>                 Are you sure? {'\n'}This will reset your drinkcount!</Text>
	          <Button title={`YES!(${this.state.swipeToClose ? "true" : "false"})`} onPress={() => this.setState({swipeToClose: !this.state.swipeToClose})} style={styles.btn}/>
	        </Modal>

	        <Modal isOpen={this.state.isOpen} onClosed={() => this.setState({isOpen: false})} style={[styles.modal, styles.modal4]} position={"center"} backdropPressToClose={false} backdropContent={BContent}>
	          <Text style={styles.text}>Modal with backdrop content</Text>
	        </Modal>
	      </View>
	      </>
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
    alignItems: 'flex-end'
    backgroundColor:'white'
  },

  modal: {
    justifyContent: 'center',
    alignItems: 'center'
    backgroundColor:'slategray'
  },

  modal4: {
    height: 300
    color: 'white'
  },

  btn: {
  	margin: 10,
  	backgroundColor:"#3B5998",
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
