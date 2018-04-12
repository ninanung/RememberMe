import React, { Component } from 'react';

class Home extends Component {
    render() {
        return(
            <div className="text-bundle">
                <p className="App-intro">우리는 당신의 계정을 기억합니다.</p>
                <p className="App-intro">우리는 당신의 계정을 알려드립니다.</p>
                <p className="App-intro">원한다면 언제든지 기억합니다.</p>
                <p className="App-intro">하지만 오직 당신에게만 알려드립니다.</p>
                <p className="App-intro"><a href="/readme">사용법을 알고싶으신가요?</a></p>
            </div>
        )
    }
}

export default Home;