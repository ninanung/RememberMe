import React, { Component } from 'react';
import './Login.css';

class Login extends Component {
    render() {
        return(
            <div className="modal">
                <div className="form">
                    <h1 className="inputhead">Login</h1>
                    <hr/>
                    <div className="input">
                        <label>ID</label>
                        <input className="id" type="text" v-model="id" placeholder="ID"/>
                    </div>
                    <div className="input">
                        <label>Password</label>
                        <input className="password" type="password" v-model="password" placeholder="Password" /> 
                    </div>
                    <div className="input">
                        <button>Login</button>
                        <button>Cancel</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login;