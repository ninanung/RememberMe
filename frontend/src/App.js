import React, { Component } from 'react';
import logo from './icon.png';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div className="buttons">
            <button className="btn btn-default button">로그인</button>
            <button className="btn btn-default button">계정생성</button>
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
