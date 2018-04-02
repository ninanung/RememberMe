import React, { Component } from 'react';
import './Signup.css';

class Signup extends Component {
    render() {
        return(
            <div className="modal">
                <div className="form">
                    <h1 className="inputhead">Signup</h1>
                    <hr/>>
                    <div className="input">
                        <label>ID</label>
                        <input type="text" placeholder="ID"/>
                    </div>
                    <div className="input">
                        <label>Password</label>
                        <input type="password" placeholder="Password" /> 
                    </div>
                    <div className="input">
                        <label>Repeat Password</label>
                        <input type="password" placeholder="Repeat Password" /> 
                    </div>
                    <div className="input">
                        <label>Email</label>
                        <input type="email" placeholder="Email" />
                    </div>
                    <div className="input">
                        <label>Repeat Email</label>
                        <input type="email" placeholder="Repeat Email" />
                    </div>
                    <div className="input">
                        <button>Signup</button>
                        <button>Cancel</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Signup;