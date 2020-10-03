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
