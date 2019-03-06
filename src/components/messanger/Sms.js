import React, { Component } from 'react';
import { setActionUserBlock, setActionUserWhoSpeak} from '../../actions/index'
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
    componentDidMount() {
        this.setState({
            dummy: true
        });
    }
    componentDidUpdate() {
        this.scrollToBottom();
    }
    shouldComponentUpdate(nextProps, nextState){
        return  this.props.messages.length !== nextProps.messages.length || this.state.dummy !== nextState.dummy;
    }
    render() {
        return (
            <div>
                <div >{this.props.messages.map((messages)=>{
                    return <div id={(messages.chatId === this.props.userId + ' ' + this.props.activFriend.activId ? 'message' : 'recmessage')} key={messages._id}>
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
        whoSpeak: state.userInfo.whoSpeak,
    }
}
const mapDispatchToProps = dispatch => {
    return{
        setUserBlockFunction: (messages) => {
            dispatch(setActionUserBlock(messages))
        },
        setFunctionWhoSpeak: (whoSpeak) => {
            dispatch(setActionUserWhoSpeak(whoSpeak))
        },

    }
};

export default connect(MapStateToProps, mapDispatchToProps)(Sms);
