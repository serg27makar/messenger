import React from 'react'
import {connect} from 'react-redux'
import {setActionUserId, setActionUserAbonents,
    setActionUserFriendsList, setActionUserFriends,
    setActionUserAvatar, setActionUserName, setActionUserBlockDel,
    setActionUserWhoSpeak, setActionChat, setActionUserFriendActiv} from '../../../actions/index'
import Abonents from './Abonents'

class Menu extends React.Component{
    constructor(props){
        super(props);
        this.state={
            statusSearch: false,
        }
    }
    logout = () =>{
        this.props.setUserIdFunction('');
        localStorage.token = '';
        this.props.setUserFrendsListFunction([]);
        this.props.setUserNameFunction('');
        this.props.setUserAvatarFunction('');
        this.props.setUserAbonentsFunction([]);
        this.props.setFunctionChat([]);
        this.props.setFunctionWhoSpeak('');
        this.props.setUserBlockFunctionDel([]);
        this.props.setUserFriendActiv({});
    };
    search = ()=>{
        this.setState({
            statusSearch: true,
        })
    };
    close =()=>{
        this.setState({
            statusSearch: false,
        })
    };

    render(){
        if(this.state.statusSearch) {
            return (
                <div id="abonBar"  style={{zIndex: '10', display: 'block'}}>
                    <h2 style={{marginLeft: '1em'}}>abonents</h2>
                    <button id='close' onClick={this.close}>закрыть</button>
                <div className="abonents" style={{zIndex: '10', display: 'block'}}>
                    <Abonents/>
                </div>
                </div>
            );
        }else {
            return (
                <div id="menu">
                    <button id="search" onClick={this.search}>Search</button>
                    <button id='logAut' onClick={this.logout}>Log Out</button>
                </div>
            )
        }
    }
}
function MapStateToProps(state) {
    return {
        userId: state.userInfo.userId,
        userName: state.userInfo.userName,
        abonents: state.userInfo.abonents,
        avatar: state.userInfo.avatar,
        friendslist: state.userInfo.friendslist,
        userFriends: state.userInfo.userFriends,

    }
}
const mapDispatchToProps = dispatch => {
    return{
        setUserIdFunction: (userId) => {
            dispatch(setActionUserId(userId))
        },
        setUserAbonentsFunction: (abonents) => {
            dispatch(setActionUserAbonents(abonents))
        },
        setUserNameFunction: (userName) => {
            dispatch(setActionUserName(userName))
        },
        setUserAvatarFunction: (avatar) => {
            dispatch(setActionUserAvatar(avatar))
        },
        setUserFriendsFunction: (userFriends) => {
            dispatch(setActionUserFriends(userFriends))
        },
        setUserFrendsListFunction: (friendslist) => {
            dispatch(setActionUserFriendsList(friendslist))
        },
        setUserBlockFunctionDel: (messages) => {
            dispatch(setActionUserBlockDel(messages))
        },
        setFunctionWhoSpeak: (whoSpeak) => {
            dispatch(setActionUserWhoSpeak(whoSpeak))
        },
        setFunctionChat: (usCh) => {
            dispatch(setActionChat(usCh))
        },
        setUserFriendActiv: (activFriend) => {
            dispatch(setActionUserFriendActiv(activFriend))
        },

    }
};
export default connect(MapStateToProps, mapDispatchToProps)(Menu);
