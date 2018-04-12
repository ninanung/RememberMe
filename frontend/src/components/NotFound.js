import React, { Component } from 'react';
import NotFoundImage from '../404.jpg';

class NotFound extends Component {
    render() {
        return(
            <div>
                <img style="width: 100%; height: auto;" src={ NotFoundImage } />>
            </div>
        )
    }
}

export default NotFound;