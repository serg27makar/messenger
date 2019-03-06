import React from 'react'
import { setActionUserAvatar} from '../../actions/index'
import {connect} from 'react-redux'


class AvatarsChois extends React.Component {
    constructor(){
        super();
        this.state = {
            a: 'http://localhost:3001/resurse/avatar/',
            arr:[
                'sm01.jpg',
                'sm02.jpg',
                'sm03.jpg',
                'sm04.jpg',
                'sm05.jpg',
                'sm06.jpg',
                'sm07.jpg',
                'sm08.jpg',
                'sm09.jpg',
                'sm10.jpg',
            ]
        }
    }
    numAvatar = e => {
        this.props.setUserAvatarFunction(e.target.src)
    };
    render() {
        return (
            <div style={{textAlign: '-webkit-center'}}>
                <div className="Avatars" > {this.state.arr.map((av)=>{
                    return <div id="avatar" onClick={this.numAvatar} key={av}>
                        <img src= {this.state.a + av}
                             title="avatar"
                        /> </div>
                })}
                </div>
                <h2>выбери аватарку</h2>
            </div>
        )
    }
}

function MapStateToProps(state) {
    return {
        avatar: state.userInfo.avatar,
    }
}
const mapDispatchToProps = dispatch => {
    return{
        setUserAvatarFunction: (avatar) => {
            dispatch(setActionUserAvatar(avatar))
        },
    }
};

export default connect(MapStateToProps, mapDispatchToProps)(AvatarsChois);
