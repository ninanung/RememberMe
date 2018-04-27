import React, { Component } from 'react';
import contactapi from '../contactapi.js';

class ListAccount extends Component {
    constructor(props) {
        super(props);
    }

    delete = (number) => {
        const isDelete = global.confirm("계정정보를 삭제하면 되돌릴 수 없습니다.\n삭제하시겠습니까?");
        if(isDelete) {
            contactapi.deleteaccount(number, sessionStorage.Reid)
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
                <td>{this.props.url}</td>
                <td>{this.props.id}</td>
                <td>{this.props.password}</td>
                <td><button type="button" onClick={() => this.delete(this.props.count-1)} class="btn btn-default">계정삭제</button></td>
            </tr>
        )
    }
}

export default ListAccount;