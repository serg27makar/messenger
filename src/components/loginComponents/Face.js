import React from 'react'
import { setActionUserAvatar} from '../../actions/index'
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
const mapDispatchToProps = dispatch => {
    return{
        setUserAvatarFunction: (avatar) => {
            dispatch(setActionUserAvatar(avatar))
        },
    }
};

export default connect(MapStateToProps, mapDispatchToProps)(Face);
