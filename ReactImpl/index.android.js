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

  var requestsString = requests.map(function(item) {
    return "\nName: " + item['name'] + "\nAddress: " + item['address'] + "\nProduct name: " + item['productName'] + "\nDescription: " + item['description'] + "\n-----------------------------------------------";
});


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


 


class SaveButton extends React.Component{
    
      _onPressButton(){
        Alert.alert("Good job","you pressed me :)")
        requests.push({ "name": this.state.name, "address": this.state.address, "productName" : this.state.productName, "description" : this.state.description});

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


    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
   
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
           Alert.alert("Good job","add button")
      }

    _emailBtn() {
        Communications.email(["k.antonio_16@yahoo.com"],"","","Sent from react",requestsString.toString());
      }

      _onPressButton() {
	        	Alert.alert("yas");
    	}

      renderRequest(request){
          return (
          <TouchableOpacity onPress={this._onPressButton}>
            <View 
            style={styles.viewDetails}>
              <Text>{request.name}</Text>
              <Text>{request.address}</Text>
              <Text>{request.productName}</Text>
              <Text>{request.description}</Text>
              <Text>-------------------------------------------------------------------------------</Text>

            </View>
          </TouchableOpacity>
            );
	  }
    


 

  render() {
	      
    return (
 
      <View>

          <StatusBar
            backgroundColor="green"
            barStyle="light-content"
          />



          

          <Text style={styles.header}>Create a new request</Text>
      
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


         
         
        


           <Button
            containerStyle={{padding:10, height:45, overflow:'hidden', borderRadius:4, backgroundColor: 'blue'}}
              style={{fontSize: 20, color: 'green'}}
              styleDisabled={{color: 'red'}}
              onPress={() => this._addBtn()}>
              Add request
		      </Button>

          <Button
          containerStyle={{padding:10, height:45, overflow:'hidden', borderRadius:4, backgroundColor: 'white'}}
            style={{fontSize: 20, color: 'green'}}
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
    height: 60,
    borderColor: 'black',
    borderWidth: 1,
    margin: 3,
  },
 
  addBtnText: {
    
    textAlign:'center',
    margin:10
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
  
  
});

AppRegistry.registerComponent('ReactImpl', () => ReactImpl);
