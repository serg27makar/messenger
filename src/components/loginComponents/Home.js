import React, { Component } from 'react';
import Navigation from "./Navigation";
import {linksArr} from './linksArr'
import Textresult from "./Textresult";
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux'
import {setActionUserId, setActionUserName, setActionUserAvatar} from '../../actions/index'
import {setActionServerGet} from '../../utilite/serverGet'

let linkVar=[];

class Home extends Component {
    linkState=(li)=>{
        linkVar = li
    };
    componentWillMount(){
        linksArr('/',this.linkState);
        setActionServerGet(this.startPage);
    }

    startPage=(call)=>{
        if(call === 401){
            console.log(call)
        }else if(call === 'scm'){
            console.log(call)
        }else{
            this.props.setUserIdFunction(call._id);
            this.props.setUserNameFunction(call.userName);
            this.props.setUserAvatarFunction(call.avatar);

        }
    };

    render() {
        if (this.props.userId) {
            if (this.props.userId.length === 24) {
                return <Redirect to='/messanger'/>
            }
        }

        return (
            <div className="Login">
                <Textresult txt='yuo must register or login' />
                <img
                    src='http://localhost:3001/resurse/images.jpg'
                    title="image"
                    height='330px'
                />
                <Navigation links={linkVar}/>
            </div>
        );
    }
}
function MapStateToProps(state) {
    return {
        userId: state.userInfo.userId,
        userName: state.userInfo.userName,
        avatar: state.userInfo.avatar,
    }
}
const mapDispatchToProps = dispatch => {
    return{
        setUserIdFunction: (userId) => {
            dispatch(setActionUserId(userId))
        },
        setUserNameFunction: (userName) => {
            dispatch(setActionUserName(userName))
        },
        setUserAvatarFunction: (avatar) => {
            dispatch(setActionUserAvatar(avatar))
        },
    }
};

export default connect(MapStateToProps, mapDispatchToProps)(Home);
