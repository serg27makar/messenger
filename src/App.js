import React, { Component } from 'react';
import {Router, Route} from 'react-router-dom'
import createBrowserHistory from 'history/createBrowserHistory'
import Home from "./components/loginComponents/Home";
import Login from "./components/loginComponents/Login";
import Register from "./components/loginComponents/Register";
import Messanger from "./components/loginComponents/Messanger";
import { subscribeToTimer } from './api';

const history = createBrowserHistory();

class App extends Component {
    constructor(props) {
        super(props);
        subscribeToTimer((err, timestamp) => this.setState({
            timestamp
        }));
        this.state = {
            timestamp: 'no timestamp yet'
        };
    }

    componentWillMount(){
    }

    render() {
        return (
            <div>
                <Navigat />
                <p className="App-intro">{this.state.timestamp}</p>
            </div>

    );
    }
}

class Navigat extends Component {
    render() {
        return (
            <Router history={history}>
                <div className="routers">
                    <Route exact path='/' component={Home}/>
                    <Route path='/login' component={Login}/>
                    <Route path='/register' component={Register}/>
                    <Route path='/messanger' component={Messanger}/>

                </div>
            </Router>
        );
    }
}


export default App;
