import React, { Component } from 'react';
import closed from '../menu-close.png';
import opend from '../menu-open.png';
import list from '../accountlist.png';
import logined from '../logined.png';
import insert from '../insert.png';

class Readme extends Component {
    render() {
        return (
            <div className="text-bundle">
                <h1>RememberMe 가이드</h1>
                <hr/>
                <h2>본 가이드는 회원가입과 로그인을 완료한 후를 가정하여 작성되었음을 알립니다.</h2>
                <br/>
                <img className="readme" src={ logined }/>
                <h3>1. 앱에서 로그인 할 경우 수동으로 계정을 등록할 수 있고, 이동한 페이지에 대해서 계정 존재 유뮤와 계정정보를 받을 수 있습니다.</h3>
                <img className="readme" src={ opend }/>
                <h3>2. 앱에 로그인 시 사용할 수 있는 노란색 메뉴가 모니터 왼쪽 하단에 나타나며 메뉴를 틀릭하여 해당 페이지의 아이디와 비밀번호를 입력 가능합니다.</h3>
                <h3>3. 저장하고 로그인을 통해 계정을 저장함과 동시에 로그인 가능합니다.</h3>
                <img className="readme" src={ closed }/>
                <h3>4. 메뉴는 열고 닫는것이 가능합니다.</h3>
                <img className="readme" src={ insert }/>
                <h3>5. 계정에 대한 관리는 웹에서도 가능하며, 앱과 같이 수동으로 계정을 등록하는 것이 가능합니다.</h3>
                <img className="readme" src={ list }/>
                <h3>6. 웹에서 등록된 계정을 확인하고 삭제할 수 있습니다.</h3>
                <p class="App-intro"></p>
            </div>
        )
    }
}

export default Readme;