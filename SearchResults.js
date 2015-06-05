'use strict';

var React = require('react-native');
var PropertyView = require('./PropertyView');

var {
	StyleSheet,
	Text,
	TextInput,
	View,
	TouchableHighlight,
	ActivityIndicatorIOS,
	ListView,
	Image,
	Component
} = React;

// // signle item
// var SearchResultItem = React.createClass({
// 	render:function(){
// 		return (
// 			<TouchableHighlight underlayColor='#dddddd'>
// 				<View>
// 					<Text>
// 						{this.props.rowData.title}
// 					</Text>
// 				</View>
// 			</TouchableHighlight>
// 			);
// 	}
// });

var SearchResults = React.createClass({
	getInitialState:function(){

		var dataSource = new ListView.DataSource({
			rowHasChanged:(r1,r2)=>r1.guid !== r2.guid
		});
		return {
			dataSource:dataSource.cloneWithRows(this.props.listings)
		};
	},
	onPressed:function(guid){
		var property = this.props.listings.filter(prop=>prop.guid === guid)[0];
		this.props.navigator.push({
			title:'Property',
			component:PropertyView,
			passProps:{property:property}
		});
	},
	renderRow:function(rowData,sectionID,rowID){
		var price = rowData.price_formatted.split(' ')[0];

		return (
			<TouchableHighlight underlayColor='#dddddd' onPress={()=>this.onPressed(rowData.guid)}>
				<View>
					<View style={styles.rowContainer}>
						<Image style={styles.thumb} source={{uri:rowData.img_url}} />
						<View style={styles.textContainer}>
							<Text style={styles.price}>${price}</Text>
							<Text style={styles.title} numberOfLines={1}>{rowData.title}</Text>
						</View>
					</View>
					<View style={styles.separator} />
				</View>
			</TouchableHighlight>
			);
	},

	render:function(){
		return (
			<ListView 
				dataSource={this.state.dataSource} 
				renderRow={this.renderRow} />
			);
	}
});

var styles = StyleSheet.create({
	thumb: {
	    width: 80,
	    height: 80,
	    marginRight: 10
	  },
	  textContainer: {
	    flex: 1
	  },
	  separator: {
	    height: 1,
	    backgroundColor: '#dddddd'
	  },
	  price: {
	    fontSize: 25,
	    fontWeight: 'bold',
	    color: '#48BBEC'
	  },
	  title: {
	    fontSize: 20,
	    color: '#656565'
	  },
	  rowContainer: {
	    flexDirection: 'row',
	    padding: 10
	  }
});

module.exports = SearchResults;