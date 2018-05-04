import React, { Component } from 'react';
import contactapi from '../contactapi.js';
import crypt from '../cryption.js';

class ListAccount extends Component {
    constructor(props) {
        super(props);
    }

    delete = (number) => {
        const isDelete = global.confirm("계정정보를 삭제하면 되돌릴 수 없습니다.\n삭제하시겠습니까?");
        if(isDelete) {
            contactapi.deleteaccount(number, crypt.encryption(sessionStorage.Reid))
            .then((res) => {
                if(res.data.error === "true") {
                    alert(res.data.words);
                }
                else {
                    window.location.reload(false);
                    alert("삭제되었습니다.")
                }
            });
        }
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