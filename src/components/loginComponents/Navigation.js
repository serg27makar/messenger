import React, { Component } from 'react';
import {Link} from 'react-router-dom'

class Navigation extends Component {
    render() {
        return (
            <div className="Navigation" style={{marginLeft: '-2em'}}>
                <ul className="submenu">
                    {this.props.links.map((el)=>{
                        if (el.show){
                           return <li  key={el.to} style={{listStyle: 'none'}}><h2><Link to={el.to} >{el.name}</Link></h2></li>
                          }
                        else {
                            return null
                        }
                    })}
                </ul>
            </div>
        );
    }
}

export default Navigation;
