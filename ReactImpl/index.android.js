/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  Alert,
  StyleSheet,
  Text,
  View,
  ListView,
  TextInput,
  TouchableNativeFeedback
} from 'react-native';



  class Request  extends React.Component{
     constructor(props) {
        super(props);
        this.state = { name:'', address:'', productName:'', description:'' };
      }


     getName(){return this.state.name}
     getAddress(){return this.state.address}
     getProductName(){return this.state.productName}
     getDescription(){return this.state.description}

     setName(name){this.state.name = name}
     setAddress(adress){this.state.address = address}
     setProductName(productName){this.state.productName = productName}
     setAddress(address){this.state.address = address}

     render(){
       return (
          <View>
              <Text> name: {this.props.name}</Text>
          </View>
      );
     }
  }


  class MyListView extends React.Component {
      constructor(props) {
          super(props);
          const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        
          this.state = {
            dataSource: ds.cloneWithRows(['Antonio', 'Alin','Vald']),
          };
      }

      _onPress(){
        Alert.alert("Good job","you pressed list view");
      }

      render() {
        return (
          <ListView
            dataSource={this.state.dataSource}
            renderRow={(rowData) => <Text>{rowData}</Text>}
            onPress = {this._onPress}
          />
        );
      }
}


class SaveButton extends React.Component{
    constructor(props) {
        super(props);
        this.state = { /* initial state, this is ES6 syntax (classes) */ };
      }


      _onPressButton(){
        var s  = ReactImpl.state.name;
        Alert.alert("Good job","you pressed "+String(s));
      }

      render(){
        return(
          <TouchableNativeFeedback
              onPress={this._onPressButton}
              background={TouchableNativeFeedback.SelectableBackground()}>
                    <View style={{width: 320, height: 40, backgroundColor: 'green'}}>
                        <Text style={styles.addBtnText}>ADD</Text>
                    </View>
          </TouchableNativeFeedback>
        );
      }
}
 
 
 
 class ReactImpl extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
        name : '' ,
        address: '',
        productName: '',
        description: ''
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
          value = {this.state.name}
          />

          <TextInput
            style={styles.input}
            onChangeText={(text) => this.setState({address : text})}
            placeholder="Enter address"
          />
          <TextInput
            style={styles.input}
            onChangeText={(text) => this.setState({productName : text})}
            placeholder="Enter phoen number"
          />
          <TextInput
            style={styles.input}
            onChangeText={(text) => this.setState({description : text})}
            placeholder="Enter description"
          />

          <SaveButton 
              
          />

          <MyListView />

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
 
  addBtnText: {
    
    textAlign:'center',
    margin:10
  },
  header: {
    fontWeight: 'bold',
    fontSize: 30,
    textAlign : 'center'
  }
  
});

AppRegistry.registerComponent('ReactImpl', () => ReactImpl);
