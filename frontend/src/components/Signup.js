import React, { Component } from 'react';
import contactapi from '../contactapi.js';
import crypt from '../cryption.js';
import check from '../check.js';
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
        this.signupPost = this.signupPost.bind(this);
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
        if(!this.state.id || !this.state.password || !this.state.passwordre || !this.state.email || !this.state.emailre) {
            return alert("모든 작성란을 입력하세요.");
        }
        else if(this.state.id.length < 4 || this.state.id.length > 10) {
            const id = document.getElementById("signup_id_input");
            id.value = null;
            return alert("아이디가 너무 짧거나 깁니다.");
        }
        else if(check.checkKorean(this.state.id) || check.checkKorean(this.state.password) || check.checkKorean(this.state.email)) {
            return alert("아이디와 비밀번호, 이메일에는 한글을 사용하실 수 없습니다.");
        }
        else if(check.checkWhiteSpace(this.state.id) || check.checkWhiteSpace(this.state.password) || check.checkWhiteSpace(this.state.email)) {
            return alert("아이디와 비밀번호, 이메일에는 띄어쓰기를 사용하실 수 없습니다.");
        }
        else if(check.checkUpperDigit(this.state.password)) {
            return alert("비밀번호에는 영어 대문자를 사용하실 수 없습니다.");
        }
        else if(this.state.password !== this.state.passwordre) {
            return alert("비밀번호와 확인이 서로 다릅니다. 비밀번호를 확인해주세요.");
        }
        else if(this.state.email !== this.state.emailre) {
            return alert("이메일과 확인이 서로 다릅니다. 이메일을 확인해 주세요.");
        }
        contactapi.signup(crypt.encryption(this.state.id), crypt.encryption(this.state.password), crypt.encryption(this.state.email))
        .then((res) => {
            if(res.data.error === "true") {
                return alert(res.data.words);
            }
            else {
                window.location.reload(false);
                return alert("회원가입 완료 되었습니다. 로그인 해주세요!");
            }
        })
    }

    render() {
        return(
            <div className="modal">
                <div className="form">
                    <h1 className="inputhead">계정생성</h1>
                    <hr/>
                    <div className="input">
                        <label>아이디</label>
                        <p className="warn">(!)아이디는 4글자 이상 10글자 미만으로 작성해 주세요.</p>
                        <input id="signup_id_input" onChange={this.idChange} type="text" placeholder="ID"/>
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
                        <label>이메일</label>
                        <p className="warn">(!)메일주소는 계정정보 분실시 확인을 위해서만 사용됩니다.</p>
                        <input onChange={this.emailChange} type="email" placeholder="Email" />
                    </div>
                    <div className="input">
                        <label>이메일 확인</label>
                        <input onChange={this.emailreChange} type="email" placeholder="Repeat Email" />
                    </div>
                    <div className="input">
                        <button type="button" onClick={() => this.signupPost()}>계정생성</button>
                        <button type="button" onClick={() => this.props.signupcancel()}>취소</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Signup;