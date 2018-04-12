import { Link, NavLink } from 'react-router-dom';;
import React, { Component } from 'react';

class Navi extends Component {
    render() {
        return(
            <nav>
                <NavLink to="/"></NavLink>
                <NavLink to="/list"></NavLink>
                <NavLink to="/insert"></NavLink>
            </nav>
        )
    }
}

export default Navi;