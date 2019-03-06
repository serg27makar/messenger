import React from 'react'
import {connect} from 'react-redux'
import {friends} from "../../../socketutilite/socketabonents"
import {abonents} from "../../../socketutilite/socketabonents"
import {setActionUserAbonents, setActionUserFriendsList} from "../../../actions/index"
import {friendslist} from "../../../socketutilite/socketabonents"

class Abonents extends React.Component{
    constructor(props){
        super(props);
        if (this.props.userId)abonents(this.back);
        this.state={
            status: false,
        }
    }

    invite =(e)=>{
        let data = {
            userId: this.props.userId,
            avatar: this.props.avatar,
            userName: this.props.userName,
            friendId: this.props.abonents[e.target.value]._id,
            friendavatar: this.props.abonents[e.target.value].avatar,
            friendName: this.props.abonents[e.target.value].userName,
        };
        friends(data);
        friendslist(this.props.userId, this.call);
        abonents(this.back);
        this.setState({
            status: !this.state.status,
        })
    };

    back = (data) =>{
        if (localStorage.token && this.props.friendslist) {
            data.map((av) => {
                if (av._id === localStorage.token) {
                    data.splice(data.indexOf(av), 1);
                }
            });
            this.props.setUserAbonentsFunction(data);
            this.props.friendslist.map((fr) => {
                this.props.abonents.map((a) => {
                    if (fr.friendId === a._id) {
                        this.props.abonents.splice(this.props.abonents.indexOf(a), 1);
                    }
                });
            });
            this.props.setUserAbonentsFunction(this.props.abonents);
            this.setState({
                status: !this.state.status,
            })
        } else if(localStorage.token){
            data.map((av) => {
                if (av._id === localStorage.token) {
                    data.splice(data.indexOf(av), 1);
                }
            });
            this.props.setUserAbonentsFunction(data);
            this.setState({
                status: !this.state.status,
            })
        }
    };
    call = res => {
        this.props.setUserFrendsListFunction(res);
    };

    render(){
        return (
            <div>
                {
                    this.props.abonents.map((av) => {
                    return <div id="abonent" key={av._id}>
                        <div>
                            <img src={av.avatar} title={av.userName} height={50}/>
                            <button id="invite" onClick={this.invite} value={this.props.abonents.indexOf(av)}>пригласить</button>
                        </div>
                        <h4 style={{margin: '1px'}}>{av.userName}</h4>
                    </div>
                })}
            </div>
        );
    }
}

function MapStateToProps(state) {
    return {
        userId: state.userInfo.userId,
        avatar: state.userInfo.avatar,
        userName: state.userInfo.userName,
        friendslist: state.userInfo.friendslist,
        abonents: state.userInfo.abonents,
    }
}
const mapDispatchToProps = dispatch => {
    return{
        setUserAbonentsFunction: (abonents) => {
            dispatch(setActionUserAbonents(abonents))
        },
        setUserFrendsListFunction: (friendslist) => {
            dispatch(setActionUserFriendsList(friendslist))
        },

    }
};

export default connect(MapStateToProps, mapDispatchToProps)(Abonents);

