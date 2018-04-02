import React, { Component } from 'react';
import { loginCancel } from '../store/action.js';
import './Login.css';

class Login extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div className="modal">
                <div className="form">
                    <h1 className="inputhead">로그인</h1>
                    <hr/>
                    <div className="input">
                        <label>아이디</label>
                        <input className="id" type="text" v-model="id" placeholder="ID"/>
                    </div>
                    <div className="input">
                        <label>비밀번호</label>
                        <input className="password" type="password" v-model="password" placeholder="Password" /> 
                    </div>
                    <div className="input">
                        <button>로그인</button>
                        <button onClick={() => this.props.logincancel()}>취소</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login;