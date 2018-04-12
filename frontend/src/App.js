import React, { Component } from 'react';
import logo from './icon.png';
import './App.css';
import { loginPopup, signupPopup, loginCancel, signupCancel } from './store/action.js';
import { Route, BrowserRouter, Link, Switch, NavLink } from 'react-router-dom';

import Login from './components/Login.js';
import Signup from './components/Signup.js';
import Home from './components/Home.js';
import Navi from './components/Navi.js';
import NotFount from './components/NotFound.js';
import List from './components/List.js';
import Insert from './components/Insert.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
    this.signup = this.signup.bind(this);
    this.signupcancel = this.signupcancel.bind(this);
    this.logincancel = this.logincancel.bind(this);
  }

  login() {
    this.props.store.dispatch(loginPopup());
    this.forceUpdate();
  }

  signup() {
    this.props.store.dispatch(signupPopup());
    this.forceUpdate();
  }

  logincancel() {
    this.props.store.dispatch(loginCancel());
    this.forceUpdate();
  }

  signupcancel() {
    this.props.store.dispatch(signupCancel());
    this.forceUpdate();
  }

  render() {
    return (
      <div className="App">
        { this.props.store.getState().login ? <Login logincancel={this.logincancel} /> : null }
        { this.props.store.getState().signup ? <Signup signupcancel={this.signupcancel} /> : null }
        <header className="App-header">
          <div className="buttons">
            <button onClick={() => this.login()} className="btn btn-default button">로그인</button>
            <button onClick={() => this.signup()} className="btn btn-default button">계정생성</button>
          </div>
          { window.sessionStorage.user ? 
            <div className="buttons">
              <button className="btn btn-default button">로그아웃</button>
            </div> : null 
          }
          <div className="empty-div"></div>
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title"><a href="/">RememberMe</a></h1>
        </header>
        <Navi></Navi>
        <div>
          <BrowserRouter>
            <div>
              <Switch>
                <Route exact path="/" component={ Home }></Route>
                <Route path="/list" component={ List }></Route>
                <Route path="/insert" component={ Insert }></Route>
                <Route path="*" component={ NotFount }></Route>
              </Switch>
            </div>
          </BrowserRouter>
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
