import React, { Component } from 'react';
import contactapi from '../contactapi.js';
import crypt from '../cryption.js';

class ListAccount extends Component {
    constructor(props) {
        super(props);
    }

    delete = (number) => {
            contactapi.deleteaccount(number, crypt.encryption(sessionStorage.Reid))
            .then((res) => {
                if(res.data.error === "true") {
                    this.props.makeErrorAlert();
                }
                else {
                    window.location.reload(false);
                    this.props.makeDeleteAlert();
                }
            });
    }

    render() {
        return(
            <tr>
                <td>{this.props.count}</td>
                <td>{crypt.decryption(this.props.url)}</td>
                <td>{crypt.decryption(this.props.id)}</td>
                <td>{crypt.decryption(this.props.password)}</td>
                <td><button type="button" onClick={() => this.delete(this.props.count-1)} class="btn btn-default">계정삭제</button></td>
            </tr>
        )
    }
}

export default ListAccount;