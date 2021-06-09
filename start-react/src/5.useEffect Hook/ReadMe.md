# useEffect Hook
이 함수는 우리가 만든 react 컴포넌트가 처음 화면에 나타낼때나 사라질때 특정 작업을 할 수 있다. 추가적으로 컴포넌트에 어떤 props나 상태가 바뀌어서 업데이트 될 때, 업데이트 되기 전에도 어떤 작업을 할 수 있고, 리렌더링 될 때마다 작업을 등록할 수도 있다.
```js
/* UserList.js */
import React,{ useEffect } from 'react';

function User({user, onRemove, onToggle}){
    const {username, email, id, active} = user;
    useEffect(() => {
        console.log('컴포넌트가 화면에 나타남');
    }, []);
    .
    .
    .
```

컴포넌트가 mount , unmount 된다는 표현은 컴포넌트가 나타나거나 삭제될때 나타낸다. 
useEffect를 사용해서 첫번째 파라미터에 실행하고자하는 함수를 넣어준다.
그리고 두번째 파라미터에 비어있는 배열 []을 넣어준다. 이 배열을 deps라고 부르고 의존되는 값들을 배열안에 넣는것인데, 만약 이 값이 비어있다면 컴포넌트가 처음 마운트될 때 실행이된다.

여기까지 실행하고 웹브라우저의 개발자도구를 실행시켜서 info 부분을 살펴보면 '컴포넌트가 화면에 나타남'이 떠있다.

만약 여기서 계정을 추가해보면 다시 console.log부분이 실행된다.

이번에는 컴포넌트가 unmount 될 때 특정 작업을 하는 방법을 알아보자.
그럴 때는 함수에서 클린업 함수를 반환해주면되는데, 함수를 그냥 반환해주면 된다.
```js
function User({user, onRemove, onToggle}){
    const {username, email, id, active} = user;
    useEffect(() => {
        console.log('컴포넌트가 화면에 나타남');
        return () =>{
            console.log('컴포넌트가 화면에서 사라짐');
        }
    }, []);
```

이제 삭제하는 작업시 컴포넌트가 화면에서 사라짐이 출력되게 된다.
컴포넌트가 mount 될때 주로 추가하게되는 작업들은
- props로 받은 값을 컴포넌트의 state로 설정하는것
- 외부 API 요청 
- 라이브러리를 사용할 때
- setInterval, setTimeout 등

unmout 시
- clearInterval, clearTimeout
- 라이브러리 인스턴스 제거

등을 cleanup함수를 통해 처리해 줄 수 있다.

```js
function User({user, onRemove, onToggle}){
    const {username, email, id, active} = user;
    useEffect(() => {
        console.log('user 값이 설정됨');
        console.log(user);
        return () =>{
            console.log('user 값이 바뀌기 전');
            console.log(user);
        }
    }, [user]);

```
deps 배열에 user라는 값이 있을땐 어떻게될까?

실행해보면 user값의 변화되는 상태가 나타나게된다.

만약에 useEffect에 등록한 함수에서 props로 받아온 값이나 useState로 관리하고 있는 값을 참조하고 있는경우에는 deps배열에 꼭 넣어줘야한다.

만약 deps 배열을 생략하게 되는경우에는 어떻게 작동하는지 알아보자.
```js
    useEffect(() => {
        console.log(user);
    });
```
여기서 console.log(user); 만 넣어주면 컴포넌트가 리렌더링 되고나서 호출이되는데. 요소를 클릭했을때 뿐만아니라 모든 컴포넌트에서 console.log가 출력되게 된다.리액트 컴포넌트에서는 부모컴포넌트가 리렌더링되면 자식 컴포넌트도 리렌더링된다. user컴포넌트의 부모 컴포넌트는 UserList 인데 UserList에서 user컴포넌트가 바뀌게되면 UserList가 리렌더링되고 User컴포넌트까지 리렌더링된다.

정리.
useEffect 파라미터의 첫번째파라미터에는 함수를 , 두번째파라미터에는 deps라는 배열을 등록한다.
그리고 return 으로 특정함수를 반환하게되면 cleanup함수여서 업데이트 바로 직전에 호출되게 된다. 만약 의존하고 있는 함수나 상태가 있다면 deps를 꼭 등록해줘야한다.

# useMemo Hook
use이 Hook 함수는 주로 성능을 최적화해야하는 상황에 사용한다.

예를들어서 실행화면에 초록색으로 표시된 active 유저들의 수를 세주는 프로그램을 만든다고 가정해보자.
App.js 에서 countActiveUsers(users)라는 함수를 추가해준다.
return 에서 active true 상태인것만 filtering 해서 length를 가져오면 될 것이다.
```js
/* App.js */
function countActiveUsers(users){
  console.log('활성 사용자 수를 세는중...');
  return users.filter(user => user.active).length;
}
.
.
.
const count = countActiveUsers(users);
  return (
    <>
    <CreateUser username={username} email={email} onChange={onChange} onCreate={onCreate}/>
    <UserList users={users} onRemove={onRemove} onToggle={onToggle}/>
    <div>활성 사용자 수 : {count}</div>
    </>
  )
```
그리고 count를 정의해서 <div>로 감싸고 출력해준다.

여기서 사용자를 클릭하면 수를 다시 세서 출력하게되는데 클릭할 때는 당연히 리렌더링되어야 하지만 지금 같은 상황에서 사용자명 input란에 글자를 하나씩 입력해보면 활성사용자수를 세는 count도 계속해서 동작하게 된다.
불필요한 동작이 있다. 이때 사용하는것이 useMemo라는 Hook이다.
특정 값이 바뀌었을 때만 특정함수를 실행해서 연산을하고 원하는 값이 변하지 않았더라면 리렌더링 할 때 이전에 만들었던 값을 재사용할 수 있게 해준다.

```js
/*App.js*/ 
import React,{ useRef, useState, useMemo } from 'react';
.
.
const count = useMemo(() => countActiveUsers(users),[users]);
.
.
```
useMemo를 불러와주고 기존에 정의했던 count를 useMemo로 감싸준다.
첫번째 파라미터는 함수가 두번째 파라미터에는 deps가 들어가게된다.

필요한 연산을 필요할 때만, 컴포넌트 성능을 최적화할 때 사용한다.
---
# useCallback Hook
이전에 만들었던 함수를 새로 만들지 않고 재사용하는 방법을 알아보도록한다.
App.js 컴포넌트에 구현 했었던 onRemove, onToggle, onCreate 등을 보면 컴포넌트가 매번 리렌더링 될 때마다 새로운 함수를 만든다. 그런데 이렇게 함수를 새로 만드는것 자체가 메모리나 cpu를 많이 사용하지 않아서 부하를 일으키지는 않지만, 한번 만든 함수를 재사용할 수 있으면 재사용하는것이 좋다. 우리가 나중에 CreateUser나 UserList 컴포넌트들이 props가 바뀌지 않았다면 virtual DOM에 하는 리렌더링 조차 안하게끔 만들어 줄 수 있다. 그냥 이전에 만들어 놨던 결과물을 재사용 할 수 있게 만들 수 있다.

우리가 useMemo를 통해 countActiveUsers의 연산된 값을 재사용하는 작업을 했듯, useCallback도 마찬가지로 함수를 재사용 할 때 사용하고 deps도 넣어줘야한다.
```js
// App.js
import React,{ useRef, useState, useMemo, useCallback } from 'react';
```
useCallback을 불러와주고 기존에 선언했던 함수들을 감싸주기만 하면된다.
```js
// App.js
const onChange = useCallback(e =>{
    const {name, value} = e.target;
    setInputs({
      ...inputs,
      [name] : value
    });
  },[inputs]);
.
.
```

우선 onChange를 useCallback 으로 감싸주고 내부에서 의존하고 있는 값들을 살펴본다. ...inputs (useState 를통해서 관리하고 있는 상태) 를 사용하고 있다.
따라서 deps 배열에 inputs를 넣어준다.
그러면 onChange는 inputs가 바뀔 때만 새로 생성되고 그렇지 않으면 기존의 함수가 재사용된다.

onCreate도 마찬가지로 useCallback으로 감싸주고 
```js
// App.js
const onCreate = useCallback(() => {
  const user ={
    id : nextId.current,
    username,
    email,
  };

  setUsers(users.concat(user));
  setInputs({
    username:'',
    email:'',
  });

  console.log(nextId.current);
  nextId.current += 1;
},[username,email,users]);
```
onCreate에서 참조하고있는 username, email, users를 deps배열에 추가해준다.
만약 deps를 넣는것 잊는다면 함수 내부에서 해당 상태들을 참조하게 될 때 가장 최신상태를 참조하는것이 아니라 컴포넌트가 처음 만들어질때 (옛날 상태) 를 참조하게되는 의도치않은 현상이 나타날 수 있다.

```js
// App.js
const onRemove = useCallback((id) =>{
  setUsers(users.filter(user => user.id !== id));
},[users]);
const onToggle = useCallback(id =>{
  setUsers(users.map(
    user => user.id === id
    ? { ...user, active: !user.active}
    :user
  ));
},[users]);
```
onRemove 와 onToggle도 마찬가지로 useCallback으로 감싸주고, deps 배열에 users를 추가해준다.
그리고 이렇게 한다고 해서 눈에 띄는 최적화는 없다. 나중에 컴포넌트리렌더링 성능 최적화 작업을 해줘야만 성능이 좋아진다.
하지만 그작업을 하기전에 어떤 컴포넌트가 현재 리렌더링 되는지 알기위해서
react devtools 를통해서 확인해보자.
chrome web store에서 React Developer Tools 를 다운로드 받으면된다.

크롬 개발자 도구탭에서 >>를 눌러보면 react나 component 등 리액트와 관련된 새로운 탭이 추가된 것을 확인할 수 있다. 이것을 눌러보면 현재 리액트 컴포넌트들이 어떻게 구성되어있는지 볼 수 있다. 특정 컴포넌트를 선택할 수도 있다.

컴포넌트 탭에서 톱니바퀴를 눌러보면 highlight update 블라블라 하는 체크박스를 체크해주고 개발자탭의 App 컴포넌트 부분을 클릭한 뒤 , 계정명 부분에 텍스트를 입력해보면 텍스트 입력과 동시에 렌더링 되는것을 볼 수 있는데, 이것이 지금 당장은 느려지거나 하진 않겠지만 렌더링 되어야할 것이 많을경우에는 속도에 영향을 미칠 수 있다.
---
# React.memo 
memo라는 함수를 사용해서 컴포넌트에서 리렌더링이 불필요할 때는 이전의 렌더링 결과를 재사용할 수 있게 하는 방법을 알아보자.

우선 CreateUser 컴포넌트를 열어준다. 
그리고 export 부분에
```js
// CreateUser.js
export default React.memo(CreateUser);
```
CreateUser를 React.memo로 감싸주기만 하면된다.
React.memo를 사용하면 props가 바뀌었을 때만 리렌더링 해준다.

UserList 도 마찬가지이다.
```js
// UserList.js
export default React.memo(UserList);
```

UserList에 있는 User컴포넌트의 경우에는
```js
// UserList.js
const User = React.memo(function User({user, onRemove, onToggle}) {
    const {username, email, id, active} = user;

    return(
        <div>
        <b style={{
            color: active ? 'green': 'black',
            cursor:'pointer'
        }} onClick={() => onToggle(id)}>{username}</b>&nbsp;<span>({email})</span>
        <button onClick={() => onRemove(id)}>삭제</button> 
        </div>
    )
});
```

User function을 User 변수에 담으면서 이 function을 React.memo로 감싸준다.
```js
// UserList.js 전체 파일
import React,{ useEffect } from 'react';

const User = React.memo(function User({user, onRemove, onToggle}) {
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
function UserList({users, onRemove, onToggle}){
    
    
    return(
        <div>
            {
            users.map(
                user => (<User user={user} key={user.id} onRemove={onRemove} onToggle={onToggle}/>) 
            )
            }
        </div>
    )
};

export default React.memo(UserList);
```
이렇게 하면 어느정도 최적화가 된다.
이제 실행환경에서 계정명이나 이메일 같은 input에 새로운 문자를 기입하면
전체 컴포넌트가 리렌더링 되는것이 아니라 해당 컴포넌트만 리렌더링 되는것을 확인 할 수 있고. 활성 사용자수 active 부분도 마찬가지로 동작한다.
그런데 onToggle 이나 onRemove 를 보면
users가 deps에 있다. 따라서 users가 바뀌면 onRemove나 onToggle이 리렌더링 되는것이고 User입장에서도 onRemove와 onToggle이 바뀌었으니 리렌더링 해야한다.
이것을 해결하려면 onToggle, onRemove 등 함수에서 기존 users를 참조하면 안된다.그 대신 다른 방법으로 useState의 함수형 업데이트 이다.
```js
// App.js
const onCreate = useCallback(() => {
  const user ={
    id : nextId.current,
    username,
    email,
  };

  setUsers(users => users.concat(user));
  setInputs({
    username:'',
    email:'',
  });

  console.log(nextId.current);
  nextId.current += 1;
},[username,email]);
```
App 컴포넌트의 deps에서 users를 지우고
setUsers에 users => 로 setUsers의 callback함수의 파라미터에서 최신 users를 줘야하기 때문에 굳이 deps에 users를 넣지 않아도된다.
username과 email이 바뀔 때에만 새로 생성된다.

```js
// App.js
const onRemove = useCallback((id) =>{
  setUsers(users => users.filter(user => user.id !== id));
},[]);
const onToggle = useCallback(id =>{
  setUsers(users => users.map(
    user => user.id === id
    ? { ...user, active: !user.active}
    :user
  ));
},[]);
```
onRemove와 onToggle 에도 마찬가지로 적용해주면
두 함수는 컴포넌트가 처음 만들어질 때만 만들어지고 그 이후로는 재사용되는것이다.

추가적으로 React.memo를 사용할 때 두번째 파라미터로 propsAreEqual 이라는 함수를 넣어줄 수 있는데 설명을 보면 preveProps와 nextProps를 비교해서 true를 반환하면 리렌더링을 방지하고 false 때 리렌더링 하게된다.
현재 UserList에서는 onRemove와 onToggle이 useCallback때문에 안바뀔 것이라는 걸 잘 알기 때문에 
```js
// UserList.js
export default React.memo(UserList, (prevProps, nextProps)=> nextProps.users === prevProps.users);
```
prevProps와 nextProps를 가져와서 두개 가같다면 리렌더링 하지 않겠다고 선언해 볼 수 있겠다.
이렇게 propsAreEqual 함수를 사용할 때에는 나머지 props가 정말 고정적이어서 비교할 필요가 없는지를 꼭 확인해줘야 한다. 

정리 : 연산된 값을 재사용하기 위해서 userMemo를 사용하고 특정 함수를 재사용하기 위해 useCallback을 사용하고 컴포넌트 렌더링된 결과를 재사용하기 위해서는 React.memo를 사용한다.
