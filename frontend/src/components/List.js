import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import ListAccount from './ListAccount.js';
import contactapi from '../contactapi.js';

class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: []
        }
    }

    componentWillMount() {
        const id = window.sessionStorage.getItem("Reid");
        contactapi.getaccountlist(id)
        .then((res) => {
            if(res.data.error === "true") {
                this.props.history.push("/");
                return alert("")
            }
            else {
                this.setState({
                    list: res.data.list
                })
            }
        })

    }

    render() {
        return(
            <div className="listbody">
                {this.state.list.map((content, i) => {
                    <ListAccount 
                        url={content.url} 
                        id={content.urlid}
                        password={content.password}
                    ></ListAccount>
                })}
            </div>
        )
    }
}

export default List;