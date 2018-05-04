import React, { Component } from 'react';
import contactapi from '../contactapi.js';
import crypt from '../cryption.js';
import './Insert.css';

function getUrlDomain(string) {
    const str = string;
    const res = str.split("/");
    if(res[0] === "https:" || res[0] === "http:") {
        res.splice(0, 2);
        res.splice(1, 100);
    }
    else {
    	res.splice(1, 100);
    }
    const laststring = res[0].split(".");
    if(laststring.length > 2) {
    	laststring.splice(0, 1);
    }
    return laststring[0];
}

class Insert extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url: "",
            id: "",
            password: ""
        }
    }

    insertUrlChange = (e) => {
        this.setState({
            url: e.target.value
        })
    }
    insertIdChange = (e) => {
        this.setState({
            id: e.target.value
        })
    }
    insertPasswordChange = (e) => {
        this.setState({
            password: e.target.value
        })
    }
    insertPost = () => {
        if(!this.state.url || !this.state.id || !this.state.password) {
            return alert("모든 작성란을 채워주세요.");
        }
        const id = window.sessionStorage.getItem("Reid");
        const url = getUrlDomain(this.state.url);
        const isConfirm = global.confirm("해당 URL에 이미 계정이 있었던 경우 덮어쓰기 됩니다.\nid: " + this.state.id + ", password: " + this.state.password + "\n계정정보가 맞나요?");
        if(isConfirm) {
            contactapi.insert(crypt.encryption(url), crypt.encryption(id), crypt.encryption(this.state.id), crypt.encryption(this.state.password))
            .then((res) => {
                if(res.data.error === "true") {
                    return alert(res.data.words);
                }
                else {
                    window.location.reload(false);
                    return alert("계정이 추가되었습니다.")
                }
            })
        }
    }


    render() {
        return(
            <div>
                <div className="insert-body">
                    <form className="form">
                        <h1 className="insert-head-text">계정추가</h1>
                        <hr/>
                        <div className="url-input">
                            <label>페이지 URL</label>
                            <p className="url-text">URL을 그대로 복사하여 넣으시면 됩니다.</p>
                            <input onChange={this.insertUrlChange} className="inserturl" type="text" placeholder="URL"/>
                        </div>
                        <div className="input">
                            <label>아이디</label>
                            <input onChange={this.insertIdChange} className="insertid" type="text" placeholder="ID"/>
                        </div>
                        <div className="input">
                            <label>비밀번호</label>
                            <input onChange={this.insertPasswordChange} className="insertpassword" type="password" placeholder="Password" /> 
                        </div>
                        <div className="input">
                            <button type="button" onClick={() => this.insertPost()}>추가</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default Insert;