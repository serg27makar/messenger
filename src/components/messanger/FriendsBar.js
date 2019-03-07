import React, { Component } from 'react';
import {connect} from 'react-redux'
import {setActionUserFriendsList, setActionUserBlock, setActionChat, setActionUserBlockDel} from '../../actions/index';
import {friendslist} from "../../socketutilite/socketabonents"
import {del, open} from "../../actions/usFunction/actionFun"
import {chateSms} from "../../socketutilite/socketabonents"

class FriendsBar extends Component {
    constructor(props){
        super(props);
        if (this.props.userId)friendslist(this.props.userId, (res)=>{
            this.props.setUserFrendsListFunction(res);
        });
        this.state={
            a:false,
        }
    }

    open=(e)=> {
        let activ = {
            activId: this.props.friendslist[e.target.value].friendId,
            activAvatar: this.props.friendslist[e.target.value].friendavatar,
            activName: this.props.friendslist[e.target.value].friendName,
        };
        this.props.openUser(activ);
        chateSms(this.props.userId, this.back);
        this.setState({
            a: !this.state.a
        });

    };

    back = (data) => {
        if(this.props.userId) {
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
        }
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
        this.props.delUser(data);
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
        usCh: state.userInfo.usCh,
    }
}

const mapDispatchToProps = dispatch => {
    return{
        setUserFrendsListFunction: (friendslist) => {
            dispatch(setActionUserFriendsList(friendslist))
        },
        setUserBlockFunction: (messages) => {
            dispatch(setActionUserBlock(messages))
        },
        setUserBlockFunctionDel: (messages) => {
            dispatch(setActionUserBlockDel(messages))
        },
        setFunctionChat: (usCh) => {
            dispatch(setActionChat(usCh))
        },
        delUser: (data)=>{
            del(data,dispatch)
        },
        openUser: (data)=>{
            open(data,dispatch)
        },
    }
};

export default connect(MapStateToProps, mapDispatchToProps)(FriendsBar);
