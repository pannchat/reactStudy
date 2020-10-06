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
