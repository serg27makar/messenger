import React, { Component } from 'react';
import {connect} from 'react-redux'
import {setActionUserFriendActiv, setActionUserFriendsList, setActionChat,
    setActionUserWhoSpeak, setActionUserBlockDel, setActionUserBlock} from '../../actions/index';
import {friendslist} from "../../socketutilite/socketabonents"
import {Redirect} from 'react-router-dom';
import {friendsDell} from "../../socketutilite/socketabonents"
import {chateSms} from "../../socketutilite/socketabonents"

class FriendsBar extends Component {

    constructor(props){
        super(props);
        if (this.props.userId)friendslist(this.props.userId, this.call);
        this.state={
            a:false,
        }
    }
    call = res => {
        this.props.setUserFrendsListFunction(res);
        this.setState({
            a: !this.state.a
        });
    };

    open=(e)=>{
        this.props.setUserBlockFunction([]);
        this.props.setFunctionChat([]);
        this.props.setUserFriendActiv({});
        let activ = {
            activId: this.props.friendslist[e.target.value].friendId,
            activAvatar: this.props.friendslist[e.target.value].friendavatar,
            activName: this.props.friendslist[e.target.value].friendName,

        };
        this.props.setUserFriendActiv(activ);
        chateSms(this.props.userId, this.back);
        this.setState({
            a: !this.state.a
        });
    };

    back = (data) => {
        if (data.length !== this.props.usCh.length) {
            this.props.setFunctionChat(data);
            this.props.setUserBlockFunctionDel([]);
            data.map((sms) => {
                if (sms.chatId === this.props.userId + ' ' + this.props.activFriend.activId
                    || sms.chatId === this.props.activFriend.activId + ' ' + this.props.userId) {
                    this.props.setUserBlockFunction(sms);
                }
            });
        }
        this.setState({
            a: !this.state.a
        });
    };

    del =(e)=>{
        let data = {
            userId: this.props.userId,
            avatar: this.props.avatar,
            userName: this.props.userName,
            friendId: this.props.friendslist[e.target.value].friendId,
            friendavatar: this.props.friendslist[e.target.value].friendavatar,
            friendName: this.props.friendslist[e.target.value].friendName,
        };
        this.props.setUserFriendActiv({});
        friendsDell(data);
        friendslist(this.props.userId, this.call);
        this.setState({
            a: !this.state.a
        });
    };

    render(){
        if (!this.props.friendslist || this.props.friendslist.length === 0){
            return <div className="friendsbar"></div>
        }else {
            return (
                <div className="friendsbar">
                    {this.props.friendslist.map((av) => {
                        return <div id="abonent" key={av.friendId}>
                            <div>
                                <img src={av.friendavatar} title={av.friendName} height={50} style={{
                                    borderRadius: '50%',
                                    borderStyle: 'solid',
                                }}/>
                                <button id="delete" onClick={this.del} value={this.props.friendslist.indexOf(av)}>удалить</button>
                                <button id="open" onClick={this.open} value={this.props.friendslist.indexOf(av)}>открыть чат</button>
                            </div>
                            <h4 style={{margin: '1px'}}>{av.friendName}</h4>
                        </div>
                    })}
                </div>
            )
        }
    }

}

function MapStateToProps(state) {
    return {
        userId: state.userInfo.userId,
        avatar: state.userInfo.avatar,
        userName: state.userInfo.userName,
        activFriend: state.userInfo.activFriend,
        friendslist: state.userInfo.friendslist,
        messages: state.userInfo.messages,
        whoSpeak: state.userInfo.whoSpeak,
        usCh: state.userInfo.usCh,
    }
}

const mapDispatchToProps = dispatch => {
    return{
        setUserFriendActiv: (activFriend) => {
            dispatch(setActionUserFriendActiv(activFriend))
        },
        setUserFrendsListFunction: (friendslist) => {
            dispatch(setActionUserFriendsList(friendslist))
        },
        setUserBlockFunction: (messages) => {
            dispatch(setActionUserBlock(messages))
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
    }
};

export default connect(MapStateToProps, mapDispatchToProps)(FriendsBar);
