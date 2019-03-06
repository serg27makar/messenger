import React, { Component } from 'react';
import Sms from "./Sms";

class Chat extends Component {

    render() {
        return (
            <div className="chat">
                <div className="chatWindow">
                    <Sms/>
                </div>
            </div>
        )
    }
}

export default Chat;
