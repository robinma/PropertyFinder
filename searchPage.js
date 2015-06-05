'use strict';
var React = require('react-native');
var SearchResults = require('./SearchResults');
var {
	StyleSheet,
	Text,
	TextInput,
	View,
	TouchableHighlight,
	ActivityIndicatorIOS,
	Image,
	Component
} = React;


var SearchPage = React.createClass({
	getInitialState:function(){
		return {
			searchString:'london',
			isLoading:false,
			message:''
		}
	},
	onSearchTextChanged:function(evt){
		console.log('onSearchTextChanged');
		this.setState({searchString:evt.nativeEvent.text});
		console.log(this.state.searchString);
	},
	_executeQuery:function(query){
		console.log('query:',query);
		this.setState({isLoading:true});
		fetch(query)
		.then(response=>response.json())
		.then(json=>this._handleResponse(json.response))
		.catch(error=>this.setState({
			isLoading:false,
			message:'发生了未知错误'+error
		}));
	},
	_handleResponse:function(response){
		this.setState({
			isLoading:false,
			message:'找到他们了！！！'
		});
		if(response.application_response_code.substr(0, 1) === '1'){
			// console.log('Properties found: ' + response.listings.length);
			this.props.navigator.push({
				title:'Results',
				component:SearchResults,
				passProps:{listings:response.listings}
			});
		}else{
			this.setState({ message: 'Location not recognized; please try again.'});
		}

	},
	onsearchPressed:function(evt){
		var query = this.urlForQueryAndPage('place_name',this.state.searchString,1);
		this._executeQuery(query);
	},
	urlForQueryAndPage:function(key,value,PageNum){
		var data={
			country:'uk',
			pretty:'1',
			encoding:'json',
			listing_type:'buy',
			action:'search_listings',
			page:PageNum
		};
		data[key] = value;
		var queryString = Object.keys(data).map(key => key + '=' + encodeURIComponent(data[key])).join('&');
		return 'http://api.nestoria.co.uk/api?' + queryString;
	},
	render:function(){
		console.log('searchPage.render');
		var spinner = this.state.isLoading?(<ActivityIndicatorIOS hidden='true' size='large' />):(<View />);
		return (
			<View style={styles.container}>
				<Text style={styles.description}>
					Search for houses to buy!!
				</Text>
				<Text style={styles.description}>
					Search by Place-name,Postcode or search near you location.
				</Text>

				<View style={styles.flowRight}>
					<TextInput style={styles.searchInput} placeholder="Search via name or postcode" 
					value={this.state.searchString} 
					onChange={(event)=>this.onSearchTextChanged(event)} />
					<TouchableHighlight 
						style={styles.button}  
						underlayColor="#99d9f4"
						onPress={(event)=>this.onsearchPressed(event)}
					>
						<Text style={styles.buttonText}>Go</Text>
					</TouchableHighlight>
				</View>
				<TouchableHighlight style={styles.button} underlayColor="#99d9f4">
					<Text style={styles.buttonText}>Location</Text>
				</TouchableHighlight>
				<Image source={require('image!house')} style={styles.image} />
				{spinner}
				<Text style={styles.description} >{this.state.message}</Text>
			</View>
			);
	}
});

var styles = StyleSheet.create({
	description:{
		marginBottom:20,
		fontSize:18,
		textAlign:'center',
		color:'#656565'
	},
	container:{
		padding:30,
		marginTop:65,
		alignItems:'center'
	},
	flowRight:{
		flexDirection:'row',
		alignItems:'center',
		alignSelf:'stretch'
	},
	searchInput:{
		height:36,
		padding:4,
		marginRight:5,
		flex:4,
		fontSize:18,
		borderWidth:1,
		borderColor:'#48bbec',
		borderRadius:8,
		color:'#48bbec'
	},
	button:{
		height:36,
		flex:1,
		flexDirection:'row',
		backgroundColor:'#48bbec',
		borderColor:'#48bbec',
		borderWidth:1,
		borderRadius:8,
		marginBottom:10,
		alignSelf:'stretch',
		justifyContent:'center'
	},
	buttonText:{
		fontSize:18,
		color:'#ffffff',
		alignSelf:'center'
	},
	image:{
		width:217,
		height:138
	}
});

module.exports = SearchPage;

