import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { loginCancel } from '../store/action.js';
import contactapi from '../contactapi.js';
import crypt from '../cryption.js';
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
        contactapi.login(crypt.encryption(this.state.id), crypt.encryption(this.state.password)).then(
            (res) => {
                if(res.data.error === "true") {
                    return alert(res.data.words);
                }
                else {
                    sessionStorage.setItem("Reid", crypt.decryption(res.data.id));
                    sessionStorage.setItem("Reemail", crypt.decryption(res.data.email));
                    window.location.reload(false);
                    return alert("로그인 되었습니다.");
                }
            }
        )
    }

    render() {
        return(
            <div className="modal">
                <form className="form">
                    <h1 className="inputhead">로그인</h1>
                    <hr/>
                    <div className="input">
                        <label>아이디</label>
                        <input onChange={this.idChange} className="id" type="text" placeholder="ID"/>
                    </div>
                    <div className="input">
                        <label>비밀번호</label>
                        <input onChange={this.passwordChange} className="password" type="password" placeholder="Password" /> 
                    </div>
                    <div className="input">
                        <button type="button" onClick={() => this.loginPost()}>로그인</button>
                        <button type="button" onClick={() => this.props.logincancel()}>취소</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default Login;