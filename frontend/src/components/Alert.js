import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import './Login.css';

class Alert extends Component {
    constructor(props) {
        super(props);
        this.alertClick = this.alertClick.bind(this);
    }

    alertClick() {
        window.location.reload(false);
    }

    render() {
        return(
            <div className="modal">
                <div className="form">
                    <h2 className="inputhead">{ this.props.word }</h2>
                    <button type="button" onClick={() => this.alertClick()}>확인</button>
                </div>
            </div>
        )
    }
}

export default Alert;