# 1. RememberMe
![Key](https://postfiles.pstatic.net/MjAxODAzMThfMTIz/MDAxNTIxMzY3MTk4NzM3.nQ81v6oKcyeDROpjs3xB-9oQYNmomVpph1-bFLmgoG8g.1N8JI50w1KkJY0VgDf54T-wiRiuOeDa9z3YQpBD3CLUg.PNG.ninanung/icon.png?type=w773)  

## 앱 다운받기

[Chrome App](https://chrome.google.com/webstore/detail/rememberme/peebbngcleemnojjdclmancamgdfmnik?hl=ko)  


## 이게 뭐하는 프로그램이죠?

RememberMe는 구글 익스텐션 기반으로 동작하는 사용자의 로그인정보 저장, 불러오기 소프트웨어 입니다.  

## 그게 무슨 말인가요?

크롬이나 익스플로러는 사용자가 특정 페이지에서 로그인을 할 시 그 정보를 컴퓨터에 저장했다가 같은 페이지에서 로그인 할 경우 바로 아이디와 비밀번호를 알려줍니다. 아주 편리하고 좋은 기능이지만 단점은 보안성이 약하다는 것입니다. 사용자가 누구인지 묻지도 따지지도 않고 로그인 정보를 알려줘 버립니다. 때문에 공용 PC에서 실수로 로그인 정보를 저장했거나 혹은 노트북을 도난당했을 경우 나의 로그인 정보가 그대로 사용될 수 있는 여지가 있습니다. RememberMe는 그러한 단점을 해결하고자, 우선 사용자의 ID와 Password인증을 통해 사용자를 특정하고 그 다음에 사용자의 로그인 정보를 전달하는 방식으로 운영합니다.  

## 어떤 방식으로 돌아가는 거죠?

일단은 사용자의 정보를 저장하기 위해 데이터베이스와 서버가 필요했습니다. 하지만 크롭 익스텐션은 자체적으로 서버를 가질 수가 없어서 서버를 따로 만들고 그 서버와의 연결을 통해 ajax방식으로 데이터를 주고받습니다. 따라서 '크롬익스텐션' + 'node.js + React.js + MongoDB'의 구조를 취하고 있습니다.  

## 페이지는 어떻게 만들어지죠?

~~Vue.js프론트엔드를 사용하여 페이지를 제작합니다. 빌드를 통해 하나의 HTML파일로 만들고 그것을 크롬익스텐션이 불러와서 사용하는 방식으로 보여집니다.~~  
였으나 Vue.js의 크롬 익스텐션에서의 활용이 상당히 복잡하고 여러가지 사항이 필요한 것으로 보여서 그냥 HTML과 Javascript를 통한 관리를 하기로 했습니다. 따라서 프론트엔드와 액션컨트롤이 더러워 질 것으로 예상됩니다.  

## 웹 서비스도 되나요?

네, 현재 계획으론 웹 어플리케이션을 만들어서 본인의 계정 정보를 조회하거나 추가할 수 있도록 할 예정입니다. 그리고 모바일에서는 사용 불가능한 크롬 익스텐션의 특성상 만약 자신이 가입했던 계정정보를 핸드폰에서 조회하고 싶을 경우 웹에서 확인할 수 있도록 할 예정입니다. 웹은 따로 로그인이 필요하며 익스텐션과의 데이터베이스를 공유하므로 따로 계정을 생성할 필요는 없습니다.  

웹 서비스는 익스텐션과 같은 Node.js서버와 MongoDB를 베이스로 하여 React.js웹 프레임 워크를 사용하여 Frontend를 구현합니다.  

## 완벽한가요?

아닙니다. 개발자의 졸업 프로젝트를 기반으로 하는 만큼 공부해야 할 부분이 많이 남아있으며 구상과 달라질 가능성도 큽니다. 지금은 input테그에서 데이터를 불러와서 저장하는 방식으로 개발하고자 하지만 그게 불가능 하다면 사용자가 직접 데이터를 입력하여 저장하는 방식을 취하게 될 것 같습니다. 다만 사용자가 접속하는 페이지의 URL데이터를 가져와서 DB와 비교한 후 로그인 정보를 알려주는 방식은 그대로 일 것으로 생각합니다.

## 보안에 대하여

보안에 대한 한 이 프로그램에 대해서는 별로 할 말이 없습니다. 저는 보안관련 공부보다는 개발과 관련된 공부에 치중하였기 때문에 기본적인 몇가지를 제외하고는 취약하다고 할 수 있습니다.  
1. 서버에서 클라이언트 혹은, 클라이언트에서 서버로 데이터를 넘길 때 암호화 해서 넘깁니다. 왜 그렇게 해야 하는가 하면, 웹에서 가장 취약한 타이밍이 통신의 사이에서 발생하기 때문입니다. 특히 https가 아닌 http를 사용하는 이 프로그램의 서버를 생각하면 꼭 필요한 작업입니다.  
2. 데이터베이스에 암호화 한 자료를 저장합니다. 이 역시 가장 기본적인 방법입니다. 개발자, 혹은 다른 공격자로부터 데이터를 보호합니다. 이 암호화가 절대로 뚫리지 않는다고는 장담할 수 없지만 속도를 늦추는 것은 가능합니다.  

## 방법제시  

__04/02 월요일:__ input테그에 값을 자동으로 입력하는 것이 문제가 된다. 왜냐하면 각 input테그마다 name과 id등 설정이 개발자에 따라서 다르기 때문이다. 하지만 만약 로그인 정보를 저장할 때 input테그의 정보까지 같이 저장해서 불러올 때 사용할 수 있다면 어떨까? 예를들어 name필드의 값을 계정정보와 같이 저장하여 사용한다면? 시도해볼 가치가 있어보인다.  

__04/03 화요일:__ url에서 특정 도메인 이름만 빼오는 함수이다.  
~~~javascript
function myFunction(string) {
    var str = string;
    var res = str.split("/");
    if(res[0] == "https:" || res[0] == "http:") {
        res.splice(0, 2);
        res.splice(1, 100);
    }
    else {
    	res.splice(1, 100);
    }
    var laststring = res[0].split(".");
    if(laststring.length > 2) {
    	laststring.splice(0, 1);
    }
    return laststring[0];
}
~~~  

__04/05 목요일:__ 1안. focus된 input테그에 값을 넣도록 하는 것은 어떤가 하는 의견을 교수님으로부터 받았다. autofocus가 아니면 자동으로 값이 들어갈지 시도해볼 필요가 있다. 2안. 대부분의 POST요청은 form으로 구성된 input을 통해 발생한다. 그렇다면 form테그를 찾아서 그 자식테그인 input에 값을 넣도록 하면 어떨까 싶다.  

__04/08 일요일:__ 위에서 얘기했던 form을 서치해서 input값을 넣는 시도가 성공했다. 물론 모든 로그인에 대해서 반응하는 건 아닌데, 특히 구글과 같은 순차적인 로그인 시도에 대해서는 반응하지 못한다. 비밀번호를 입력하는 부분은 가능하지만 이외의 다른 부분이 과연 이메일인지 ID인지 구분하기가 쉽지 않다.  

## 현재 모습

### __초기모습__  
![show](https://postfiles.pstatic.net/MjAxODAzMjBfMjQz/MDAxNTIxNTI5MTk4NTIy.3QXunys4BUZ72-KqCZ3TgVI95X3Aza4E5atOCZinVdkg.KSSQjuNclgAzPMmyn-XMHCvtDLcMFd0QIaG7M2Lvz-Yg.PNG.ninanung/%EC%8A%A4%ED%81%AC%EB%A6%B0%EC%83%B7_2018-03-20_15.58.50.png?type=w773)  

### __04/03 화요일__  
![show](https://postfiles.pstatic.net/MjAxODA0MDNfMzYg/MDAxNTIyNzIyNjI4NzM1.3qxmw1fvUXhWzLvrDdDzQX1AC6dASZX-sbMLtA0N-zkg.1LyqwSIO-AXmsd5U0YV-tBMtJZpG71_f65T4zWe3Nlog.PNG.ninanung/%EC%8A%A4%ED%81%AC%EB%A6%B0%EC%83%B7_2018-04-03_%EC%98%A4%EC%A0%84_11.28.26.png?type=w773)  

### __04/10 화요일__
<img src="https://github.com/ninanung/RememberMe/blob/master/gifs/2018-04-10.gif?raw=true" width="400px" height="400px" />  

### __04/16 월요일__
같은 아이디와 비밀번호로 로그인이 가능하다. DB를 공유하고 있기 때문.  
<img src="https://github.com/ninanung/RememberMe/blob/master/gifs/2018-04-16 17.18.51.gif?raw=true" width="400px" height="700px" />  

### __05/17 수요일__
현재 데모버전이 완성되었고 테스트도 완료되었다. 기존에 예정했던 기능은 모두 실행 가능하다 아직 DB와 서버를 배포하지 않은 상태.  

### __05/21 월요일__
DB와 서버가 배포되었다.  
DB는 [mlab](https://mlab.com/welcome/)에서  
서버는 [heroku](https://www.heroku.com)에서 배포하였다.  
실제 웹사이트 주소는 [이곳](https://remembermeweb.herokuapp.com/)이다.  

# 2. 프로젝트의 끝  

프로젝트의 제작이 끝이 났다.  
서버는 히로쿠를 이용하여 배포하였고, DB는 mLab을 통해 배포하였다. 둘다 어느정도의 접속과 데이터를 무료로 이용할 수 있는 유용한 서비스이다.  
터놓고 얘기하자면, 이 프로젝트의 가장 큰 단점은 모든 페이지에서는 기동이 불가능 하다는 것이다. 더 자세한 얘기를 해보자

## 보안에 대하여

이 앱이 모든 사이트에서 구동하지 않는 이유는 보안 때문이다. 정확히는 다른 사이트들의 높은 보안수준 때문이다.  
그들 웹 서비스들은 스크립트를 끼워넣는 것을 블락한다. 이 앱은 스크립트를 통해 기동하고 결국 기동이 불가능해 진다.  
솔직히 나 스스로는 보안에 아주 무지하다. 기능을 만들고 틀을 만드는 것에는 그럭저럭 익숙해 졌지만 이 보안에 대해서는 큰 발전이 없다.  
이 프로젝트가 나에게 알려준 바가 바로 그것이다. 너빼고 다 보안에 신경쓰고 있다는 것, 사실 스크립트에 대한 간섭은 지금까지 그렇게 신경쓰는 부분은 아니었다.  
내가 기능적으로 구현할 수 있는 부분이기도 하기 때문에 그것이 보안에 큰 영향을 끼친다고 생각하지 않았다고 해야 할 것이다.  
느낀바가 많다. 개발 외적으로 보안에 더 신경쓰는 것이 가능할 지 모르겠으나 공부를 시작하는 계기가 되었다고 생각한다.  

## 사용된 것들

> Platform
>> 1. Node.js
>> 2. MongoDB
>> 3. React.js
>> 4. Chrome Extension

> Server Modules
>> 1. "bcrypt": "^1.0.3"
>> 2. "body-parser": "^1.18.2"
>> 3. "express": "^4.16.2"
>> 4. "mongoose": "^5.0.2"

> Frontend Modules
>> 1. "axios": "^0.18.0"
>> 2. "react": "^16.2.0"
>> 3. "react-dom": "^16.2.0"
>> 4. "react-redux": "^5.0.7"
>> 5. "react-scripts": "1.1.1"
>> 6. "redux": "^3.7.2"