import React, { Component } from 'react';

class ListAccount extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div>
                <h1>{this.props.url}</h1>
                <h1>{this.props.id}</h1>
                <h1>{this.props.passowrd}</h1>
            </div>
        )
    }
}

export default ListAccount;