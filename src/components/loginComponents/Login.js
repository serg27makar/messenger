import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import Textresult from './Textresult'
import Navigation from "./Navigation";
import {setActionUserId, setActionUserName, setActionUserAvatar, setActionUserFriends, setActionUserFriendsList} from '../../actions/index'
import {connect} from 'react-redux'
import {setActionServerPost} from '../../utilite/serverAxios'
import {linksArr} from  "./linksArr"


let linkVar = [];

class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            userName:'',
            userEmail:'',
            userPassword:'',
            txt:'Enter your login',
            change:''
        };
    }

    handleChangeE = event => {
        this.setState({ userEmail: event.target.value });
    };
    handleChangeP = event => {
        this.setState({ userPassword: event.target.value });
    };
    codeFun=(code)=> {
        if(!code.change){
            this.setState({
                txt: code.txt,
                userEmail: '',
                userPassword: ''
            });
        }else {
            this.props.setUserIdFunction(code.change);
            this.props.setUserNameFunction(code.nickName);
            this.props.setUserAvatarFunction(code.avatar);
            this.props.setUserFrendsListFunction(code.friendslist)
        }
    };

    handleSubmit = event => {
        event.preventDefault();
        let variant = {
            direct: "login",
            email: this.state.userEmail,
            password: this.state.userPassword
        };
        setActionServerPost(variant,this.codeFun);

    };

    linkState=(li)=>{
        linkVar = li
    };
    componentWillMount(){
        linksArr('login',this.linkState);
    }

    render() {

        if (this.props.userId) {
            if (this.props.userId.length === 24) {
                return <Redirect to='/messanger'/>
            }
        }
        return (
            <div>
                <div className="Login">
                    <form onSubmit={this.handleSubmit}>
                        <fieldset style={{borderRadius: '10px'}}>
                            <legend>Please login</legend>
                            <fieldset>
                                <legend>Enter email:</legend>
                                <input type='email' name="userEmail" value={this.state.userEmail} onChange={this.handleChangeE} style={{fontSize: 'x-large'}} />
                            </fieldset>
                            <fieldset>
                                <legend>Enter password:</legend>
                                <input type='password' name="userPassword" value={this.state.userPassword} onChange={this.handleChangeP} style={{fontSize: 'x-large'}}/>
                            </fieldset>
                        </fieldset>
                        <Textresult txt = {this.state.txt} />
                        <br/>
                        <button type="submit" id="sendRegister">Login</button>
                    </form>
                    <br/>
                    <Navigation links={linkVar}/>
                </div>
            </div>
        )
    }
}

function MapStateToProps(state) {
    return {
        userId: state.userInfo.userId,
        userName: state.userInfo.userName,
        avatar: state.userInfo.avatar,
        userFriends: state.userInfo.userFriends,
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
        setUserFriendsFunction: (friends) => {
            dispatch(setActionUserFriends(friends))
        },
        setUserFrendsListFunction: (friendslist) => {
            dispatch(setActionUserFriendsList(friendslist))
        },

    }
};

export default connect(MapStateToProps, mapDispatchToProps)(Login);
