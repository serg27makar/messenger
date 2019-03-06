import React, { Component } from 'react';
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom';
import Menu from './profile/Menu'
import Activ from './profile/Activ'

class Profile extends Component {
    render() {
        if (!this.props.userId || this.props.userId.length !== 24) {
            return <Redirect to='/'/>
        }
        return (
            <div className="profile">
                <img src= {this.props.avatar} title={this.props.userName} height={100} alt={this.props.userName}/>
                <h2>{this.props.userName}:</h2>
                <Menu/>
                <div>
                    <Activ/>
                </div>
            </div>
        )
    }
}

function MapStateToProps(state) {
    return {
        userId: state.userInfo.userId,
        avatar: state.userInfo.avatar,
        userName: state.userInfo.userName,
    }
}

export default connect(MapStateToProps)(Profile);
