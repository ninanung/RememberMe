import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { loginCancel } from '../store/action.js';
import contactapi from '../contactapi.js';
import './Login.css';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: "",
            password: ""
        }
        this.idChange = this.idChange.bind(this);
        this.passwordChange = this.passwordChange.bind(this);
        this.loginPost = this.loginPost.bind(this);
    }

    idChange(e) {
        this.setState({
            id: e.target.value,
            password: this.state.password
        })
    }

    passwordChange(e) {
        this.setState({
            id: this.state.id,
            password: e.target.value
        })
    }

    loginPost() {
        if(!this.state.id || !this.state.password) {
            return alert("모든 작성란을 작성해 주세요.");
        }
        contactapi.login(this.state.id, this.state.password)
        .then((res) => {
            if(res.data.error == "true") {
                return alert(res.data.words);
            }
            else {
                const user = {
                    id: res.data.id,
                    email: res.data.email
                }
                window.sessionStorage.user = JSON.stringify(user);
                window.location.reload(false);
                return alert("로그인 되었습니다!");
            }
        })
    }

    render() {
        return(
            <div className="modal">
                <div className="form">
                    <h1 className="inputhead">로그인</h1>
                    <hr/>
                    <div className="input">
                        <label>아이디</label>
                        <input onChange={this.idChange} className="id" type="text" v-model="id" placeholder="ID"/>
                    </div>
                    <div className="input">
                        <label>비밀번호</label>
                        <input onChange={this.passwordChange} className="password" type="password" v-model="password" placeholder="Password" /> 
                    </div>
                    <div className="input">
                        <button onClick={() => this.loginPost()}>로그인</button>
                        <button onClick={() => this.props.logincancel()}>취소</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login;