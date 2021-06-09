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

코드에서 경고가 뜰때 마우스를 올려 빠른수정을 누르면 자동으로 고쳐주는 기능등이 있는데
Prettier 에서 저장할 때 자동으로 코드를 정리해주는 기능처럼 ESLint에서도 마찬가지로 수동으로 고치지 않고 자동으로 고쳐줄 수 있는 것들을 저장할 때 자동으로 고쳐질 수 있게 하는 옵션이 있다.

아까처럼 기본설정-설정 에 들어가서 ESLint를 검색한뒤 Eslint : Auto fix on Save를 체크해주면
자동으로 수정이 가능한 코드는 자동으로 수정이 가능하다.

취향에 따라 설정하면 된다.

---

# ESLint 설정 커스텀

package.json 에 있는 eslintConfig react-app을 통해서 react-app에 필요한 대부분의 규칙들이 적용 되어있다. 이것 처럼 다른 config package들이 있다 대표적으로 eslint-config-airbnb, eslint-config-google, eslint-config-standard 등 자주 사용되는 규칙들이 묶여진 상태로 라이브러리가 존재한다. 주로 react 프로젝트에서는 eslint-config-airbnb가 많이 사용된다.

일단 이런 라이브러리를 리액트 프로젝트에 적용하기 위해서는 라이브러리를 설치해야 한다.

`yarn add eslint-config-airbnb`
로 설치를 하고

```json
"eslintConfig":{
  "extends": ["react-app","airbnb"]
},
```

이런식으로 하나 추가해주면 된다.
이렇게 설정하면 기존 코드에서 여러 에러들이 발생하는데 몇가지는 무시해주는 작업들을 해 줄 것이다.
그 전에
`$ yarn add eslint-config-prettier`
를 설치해 준다.

설치해주고 prettier도 뒷 부분에다가 추가해주면 prettier에서 관리할 수 있는 것들은 eslint를 통해 관리하지 않겠다 하는 설정을 할 수 있다.
만약 airbnb 나 다른 config 를 적용하게 되면 뒤에 prettier를 넣어주는 것이 중요하다. 그렇게 안하면 이것저것 eslint 설정을 바꿔줘야할 것이 많아짆다.

이렇게 적용하고 코드를 열어보면 여러 에러가 발생하는데 이 중에서 no-unused-vars 라는 에러가 발생했다. 그런데 만약 본인이 이 부분에 대해서는 에러를 발생시키지 않고 싶다면, 이 no-unused-vars를

```json
"eslintConfig":{
  "extends": ["react-app","airbnb","prettier"]
},
"rules": {
  "no-unused-vars" : 1
}
```

"rules" 를 추가해서 원하는 에러를 추가해 준다.
해당 값을 1로 설정하면 기존에 에러로 발생하던 부분이 경고로 바뀌게 되고 0 으로 설정하게 되면 경고조차 사라지고 2로 설정하면 다시 빨간 줄이 나타나게 된다.

no-console 을 0으로 설정해 주고 그리고 규칙중에 react/jsx-filename-extension 이라는 에러가 발생하는데 이것은 js파일에서 jsx를 사용하지 않는다는 규칙이다. 이 규칙을 꺼주기 위해서는 마찬가지로 rules에 해당 에러를 복사해서 0으로 주면 된다.(airbnb 를 통해서 설정된 규칙이다.)

여기 까지 하면 불 필요한 규칙들이 사라진다.
여기서 serviceWorker.js 를 열어보면 규칙들에 의해 많은 경고메세지와 에러들이 뜨는 것을 볼 수 있다.
만약 해당 파일에 한해서 eslint 규칙들을 적용시키지 않고 싶다면
해당 파일의 제일 윗부분에
/_ eslint-disalbe _/ 이라는 주석을 넣으면 모두 비활성화 된다.

앞으로 리액트 프로젝트를 개발하게 될 때에는 만약 airbnb 설정이 편하다면 적용해서 사용하면 되지만 초심자인 경우 이것저것 까다로운 규칙들이 많아서 불편할 수 있다.
무조건 사용할 필요도 없다. 사용을 원치않으면 extends에서 지워주기만 하면 된다.

# Snippet (코드 조각)

이 기능은 대부분의 에디터마다 내장 되어있는 기능이다. 기본 용도는 자주 사용되는 코드에 대해 단축어를 만들어서 코드를 빠르게 작성할 수 있게 한다.
예를들어 sample이라는 js파일을 만들고

```js
import React from "react";

function Sample() {
  return <div> Sample </div>;
}

export default Sample;
```

이것처럼 기본 틀 같은것을 만들 때마다 작업을 해주기가 귀찮을 수 있다 이런 경우에 Snippet을 쓰는 것인데. 예를 들어 단축키워드로 fc를 입력하면 위의 코드가 작성되는 것이다. 확장 프로그램에 React Snippet을 검색해서 설치한 뒤에 이미 정의 된 키워드를 사용하는 방법도 있지만. 직접 만들어서 사용하는 것을 추천한다.

지금 부터는 직접 만들어서 사용하는 방법을 작성할 것이다.

다시 Sample.js 로 돌아와서
우리가 function 을 만들 때 계속 Sample이라는 이름의 function으로 코드를 작성하는 것이 아니기 때문에 파일 이름을 불러오는 \${TM_FILENAME_BASE} 를 사용해서 설정 해준다

```js
import React from 'react';

function ${TM_FILENAME_BASE}(){
  return <div> Sample </div>
}

export default ${TM_FILENAME_BASE};
```

이렇게 설정해 주고

브라우저에서
https://snippet-generator.app/
을 접속해서 방금 우리가 작성한 코드를 붙여넣고
Description 쪽에서는 코드조각의 설명을 집어넣고
Tab trigger 에는 단축어를 넣는다.
그다음 밑에 생성된 VSCODE 탭에 있는 코드를 복사한다.

이제 다시 VSCODE 창으로 돌아와서 Sample.js 코드를 열어보면 VSCODE 창 하단에 Javascript 라는 탭이 있는데 이것을 Javascript React로 변경해줘야한다.
Javascript로 표시된 곳을 클릭해보면 언어모드 선택 창이 활성화 되는데 여기에 Javascript를 검색해보면 Javascript React가 뜬다. 이것을 선택해준다.
그렇게 하면 이 파일을 Js React 파일로 인식하게 된다. 만약 js파일을 열때마다 이렇게 인식시키고 싶다면 다시 Javascript React로 표시된 부분을 클릭해주고 .js에 대한 파일 연결 구성 혹은 Configure File Association for .js 를 눌러주고 다시 Javascript React를 클릭해 주면 된다.

그 다음에는 code - Preferences - User Snippet을 눌러준다.

그리고 그 창에서 javascriptreact.json을 선택한다.
그럼 코드창이 하나 뜨는데.
여기에 방금 복사했던 코드

```json
"Create Functional React Component": {
  "prefix": "fc",
  "body": [
    "import React from 'react';",
    "",
    "function ${TM_FILENAME_BASE}(){",
    "  return <div> Sample </div>",
    "}",
    "",
    "export default ${TM_FILENAME_BASE};"
  ],
  "description": "Create Functional React Component"
}
```

을 붙여넣기 해준다. 이제 부터는 단축어로 쉽게 코드 작성이 가능하다.
Sample.js 내용을 모두 지워주고
fc를 입력하면 바로 Sample 코드가 작성되는 것을 볼 수 있다.

만약 해당 내용을 붙여넣었는데 잘 작동하지 않는다면

```json
{
  "Create Functional React Component": {
    "prefix": "fc",
    "body": [
      "import React from 'react';",
      "",
      "function ${TM_FILENAME_BASE}(){",
      "  return <div> Sample </div>",
      "}",
      "",
      "export default ${TM_FILENAME_BASE};"
    ],
    "description": "Create Functional React Component"
  }
}
```

위의 코드와 같이 복사했던 코드를 { } 중괄호로 한번 감싸준다.

그리고 우리가 <div> 사이에 입력한 Sample 이라는 텍스트에 focus 가 되게 만들고 싶다면
javascriptreact.json 파일에서

```json
// javascriptreact.json
"<div> 사이에 ${1:원하는 텍스트} </div>"
```

으로 수정 작업을 거쳐주고 테스트 해본다.
만약 어떤 텍스트 없이 커서만 포커싱 되게 하고 싶다고 하면

```json
// javascriptreact.json
"<div> 사이에 ${1} </div>"
```

이렇게만 적용 시켜 주면 된다.

```json
//javascriptreact.json
{
  "Create Functional React Component": {
    "prefix": "fc",
    "body": [
      "import React from 'react';",
      "",
      "function ${TM_FILENAME_BASE}(){",
      "    return(",
      "        <div>",
      "            ${1}",
      "        </div>",
      "    );",
      "}",
      "",
      "export default ${TM_FILENAME_BASE};"
    ],
    "description": "Create Functional React Component"
  }
}
```

나는 이런식으로 작성했다.

만약에 컴포넌트 이름이 위치한 곳에 focus가 갔으면 좋겠다고 생각하면
${1:${TM_FILENAME_BASE}} 이렇게 ${} 로 한번 더 감싸주면 된다.
그리고 export 쪽에는 ${2:\${TM_FILENAME_BASE}} 로 감싸주면 탭을 누르면 바로 export 쪽으로 커서가 이동하게 된다.
