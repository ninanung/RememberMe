import React, { Component } from "react";
import contactapi from '../contactapi.js';
import crypt from '../cryption.js';

class FindAccount extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: ""
        }
        this.emailChange = this.emailChange.bind(this);
        this.findPost = this.findPost.bind(this);
    }

    emailChange(e) {
        this.setState({
            email: e.target.value
        })
    }

    findPost() {
        if(!this.state.email) {
            return alert("작성란을 작성해 주세요.");
        }
        contactapi.find(crypt.encryption(this.state.email))
        .then((res) => {
            if(res.data.error === "true") {
                return alert(res.data.words);
            }
            else {
                window.location.reload(false);
                return alert(res.data.words);
            }
        })
    }

    render() {
        return (
            <div className="modal">
                <form className="form">
                    <h1 className="inputhead">계정찾기</h1>
                    <hr/>
                    <div className="input">
                        <label>Email을 입력하세요</label>
                        <p>본 메일 주소는 계정생성 당시 사용했던 email주소입니다.</p>
                        <input onChange={this.emailChange} type="email" placeholder="Email"/>
                    </div>
                    <div className="input">
                        <button type="button" onClick={() => this.findPost()}>찾기</button>
                        <button type="button" onClick={() => this.props.findcancel()}>취소</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default FindAccount;