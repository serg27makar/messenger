import React, { Component } from 'react';
import {connect} from 'react-redux'

class Profile extends Component {
    render() {
        return (
            <div className="prof">
                <h2 style={{marginLeft: '1em', marginTop: '0.2em'}}>
                    <img  style={{marginRight: '1em'}} src= {this.props.activFriend.activAvatar}
                         title={this.props.activFriend.activName}
                         height={80}/>{this.props.activFriend.activName}:</h2>
            </div>
        )
    }
}

function MapStateToProps(state) {
    return {
        activFriend: state.userInfo.activFriend,
    }
}

export default connect(MapStateToProps)(Profile);
