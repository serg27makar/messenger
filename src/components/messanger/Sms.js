import React, { Component } from 'react';
import {connect} from 'react-redux'

class Sms extends Component {
    constructor(){
        super();
        this.state = {
            dummy: false
        }
    }
    scrollToBottom = () => {
        this.messagesEnd.scrollIntoView({ behavior: "smooth" });
    };
    componentDidUpdate() {
        this.scrollToBottom();
    }
    shouldComponentUpdate(nextProps){
        return  this.props.messages.length !== nextProps.messages.length;
    }
    render() {
        return (
            <div>
                <div >{this.props.messages.map((messages)=>{
                    if(!messages.chatId)return console.log('пустой sms');
                    return <div id={(messages.chatId === this.props.userId + ' ' + this.props.activFriend.activId ? 'message' : 'recmessage')} key={messages._id || messages.Data}>
                        <h4 style={{margin: '0'}}> { messages.userName}:</h4>
                        {messages.Text}
                        <hr/>
                        <p style={{margin: '0', fontSize: 'x-small',}}>{messages.Data}</p>
                    </div>
                })}</div>
                <div style={{ float:"left", clear: "both" }}
                     ref={(el) => { this.messagesEnd = el; }}>
                </div>
            </div>
        );
    }
}

function MapStateToProps(state) {
    return {
        userId: state.userInfo.userId,
        activFriend: state.userInfo.activFriend,
        messages: state.userInfo.messages,
    }
}

export default connect(MapStateToProps)(Sms);
