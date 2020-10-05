# componentDidCatch 메서드
componentDidCatch 라는 생명주기 메서드를 사용해서 react application에서 발생하는 에러를 처리해본다.
이 기능은 함수형 컴포넌트에서 구현할 수 없는 기능이어서 class형 컴포넌트에서 사용가능하다.

새로운 project를 만들어준다.
#npx create-react-app error-catch

그리고 User 컴포넌트를 만들어준다
```js
// User.js
import React from 'react';

function User({user}){
    return(
        <div>
            <div>
                <b>ID</b> : {user.id}
            </div>
            <div>
                <b>Username</b> : {user.username}
            </div>
        </div>
    )
}

export default User;
```

해당 컴포넌트에서는 user라는 객체를 받아오고 return에서 user.id와 user.username 을 보여주는 기능을 구현한다.

그리고 App컴포넌트에서 
```js
// App.js
import React from 'react';
import User from './User';
function App() {
  return <User />;
}

export default App;

```
User컴포넌트를 불러와준다.
이렇게 해서 실행하게되면 error가 발생하게 되는데,usr.id와 user.username을 설정하기 않았기 때문이다. 이 에러의 경우에는 우리가 개발환경에 있기 때문에 뜨는것이고 사용자에게는 그냥 흰 화면만 보여지게 된다.
사용자에게 그냥 흰 화면만 뜨게되면 사용자에게 불편함을 줄 수 있기때문에 에러 발생시 에러발생을 알릴 필요가 있다. 그러한 작업을 할 것이다.

우선 이런 에러를 방지하기 위해서는 User컴포넌트에서 user가 없을 수 도 있음을 생각하고,
```js
// User.js
function User({user}){
    if (!user) return null;
```
user가 없으면 return null을 통해 아무것도 안 보여주는 식으로 에러를 발생시키지 않게 할 수는 있다.
해당 User컴포넌트는 출력되지 않겠지만, User컴포넌트외에 보여지는 것들에 대해서는 피해를 끼치지 않을 수 있다.

에러가 날 수 있는 또다른 에제.
```js
function Users({users}){
    return(
        <ul>
        {users.map(user=>(
            <li key={user.id}>{user.username}</li>     
        ))}
        </ul>
    );
}
```
여기에서는 users라는 배열을 map을 통해서 하나하나의 li항목으로 보여주는데 만약 users 배열을 props로 전달하지 않게 된다면 users가 가리키는것이 undefined가 되면서 undefined내에는 map이라는 함수가 없기 때문에 에러가 발생할 것이다.
그렇기 때문에 사전에 if(!users) return null 처리를 해서 뒤의 코드가 실행되지 않게 하는 것이 중요하다.
이것은 단순히 에러를 발생하지 않게 하기 위해 하는  작업이고 앞으로 할 것은 우리가 실수로 놓친 부분을 사용자에게 알리고 모니터링할 수 있게하는 것을 알아볼 것이다.
우선 새로운컴포넌트 ErrorBoundary라는 컴포넌트를 만들어 보자.
그리고 class 형태로 ErrorBoundary를 생성하면서 

error를 기본값으로 false로 지정해주고
render함수를 만들어서 return this.props.childdren;
을 반환해준다.
```js
// ErrorBoundary.js
import React, {Component} from 'react';

class ErrorBoundary extends Component{
    state ={
        error : false,
    };
    render(){
        return this.props.children;
    }
}

export default ErrorBoundary;
```

이것이 어떤 의미인가 하면
우리가 나중에
<ErrorBoundary>
    <User />
</ErrorBoundary>
를 통해서 컴포넌트를 보여줄 것인데 만약 this.props.children을 반환하면 <User /> 를 그대로 보여주겠다는 의미이다.

```js
// ErrorBoundary.js
import React, {Component} from 'react';

class ErrorBoundary extends Component{
    state ={
        error : false,
    };
    componentDidCatch(error, info){
        console.log("에러발생");
        console.log({
            error,
            info
        });
        this.setState({
            error: true,
        });
    }
    render(){
        if (this.state.error){
            return <h1>에러 발생!</h1>
        }
        return this.props.children;
    }
}

export default ErrorBoundary;
```

ErrorBoundary
state를 error : false 로 기본 값을 두고 
componentDidcatch error 정보와 info를 받아준다.
그리고 setState로 error를 true로 업데이트 해주고
render에 if문을 추가해서 에러값이 true 이면 에러 발생 을 띄워준다.
그리고 
User 컴포넌트에서 
```js
function User({user}){
    // if (!user) return null;
```
if 구문을 지워준다. 에러 발생을 위해서.

그리고 실행시켜보면 이전과 같이 개발자 환경이기 때문에 에러는 발생하지만 x를 눌러봤을 때 에러발생! 문자열이 뜨게된다.

그리고 console을 보면 error 에대한 정보와 info에서는 어디에서 에러가 발생했는지에 대한 정보를 가지고 있게 된다.
이런 에러 정보를 logging 하는 서버에 전달 하거나 sentry라는 도구를 사용해서 에러를 관리 할 수 있다.

---

이전에 user라는 객체를 받아왔을 때 id를 조회하는데 없으면 에러가 나타나는 상황에 대해서 어떻게 처리할 것인가에 대한 실습을 해봤다.
ErrorBoundary로 감싸서 에러를 처리했었다 이번에는 sentry를 사용해서 에러 관리를 해본다.

sentry를 구글에 검색해 가입절차를 밟아주고 개발환경은 react로 설정해 준다.

```
# Using yarn
$ yarn add @sentry/react @sentry/tracing

# Using npm
$ npm install --save @sentry/react @sentry/tracing
```
를 실행해준다.

sentry 브라우저를 설치한다.
그리고 
해당 설명페이지에 있는 절차를 따라 코드를 입력해주면된다.
index.js
```js
//index.js
import * as Sentry from "@sentry/react";

```
와 Sentry.init을 입력해준다.

그리고 새로고침을 해주고 sentry 쪽으로 돌아와서 take to me my event 버튼을 클릭해주면 에러 발생에 대한 정보가 뜨게된다.

어떤에러가 발생했는지와 어디서 발생했는지에 대한 정보가 들어있다.

하지만 production 환경에서는 작동이 되지않는다. 왜냐면 production환경에서는 componentDidcatch로 에러를 잡아준 상태에서는 해당 에러에 대한 정보가 sentry로 날아가지 않는다.
그래서 추가적으로 
```js
// ErrorBound.js
import * as Sentry from "@sentry/react";
.
.
    componentDidCatch(error, info){
        console.log("에러발생");
        console.log({
            error,
            info
        });
        this.setState({
            error: true,
        });
        //아래 구문 추가
        if(process.env.NODE_ENV === 'production'){
            Sentry.captureException(error,{extra:info});
    }
}
.
.
```
if 구분을 추가해준다.

그리고 $yarn build를 실행시켜주면 build라는 디렉터리가 생성된다. 해당 디렉터리를 가지고 웹서버를 열어줄 것인데, serve 라는 것을 사용할 수 있다.
그리고 이 방법 대신에
$ npx serve ./build
명령어를 실행시켜줄 수도 있다.

이렇게 서버를 빌드해서 실행시켜주면 sentry에 잘 전달되는 모습을 볼 수 있다.

더 상세한 기능 사용에 대해서는 구글 검색을 통해 알아볼 수 있다.