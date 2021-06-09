# class 형 컴포넌트
우리가 기존에 컴포넌트를 만들 때에는 함수형으로 만들었다.
class형 컴포넌트는 컴포넌트를 선언하는 또 다른 방식이다. 요즘 잘 사용하지는 않는다.
하지만 class형 컴포넌트를 사용하는 프로젝트를 유지보수 할 수도 있기 때문이다.

class형 컴포넌트를 만들기위해 Hello 컴포넌트를 열어 본다.

```js
// Hello.js

// function Hello({color, name, isSpecial}){
//     return <div style={{color}}>
//         {isSpecial ? <b>*</b> : null}
//         ㅎㅇ {name}</div>;
// }

```

그리고 기존에 함수형으로 작성했던 Hello컴포넌트를 주석처리해준다.
class 형 컴포넌트를 사용하기 위해서는, {Component} 를 따로 불러와야하고, class라는 키워드를 사용해서 컴포넌트를 선언하고
render() 라는 메서드가 있어야한다. 그리고 이 내부에서는 JSX를 반환해 줘야한다.
밑에 구현했던 로직을 동일하게 구현해준다.
```js
class Hello extends Component{
    render(){
        const{ color, isSpecial, name} = this.props;
        return(
            <div style={color}>
                {isSpecial && <b>*</b>}
                안녕하세요 {name}
            </div>
        );
    }
}
```
비구조 할당을 통해서 this.props에 있는 color, isSpecial, name을 추출해 주고, 사용하면 좀 더 간결하게 사용할 수 있다.

여기서 defaultProps 를 설정하게 될 때에는 또 다른 방식으로
class 형 컴포넌트에서 static defaultProps를 사용하는 방법도 있다.
```js
// Hello.js
// Hello.defaultProps={
//     name: 'default name'
// }
```
해당 구문을 주석처리해주고
Hello 클래스 컴포넌트에서 

```js
// Hello.js
class Hello extends Component{
    static defaultProps ={
        name : '이름없음',
    }
    render(){
        const{ color, isSpecial, name} = this.props;
        return(
            <div style={color}>
                {isSpecial && <b>*</b>}
                안녕하세요 {name}
            </div>
        );
    }
}
```
로 설정해주고 
index.js에서 Hello컴포넌트로 바꿔주고
<Hello name="react" isSpecial>
로 설정해주면 잘 작동하는 것을 볼 수 있다.

---
# class 형 컴포넌트의 state와 setState
이번에는 counter 컴포넌트를 class 컴포넌트로 만들어본다.
counter.js 를 열어 주석 처리해 주거나 지운다.
```js
// Counter.js
import React, { Component } from 'react';

class Counter extends Component{
    render(){
        return (
            <div>
                <h1>0</h1>
                <button>+1</button>
                <button>-1</button>
            </div>
        );
    }
}
export default Counter;
```

Component를 import 해주고 마찬가지로 render를 사용해서 return 해준다.
그리고 index.js를 열어 Counter를 불러와주고 렌더링 시켜본다.
물론 지금은 작동하지 않는다. 값이 바뀌게 하기 위해서는 state를 사용해야 하는데
그전에 component에서 custom method를 만들어 본다.
custom method는 class 내부에 함수를 만드는 것을 의미한다.
```js
// Counter.js
class Counter extends Component{
    handleIncrease(){
        console.log('increase');
    }
    handleDecrease(){
        console.log('decrease');
    }
```
render는 컴포넌트 내부에 지니고있는 method인 것이다.
이렇게 handleIncrease와 handleDecrease 처럼 우리가 새롭게 정의한 함수를 button에 onClick에 적용시켜준다.

또 다른 방법은 costum method를 선언할 때 arrow function 문법을 사용하는 것이다.
```js
// Counter.js
.
.
return (
    <div>
        <h1>0</h1>
        <button onClick={this.handleIncrease}>+1</button>
        <button onClick={this.handleDecrease}>-1</button>
    </div>
);
.
.
```

이제 우리가 추후 button을 눌렀을 때 상태를 업데이트 하기 위해서는 this.setState를 사용해야 하는데 문제가 하나 있다.
handleIncrease를 버튼에 연결했다. 그런데 handleIncrease에서 console.log(this); 를 실행시키면 컴포넌트 인스턴스 자기 자신을 가리켜야되는데 이 함수를 특정 이벤트에 연결시켜주는 순간 이 handle함수와 this의 연결이 사라져버린다.
이렇게 된 이유는 각 method를 button들에 이벤트를 등록하는 과정에서 각 method 와 컴포넌트 인스턴스의 관계가 끊겨버리기 때문이다.

이를 해결하기 위한 방법중 첫번째
컴포넌트의 생성자 함수인 constructor에서 함수를 미리 바인딩 해주는 것이다.
constructor는 props라는 파라미터를 가지고 그리고 작업을 하기전 super(props)를 해준다.
```js
// Counter.js
class Counter extends Component{
    constructor(props){
        super(props);
        this.handleIncrease = this.handleIncrease.bind(this);
        this.handleDecrease = this.handleDecrease.bind(this);
    }
```
bind라는 작업을 하게되면 만약 함수에서 this를 가리키게되면 이 constructor에서 사용하는 this를 가리키게 하라는 의미를 담고 있다.

이제 상태를 관리하는 방법을 알아보자.
```js
// Counter.js
import React, { Component } from 'react';

class Counter extends Component{
    constructor(props){
        super(props);
        this.state ={
            counter: 0
        };

    }
    handleIncrease = () => {
        this.setState({
            counter: this.state.counter + 1
        })
    }
    handleDecrease = () =>{
        this.setState({
            counter: this.state.counter - 1
        })
    }
    render(){
        return (
            <div>
                <h1>{this.state.counter}</h1>
                <button onClick={this.handleIncrease}>+1</button>
                <button onClick={this.handleDecrease}>-1</button>
            </div>
        );
    }
}
export default Counter;
```
this.state를 지정해주고 counter를 지정해준다.

state는 무조건 객체 형태여야한다.
함수형 컴포넌트에서 useState를 사용할 때에는 객체, 배열, 숫자가 될 수 있었지만 여기에선 객체로만 가능하다.

여기서 this.setState를 통해 update하고 싶은 값을 넣어주면 해당 값만 업데이트해 주고 나머지 값들은 건드리지 않게 된다.

setState에서도 함수형 업데이트를 할 수 있다.
```js
this.setState(state =>({
    counter: state.counter + 1
}));
```
state를 파라미터로 가져와서 원하는 변화를 준 객체를 반환해 주면 된다.

```js
    this.setState({
        counter: this.state.counter + 1
    }) ; 
```
이 방법과의 차이가 무엇일까?

위의 두 코드를 여러번 사용해보면 그 차이를 알 수 있다.
```js
this.setState(state =>({
    counter: state.counter + 1
}));
this.setState(state =>({
    counter: state.counter + 1
}));
```
이 방법으로 실행시켜보면 +1이 두번실행되서 2씩 올라가게 된다.

하지만 
```js
    this.setState({
        counter: this.state.counter + 1
    }) ; 
        this.setState({
        counter: this.state.counter + 1
    }) ; 
```
이 방식은 +2씩 될 것 같지만 그렇지 않다.
이렇게 되는 이유는 setState를 한다고 해서 상태가 바로 바뀌는 것이 아니기 때문이다. setState는 단순히 상태를 바꾸는 함수가 아니라 상태로 바꿔달라고 요청하는 함수로 이해 해야한다. 성능적인 문제 때문에 리액트는 상태가 바로 업데이트 되지 않고, 비동기적으로 업데이트 되기 때문이다.
그래서 만약 이런 작업을 해야할 일이 있다면 함수형 업데이트를 사용해야 업데이트가 제대로 이뤄진다.
