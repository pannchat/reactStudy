# Custom Hook
컴포넌트를 만들다 보면 가끔씩 반복되는 로직들이 발생한다
예를들어
```js
const onChange = (e) => {
    const {name, value} = e.target;
    setInputs({...inputs, [name] : value});
}
```
이런 input을 관리하는 코드는 꽤나 자주 작성하게 될 수 있는 코드이다. 왜냐면 input을 관리하려면 e.target에 있는 name, value를 읽어서 참조하여 새로운 상태를 설정해야하기 때문이다.

이런 경우에는 custom hook을 만들어서 사용할 수 있다.
만드는 방법은 간단하다. react에 내장되어있는 useEffect, useState, useReducer 같은 Hook을 사용해서 원하는 기능을 구현하고 컴포넌트에서 사용하고 싶은 값들을 반환 해 주면 된다.

우선 useInputs.js 라는 컴포넌트를 생성한다.
```js
// useInputs.js
import {useState, useCallback} from 'react';

function useInputs(initialForm){
    const [form, setForm] = useState(initialForm);
    const onChange = useCallback(e=>{
        const {name, value} = e.target;
        setForm(form => ({...form, [name] :value}));
    },[]);
    const reset = useCallback(()=> setForm(initialForm), [initialForm]);

    return [form,onChange,reset];
};

export default useInputs;
```
useState와 useCallback을 import하고

useInputs라는 함수를 하나 생성해준다. 함수에서 사용할 파라미터는 initialForm이라는 해당 input form에서 관리할 초기값이다.
useState를 사용해준다. 
```js
const [form, setForm] = useState(initialForm);
```
이렇게 하면 form이라는 새로운 상태를 선언하게 되는데 그 상태의 초기값은 파라미터로 가져온 initialForm 이되는것이다.

그리고 onChange 함수도 생성해준다.
```js
  const onChange = useCallback(e=>{
        const {name, value} = e.target;
        setForm(form => ({...form, [name] :value}));
    },[]);
```
useCallback을 사용해서 e 이벤트 객체를 가져와서 {name, value}를 e.target에서 추출해주고 setForm을 통해서 form을 업데이트해준다.
그리고 deps 배열은 참조할 상태가 없으므로 비워주도록한다.

추가적으로 reset이라는 함수도 만드는데 이 함수의 역할은 이 form을 초기화 시키는 역할을 한다.
```js
    const reset = useCallback(()=> setForm(initialForm), [initialForm]);
```
여기서는 파라미터로 가져온값을 setForm에 사용하고 있으므로 deps 배열에 initialForm을 넣어준다.
그리고
```js
return [form,onChange,reset];
```
return 해주는데 이것을 객체형태로 반환해줘도 되고, 배열형태로 반환해줘도 된다.

이렇게 생성된 useInputs를 사용할 때에는 이 함수에서 관리할 form에 대하여 초기값을 파라미터로 받아온 다음에 이 Hook이 반환하는 onChange를 사용해서 input에 change를 관리할 수 있고 상태같은 경우는 form에서 조회하고 초기화할 때에는 reset을 하면 된다.

이제 해당 파일을 저장하고 App.js 컴포넌트에서 불러와서 사용해 보도록 한다.
우선 reducer에서 CHANGE_INPUT 상태를 관리해줄 필요가 없어진다.
initialState에서 inputs 객체도 더이상 필요없다.
```js
// App.js
//해당 구문 삭제
case 'CHANGE_INPUT':
    return {
    ...state,
    inputs:{
        ...state.inputs,
        [action.name] : action.value
    }
    };
// 해당 구문 삭제
inputs: {
    username: '',
    email: '',
},
//해당 구문 삭제
  const onChange = useCallback(e =>{
    const {name, value} = e.target;
    dispatch({
      type:'CHANGE_INPUT',
      name,
      value
    })
  }, []);
//해당 구문 삭제
const {username, email} = state.inputs;
```
위의 코드를 삭제해주고, useImports를 import해준다.
```js
// App.js
import useInputs from './useInputs';
.
.
function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [form, onChange, reset] = useInputs({
    username: '',
    email: '',
  })
  const {username, email} = form;
  const nextId = useRef(4);
.
.
```

그리고 useInputs의 return 배열을 참조하여 useInputs의 usename과 email을 공백으로 초기화 해주고
form에서 username과 email을 추출해준다.
reset은 onCreate할 때 추출해준다.
```js
// App.js
  const onCreate = useCallback(() => {
    dispatch({
      type: 'CREATE_USER',
      user:{
        id: nextId.current,
        username,
        email,
      }
    })
    nextId.current += 1;
    reset();
  },[username,email,reset]);
```
그리고 deps에 reset 도 추가해준다.
--- 
# Context API를 사용해서 전역 값관리
우리가 이전에 구현했던 App컴포넌트를 보면
App컴포넌트 내부에서 onToggle과 onRemove가 구현된다음 이 두가지 함수가 UserList 한테 전달이 된 상태다 UserList를 열어보면 UserList에서는 props로 onRemove와 onToggle을 User컴포넌트에게 넘겨주고있다. User컴포넌트에선s onRemove와 onToggle을 props로 받아와서 사용하고 있다. 이것을 보면 UserList에서는 User에게 전달해 주는 다리 역할을 하고 있다. 사실상 UserList컴포넌트에서 직접 onRemove와 onToggle을 사용하는 일은 없지만 User에게 전달해 줘야 하기 때문에 App컴포넌트에서 onToggle과 onRemove를 UserList에게 넘겨준것이다. 지금 같은 경우에는 큰 문제가 없지만 컴포넌트가 복잡해진 경우를 생각해보면, 이런 상황이 조금 복잡하게 느껴질 수 있다. 그래서 중간을 거쳐서 넘겨주지 않고 바로 넘겨주는 것을 위해 Context API를 사용한다.
우선 src > ContextSample.js 를 만들어준다.
```js
// ContextSample.js
import React, {createContext, useContext } from 'react';
function Child(){

}
```

우선 createContext와 useContext 라는 함수를 불러와준다.
그리고 이 두가지 함수를 사용해보기 전에 컴포넌트 4개를 생성해준다.
Child라는 컴포넌트는 text라는 props를 받아와서 렌더링해준다.
Parent라는 컴포넌트에서는 마찬가지로 text를 받아오고 Child를 넣고 text={text}를 넣는다.

```js
import React, {createContext, useContext } from 'react';

function Child({text}){
return <div>안녕하세요? {text}</div>
}

function Parent({text}){
    return <div><Child text={text}/></div>
}

function GrandParent({text}){
    return <div><Child text={text}/></div>
}

function ContextSample(){
    return <GrandParent text="good"/>
}
export default ContextSample;
```
여기까지 작성해보고 구조를 보면 text 'good'이 GrandParent와 Parent 를 거쳐 Child에서 안녕하세요? {text} 가 보여지게 된다.
이번에는 ContextSample에서 Child로 바로 주는 방법을 알아보자.
일단, index.js 에서 App 대신에 contextSample을 렌더링 하도록 해본다.

```js
.
.
import ContextSample from './ContextSample' //추가

ReactDOM.render(
    <React.StrictMode>
        <ContextSample /> //수정 
    </React.StrictMode>,
  document.getElementById('root')
);
.
.

```
이제 렌더링 된 결과를 보면 기존에 설정한 Child 컴포넌트의 결과물이 잘 나타나는 것을 볼 수 있다.

이제 Context API를 사용해보자.
ContextSample 컴포넌트에서
```js
// ContextSample.js
import React, {createContext, useContext } from 'react';

const MyContext = createContext('defaultValue');

function Child(){
    const text = useContext(MyContext);
    return <div>안녕하세요? {text}</div>
}
```
상단에 MyContext 변수에 createContext라는 함수에 context에서 사용할 기본값을 넣어 담아준다.
그리고 Child에서 props로 받아오던 text를 지워주고 
const text를  useContext Hook을 통해 MyContext를 받아와서 렌더링하게끔 해준다.
여기까지 실행해 보면, 우리가 context의 value를 아직 지정해 주지 않았기 때문에 defaultValue가 나타나게 된다. 만약 Mycontext를 지정해 주고 싶다면, 이 context를 사용하는 가장 상단의 ContextSample에서 MyContext 내부의 Provider라는 컴포넌트를 사용해서 감싸주면 된다.
```js
// ContextSample.js
function ContextSample(){
    
    return(
        <MyContext.Provider value='good'>
            <GrandParent />
        </MyContext.Provider>
    ) 
}
```

이전과 동일하게 동작하는 것을 볼 수 있다.
구조를 보면 MyContext.Provider를 통해 value값을 설정해주고 그럼 context에 defaultValue 대신 이 value 값이 설정되게 되고 Child 컴포넌트에서 useContext를 사용해서 MyContext에 있는 값을 불러와서 이 text값을 사용할 수 있게 되는 것이다.
그리고, 이 MyContext 같은 context를 다른 파일에서 작성해서 내보낸 것을 불러와서 어디서든지 사용할 수 있다는 큰 장점이 있다.

여기까지 정리해 보자면,
context를 만들 때는 createContext라는 함수를 사용하고 여기에 들어가는 파라미터는 기본값 이다. 이 기본값은 Provider라는 컴포넌트가 사용되지 않았을 때 사용되는 값이고 만약 사용 되었다면, Provider라는 컴포넌트를 사용해서 value값을 지정해주면 이게 context 값이 된다.

이 context 값은 유동적으로 변할 수 있다.
ContextSample.js 상단에 useState를 불러와 주고
```js
// ContextSample.js
.
.
function ContextSample(){
    const [value, setValue] = useState(true);
    return(
.
.
```
useState 기본값을 true로 주고 good이 위치하는 곳에 만약 value 값이 true 라면 good을 보여주고 아니라면 bad 를 보여주게 지정해준다.
그리고 button 하나를 생성하여 onClick시 setValue를 !value로 지정해 줘서 클릭할 때마다. value값이 반전되도록 한다.
```js
return(
    <MyContext.Provider value={value ? 'good': 'bad'}>
        <GrandParent />
        <button onClick={(()=> setValue(!value))}>Click</button>
    </MyContext.Provider>
```

이렇게 context를 사용하게 되면, 다른 컴포넌트들을 거치지 않고도 컴포넌트에 바로 값을 전달해 줄 수 있게 된다.