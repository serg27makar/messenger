import React, { Component } from 'react';
import Profile from '../messanger/Profile'
import FriendsBar from '../messanger/FriendsBar'
import Chat from '../messanger/Chat'
import Writer from '../messanger/Writer'

class Messanger extends Component {
    render() {
        return (
            <div className="Messanger">
                <Profile/>
                <FriendsBar/>
                <Chat/>
                <Writer/>
            </div>
        );
    }
}

export default Messanger;
