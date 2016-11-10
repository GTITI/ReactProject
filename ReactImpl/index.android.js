
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


/**
 * the array of requests when the app is started
 */
var requests = [
    { "name": "Antonio Koteles", "address": "Mihai Viteazu 45 Oradea", "productName" : "Samsung galaxy s4","description" : "Broken display"},
    { "name": "George Buz", "address": "A.I. Cuza 34 Holod", "productName" : "IPhone 4s", "description" : "dead batery"},
    { "name": "Andrei Micle", "address": "Miron 22 Timisoara" , "productName" : "Tablet asus" , "description" : "Not restarting"},
  ]




var SCREEN_WIDTH = require('Dimensions').get('window').width;

var BaseConfig = Navigator.SceneConfigs.FloatFromRight;

var CustomLeftToRightGesture = Object.assign({}, BaseConfig.gestures.pop, {
  // Make it snap back really quickly after canceling pop
  snapVelocity: 8,
  // Make it so we can drag anywhere on the screen
  edgeHitWidth: SCREEN_WIDTH,
});

var CustomSceneConfig = Object.assign({}, BaseConfig, {
  // A very tighly wound spring will make this transition fast
  springTension: 100,
  springFriction: 1,
  // Use our custom gesture defined above
  gestures: {
    pop: CustomLeftToRightGesture,
  }
});



/**
 * Main class with input form , ADD BUTTON , SEND EMAIL BUTTON, ListView
 */
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

      /**
       * Adds a new request into the list view
       */
      _addBtn(){
           requests.push({ "name": this.state.name, "address": this.state.address, "productName" : this.state.productName, "description" : this.state.description});
          Alert.alert("Done","Request added");
           this.setState({
              dataSource: this.state.dataSource.cloneWithRows(requests),
              loaded: true,
            });
      }


      /**
       * Sends an email with the data from the lsit view
       */
      _emailBtn() {
          var requestsString = requests.map(function(item) {
                return "\nName: " + item['name'] + "\nAddress: " + item['address'] + "\nProduct name: " + item['productName'] + "\nDescription: " + item['description'] + "\n";
           });

          Communications.email(["k.antonio_16@yahoo.com"],"","","Sent from react",requestsString.toString());
      }

     

      /**
       * moves to a new scene, in this case to EditDetails sending to that scene the request details prefixed by "passed"
       */
      _navigate(request){
          this.props.navigator.push({
    	        name: 'EditDetails',
              
              passProps: {
            	    passedName: request.name,
                  passedAddress: request.address,
                  passedProductName: request.productName,
                  passedDescription: request.description
                }
          })
        
      }


      /**
       * Forms a list view item with the properties of a new request
       */
      renderRequest(request){
          return (
              <TouchableOpacity 
                  onPress={ () => this._navigate(request)}>
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
      <View style={{backgroundColor: 'white'}}>
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
            containerStyle={{padding:10, height:45, overflow:'hidden', borderRadius:4, backgroundColor: 'green', marginBottom: 4}}
              style={{fontSize: 20, color: 'white'}}
              styleDisabled={{color: 'red'}}
              onPress={() => this._addBtn()}>
              Add request
		      </Button>
 
          <Button
            containerStyle={{padding:10, height:45, overflow:'hidden', borderRadius:4, backgroundColor: 'green'}}
              style={{fontSize: 20, color: 'white'}}
              styleDisabled={{color: 'red'}}
              onPress={() => this._emailBtn()}>
              Send email
		      </Button>



          <ListView 
            dataSource={this.state.dataSource}
            renderRow={this.renderRequest.bind(this)}
            style={styles.listView}
          />

    </View>
    
    );
  }
}





class EditDetails extends React.Component{

  constructor(props){
    super(props);
    this.state = {
        name : '' ,
        address: '',
        productName: '',
        description: ''}

  }

    render(){
      return(
        <View style={{backgroundColor: 'white'}}>
          <Text style={styles.header}>Edit details of the request</Text>

          <TextInput
            style= {styles.input} 
            onChangeText={(text) => this.setState({name : text})}
            placeholder="Name..."
            value = {this.props.passedName}
          />
          <TextInput
            style={styles.input}
            onChangeText={(text) => this.setState({address : text})}
            placeholder="Address..."
            value = {this.props.passedAddress}
          />
          <TextInput
            style={styles.input}
            onChangeText={(text) => this.setState({productName : text})}
            placeholder="Product name..."
            value = {this.props.passedProductName}
          />
          <TextInput
            style={styles.input}
            onChangeText={(text) => this.setState({description : text})}
            placeholder="Description..."
            value = {this.props.passedDescription}
          />

          <Button
            containerStyle={{padding:10, height:45, overflow:'hidden', borderRadius:4, backgroundColor: 'green', marginBottom: 4}}
              style={{fontSize: 20, color: 'white'}}
              styleDisabled={{color: 'red'}}
              onPress={ () => this.props.navigator.pop() }>
              Save and return
		      </Button>
        </View>
      )
    }
}



var App = React.createClass({
  
  renderScene(route, navigator) {
  	if(route.name == 'ReactImpl') {
    	return <ReactImpl navigator={navigator} {...route.passProps}  />
    }
    if(route.name == 'EditDetails') {
    	return <EditDetails navigator={navigator} {...route.passProps}  />
    }
  },
  
  render() {
    return (
      <Navigator
      	style={{ flex:1 }}
        initialRoute={{ name: 'ReactImpl' }}
        renderScene={ this.renderScene } />
    )
  }
});




/**
 * STYLES
 */
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
    textAlign : 'center',
    color: 'black'

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

AppRegistry.registerComponent('ReactImpl', () => App);
