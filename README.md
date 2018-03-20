# RememberMe
![Key](https://postfiles.pstatic.net/MjAxODAzMThfMTIz/MDAxNTIxMzY3MTk4NzM3.nQ81v6oKcyeDROpjs3xB-9oQYNmomVpph1-bFLmgoG8g.1N8JI50w1KkJY0VgDf54T-wiRiuOeDa9z3YQpBD3CLUg.PNG.ninanung/icon.png?type=w773)

## 이게 뭐하는 프로그램이죠?

RememberMe는 구글 익스텐션 기반으로 동작하는 사용자의 로그인정보 저장, 불러오기 소프트웨어 입니다.  

## 그게 무슨 말인가요?

크롬이나 익스플로러는 사용자가 특정 페이지에서 로그인을 할 시 그 정보를 컴퓨터에 저장했다가 같은 페이지에서 로그인 할 경우 바로 아이디와 비밀번호를 알려줍니다. 아주 편리하고 좋은 기능이지만 단점은 보안성이 약하다는 것입니다. 사용자가 누구인지 묻지도 따지지도 않고 로그인 정보를 알려줘 버립니다. 때문에 공용 PC에서 실수로 로그인 정보를 저장했거나 혹은 노트북을 도난당했을 경우 나의 로그인 정보가 그대로 사용될 수 있는 여지가 있습니다. RememberMe는 그러한 단점을 해결하고자, 우선 사용자의 ID와 Password인증을 통해 사용자를 특정하고 그 다음에 사용자의 로그인 정보를 전달하는 방식으로 운영합니다.  

## 어떤 방식으로 돌아가는 거죠?

일단은 사용자의 정보를 저장하기 위해 데이터베이스와 서버가 필요했습니다. 하지만 크롭 익스텐션은 자체적으로 서버를 가질 수가 없어서 서버를 따로 만들고 그 서버와의 연결을 통해 ajax방식으로 데이터를 주고받습니다. 따라서 '크롬익스텐션' + 'node.js + DB'의 구조를 취하고 있습니다.  

## 페이지는 어떻게 만들어지죠?

~~Vue.js프론트엔드를 사용하여 페이지를 제작합니다. 빌드를 통해 하나의 HTML파일로 만들고 그것을 크롬익스텐션이 불러와서 사용하는 방식으로 보여집니다.~~  
였으나 Vue.js의 크롬 익스텐션에서의 활용이 상당히 복잡하고 여러가지 사항이 필요한 것으로 보여서 그냥 HTML과 Javascript를 통한 관리를 하기로 했습니다. 따라서 프론트엔드와 액션컨트롤이 더러워 질 것으로 예상됩니다.  

## 완벽한가요?

아닙니다. 개발자의 졸업 프로젝트를 기반으로 하는 만큼 공부해야 할 부분이 많이 남아있으며 구상과 달라질 가능성도 큽니다. 지금은 input테그에서 데이터를 불러와서 저장하는 방식으로 개발하고자 하지만 그게 불가능 하다면 사용자가 직접 데이터를 입력하여 저장하는 방식을 취하게 될 것 같습니다. 다만 사용자가 접속하는 페이지의 URL데이터를 가져와서 DB와 비교한 후 로그인 정보를 알려주는 방식은 그대로 일 것으로 생각합니다.

## 현재 모습
![show](https://postfiles.pstatic.net/MjAxODAzMjBfMjQz/MDAxNTIxNTI5MTk4NTIy.3QXunys4BUZ72-KqCZ3TgVI95X3Aza4E5atOCZinVdkg.KSSQjuNclgAzPMmyn-XMHCvtDLcMFd0QIaG7M2Lvz-Yg.PNG.ninanung/%EC%8A%A4%ED%81%AC%EB%A6%B0%EC%83%B7_2018-03-20_15.58.50.png?type=w773)  

## 사용된 것들

> Platform
>> 1. Node.js
>> 2. MongoDB
>> 3. Vue.js
>> 4. Chrome Extension

> Modules
>> 1. "bcrypt": "^1.0.3"
>> 2. "body-parser": "^1.18.2"
>> 3. "express": "^4.16.2"
>> 4. "mongoose": "^5.0.2"