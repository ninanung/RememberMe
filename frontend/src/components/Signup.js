import React, { Component } from 'react';
import { signupCancel } from '../store/action.js';
import './Signup.css';

class Signup extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div className="modal">
                <div className="form">
                    <h1 className="inputhead">계정생성</h1>
                    <hr/>
                    <div className="input">
                        <label>아이디</label>
                        <input type="text" placeholder="ID"/>
                    </div>
                    <div className="input">
                        <label>비밀번호</label>
                        <input type="password" placeholder="Password" /> 
                    </div>
                    <div className="input">
                        <label>비밀번호 확인</label>
                        <input type="password" placeholder="Repeat Password" /> 
                    </div>
                    <div className="input">
                        <p className="warn">(!)메일주소는 계정정보 분실시 확인을 위해서만 사용됩니다.</p>
                        <label>이메일</label>
                        <input type="email" placeholder="Email" />
                    </div>
                    <div className="input">
                        <label>이메일 확인</label>
                        <input type="email" placeholder="Repeat Email" />
                    </div>
                    <div className="input">
                        <button>계정생성</button>
                        <button onClick={() => this.props.signupcancel()}>취소</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Signup;