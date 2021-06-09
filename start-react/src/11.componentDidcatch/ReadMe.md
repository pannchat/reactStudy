# componentDidCatch 메서드

componentDidCatch 라는 생명주기 메서드를 사용해서 react application에서 발생하는 에러를 처리해본다.
이 기능은 함수형 컴포넌트에서 구현할 수 없는 기능이어서 class형 컴포넌트에서 사용가능하다.

새로운 project를 만들어준다.
#npx create-react-app error-catch

그리고 User 컴포넌트를 만들어준다

```js
// User.js
import React from "react";

function User({ user }) {
  return (
    <div>
      <div>
        <b>ID</b> : {user.id}
      </div>
      <div>
        <b>Username</b> : {user.username}
      </div>
    </div>
  );
}

export default User;
```

해당 컴포넌트에서는 user라는 객체를 받아오고 return에서 user.id와 user.username 을 보여주는 기능을 구현한다.

그리고 App컴포넌트에서

```js
// App.js
import React from "react";
import User from "./User";
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
function Users({ users }) {
  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>{user.username}</li>
      ))}
    </ul>
  );
}
```

여기에서는 users라는 배열을 map을 통해서 하나하나의 li항목으로 보여주는데 만약 users 배열을 props로 전달하지 않게 된다면 users가 가리키는것이 undefined가 되면서 undefined내에는 map이라는 함수가 없기 때문에 에러가 발생할 것이다.
그렇기 때문에 사전에 if(!users) return null 처리를 해서 뒤의 코드가 실행되지 않게 하는 것이 중요하다.
이것은 단순히 에러를 발생하지 않게 하기 위해 하는 작업이고 앞으로 할 것은 우리가 실수로 놓친 부분을 사용자에게 알리고 모니터링할 수 있게하는 것을 알아볼 것이다.
우선 새로운컴포넌트 ErrorBoundary라는 컴포넌트를 만들어 보자.
그리고 class 형태로 ErrorBoundary를 생성하면서

error를 기본값으로 false로 지정해주고
render함수를 만들어서 return this.props.childdren;
을 반환해준다.

```js
// ErrorBoundary.js
import React, { Component } from "react";

class ErrorBoundary extends Component {
  state = {
    error: false,
  };
  render() {
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
import React, { Component } from "react";

class ErrorBoundary extends Component {
  state = {
    error: false,
  };
  componentDidCatch(error, info) {
    console.log("에러발생");
    console.log({
      error,
      info,
    });
    this.setState({
      error: true,
    });
  }
  render() {
    if (this.state.error) {
      return <h1>에러 발생!</h1>;
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

---

# Prettier

여기까지 리액트에 기초에 해당하는 내용들에 대해 학습했다.
이제 컴포넌트를 스타일링하는 방법과 API를 연동하는 방법, 라우터나 상태관리 라이브러리를 적용하는 방법등이 남아있다. 이제 리액트 개발을 할 때 개발을 좀 더 수월하게 할 수 있게 도와주는 것들에 대해서 알아볼 것이다.
Prettier는 자동으로 코드의 스타일을 관리해주는 도구이다.
예를들어 문자열을 사용할 때 작은따옴표를 사용할지 큰따옴표를 사용할지 또는 코드 뒤에 ;을 붙일지, 들여쓰기는 얼마나할지 등을 관리해 줄 수 있다.
이 도구의 특징은 코드의 스타일을 우리 마음대로 커스터마이징 할 수 있다는 것이다.
그리고 이 도구는 자바스크립트 뿐만아니라 HTML,CSS 스타일등을 관리할 수 있고, 리액트,앵귤러, 뷰 등도 지원해준다.

Prettier를 사용하는 방법에는 여러가지가 있는데 명령어를 사용해서 모든 코드를 스타일링해주는 방식과 Pre-commit Hook 이라는 것을 사용해서 git에서 파일을 커밋하기전에 스타일링해주는 것이다.

벨로퍼트님은 에디터와 연동해서 코드를 저장할 때 Prettier를 사용해서 코드를 정리하도록 사용하는것을 추천한다고 한다.

우선 새로운 프로젝트를 만들어 주도록 한다.
`$ npx create-react-app useful-tools`

그리고 해당 프로젝트를 VSCODE를 사용해서 열어준다.
그리고 확장아이콘을 눌러 Prettier를 검색해서 가장 다운로드 수가 많은 것을 클릭해서 다운로드해주고 src 폴더에서 .prettierrc 라는 파일을 생성해준다.
이 파일은 prettier에 관련된 설정을 넣어줄 수 있다.

설정해 주는 속성에는 trailingComma 라는 것이 있는데.
이것은 만약 객체를 선언할 때나 배열을 선언 할 때 쉼표를 남겨두는 옵션을 의미한다. none으로 설정하면 사용하지 않게되고 es5로 하게되면 es5에서 지원하는 정도로 넣음을 의미한다.

tabWitdh는 탭을 몇칸 띄울지를 설정할 수 있다. 기본 값은 4로 두자.

semi 는 세미콜론을 붙여줄지 말지를 결정하는 속성이다.
singleQuote는 따옴표 설정이다.

```js
{
    "trailingComma": "all",
    "tabWidth": 4,
    "semi" : true,
    "singleQuote" : true
}
```

나는 영상 강의에 따라 이렇게 설정했다.
App.js를 열어서
사용하는 방법에 대해서 알아본다.

```js
import React from "react";
import logo from "./logo.svg";
import "./App.css";
const a = "weafwqefe";
const b = "waefew";
```

이렇게 들여쓰기도 일정하지 않고 ;도 쓰지않고 "와 '를 마구잡이로 사용했을때
F1키를 눌러서 Format Document를 검색해서 실행시켜보면 코드가 .prettierrc의 규칙에 따라 코드가 정리되게 된다.

만약에 저장을 할 때마다 자동으로 Prettier 를 실행하고 싶다면 vscode에서 설정을 열어주고 format on save를 검색해서 해당 설정을 체크해준다.

이렇게 해주면 코드를 저장할 때마다 자동으로 코드 정렬과 설정내용이 적용되게 된다.

저장할 때 사용하는것이 불편하다면 F1키를 눌러 format document를 수동으로 입력해주거나 단축키를 사용해서 그때 그때 실행 시켜주면 될 것 같다.

# ESLint

ESLint는 자바스크립트 문법을 검사해주는 도구이고 기본적인 자바스크립트 문법을 검사해주는 것을 떠나서 정말 다양한 커스텀 규칙등을 설정해 줄 수 있다.
이전에 설정해준 Prettier 같은 경우에는 따옴표나 들여쓰기 세미콜론, 라인길이 등 코드의 모양새를 신경써주고 고쳐주는 것에 중점이었다면 ESLint에서는 Prettier에서도 커버하는 코드스타일을 포함해서 다양한 옵션들이 있다.

https://eslint.org/docs/rules/

ESLint를 통해서 관리할 수 있는 규칙들은 상당히 많은데 해당 링크에서 보여지는 것들 하나하나가 규칙의 이름이고, 원하는 기능은 키고 끄며 작업을 할 수 있다.
스패너 모양이 있는것들은 ESLint를 통해서 바로 고칠 수 있는 것이고 그렇지 않은건 수동으로 고칠 수 있는 것들이다.

몇가지 규칙
max-params :

```js
function foo(bar, baz, qux, qxx) {
  // four parameters, may be too many
  doSomething();
}
```

이 규칙은 코드에 함수를 작성할 때 파라미터의 갯수를 제한 시키는 작업을 한다. 예를들어 max값을 3으로 설정하면 파라미터가 3개 이상으로 들어오면 많다고 에러가 뜨게 된다.

Require === and !== (eqeqeq) :

```js
if (x == 42) {
}

if ("" == text) {
}

if (obj.getStuff() != undefined) {
}
```

만약 이기능을 키게되면 equl sign을 두개만 하게되면 에러가 난다.

Disallow Reassignment of Function Parameters (no-param-reassign):

파라미터로 받아온 것을 변화를 줄 수 없는 규칙도 존재한다.

```js
/*eslint no-param-reassign: "error"*/

function foo(bar) {
  bar = 13;
}

function foo(bar) {
  bar++;
}

function foo(bar) {
  for (bar in baz) {
  }
}

function foo(bar) {
  for (bar of baz) {
  }
}
```

이렇게 사용하면 에러를 발생시키고

```js
/*eslint no-param-reassign: "error"*/

function foo(bar) {
  var baz = bar;
}
```

이런식으로 새로운 변수를 선언해서 사용해야 하게 할 수 있다.

disallow if statements as the only statement in else blocks (no-lonely-if):

```js
if (foo) {
  // ...
} else {
  if (bar) {
    // ...
  }
}
```

if와 else if를 이런식으로 사용하는 것을 막는 것이다.

```js
if (foo) {
  // ...
} else if (bar) {
  // ...
}
```

이런식으로 고치게끔 알려주는 기능을함.

Disallow Unused Variables (no-unused-vars):

```js
/*eslint no-unused-vars: "error"*/
/*global some_unused_var*/

// It checks variables you have defined as global
some_unused_var = 42;

var x;

// Write-only variables are not considered as used.
var y = 10;
y = 5;

// A read for a modification of itself is not considered as used.
var z = 0;
z = z + 1;

// By default, unused arguments cause warnings.
(function (foo) {
  return 5;
})();

// Unused recursive functions also cause warnings.
function fact(n) {
  if (n < 2) return 1;
  return n * fact(n - 1);
}

// When a function definition destructures an array, unused entries from the array also cause warnings.
function getY([x, y]) {
  return y;
}
```

이런식으로 어떤 변수를 선언하고 그 변수를 사용하지 않으면 경고를 띄워주는 기능을 한다.

require or disallow semicolons instead of ASI (semi):
Prettier에서 처럼 세미콜론을 쓸지 말지 등의 규칙을 정해서 이것을 어기게되면 오류를 보여주게끔 설정할 수 있다.

enforce the consistent use of either backticks, double, or single quotes (quotes) :
쿼트도 마찬가지로 double quote를 쓸것인지 single quotes를 쓸 것인지를 정해줄 수도 있다.

Require CamelCase (camelcase) :
변수를 선언할 때 camelcase를 강제로 사용하게끔 할 수 있다.

하나하나 어떤 기능을 하는지를 알기는 힘들고 ESLint가 어떤 기능등을 하는지를 알면 될 것같다.

실제 코드에서 a를 선언하고 사용하지 않으면 하단에있는 터미널을 통해 경고를 보여주게 되는데
이제 이 경고를 하단 터미널이 아닌 코드에디터에서 직접 보여주도록 설정해 보도록 한다.

확장 탭을 클릭해서 ESLint를 설치해주면 된다.
그렇게 하면 코드에서 노란색 밑줄이 생기며 어디서 수정해야할지를 보여주게된다.
이 ESLint의 규칙은 어디에 있냐면
package.json을 열어보면 하단에

```json
  "eslintConfig": {
    "extends": "react-app"
  },
```

이런 설정이 존재한다.
이것을 커스터마이징 하는 것은 나중에 알아본다.
