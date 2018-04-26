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
import PleaseLogin from './components/PleaseLogin.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
    this.signup = this.signup.bind(this);
    this.signupcancel = this.signupcancel.bind(this);
    this.logincancel = this.logincancel.bind(this);
    this.logout = this.logout.bind(this);
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
  logout() {
    window.sessionStorage.clear();
    this.forceUpdate();
  }

  render() {
    return (
      <div id="App">
        <header className="App-header">
          { window.sessionStorage.getItem("Reid") ? 
            <div className="buttons">
              <button onClick={() => this.logout()} className="btn btn-default button">로그아웃</button>
            </div> : 
            <div className="buttons">
              <button onClick={() => this.login()} className="btn btn-default button">로그인</button>
              <button onClick={() => this.signup()} className="btn btn-default button">계정생성</button>
            </div>
          }
          <div className="empty-div"></div>
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title"><a href="/">RememberMe</a></h1>
        </header>
        <div className="App-body">
          <BrowserRouter>
            <div>
              <div>
                <Navi></Navi>
              </div>
              <div>
                <Switch>
                  <Route exact path="/" component={ Home }></Route>
                  { window.sessionStorage.getItem("Reid") ? 
                    <div>
                      <Route path="/list" component={ List }></Route>
                      <Route path="/insert" component={ Insert }></Route>
                    </div> :
                    <div>
                      <Route path="/list" component={ PleaseLogin }></Route>
                      <Route path="/insert" component={ PleaseLogin }></Route>
                    </div>

                  }
                  <Route component={ NotFount }></Route>
                </Switch>
              </div>
            </div>
          </BrowserRouter>
        </div>
        <div className="App-footer">
          <div className="App-footer-text">
            <p>
              Contact Us:
              <br/>
              ninanung@naver.com
            </p>
            <p>
              Source Code:
              <br/>
              https://github.com/2018capstone/RememberMe
            </p>
          </div>
        </div>
        { this.props.store.getState().login ? <Login logincancel={this.logincancel} /> : null }
        { this.props.store.getState().signup ? <Signup signupcancel={this.signupcancel} /> : null }
      </div>
    )
  }
}

export default App;
