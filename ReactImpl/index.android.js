/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
} from 'react-native';

import AwesomeButton from 'react-native-awesome-button';



 class ReactImpl extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
        name : '' ,
        phone: '',
        address: ''
      };
  }

  render() {
	      
    return (
 
      <View>
          <Text style={styles.header}>Send some data here</Text>
      
          <TextInput
          style= {styles.input} 
          onChangeText={(text) => this.setState({name : text})}
          placeholder="Enter name"
          />
          <TextInput
            style={styles.input}
            onChangeText={(text) => this.setState({phone : text})}
            placeholder="Enter phoen number"
          />
          <TextInput
            style={styles.input}
            onChangeText={(text) => this.setState({address : text})}
            placeholder="Enter address"
          />
          
 
          <AwesomeButton states={{
                          default: {
                                  text: 'Press me',
                                  onPress: this.a,
                                  backgroundColor: '#1155DD'
                                  }
                         }} 
          />
   
      </View>

    );
  }
}



const styles = StyleSheet.create({
  
  input: {
    backgroundColor: 'white',
    height: 60,
    borderColor: 'black',
    borderWidth: 1,
    margin: 3,
  },
  submit: {
    backgroundColor: 'red',
    height: 30,
  },
  header: {
    fontWeight: 'bold',
    fontSize: 30,
    textAlign : 'center'
  }
  
});

AppRegistry.registerComponent('ReactImpl', () => ReactImpl);
