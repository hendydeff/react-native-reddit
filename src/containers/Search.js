import React, { Component } from 'react';
import {
	View,
	Text,
	TouchableHighlight,
	StyleSheet,
	ScrollView
} from 'react-native';
import { SearchBar, List, ListItem, colors } from 'react-native-elements';
import { connect } from 'react-redux';
import * as actions from '../actions';
import * as Icons from '../components/Icons';
import Images from '../assets';


class Search extends Component {
	componentDidUpdate(prevProps){
		prevProps.token !== this.props.token ?
		 this.props.fetchSubreddits(this.props.token): null
	}
	render(){
		const { subreddits } = this.props;
		return(
			<View style={style.container}>
				<ScrollView>
						<ListItem containerStyle={[style.listItemContainer, { marginTop:5 }]} titleStyle={style.titleContainer} hideChevron avatar={Icons.explore} avatarStyle={[style.avatarStyle, {transform: [{rotateY: '180 deg'}]}]} roundAvatar title = "Browse Communities" subtitle="Explore all the communities" subtitleStyle={style.subtitle}/>
						<ListItem containerStyle={style.listItemContainer} titleStyle={style.titleContainer} hideChevron avatar={Icons.popular} avatarStyle={style.avatarStyle} roundAvatar title = "Popular"  subtitle="The hottest posts on the Internet" subtitleStyle={style.subtitle}/>
						<ListItem containerStyle={style.listItemContainer} titleStyle={style.titleContainer} hideChevron avatar={Icons.all}     avatarStyle={style.avatarStyle}	roundAvatar title = "All"  subtitle="Even more top posts on Reddit" subtitleStyle={style.subtitle}/>
						<Text style={style.sub}> SUBSCRIPTIONS </Text>
							{subreddits ? subreddits.map((subreddit, index)=>{
								return	<ListItem 
											key={index}
											containerStyle={style.listItemContainer}
											roundAvatar
											title={subreddit.display_name_prefixed}
											avatar = {subreddit.icon_img ? {uri:subreddit.icon_img} : Images.redditImage}
											avatarStyle	= {{backgroundColor: subreddit.key_color ? subreddit.key_color : '#20b2aa', borderRadius:34/2}}
											titleStyle={style.titleContainer}
											rightIcon ={Icons.star}
										 />
								}) : null}
				</ScrollView>
			</View>
			)
	}
}
mapStateToProps =(state)=>({
	token: state.AuthReducer.token,
	subreddits: state.UserReducer.subreddits
});
export default connect(mapStateToProps, actions)(Search);

const style = StyleSheet.create({
	container:{
		flex: 1,
		backgroundColor: '#fff'
	},
	avatarStyle:{
		borderRadius: 34/2,
		backgroundColor: '#20b2aa',
	},
	listItemContainer:{
		paddingTop: 1,
		borderBottomWidth: null,
	},
	titleContainer:{
		fontSize: 13
	},
	sub:{
		color: colors.grey3, 
		fontSize: 13, 
		marginLeft:10,
		marginVertical: 10
	},
	subtitle:{
		fontSize: 10,
		fontWeight: 'normal'
	}
})
