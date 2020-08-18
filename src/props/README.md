# props 를 통해 컴포넌트에 값 전달 


### Hello 컴포넌트에 name이라는 값을 전달하기 위해서 

```js
/* App.js */
function App() {
  return (
    <Hello name ="jiwon"/>
  )
}
```
를 추가해주고

```js
/* Hello.js */
function Hello(props){
    console.log(props); 
    return <div>ㅎㅇ</div>;
}
```
함수에서 props 라는 파라미터를 가져온다.

### name 값을 컴포넌트 내부에서 보여주고 싶다면.

{props.name}을 추가해준다.
```js
/* Hello.js */
function Hello(props){
    console.log(props); 
    return <div>ㅎㅇ {props.name}</div>;
}
```
또 다른 값을 추가 할 때는

```js
/* App.js */
function App() {
  return (
    <Hello name ="jiwon" color="green" />
  )
}
```
으로 color 값을 추가해주고
```js
/* App.js */
function Hello(props){
    return <div style={{color:props.color}}>ㅎㅇ {props.name}</div>;
}

```
div style속성에 color를 추가해준다 이때 {{}}로 감싸지는 이유는 내부의 {}는 객체를, 이 객체를 감싸는{}로 이뤄지기 때문임.

하지만 props를 계속 중복해서 사용하지 않고 구조 분해를 하여 이를 생략하는 법도있다.

```js
function Hello({color, name}){
    return <div style={{color:color}}>ㅎㅇ {name}</div>;
}

```
color : color 도
그냥 color 로 생략 가능함.

### props 를 지정하지 않고 default 값을 설정하는법.

```js
.
.
Hello.defaultProps={
    name: 'default name'
}
// 위의 내용을 추가해준다.
export default Hello; // Hello component 를 내보낸다.

```
default 값 설정확인을 위해

```js
function App() {
  return (
    <>
    <Hello name ="jiwon" color="green"/>
    <Hello color="pink" />
    </>
  )
}
```
로 Hello 태그를 하나 추가해서 name값을 주지 않으면
앞서 설정한 default 값인 default name 이 출력된다.

### Props children

```js
import React from 'react';

function Wrapper(){
    const style = {
        border : '3px solid black',
        padding : 10
    };

return <div style={style}></div>
}
export default Wrapper;
```
src > Wrapper.js 파일 생성

```js
import React from 'react';
import Hello from './Hello'; // .js 생략가능
import Wrapper from './Wrapper';
function App() {
  return (
    <Wrapper>
    <Hello name ="jiwon" color="green"/>
    <Hello color="pink" />
    </Wrapper>
  )
}

export default App;
```

이 상태로 실행하게되면 
Wrapper 내부의 값들이 보이지 않게 된다.
이 를 해결하기 위해 props.children 을 사용하면된다.

따라서
```js
/* Wrapper.js */
import React from 'react';

function Wrapper({children}){
    const style = {
        border : '3px solid black',
        padding : 10
    };

return <div style={style}>{children}</div>
}
export default Wrapper;
```

Wrapper에서 chilren을 비구조할당을 사용해서 불러오고 return에 chilren을 렌더링 해주면 된다.

