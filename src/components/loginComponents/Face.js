import React from 'react'
import {connect} from 'react-redux'

class Face extends React.Component {
    constructor(){
        super();
        this.state = {
            a: 'http://localhost:3001/resurse/avatar/',
        }
    }
    render() {
        return (
            <div style={{textAlign: '-webkit-center'}}>
                <img
                    src= {(!this.props.avatar)? ('http://localhost:3001/resurse/avatar/sm00.jpg'):(this.props.avatar)}
                    title={this.props.userName}
                    height={100}
                    alt='avatar'
                />
            </div>
        )
    }
}

function MapStateToProps(state) {
    return {
        avatar: state.userInfo.avatar,
        userName: state.userInfo.userName,
    }
}

export default connect(MapStateToProps)(Face);
