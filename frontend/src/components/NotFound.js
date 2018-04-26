import React, { Component } from 'react';
import NotFoundImage from '../404.jpg';
import './NotFound.css';

class NotFound extends Component {
    render() {
        return(
            <div id="notfoundbox">
                <img id="notfound" src={ NotFoundImage } alt="nope" />
            </div>
        )
    }
}

export default NotFound;