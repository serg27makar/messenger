import React, { Component } from 'react';
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom';
import {setActionUserId, setActionUserName, setActionUserBlock, setActionChat, setActionUserBlockDel} from '../../actions/index'
import {chateSmsIns} from "../../socketutilite/socketabonents"

class Writer extends Component {
    constructor(){
        super();
        this.state = {
            messagese:'',
            userName:'',
            txt:'',
        };
    }

    handleChangeT = event => {
        this.setState({
            messagese: event.target.value,
            userName: this.props.userName
        });
    };

    handleSubmit = () => {
        if(this.props.activFriend.activId) {
            let data = {
                messages: this.state.messagese,
                userName: this.props.userName,
                chatId: this.props.userId + ' ' + this.props.activFriend.activId,
            };
            let date = new Date();
            let options = {
                year: 'numeric',
                month: 'numeric',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric'
            };
            let userText = {
                Text: data.messages,
                userName: data.userName,
                Data:  date.toLocaleString("ru", options),
                chatId: data.chatId,
            };

            chateSmsIns(data);
            this.props.setUserBlockFunction(this.props.messages.push(userText));
            this.setState({
                messagese: '',
                txt: '',
            })
        }else {
            this.setState({
                txt:'выберите адрессата'
            })
        }
    };

    render() {
        if (!this.props.userId || this.props.userId.length !== 24) {
            return <Redirect to='/'/>
        }
        return (
            <div className="chatUser">
                <h1 style={{
                    position: 'absolute',
                    top: '-3em',
                    left: '6em',
                    color: 'red'
                }}>{this.state.txt}</h1>
                <textarea type='text' id="userText" autoFocus maxLength="360"
                          value={this.state.messagese} onChange={this.handleChangeT}/>
                <br/>
                <button id="sendMessage" onClick={this.handleSubmit}>Отправить</button>
            </div>
        )
    }
}

function MapStateToProps(state) {
    return {
        userId: state.userInfo.userId,
        messages: state.userInfo.messages,
        userName: state.userInfo.userName,
        activFriend: state.userInfo.activFriend,
        usCh: state.userInfo.usCh,
    }
}
const mapDispatchToProps = dispatch => {
    return{
        setUserIdFunction: (userId) => {
            dispatch(setActionUserId(userId))
        },
        setUserBlockFunction: (messages) => {
            dispatch(setActionUserBlock(messages))
        },
        setUserNameFunction: (userName) => {
            dispatch(setActionUserName(userName))
        },
        setFunctionChat: (usCh) => {
            dispatch(setActionChat(usCh))
        },
    }
};

export default connect(MapStateToProps, mapDispatchToProps)(Writer);
