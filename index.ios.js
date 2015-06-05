/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
var SearchPage = require('./searchPage');
var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
} = React;



var PropertyFinder = React.createClass({
  render:function(){
    return (
      <React.NavigatorIOS
        style={styles.container}
        initialRoute = {{
          title:'Property Finder',
          component:SearchPage
        }} />
       );
  }
});

var styles = StyleSheet.create({
  text:{
    color:'black',
    backgroundColor:'white',
    fontSize:30,
    margin:80
  },
  container:{
    flex:1
  }
});



AppRegistry.registerComponent('PropertyFinder', () => PropertyFinder);
