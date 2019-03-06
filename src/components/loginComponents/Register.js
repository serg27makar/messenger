import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import Textresult from "./Textresult";
import Navigation from "./Navigation";
import {setActionUserAvatar, setActionUserId, setActionUserName} from '../../actions/index'
import {connect} from 'react-redux'
import {setActionServerPost} from '../../utilite/serverAxios'
import {linksArr} from "./linksArr"
import AvatarsChois from "./AvatarsChois";
import Face from "./Face";

let linkVar = [];

class Register extends Component {
    constructor(props){
        super(props);
        this.state = {
            userName:'',
            userEmail:'',
            userPassword:'',
            txt:'register to login',
            change:''
        };
    }

    handleChangeE = event => {
        this.setState({ userEmail: event.target.value });
    };
    handleChangeP = event => {
        this.setState({ userPassword: event.target.value });
    };
    handleChangeN = event => {
        this.setState({ userName: event.target.value });
    };
    codeFun=(code)=> {
        if(code.change){
            this.props.setUserIdFunction(code.change);
            this.props.setUserNameFunction(code.nickName);
            this.props.setUserAvatarFunction(code.avatar);
        }
        this.setState({
            txt:code.txt,
            userEmail:'',
            userPassword:'',
        });
    };

    handleSubmit = event => {
        event.preventDefault();
        if(this.state.userName && this.state.userName.length >= 4 &&  this.state.userName.length <= 9 ){
            let variant = {
                direct: "register",
                email: this.state.userEmail,
                password: this.state.userPassword,
                nickname: this.state.userName,
                avatar: this.props.avatar,
            };
            setActionServerPost(variant,this.codeFun);
        }else {
            this.setState({
                txt:'Никнейм должен быть не меньше 4 и не больше 9 символов',
                userPassword:'',
                userName:''
            })
        }
    };

    linkState=(li)=>{
        linkVar = li
    };
    componentWillMount(){
        linksArr('register',this.linkState);
    }

    render() {
        if (this.props.userId) {
            if (this.props.userId.length === 24) {
                return <Redirect to='/messanger'/>
            }
        }
        return (
            <div>
                <div className="Login" >
                    <form onSubmit={this.handleSubmit}>
                        <fieldset style={{borderRadius: '10px'}}>
                            <legend>Authentication</legend>
                            <fieldset>
                                <legend>Enter email:</legend>
                                <input type='email' name="userEmail" value={this.state.userEmail} onChange={this.handleChangeE} style={{fontSize: 'x-large'}}/>
                            </fieldset>
                            <fieldset>
                                <legend>Think up a nickname:</legend>
                                <input type='text' name="userName" value={this.state.userName} onChange={this.handleChangeN} style={{fontSize: 'x-large'}}/>
                            </fieldset>
                            <fieldset>
                                <legend>Enter password:</legend>
                                <input type='password' name="userPassword" value={this.state.userPassword} onChange={this.handleChangeP} style={{fontSize: 'x-large'}} />
                            </fieldset>
                        </fieldset>
                        <Textresult txt={this.state.txt}/>
                        <button id="sendRegister" >Register</button>
                    </form>
                    <div id="face">
                        <Face/>
                    </div>
                    <Navigation links={linkVar}/>
                    <AvatarsChois/>
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
        }
    }
};

export default connect(MapStateToProps, mapDispatchToProps)(Register);
