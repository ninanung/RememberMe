/* eslint-disable import/first */

import { Link, NavLink } from 'react-router-dom';;
import React, { Component } from 'react';
import "./Navi.css";

class Navi extends Component {
    render() {
        return(
            <nav className="navbar navbar-default">
                <ul className="nav navbar-nav">
                    <li><Link className="navi" to="/">Home</Link></li>
                    <li><Link className="navi" to="/list">Account List</Link></li>
                    <li><Link className="navi" to="/insert">Insert Account</Link></li>
                    <li><Link className="navi" to="/profile">Profile</Link></li>
                </ul>
            </nav>
        )
    }
}

export default Navi;