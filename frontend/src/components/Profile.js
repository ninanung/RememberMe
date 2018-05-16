import React, { Component } from 'react';
import contactapi from '../contactapi.js';
import crypt from '../cryption.js';
import check from '../check.js';

class Profile extends Component {
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
        this.profilePost = this.profilePost.bind(this);
    }

    componentDidMount() {
        const id = document.getElementById("profile_id_input");
        const password = document.getElementById("profile_password_input");
        const passwordconfirm = document.getElementById("profile_password_confirm_input");
        const email = document.getElementById("profile_email_input");
        const emailconfirm = document.getElementById("profile_email_confirm_input");
        id.value = sessionStorage.getItem("Reid");
        password.value = crypt.decryption(sessionStorage.getItem("Repassword"));
        passwordconfirm.value = crypt.decryption(sessionStorage.getItem("Repassword"));
        email.value = sessionStorage.getItem("Reemail");
        emailconfirm.value = sessionStorage.getItem("Reemail");
        this.setState({
            id: sessionStorage.getItem("Reid"),
            password: crypt.decryption(sessionStorage.getItem("Repassword")),
            passwordre: crypt.decryption(sessionStorage.getItem("Repassword")),
            email: sessionStorage.getItem("Reemail"),
            emailre: sessionStorage.getItem("Reemail")
        })
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

    profilePost() {
        if(!this.state.id || !this.state.password || !this.state.passwordre || !this.state.email || !this.state.emailre) {
            return alert("모든 작성란을 입력하세요.");
        }
        else if(this.state.id.length < 4 || this.state.id.length > 10) {
            const id = document.getElementById("profile_id_input");
            id.value = null;
            return alert("아이디가 너무 짧거나 깁니다.");
        }
        else if(check.checkKorean(this.state.id) || check.checkKorean(this.state.password) || check.checkKorean(this.state.email)) {
            return alert("아이디와 비밀번호, 이메일에는 한글을 사용하실 수 없습니다.");
        }
        else if(check.checkBlockSomeSpecioal(this.state.id) || check.checkBlockSomeSpecioal(this.state.password) || check.checkBlockSomeSpecioal(this.state.email)) {
            return alert("특수문자 ','와 '/'는 계정생성에 사용하실 수 없습니다.");
        }
        else if(check.checkSpecial(this.state.id)) {
            return alert("아이디에는 특수문자를 사용하실 수 없습니다.");
        }
        else if(check.checkWhiteSpace(this.state.id) || check.checkWhiteSpace(this.state.password) || check.checkWhiteSpace(this.state.email)) {
            return alert("아이디와 비밀번호, 이메일에는 띄어쓰기를 사용하실 수 없습니다.");
        }
        else if(this.state.password !== this.state.passwordre) {
            return alert("비밀번호와 확인이 서로 다릅니다. 비밀번호를 확인해주세요.");
        }
        else if(this.state.email !== this.state.emailre) {
            return alert("이메일과 확인이 서로 다릅니다. 이메일을 확인해 주세요.");
        }
        const originid = window.sessionStorage.getItem("Reid");
        contactapi.profile(crypt.encryption(originid), crypt.encryption(this.state.id), crypt.encryption(this.state.password), crypt.encryption(this.state.email))
        .then((res) => {
            if(res.data.error === "true") {
                return alert(res.data.words);
            }
            else {
                sessionStorage.setItem("Reid", crypt.decryption(res.data.id));
                sessionStorage.setItem("Reemail", crypt.decryption(res.data.email));
                sessionStorage.setItem("Repassword", res.data.password);
                window.location.reload(false);
                return alert("계정정보가 변경되었습니다!");
            }
        });
    }

    render() {
        return (
            <div className="insert-body">
                <div className="form">
                    <h1 className="inputhead">기존 프로필</h1>
                    <h2>아이디</h2>
                    <h3>{ sessionStorage.getItem("Reid") }</h3>
                    <h2>비밀번호</h2>
                    <h3>{ crypt.decryption(sessionStorage.getItem("Repassword")) }</h3>
                    <h2>이메일</h2>
                    <h3>{ sessionStorage.getItem("Reemail") }</h3>
                    <br/>
                    <h1 className="inputhead">프로필 변경</h1>
                    <hr/>
                    <div className="input">
                        <label>아이디</label>
                        <p className="warn">(!)아이디는 4글자 이상 10글자 미만으로 작성해 주세요.</p>
                        <input id="profile_id_input" onChange={this.idChange} type="text" placeholder="ID"/>
                    </div>
                    <div className="input">
                        <label>비밀번호</label>
                        <input id="profile_password_input" onChange={this.passwordChange} type="password" placeholder="Password" /> 
                    </div>
                    <div className="input">
                        <label>비밀번호 확인</label>
                        <input id="profile_password_confirm_input" onChange={this.passwordreChange} type="password" placeholder="Repeat Password" /> 
                    </div>
                    <div className="input">
                        <label>이메일</label>
                        <p className="warn">(!)메일주소는 계정정보 분실시 확인을 위해서만 사용됩니다.</p>
                        <input id="profile_email_input" onChange={this.emailChange} type="email" placeholder="Email" />
                    </div>
                    <div className="input">
                        <label>이메일 확인</label>
                        <input id="profile_email_confirm_input" onChange={this.emailreChange} type="email" placeholder="Repeat Email" />
                    </div>
                    <div className="input">
                        <button type="button" onClick={() => this.profilePost()}>변경</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Profile;