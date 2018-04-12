import React, { Component } from 'react';
import NotFoundImage from '../404.jpg';
import './NotFound.css';

class NotFound extends Component {
    render() {
        return(
            <div id="notfoundbox">
                <img id="notfound" src={ NotFoundImage } />
            </div>
        )
    }
}

export default NotFound;