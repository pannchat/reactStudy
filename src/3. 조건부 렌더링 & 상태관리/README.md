# 조건부 렌더링

자바스크립트에서 동작하는 것과 동일하게 동작함.

if나 조건연산자 같은 연산자를 사용해서 상황별로 다른 결과 값을 렌더링 할 수 있음.

```js
/* App.js */
  return (
    <Wrapper>
    <Hello name ="jiwon" color="green" isSpecial={true}/>
    <Hello color="pink" />
    </Wrapper>
  )
```
App.js에서 Hello컴포넌트에 isSpecial이라는 props를 설정해준다.

```js
/* Hello.js */
function Hello({color, name, isSpecial}){
    return <div style={{color}}>
        {isSpecial ? <b>*</b> : null}
        ㅎㅇ {name}</div>;
}
```

이후 Hello.js 에서 
```
{isSpecial ? <b>*</b> : null}
```
형태의 삼항연산자를 추가해주는데
이는 isSpecial의 값이 true이면 *을 false 면 null을 출력해 준다.

JSX에서 null , false , undefined 등을 렌더링하면 아무것도 나타나지 않는다. (0 은 제외)

이를 응용하여 여러 형태의 조건부 렌더링을 구현할 수 있다.
```js
{isSpecial && <b>*</b>}
```
를 사용하면 isSpecial이 True이면 *을 렌더링하고 False 이면 && 연산이 false 가 되기 때문에 아무것도 출력되지 않는다.
# useState Hook
> ### Hook이란?
> Hook은 React 16.8에 새로 추가된 기능입니다. Hook은 class를 작성하지 않고도 state와 다른 React의 기능들을 사용할 수 있게 해줍니다.
> [자세히보기](https://ko.reactjs.org/docs/hooks-overview.html)

src > Counter.js 생성
```js
/* Counter.js */
import React, { useState } from 'react';

function Counter(){
    const [count, setCount] = useState(0);
    const upCount = () => {
        setCount(count + 1);
    };
    const downCount = () => {
        setCount(prevCount => prevCount-1);
    }
    return(
        <div>
            <p>count : {count}</p>
            <button onClick={upCount}>up</button>
            <button onClick={downCount}>down</button>
        </div>
    );
}

export default Counter;

```

이 예제에서 useState가 Hook이다. Hook을 호출해 function component내부에 state(예제에서 count라는 상태변수를 선언했음)

```js
const [count, setCount] = useState(0);
```

useState는 현재의 state값과 이 값을 업데이트 하는 함수를 쌍으로 제공함. 

[배열 구조 분해](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#%EB%B0%B0%EC%97%B4_%EA%B5%AC%EC%A1%B0_%EB%B6%84%ED%95%B4) 문법으로 useState로 호출된 state 변수들을 다른 변수명으로 할당할 수 있게해줌.



# input 상태 관리

src > InputTest.js 생성

```js
/* InputTest.js */
import React from 'react';

function InputTest(){
    return(
        <div>
            <input />
            <button>초기화</button>
            <div>
                <span>값 : </span>
                <b>Lorem ipsum</b>
            </div>
        </div>
    );
}

export default InputTest;
```

onChange 함수를 생성
```js
/* InputTest.js */
const onChange = (e) => {
  console.log(e.target);
}
.
.
.
```

파라미터 e는 수정이벤트가 발생했을 때 그 수정이벤트에 대한 내용이 담긴다.
이 파라미터 e로 받아온 [event](https://developer.mozilla.org/en-US/docs/Web/API/Event)객체 내부의 properties중 하나인 [target](https://developer.mozilla.org/ko/docs/Web/API/Event/target)은 event가 전달한 객체에 대한 참조를 의미한다.

실제로 렌더링 된 페이지의 input Box에 어떤 값을 입력하게되면 console에서 input에서 이벤트가 발생했음을 보여준다.

```js
/* InputTest.js */
import React,{useState} from 'react';

function InputTest(){
    const [text,setText] = useState('');

    const onChange = (e) => {
        setText(e.target.value);
    }

    const onReset = (e) =>{
        setText('');
    }
    return(
        <div>
            <input onChange={onChange} value={text}/>
            <button onClick={onReset}>초기화</button>
            <div>
                <span>값 : </span>
                <b>{text}</b>
            </div>
        </div>
    );
}

export default InputTest;
```

이제 console.log가 아닌 input element의 값을 <b>{text}</b>로 나타내주기 위해
useState Hook사용해서 
```js
const [text,setText] = useState('');
```


기본값은 빈 문자열로 주고
```js
    const onChange = (e) => {
        setText(e.target.value);
    }
    const onReset = (e) =>{
        setText('');
    }
```

onChange, onReset 함수를 선언해준다.
이 때

```js
<input onChange={onChange} value={text}/>
```
에서 value={text}를 추가해주지 않으면 reset버튼 클릭시 input의 value값이 초기화 되지않음.


# 여러개의 input 상태 관리하기

기존에 작업하던 inputTest.js의 파일을
```
import React,{useState} from 'react';

function InputTest(){
    

    const onChange = (e) => {

    }

    const onReset = (e) =>{
        
    }
    return(
        <div>
            <input/>
            <button onClick={onReset}>초기화</button>
            <div>
                <span>값 : </span>
            </div>
        </div>
    );
}

export default InputTest;
```
위의 코드와같이 지워준다.

이어서 input에 placeholder라는 속성을 설정해준다
```
<div>
            <input placeholder="이름"/>
            <input placeholder="닉네임"/>
            <button onClick={onReset}>초기화</button>
            <div>
                <span>값 : </span>
                이름 (닉네임)
            </div>
        </div>
```

input이 여러개일 때 usestate를 여러개 사용하거나 onChange를 여러개 만들 수 도있지만. 이 방법이 가장 좋은 방법은 아니다.
더 좋은 방법은 input에 name이라는 값을 설정하고 이벤트 발생시 이 값을 참조하는것 이다.

usetstate에서는 기존에 문자열 값을 관리를 했지만 이제 여러개의 문자열을 가지고있는 객체의 상태로 관리를해줘야한다.
```
const [inputs, setInputs] = useState({
    name: '',
    nickname: '',
});
```

나중에 name값과 nickname값을 쉽게 사용할 수 있도록
비구조할당을 사용해 추출한다.
```
const {name, nickname} = inputs;
```

이제 return에있는 input태그에 name값을 설정해 주고 onChange까지 설정해준다.
```
<input name="name" placeholder="이름 onChange={onChange}"/>
<input name="nickname" placeholder="닉네임" onChange={onChange}/>
```

이벤트가 발생 했을때 기존에는 e.target.value 값을 조회했었다.
```
const onChange = (e) => {
    console.log(e.target.name);
    console.log(e.target.value);
}
```
로 설정하고 어떻게 나타나는지 확인.
input을 수정하면 값이 변경됨을 이벤트객체가 알려준다.


console.log를 지워주고
onChagne에서 name,value를 미리 추출해준다. 사용의 편의를위해
리액트에서 객체를 업데이트 하기위해서는 기존의 객체를 복사해줘야한다.

```
const onChange = (e) => {
    const { name , value } = e.target;//onChagne에서 name,value를 추출
    setInputs({
        ...inputs,
        [name]: value,
    });
}
```
setInputs에서
...inputs 는 spread 문법으로 inputs의 값들이 그대로 복사되어 오게된다.
```
const nextInputs={
    ..inputs
}
nextInputs[name] = value;
```

를 선언해 줘도되는데 굳이 다른 라인에서 작업하지않고.
```
const nextInputs={
    ..inputs,
    [name] : value,
}
```
로 쓰면되는데, 그냥 name:value로 사용하면 name문자열 자체가 들어가게되지만 [name] 으로 사용하면 실제 name값이 가리키는것에 따라 다른 키값으로 변경되게된다.

이걸 그냥 합쳐서
```
setInputs({
    ...inputs,
    [name] :value,
})
```
setInputs에 객체를 넣어준다.

e.target에서 name,value로 추출하고
[name] 값은 nickname이 될 수도 있고 name이 될 수 도있다.

onReset에서는
```
setInputs({
    name:'',
    nickname:'',
});
```
로 name, nickname을 비워준다.

이제 추출된 내용들을 태그에 사용해주면된다.
```
<div>
            <input name="name" placeholder="이름" onChange={onChange} value={name}/>
            <input name="nickname" placeholder="닉네임" onChange={onChange} value={nickname}/>
            <button onClick={onReset}>초기화</button>
            <div>
                <span>값 : </span>
                {name}({nickname})
            </div>
        </div>
```
