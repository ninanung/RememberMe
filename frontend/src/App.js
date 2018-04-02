import React, { Component } from 'react';
import logo from './icon.png';
import './App.css';
import { loginPopup, signupPopup } from './store/action.js';
import Login from './components/Login.js';
import Signup from './components/Signup.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
    this.signup = this.signup.bind(this);
  }

  login() {
    console.log("!!!!");
    this.props.store.dispatch(loginPopup());
    this.forceUpdate();
  }

  signup() {
    console.log("????");
    this.props.store.dispatch(signupPopup());
    this.forceUpdate();
  }

  render() {
    return (
      <div className="App">
        { this.props.store.getState().login ? <Login /> : null }
        { this.props.store.getState().signup ? <Signup /> : null }
        <header className="App-header">
          <div className="buttons">
            <button onClick={() => this.login()} className="btn btn-default button">로그인</button>
            <button onClick={() => this.signup()} className="btn btn-default button">계정생성</button>
          </div>
          <div className="buttons">
            <button className="btn btn-default button">로그아웃</button>
          </div>
          <div className="empty-div"></div>
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title"><a href="/">RememberMe</a></h1>
        </header>
        <div className="text-bundle">
          <p className="App-intro">
            우리는 당신의 계정을 기억합니다.
          </p>
          <p className="App-intro">
            우리는 당신의 계정을 알려드립니다.
          </p>
          <p className="App-intro">
            원한다면 언제든지 기억합니다.
          </p>
          <p className="App-intro">
            하지만 오직 당신에게만 알려드립니다.
          </p>
          <p className="App-intro">
            <a href="/readme">사용법을 알고싶으신가요?</a>
          </p>
        </div>
        <div className="App-footer">
          <p className="App-footer-text">
            Contact Us:
            <br/>
            ninanung@naver.com
          </p>
          <p className="App-footer-text">
            Source Code:
            <br/>
            https://github.com/2018capstone/RememberMe
          </p>
        </div>
      </div>
    )
  }
}

export default App;
