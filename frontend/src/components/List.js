import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import ListAccount from './ListAccount.js';
import contactapi from '../contactapi.js';
import crypt from '../cryption.js';

import Alert from './Alert.js'

class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            word: "",
            alert: false
        }
        this.makeDeleteAlert = this.makeDeleteAlert.bind(this);
        this.makeErrorAlert = this.makeErrorAlert.bind(this);
    }

    componentWillMount() {
        const id = sessionStorage.getItem("Reid");
        contactapi.getaccountlist(crypt.encryption(id))
        .then((res) => {
            if(res.data.error === "true") {
                this.props.history.push("/");
                return alert(res.data.words);
            }
            else {
                this.setState({
                    list: res.data.list
                })
            }
        })
    }

    makeDeleteAlert() {
        this.setState({
            word: "삭제되었습니다.",
            alert: true
        })
        return this.forceUpdate();
    }

    makeErrorAlert() {
        this.setState({
            word: "도중에 문제가 발생했습니다.",
            alert: true
        })
        return this.forceUpdate();
    }

    render() {
        return(
            <div className="listbody">
                <table class="table table-bordered">
                    <thead>
                        <tr>
                            <th></th>
                            <th>사이트</th>
                            <th>아이디</th>
                            <th>비밀번호</th>
                            <th>삭제</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.state.list.length > 0 ? null : <h1>아직 등록된 계정이 없습니다.</h1> }
                        { this.state.list.map(function(content, i) {
                        return <ListAccount 
                            count={i + 1} 
                            url={content.url} 
                            id={content.urlid} 
                            password={content.urlpassword}
                            makeDeleteAlert={this.makeDeleteAlert}
                            makeErrorAlert={this.makeErrorAlert}
                        ></ListAccount>
                        })}
                    </tbody>
                </table>
                { this.state.alert ? <Alert word={ this.state.word }></Alert> : null }
            </div>
        )
    }
}

export default List;