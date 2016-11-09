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
  Navigator,
  ListView,
  TextInput,
  StatusBar,
  TouchableHighLight,
  TouchableNativeFeedback,
  TouchableOpacity
} from 'react-native';

import Communications from 'react-native-communications';
import Button from 'react-native-button';


var requests = [
    { "name": "Antonio Koteles", "address": "Mihai Viteazu 45 Oradea", "productName" : "Samsung galaxy s4","description" : "Broken display"},
    { "name": "George Buz", "address": "A.I. Cuza 34 Holod", "productName" : "IPhone 4s", "description" : "dead batery"},
    { "name": "Andrei Micle", "address": "Miron 22 Timisoara" , "productName" : "Tablet asus" , "description" : "Not restarting"},
    
  ]

  


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

 
 
 class ReactImpl extends React.Component {
  
  constructor(props) {
    super(props);
   
    this.state = {
        name : '' ,
        address: '',
        productName: '',
        description: '',
        dataSource: new ListView.DataSource({
              rowHasChanged: (row1, row2) => row1 !== row2,
              }),
              loaded: false,    
        };
  
  }

  
      componentDidMount(){
          this.setState({
              dataSource: this.state.dataSource.cloneWithRows(requests),
              loaded: true,
            });
	  }

      _addBtn(){
           requests.push({ "name": this.state.name, "address": this.state.address, "productName" : this.state.productName, "description" : this.state.description});
          Alert.alert("Done","Request added");
           this.setState({
              dataSource: this.state.dataSource.cloneWithRows(requests),
              loaded: true,
            });
    }


    _emailBtn() {
          var requestsString = requests.map(function(item) {
                return "\nName: " + item['name'] + "\nAddress: " + item['address'] + "\nProduct name: " + item['productName'] + "\nDescription: " + item['description'] + "\n";
           });

          Communications.email(["k.antonio_16@yahoo.com"],"","","Sent from react",requestsString.toString());
      }

      _onPressListVIewItem() {
            console.log("aaaaaaaaaaaaaaaaaaaaaa");
	        	Alert.alert("OK","Item touched");

    	}

      renderRequest(request){
          return (
              <TouchableOpacity 
              
              onPress={() => {console.log("bbbbbbb");() => this._onPressListVIewItem}}>
                  <View 
                    style={styles.viewDetails}>
                      <Text>{request.name}</Text>
                      <Text>{request.address}</Text>
                      <Text>{request.productName}</Text>
                      <Text>{request.description}</Text>
                  </View>
              </TouchableOpacity>
            );
	  }
    


 

  render() {

   
    return (

      <View>

          <Text style={styles.header}>Welcome</Text>
      
          <TextInput
            style= {styles.input} 
            onChangeText={(text) => this.setState({name : text})}
            placeholder="Name..."
            value = {this.state.name}
          />

          <TextInput
            style={styles.input}
            onChangeText={(text) => this.setState({address : text})}
            placeholder="Address..."
            value = {this.state.address}
          />
          <TextInput
            style={styles.input}
            onChangeText={(text) => this.setState({productName : text})}
            placeholder="Product name..."
            value = {this.state.productName}
          />
          <TextInput
            style={styles.input}
            onChangeText={(text) => this.setState({description : text})}
            placeholder="Description..."
            value = {this.state.description}
          />


         

           <Button
            containerStyle={{padding:10, height:45, overflow:'hidden', borderRadius:4, backgroundColor: 'blue', marginBottom: 4}}
              style={{fontSize: 20, color: 'white'}}
              styleDisabled={{color: 'red'}}
              onPress={() => this._addBtn()}>
              Add request
		      </Button>

         
          <Button
            containerStyle={{padding:10, height:45, overflow:'hidden', borderRadius:4, backgroundColor: 'yellow'}}
              style={{fontSize: 20, color: 'blue'}}
              styleDisabled={{color: 'red'}}
              onPress={() => this._emailBtn()}>
              Send email
		      </Button>

          


        <ListView 
			    dataSource={this.state.dataSource}
			    renderRow={this.renderRequest}
			    style={styles.listView}
		    />

    </View>
    
    );
  }
}



const styles = StyleSheet.create({
  
  input: {
    backgroundColor: 'white',
    height: 40,
    borderColor: 'white',
    borderWidth: 1,
    margin: 3,
  },
 
 
  listView: {
      width: 320,
      paddingTop: 1,
      backgroundColor: '#F5FCFF',
    },
  header: {
    fontWeight: 'bold',
    fontSize: 30,
    textAlign : 'center'
  },
  holder: {
    flex: 0.25,
    justifyContent: 'center',
  },
  text: {
    fontSize: 50,
    backgroundColor: 'red'
  },
  viewDetails: {
	  margin: 9
  }
  
  
});

AppRegistry.registerComponent('ReactImpl', () => ReactImpl);
