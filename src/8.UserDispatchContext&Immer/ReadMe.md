# UserDispatch Context 만들기
우선 App 컴포넌트를 연다.
우리는 Context API를 사용해서 어떤 값을 UserList안에 있는 User컴포넌트에 직접 넣어 줄것이다. onToggle과 onRemove를 User컴포넌트에 주기위해 UserList를 거쳐야한다는 번거로움이 있었다. 이것을 해결하기 위해 context를 통해 onToggle, onRemove를 직접 넣어줄 수 있지만, 그 대신 dispatch만 따로 넣어주는 방법도 있다. 우선 최상단에서 createContext를 불러와주고, App컴포넌트 위에서 
```js
export const UserDispatch = createContext(null)
``` 
기본값은 필요 없으므로 null을 넣어준다.
그리고 UserDispatch 안에 Provider라는 컴포넌트가 있다는것을 이전에 알아봤다.
그 컴포넌트를 사용한다.
```js
// App.js
  return (
    <UserDispatch.Provider value={dispatch}>
    <CreateUser username={username} email={email} onChange={onChange} onCreate={onCreate}/>
    <UserList users={users} onToggle={onToggle} onRemove={onRemove} />
    <div>활성 사용자 수 : {count}</div>
    </UserDispatch.Provider>
  )
```

UserDispatch.Provider를 사용하고 value는 dispatch를 넘겨준다.
그리고 기존에 index.js에서 ContextSample을 연결했던것을 다시 App.js로 복원시킨다.

그리고 다시 App컴포넌트를 보면 
우리가 방금 UserDispatch라는 context를 만들어서 기본값을 null을 넣었다 그리고 이 context의 값은 useReducer를 통해서 받아온 dispatch를 value로 넣어준 상태이다.

이제 UserList 컴포넌트를 열어서 User컴포넌트에서 바로 onRemove와 onToggle을 사용해 보는 방법을 알아보자.

일단 App컴포넌트에 정의했던
```js
// App.js 
// 해당 구문 삭제
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
는 더이상 필요없으므로 지워준다.

그리고 UserList에게 props로 넘겨주던 onToggle과 onRemove도 지워주도록한다.
```js
    <UserList users={users} />
```

이제 UserList에서 받아오던 props들도 지워준다
```js
// UserList.js
import React,{ useEffect } from 'react';

const User = React.memo(function User({user}) {
    const {username, email, id, active} = user;

    return(
        <div>
        <b style={{
            color: active ? 'green': 'black',
            cursor:'pointer'
        }} onClick={() => onToggle(id)}>{username}</b>&nbsp;<span>({email})</span>
        <button onClick={() => onRemove(id)}>삭제</button> 
        </div>
    );
});
function UserList({users){
    
    
    return(
        <div>
            {
            users.map(
                user => (<User user={user} key={user.id}/>) 
            )
            }
        </div>
    )
};

export default React.memo(UserList, (prevProps, nextProps)=> nextProps.users === prevProps.users);
```

이상태에서 이제 다시 onRemove와 onToggle을 다시 정의해 줄 것이다.
```js
// UserList.js
import React,{ useContext } from 'react';
```
userContext Hook을 사용한다. 이 Hook 은 context를 컴포넌트 내부에서 바로 조회할 수 있게 해주는 Hook이다. 
userContext의 파라미터로 우리가 이전에 정의해 줬던 UserDispatch를 넘겨줄 것인데. 그전에 export 했던 UserDispatch를 import 해준다.
```js
// UserList.js
import React,{ useContext } from 'react';
import {UserDispatch} from './App'
const User = React.memo(function User({user}) {
    const {username, email, id, active} = user;
    const dispatch = useContext(UserDispatch);
.
.

```
그리고 User컴포넌트에서 return하던 button의 onClick에서 dispatch로 바로 TOGGLE_USER와 REMOVE_USER 를 발생시켜준다.
```js
return(
        <div>
        <b style={{
            color: active ? 'green': 'black',
            cursor:'pointer'
        }} onClick={() => dispatch({
            type : 'TOGGLE_USER',
            id
        })}>{username}</b>&nbsp;<span>({email})</span>
        <button onClick={() => dispatch({
            type: 'REMOVE_USER',
            id
        })}>삭제</button> 
        </div>
    );
```

이로써 useReducer를 사용하는 것과 useContext를 사용하는 것의 차이점을 발견할 수 있다. 만약 우리가 여기서 reducer를 사용하지 않고 useState를 사용해서 내부에서 모든 작업을 했더라면, dispatch가 없기 때문에 UserDispatch 같은 context를 만들어서 관리하는 것이 어려웠을 수 있다. 물론 value 쪽에 setState관련 함수를 넣어주는 방식으로도 구현할 수 있겠지만 지금 구현한 방법처럼 깔끔하지 않을 것이다.

지금같은 경우에는 dispatch만 넣어주고 상태는 context에 따로 넣어주지 않았다. 나중에는 상태도 똑같이 context에 넣는 방법을 배울것이다.
---
# immer를 사용한 더 쉬운 불변성 지키기
```js
const object = {
    a: 1,
    b: 2
};

object.b = 3;

```

예를들어, object라는 객체가 있다고 가정하자. 우리가 react에서 배열이나 객체를 업데이트 해야할 때에는 여기에 보여지는 이 코드처럼 값을 직접 수정하는 행위는 불변성을 깨뜨리는 행위이다. 그대신 아래와 같이 spread 연산을 사용해서 기존의 값을 복사해오고 새로운 값을 덮어 씌우는 것이 바람직하다.
```js
const object = {
    a: 1,
    b: 2
};

const nextObject = {
    ...object,
    b:3
};
```
이렇게 해야 나중에 컴포넌트가 제대로 리렌더링되고 컴포넌트 최적화도 가능해진다.

```js
const todos =[
    {
        id:1,
        text :  '할 일 #1',
        done: true
    },
    {
        id:2,
        text: '할 일 #2',
        done: false
    }
];

todos.push({
        id: 3,
        text: '할 일 #3',
        done: false
    });

todos.splice(
    todos.findIndex(todo => todo.ud === 2),
    1
);

const selected =todos.find(todo => todo.id === 2);
selected.done = !selected.done;
```
배열도 마찬가지로 push와 splice 같은 함수를 사용하거나 n 번째 항목을 직접 수정하는 방식을 사용하지 않고. concat, filter, map 같은 함수를 사용해서 새로운 배열을 만들어 낸다.
```js
const todos =[
    {
        id:1,
        text :  '할 일 #1',
        done: true
    },
    {
        id:2,
        text: '할 일 #2',
        done: false
    }
];

const inserted = todos.concat({
    id: 3,
    text : '할 일 #3',
    done: false
});

const filtered = todos.filter(todo => todo.id !== 2);

const toggled = todos.map(
    todo => todo.id === 2
    ?{
        ...todo,
        done: !todo.done,
    }
    :todo
);
```
대부분의 경우 이렇게 spread연산자와 배열의 내장함수를 사용해서 처리하는 것은 그렇게 번거로운 상황은 아니다. 하지만 만약에 상태가 복잡해지면 불변성을 지켜가면서 새로운 상태를 만들어내는 것이 꽤나 복잡해진다.

위의 이미지를 보면 comments 부분에 새로운 댓글 객체를 추가해주는 상황을 가정해보면 일단 새로운 상태 객체를 만들어서 기존상태를 spread 연산자를 집어넣고 그다음 posts 안에있는 id:1인것을 찾아서 해당 post객체를 한 번 복사하고 안에있는 comments에서 새로운 항목을 추가하는 작업을 해야한다.

여럽진 않지만 복잡하다 
하지만 immer라는 라이브러리를 사용하면, 함수를 이렇게 작성할 수 있다.
```js
const nextState = produce(state, draft =>{
    const post = draft.posts.find(post => post.id ===1);
    post.comments.push({
        id: 3,
        text: '와 정말 쉽다!'
    });
});
```
draft에다가 불변성을 신경쓰지 않고 바로 값을 바꿔줄 수 있다. posts배열에있는 특정 post를 id를 비교해서 찾으면 해당 post가 가지고있는 comments 에다가 바로 push 해 줄 수 있다.

우선, immer라이브러리를 사용하기 위해 프로젝트 디렉터리 터미널에서 yarn add immer를 통해 immer를 설치해준다.
그다음 App컴포넌트 상단에서 immer를 불러온다.
```js
// App.js
import produce from 'immer';
```
import immer로 해도 되지만 produce를 많이 사용한다.
```js
// App.js
window.produce = produce;
```
해당 구문을 추가해주면 크롬 개발자 도구에서 사용할 수 있게 된다.
그럼이제 produce 함수를 사용하기 위해 크롬개발자 console에서 
```js
const state = {
    number: 1,
    dontChangeMe: 2
};
```
로 객체를 만들어주고.
```js
cosnt nextState = produce(state, draft =>{
    draft.number += 1;
})
```
nextState를 만들어서 produce함수를 사용해서 첫번째 파라미터에는 우리가 바꿔주고싶은 객체또는 상태를 넣어준다. 그리고 두번째에는 어떻게 바꿀지에 대한 함수를 넣어주면 된다. 이 함수에서는 draft라는 값을 파라미터로 받아와서 그 내부에서 하고 싶은 작업을 하면 된다. draft를 보면 state를 참조한 것이 아니라 draft를 참조했다. 그렇지만 사실 draft의 값은 state와 똑같다. 그리고 draft.numner + 1처럼 값의 변화를 주게되면 불변성을 지키며 새로운 객체를 만들어 준다.
nextState 를 보면 값이 바뀌는 것을 볼 수 있다. produce함수가 알아서 값을 유지해준다.

```js
const array =[
    {id: 1,text:'hi'},
    {id: 2,text:'bye'},
    {id: 3,text:'lala'}
]

const nextArray = produce(array, draft => {
    draft.push({id: 4, text: 'bla'});
    draft.[0].text = draft[0].text = 'World';
})
```
배열도 마찬가지로 produce로 불변성을 유지하면서 새로운 배열을 만들어 낼 수 있다.