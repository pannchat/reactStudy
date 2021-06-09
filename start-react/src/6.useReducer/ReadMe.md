#
이전에는 우리가 컴포넌트의 상태를 업데이트할 때는 useState를 사용해서 새로운 상태를 설정해줬는데 useReducer를 사용해서도 상태를 업데이트 해줄 수 있다.
어떤 차이가 있냐면
useState에서는 설정하고 싶은 다음 상태를 직접 지정해주며 상태를 업데이트 하는 반면
```js
setValue(5);
```
useReducer는 Action이라는 객체를 기반으로 상태를 업데이트 한다.
여기서 액션 객체라는것은 업데이트할 때 참조하는 객체인데, 
```jsX
dispatch({type: 'INCERMENT'});
```
type이라는 값을 사용해서 어떤 업데이트를 진행할 지 명시할 수 있고
업데이트 할 때 필요한 참조하고 싶은 다른 값이 있다면 
```js
dispatch({type: 'INCERMENT',diff: 4});
```
이 객체 안에 넣을 수 있다.

useReducer라는 Hook 함수를 사용하면 컴포넌트 상태 업데이트 로직을 컴포넌트로부터 분리 시킬 수 있고, 심지어 다른 파일에 작성 후 불러와 사용할 수 있다.
여기서 reducer라는 개념이 있는데 reducer는 상태를 업데이트 하는 함수를 의미한다.

```js
function reducer(state, action){
    switch(action.type){
        case 'INCREMENT':
            return state + 1;
        case 'DECREMENT':
            return state - 1;
        default:
            return state;
    }
}
```
이 함수는 이렇게 생겼다.
현재 상태와 action객체를 파라미터로 받아와서 새로운 상태를 반환해주는 상태를 갖추고 있어야한다.
reducer함수에서 action.type을 읽어와서 INCREMENT면 state+1을 DECREMENT면 steate -1을 반환한다.

그리고 useReducer는 이런식으로 사용한다.
```js
const [number, dispatch] = useReducer(reducer,0);
```
reducer 함수와 기본값 을 넣어준다.
그리고 이 내부의 [number,dispatch]
number는 현재상태를 dispatch는 액션을 발생시키는 함수이다.
dispatch의 의미는 보내다 라는 의미를 갖고있다.

Counter라는 컴포넌트를 open하고 
```js
// Counter.js

```
기존에 사용했던 useState는 setNumber에 이전상태나 다음상태를 직접 넣어주는 형태로 값을 새롭게 만들었다면 이제는 useReducer를 사용해서 구현해본다.

Counter컴포넌트의 import를 useState를 지우고 useReducer를 불러오고
```js const [count, setCount] = useState(0); ```
는 우선 지운다.

reducer라는 새로운 함수를 생성한다.
```js
// Counter.js
function Counter(){
    function reducer(state, action){
        switch(action.type){
            case 'INCREMENT':
                return state + 1;
            case 'DECREMENT':
                return state - 1;
            default:
                throw new Error('Unhandled action');
        }
    }
    const [number, dispatch] = useReducer(reducer, 0);

```
이 reducer 함수는 첫번째 파라미터에 state와 두번째에는 action을 가져오고 결과 값은 그 다음 상태여야 한다.
action에 어떤 타입이 오게되는데, 이 타입의 이름을 우리가 직접 설정해준다. 이 action.type 이 뭐가 들어오냐에 따라 다른 작업을 할 수 있게 switch문을 사용한다.
마지막 default 는 return state를 해줘도 되고 
throw new Error('Unhandled action') 으로 에러를 발생시킨다.
이제 useReducer Hook을 사용해준다. 
```js
const [number, dispatch] = useReducer(reducer, 0);
```
로 첫번째 number에서 현재의 상태가 되고 , 두번째로 dispatch라는 함수가 와서 action을 발생시킨다고 이해하면된다. useReducer에서 첫 파라미터로 우리가 만든 reducer함수를 두번째 파라미터에는 기본값 0을 넣어준다.

```js
// Counter.js
    const upCount = () => {
        dispatch({
            type: 'INCREMENT'
        })
    };
    const downCount = () => {
        dispatch({
            type: 'DECREMENT'
        })
    }
```
upCount와 downCount 에서 기존에 사용하던 setNumber를 지워주고 dispatch로 type을 지정해준다. 그리고 
```js
//Counter.js
    return(
        <div>
            <p>count : {number}</p>
            <button onClick={upCount}>up</button>
            <button onClick={downCount}>down</button>
        </div>
    );
```
count : {number}로 바꿔준다.

이컴포넌트가 잘 작동하는 지 확인하기 위해 index.js 컴포넌트에서 기존 App을 랜더링하던것 대신에 Counter를 렌더링 해본다.
```js
// index.js
import Counter from './Counter'
.
.
ReactDOM.render(
  <React.StrictMode>
    <Counter />
  </React.StrictMode>,
  document.getElementById('root')
);
.
.
.
```
이렇게 수정하고 확인해보면 기존에 구현했던 Counter예제와 동일하게 잘 작동하는것을 확인할 수 있고 Counter 컴포넌트를 보면 상태의 업데이트 로직이 Counter컴포넌트 밖에있는것을 확인할 수 있다.
잘 작동함을 확인했으면 다시 index.js 를 열어 원래상태로 바꿔준다.
--- 
지금까지 우리가 useReducer라 어떻게 작동하는지 간략하게 알아봤다.
이번에는 App 컴포넌트를 열어 기존에 useState를 사용해 구현했던것을 useReducer로 구현한다.
가장 처음 작업해야할 것은 App컴포넌트에서 사용할 초기 상태를 컴포넌트 밖에 선언해 주는것이다.

```js
const initialState= {}
```
App 컴포넌트 위에 initialState 를 선언해주고  inputs와 users를 추가해서
useState에서 사용하던 값들을 넣어준다.
```js
const initialState= {
  inputs: {
    username: '',
    email: '',
  },
  users:[{
    id: 1,
    username: 'jiwon',
    email: 'pannchat@likelion.org',
    active:true,
    },
    {
        id: 2,
        username: 'tom',
        email: 'tom@tom.org',
        active:false,
    },
    {
        id: 3,
        username: 'sam',
        email: 'sam@sam.org',
        active:false,
    },
  ]
}
```
그리고 기존에 App컴포넌트 내부에서 사용했던 모든 로직들을 지워준다.
```js
// App.js
function App() {
  
  return (
    <>
    <CreateUser />
    <UserList users={[]} />
    <div>활성 사용자 수 : 0</div>
    </>
  )
}
```
그리고 모든 props들도 지워주도록한다. users는 빈 배열을 넣고 활성사용자수도 지금은 구현이 안되어있으므로 0을 넣어준다.
```js
// App.js
import React,{ useRef, useReducer, useMemo, useCallback } from 'react';
```
useState자리에 useReducer를 불러와준다.
그리고 reducer함수의 틀을 만들어준다.
```js
// App.js
.
.
.
function reducer(state, action){
  return state;
}
.
.
```

그리고 App컴포넌트 내부에 
```js
function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <>
    <CreateUser />
    <UserList users={[]} />
    <div>활성 사용자 수 : 0</div>
    </>
  )
}
```
첫번째 파라미터엔 reducer를 넣고 두번째에는 처음 선언했던 initialState를 넣어준다. state안에는 inputs와 users가 들어있는데 이 값들을 비구조 할당을 통해 추출해주고 컴포넌트에게 props로 전달해주도록 한다.
```js
function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {users} = state;
  const {username, email} = state.inputs;
  return (
    <>
    <CreateUser username={username} email={email}/>
    <UserList users={users} />
    <div>활성 사용자 수 : 0</div>
    </>
  )
}
```

그 다음에는 onChange를 구현해준다. unChange이벤트가 발생했을때 어떤 action 객체를만들어 dispatch를 할 것 인지 보자.
우선 onchange를 선언하고 함수 재사용을 위해 useCallback을 사용한다.
```js
  const onChange = useCallback(e =>{
    const {name, value} = e.target;
    dispatch({
      type:'CHANGE_INPUT',
      name,
      value
    })
  }, [])
```
useCallback으로 이벤트가 발생했을 때 의 작업을 지정해주며
e.target에서 name,value를 추출해주고 dispatch를 통해 type과 name,value를 지정해준다. name,value는 그대로 사용.
그리고 이 내용을 
```js
<CreateUser username={username} email={email} onChange={onChange}/>
```
CreateUser에게 전달해 준다.
이제 reducer를 구현해준다.
type이 CHANGE_INPUT이면 현재 자신이 지니고 있는 상태에서 inputs 내부의 특정 값을 바꿔주도록 구현해준다.

```js
function reducer(state, action){
  switch (action.type){
    case 'CHANGE_INPUT':
      return {
        ...state,
        inputs:{
          ...state.inputs,
          [action.name] : action.value
        }
      };
    defualt : throw new Error('Unhandled action');
  }
}
```
return 에 ...state는 기존에 자신이 들고있는 상태를넣어주고 inputs:{} 값을 덮어씌우는것은 불변성을 지키기 위해서이다.
이제 onCreate를 만든다.
```js
// App.js
  const onCreate = useCallback(() => {
    dispatch({
      type: 'CREATE_USER',
      user:{
        id: 1,
        username,
        email,
      }
    })
  },[username,email]);
```

onCreate도 마찬가지로 useCallback을 사용하고 여기서는 바로 dispatch를 사용해준다. type은 'CREATE_USER'를 사용하고 user는 id는 일단 1을 넣어주고 username과 email은 state.input에서 받아와 사용한다. 그리고 deps에는 위에 받아온 것에 의존 하는 username과 email을 넣어준다.

이제 nextId를 정의해주기위해 컴포넌트 상단에
```js
// App.js
.
function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const nextId = useRef(4);
.
.
```
nextId를 선언하고 useRef는 4로 한다 useRef를 4로 선언한것은 기존에 users배열에 3개를 미리 정의했기 때문이다
```js
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
  },[username,email]);
  ```
이제 id:1로 설정했던것을 nextId.current로 바꿔주고 dispatch가 끝나면 nextId.current를 +1 해준다. 그리고 이제 reducer함수에서 CREATE_USER case를 지정해주고 
inputs 의 경우에는 초기 값으로 바꿔줄것인데 username : '', 이런식으로 초기화해도 되겠지만 initialState.inputs를 해도된다.
```js
// App.js
    case 'CREATE_USER':
      return{
        inputs : initialState.inputs,
        users: state.users.concat(action.user)
      }
```

기존에는 useState를 사용해서 구현할 때에는 inputs를 날리는 작업과 users를 업데이트를 따로했지만 이번에는 CREATE_USER가 발생하면 이 두가지 작업을 동시에 할 수 있는것이다.

이제
```js
    <CreateUser username={username} email={email} onChange={onChange} onCreate={onCreate}/>
```
onCreate props를 지정해준다
여기까지 Create가 잘작동하는지 확인해본다.

그리고 onToggle과 onRemove를 구현해본다.
```js
case 'TOGGLE_USER':
    return{
    ...state,
    users: state.users.map(user =>
        user.id === action.id ?{...user,active: !user.active}
        :user
        )
    };
case 'REMOVE_USER':
    return{
    ...state,
    users: state.users.filter(user => user.id !== action.id)
    }
```
state를 그대로 가져오고 그중에서 users 배열을 업데이트하는데 나중에 발생시킬 action에서 id라는 값을 가져올것인데 state.users.map을 해서 각유저에대해 비교 해줄것인데 user.id 가 action.id와 같은지 비교해주고 같으면 새로운 객체를 만들어 ...user를 넣어주고 active값을 !user.active로 값을 반전시킨다. 만약 같지 않으면 그냥 user객체를 그대로 유지한다는 의미다.

REMOVE_USER도 마찬가지로
users에서 filter함수를 사용해서 각 유저에 대해 user.id가 action.id와 다르면 유지하고 일치하면 배열에서 사라진다.

```js
  const onToggle = useCallback(id => {
    dispatch({
      type: 'TOGGLE_USER',
      id
    });
  },[]);
  const onRemove = useCallback(id =>{
    dispatch({
      type: 'REMOVE_USER',
      id
    });
  },[]);
```

deps는 컴포넌트를 처음만들때만 이함수를 만들고 그다음부터는 재사용하기 때문에 비워둔다.

```js
    <UserList users={users} onToggle={onToggle} onRemove={onRemove} />
```
이제 onToggle과 onRemove를 전달한다.

여기까지 잘 작동할 것이다.

마지막으로 활성사용자 수를 구해본다
useMemo를 사용하면된다. 
```js
  const count = useMemo(() => countActiveUsers(users),[users]);
```
를 추가해주고 
```js
    <div>활성 사용자 수 : {count}</div>
```

# userReducer과 useState
어떤 상황에 무엇을 사용해야할까? 정해진 답은 없다.
예를들어 컴포넌트에서 관리하는 값이 하나고 그값이 Boolean 값이라면 useState로 관리하는 것이 편할 것이다. 하지만 컴포넌트에서 관리하는 것이 여러개라서 상태의 구조가 복잡해지거나 뭘 추가하거나 없애야하는 상황이라면 useReducer가 더 편할 수도 있다.