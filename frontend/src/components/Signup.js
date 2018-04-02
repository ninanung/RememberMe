import React, { Component } from 'react';
import { signupCancel } from '../store/action.js';
import contactapi from '../contactapi.js';
import './Signup.css';

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: "",
            password: "",
            passwordre: "",
            email: "",
            emailre: ""
        }
        this.idChange = this.idChange.bind(this);
        this.passwordChange = this.passwordChange.bind(this);
        this.passwordreChange = this.passwordreChange.bind(this);
        this.emailChange = this.emailChange.bind(this);
        this.emailreChange = this.emailreChange.bind(this);
        this.signupPost = this.loginPost.bind(this);
    }

    idChange(e) {
        this.setState({
            id: e.target.value,
            password: this.state.password,
            passwordre: this.state.passwordre,
            email: this.state.email,
            emailre: this.state.emailre
        })
    }

    passwordChange(e) {
        this.setState({
            id: this.state.id,
            password: e.target.value,
            passwordre: this.state.passwordre,
            email: this.state.email,
            emailre: this.state.emailre
        })
    }

    passwordreChange(e) {
        this.setState({
            id: this.state.id,
            password: this.state.password,
            passwordre: e.target.value,
            email: this.state.email,
            emailre: this.state.emailre
        })
    }

    emailChange(e) {
        this.setState({
            id: this.state.id,
            password: this.state.password,
            passwordre: this.state.passwordre,
            email: e.target.value,
            emailre: this.state.emailre
        })
    }

    emailreChange(e) {
        this.setState({
            id: this.state.id,
            password: this.state.password,
            passwordre: this.state.passwordre,
            email: this.state.email,
            emailre: e.target.value
        })
    }

    signupPost() {
        contactapi.signup(this.state.id, this.state.password, this.state.email)
    }

    render() {
        return(
            <div className="modal">
                <div className="form">
                    <h1 className="inputhead">계정생성</h1>
                    <hr/>
                    <div className="input">
                        <label>아이디</label>
                        <input onChange={this.idChange} type="text" placeholder="ID"/>
                    </div>
                    <div className="input">
                        <label>비밀번호</label>
                        <input onChange={this.passwordChange} type="password" placeholder="Password" /> 
                    </div>
                    <div className="input">
                        <label>비밀번호 확인</label>
                        <input onChange={this.passwordreChange} type="password" placeholder="Repeat Password" /> 
                    </div>
                    <div className="input">
                        <p className="warn">(!)메일주소는 계정정보 분실시 확인을 위해서만 사용됩니다.</p>
                        <label>이메일</label>
                        <input onChange={this.emailChange} type="email" placeholder="Email" />
                    </div>
                    <div className="input">
                        <label>이메일 확인</label>
                        <input onChange={this.emailreChange} type="email" placeholder="Repeat Email" />
                    </div>
                    <div className="input">
                        <button onClick={() => this.signupPost()}>계정생성</button>
                        <button onClick={() => this.props.signupcancel()}>취소</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Signup;