# userRef 로 특정 DOM선택
html과 js를 사용할 때는 특정 DOM을 선택해야하는 상황에 getElementById, querySelector 같은 DOM selector 를 사용한다.
React를 사용하는 프로젝트에서도 DOM을 직접 선택해야하는 상황이 발생 할 수 있다. 
예를 들어 scrollbar 위치를 가져와서 설정해줘야 하거나 , focus 를 설정해야한다는지 등 다양한 상황들이있다. 추가로 video.js jwplayer같은 html5비디오 관련 라이브러리나 그래프관련 라이브러리 등을 사용할 때도 특정 DOM에 라이브러리를 적용해야 하기 때문에 DOM을 선택해야하는 상황이 발생할 수 있다.

그럴때는 react에서는 ref를 사용하는데 함수형 컴포넌트에서는 useRef라는 hook함수를 사용해서 ref를 사용한다.
class형 컴포넌트에서는 React.createRef 또는 callback 함수로도 사용할 수 있다.

```js
import React,{useState} from 'react';

function InputTest(){
    const [inputs,setInputs] = useState({
        name:'',
        nickname:'',
    });
    const {name,nickname} = inputs;

    const onChange = (e) => {
        const {name,value} = e.target;
        setInputs({
            ...inputs,
            [name]: value,
        });
    }

    const onReset = (e) =>{
        setInputs({
            name:'',
            nickname:'',
        });
    }
    return(
        <div>
            <input name="name" placeholder="이름" onChange={onChange} value={name}/>
            <input name="nickname" placeholder="닉네임" onChange={onChange} value={nickname}/>
            <button onClick={onReset}>초기화</button>
            <div>
                <span>값 : </span>
                {name}({nickname})
            </div>
        </div>
    );
}

export default InputTest;
```
를 실행해서 초기화버튼을 눌렀을때 react자체 기능으로는 딱히 할 수 있는것이 없다.그래서 DOM에 직접 접근해야 한다.

위의 예제를 그대로 사용한다.
```js
import React,{useState,useRef} from 'react';
```
useRef를 불러와준다.
그리고
```
    .
    .
    const nameInput = useRef();
    const {name,nickname} = inputs;
    .
    .
```
nameInput을 선언해서 useRef()를 담아준다.
nameInput이라는 객체가 만들어지는데
이제 우리가 선택하고 싶은 DOM
``` <input name="name" placeholder="이름" onChange={onChange} value={name} ref={nameInput}/>```
에 ref={nameInput}을 추가해준다
이제 여기에 접근하기 위해서는 onReset에서
```

    const onReset = (e) =>{
        setInputs({
            name:'',
            nickname:'',
        });
        nameInput.current.focus();
    }
```
nameInput을 살펴보면 current라는 값이있고 이 값이 해당 돔을 가리키고 있다. 여기서 DOM API 중 focus라는 함수를 호출하면 focus가 해당 input으로 잡히게 된다.

```
/* InputTest.js */
import React,{useState,useRef} from 'react';

function InputTest(){
    const [inputs,setInputs] = useState({
        name:'',
        nickname:'',
    });
    const nameInput = useRef();
    const {name,nickname} = inputs;

    const onChange = (e) => {
        const {name,value} = e.target;
        setInputs({
            ...inputs,
            [name]: value,
        });
    }

    const onReset = (e) =>{
        setInputs({
            name:'',
            nickname:'',
        });
        nameInput.current.focus();
    }
    return(
        <div>
            <input name="name" placeholder="이름" onChange={onChange} value={name} ref={nameInput}/>
            <input name="nickname" placeholder="닉네임" onChange={onChange} value={nickname}/>
            <button onClick={onReset}>초기화</button>
            <div>
                <span>값 : </span>
                {name}({nickname})
            </div>
        </div>
    );
}

export default InputTest;
```

# 배열 렌더링하기.
src디렉터리에 UserList.js 라는 컴포넌트를 하나 생성한다.
```
import React from 'react';

function UserList(){
    const users =[
        {
            id: 1,
            username: 'jiwon',
            email: 'pannchat@likelion.org'
        },
        {
            id: 2,
            username: 'tom',
            email: 'tom@tom.org'
        },
        {
            id: 3,
            username: 'sam',
            email: 'sam@sam.org'
        },
    ];
    
    return(
        <div>
            <div>
                <b>{users.[0].username}</b><span>({users[0].email})</span>
            </div>
            <div>
                <b>{users.[1].username}</b><span>({users[0].email})</span>
            </div>
            <div>
                <b>{users.[2].username}</b><span>({users[0].email})</span>
            </div>
        </div>
    )
}

export default UserList;
```
function UserList()를 하나 정의하고
users라는 배열을 하나 생성해준다.

return에는 이 배열의 요소들을 하나하나 렌더링하는 jsx 코드를 작성한다.

이제 App컴포넌트에 렌더링한다.
기존에 사용했던 InputTest를지우고 UserList로 바꾼다.
```
import React from 'react';
import UserList from './UserList';
function App() {

  return (
    <UserList />
  )
}

export default App;
```
하지만 이렇게 사용하면 같은 코드를 세번이나 사용하여 렌더링 하게된다.

UserList 컴포넌트에
User라는 컴포넌트를 하나 더 추가해준다.
그리고 user 라는 Props를 추가해준다.
```
<div>
<b>{user.username}</b><span>({user.email})</span>
</div>
```
를 추가해준다.

그리고 이 User컴포넌트를
UserList 컴포넌트에 사용해준다.
```
import React from 'react';

function User({user}){
    return(
        <div>
        <b>{user.username}</b><span>({user.email})</span>
        </div>
    )
}
function UserList({user}){
    const users =[
        {
            id: 1,
            username: 'jiwon',
            email: 'pannchat@likelion.org'
        },
        {
            id: 2,
            username: 'tom',
            email: 'tom@tom.org'
        },
        {
            id: 3,
            username: 'sam',
            email: 'sam@sam.org'
        },
    ];
    
    return(
        <div>
            <User user={users[0]} />
            <User user={users[1]} />
            <User user={users[2]} />
        </div>
    )
}

export default UserList;
```

이렇게 사용하면 배열이 고정적일때 효과적이지만
배열이 늘어나거나 줄어드는 경우에는 javascript 배열의 내장함수 map을 사용해준다.
이 map함수를 사용해서 객체배열 형태로되어있는 배열을 컴포넌트 엘리먼트 형태의 배열로 변환해주면 된다.

사용법은 간단하다 위의 예제에서 
```
.
.
           id: 3,
            username: 'sam',
            email: 'sam@sam.org'
        },
    ];
    
    return(
        <div>
            {
                users.map(
                    user => (<User user={user}/>) 
                )
            }
        </div>
    )
    .
    .
```
이 부분만 바꿔주면 같은 결과로 실행되는 것을 확인할 수 있다.
브라우저에서 보면 warning이 뜨는것을 확인할 수 있는데.
각 child가(각 user) key라는 prop이 있어야한다고 경고한다. key는 원소마다 고유값을 줘서 리렌더링 성능을 최적화 해주는것인데. 우리가 작성한 코드에서 배열은 고유값이라고 볼 수 있는 id를 같이 작성해줬다.
이것을 key로 사용한다.
```
user => (<User user={user} key={user.id}/>) 
```
이렇게 수정하여 실행시켜 보면 경고가 사라진것을 확인할 수 있다. 하지만 key로 사용할 고유값이 없으면 어떻게 해야할까?

그럴땐 map함수의 두번째 파라미터인 index를 사용한다
```
(user, index) => (<User user={user} key={index}/>) 
```
이것은 단순히 경고만 사라지게 할 뿐 성능적으로 이점은 없다.

#key의 역할
```
const array = ['a','b','c','d'];
```
이런 배열이 있다고 가정하자.
그리고 이 배열을 div element로 변환해준다고 가정한다.
```
array.map(item => <div>{item}</div>);
```

예를들어 b와 c사이에 z가 삽입된다고하면
c를 z로 바꾼뒤 d를 c로바꾸고 뒤에 d를 삽입하게된다.
c,d를 놔두고 z를 삽입만 하면되는데 이런 번거로운 과정을 거치게 되는것이다.
만약 a를 없앤다고하면 a자리에 b가들어가면서 하나씩 대치된다.
이것은 각 배열의 원소가 자신이 몇번째인지만 알고있고 정확히 어떤 값을 렌더링해야하는지 모르기때문이다.

하지만 key가 있으면 렌더링하는 결과물에서 어떤값을 가리키고있는지 알고있기 때문에 z를 추가해도 b와c사이에 z가 삽입되는 형태로 동작한다.

---
# useRef로 컴포넌트 안의 변수만들기
useRef를 사용해서 컴포넌트 안의 변수를 만들것이다.
여기서 말하는 변수는 예를들어 컴포넌트 내부에서 let키워드를 사용하여 변수를 선언한다고 가정할 때 다음 리렌더링 때는 이 변수값이 초기화된다. 유지를 위해서는 useState를 사용해야하는데 이것은 상태가 바뀌게되면 컴포넌트가 리렌더링된다. 하지만 우리는 값을 바꿨을때 굳이 리렌더링할 필요없는 경우가 있다. 그럴때 useRef를 사용해서 컴포넌트가 리렌더링 될 때마다 계속 기억해야할 값을 관리할 때도 사용할 수 있다. 주로 setTimeout이나 setInterval을 사용할 때 주어지는 id값을 기억해야할 때나 외부라이브러리를 사용해서 생성된 인스턴스를 담을때도 사용하고, scroll위치를 알아야할 때 등등 다양한 경우에 사용할 수 있다.
중요한 것은 useRef로 관리하는 값은 바뀌어도 컴포넌트가 리렌더링 되지 않는다.

우리는 App컴포넌트에서 useRef를 사용해서 변수를 관리해 볼 것인데, 용도는 우리가 앞으로 배열에 새 항목을 추가할 때 그 항목의 고유아이디값을 관리하기 위함이다.


```
/*UserList.js*/

 const users =[
        {
            id: 1,
            username: 'jiwon',
            email: 'pannchat@likelion.org'
        },
        {
            id: 2,
            username: 'tom',
            email: 'tom@tom.org'
        },
        {
            id: 3,
            username: 'sam',
            email: 'sam@sam.org'
        },
    ];
```

이렇게 선언되어있는 users를 UserList 컴포넌트의 props로 받아오게 해준다.

```
function UserList({users}){
```
그리고 users라는 배열을 App.js로 옮겨준다.
```
/* App.js */
import React from 'react';
import UserList from './UserList';
function App() {
  const users =[
    {
        id: 1,
        username: 'jiwon',
        email: 'pannchat@likelion.org'
    },
    {
        id: 2,
        username: 'tom',
        email: 'tom@tom.org'
    },
    {
        id: 3,
        username: 'sam',
        email: 'sam@sam.org'
    },
];
  return (
    <UserList users={users}/>
  )
}

export default App;
```
그리고 <UserList users={users}> 를통해 UserList로 전달해준다.
이제 userRef를  사용해서 nextId라는 변수를 만들어 보자.
```js import React,{ useRef } from 'react';```

useRef를 불러와주고 
nextId라는 값을 관리하기 위한 변수를 선언해주고 초기값을 4로 지정해줄 것.
현재 users에 id: 3까지 정의했기 때문에 4로 설정함.
```
const nextId = useRef(4);
```

그리고 앞으로 새로운 항목을 추가할 때 사용할 함수를 미리 구현해보자
```
const onCreate = () => {
  console.log(nextId.current);
}
```
이렇게 정의한뒤 호출하면 console.log(nextId.current); 를통해 nextId.current값을 조회하면 4가 출력될 것이다.
또, 새로운 항목을 만들 때마다 nextId의 current값을 변화시킬텐데.
이것은 nextId.current += 1; 을 추가해줘서 값을 변경 해 줄수있다.
여기서 nextId를 useRef로 관리해주는것은 이 값이 바뀐다고해서 굳이 컴포넌트가 리렌더링 될 필요가 없기 때문이다.

요약하자면 useRef는 특정 DOM을 선택하고 싶을때 사용할 수도 있지만 어떤 변수를 계속 기억하고 싶을때,  컴포넌트가 리렌더링되어도 기억하고 싶을때 사용할 수 있다. 따라서 이 값이 바뀐다고해서 컴포넌트가 리렌더링 되지 않는다는 것을 알아둬야한다

---
# 배열에 항목 추가하기
배열에 새로운 항목을 추가하는 방법을 알아보기위해
CreateUser라는 컴포넌트를 생성한다.
우선 function CreateUser를 생성해주고 props 4개를 받아올 것이다.
onChange는 input값이 바뀔때 호출할 이벤트처리 함수이고, onCreate는 버튼을 눌렀을 때 새로운 항목을 등록해주는 함수이다.

```js
function CreateUser({username, email, onChange, onCreate}){
    return(
        <div>
            <input 
            name="username" 
            placeholder="계정명"
            onChange={onChange}
            value={username}
            />
            <input 
            name="email" 
            placeholder="계정명"
            onChange={onChange}
            value={email}
            />
            <button onClick={onCreate}>등록</button>
        </div>
    )
}
export default CreateUser;
```
jsx코드를 바로 반환해주는 CreateUser를 생성해주고
input 2개와 button을 생성한다.
그리고 여기에 필요한 값들을 설정해준다. 
button 의 onClick에 onCreate함수를 넣어주면 버튼이 클릭될때 onCreate함수가 호출된다.
이 함수는 props에서 받아오는 것.

이제 App컴포넌트를 수정한다.
```js
/* App.js */
.
.
  return (
    <>
    <CreateUser />
    <UserList users={users}/>
    </>
  )

```
2개의 컴포넌트를 렌더링하기 위해 <> 프레그먼트로 감싸고 CreateUser를 렌더링해준다.

이제 CreateUser에서 필요한 Props들을 App 에서준비한다. 여러개의 input값을 관리하기 위해 useState를 사용하는데 useState를 두 번 사용하지 않고 객체형태로 만들어준다.
```js
  const [inputs, setInputs] = useState({
    username: '',
    email: '',
  });
  const {username, email} = inputs;
  const onChange = e =>{
    const {name, value} = e.target;
    setInputs({
      ...inputs,
      [name] : value
    });
  };
```
inputs와 setInputs라는 상태를 만들어주고 username과 email을 공백으로 설정.
그리고 inputs에서 username, email을 추출.
onChange를 구현하는데 event e를 가져와서 const {name,value} = e.target 으로 name,value를 e.target에서 가져오도록 설정하고.
setInputs를 호출하면서 ...inputs로 기존의 내용을 호출하고 받아온 name값을 value로 덮어씌운다.
그리고 CreateUser에 방금 만든것들을 넣어준다.
```js
/* App.js */
    <CreateUser username={username} email={email} onChange={onChange} onCreate={onCreate}/>
```

이제 onCreate에서 버튼이 클릭 될 때 input의 값이 지워지도록 해보자.
```js
/* App.js */
const onCreate = () => {
  setInputs({
    username:'',
    email:'',
  });
  console.log(nextId.current);
  nextId.current += 1;
}
```
그리고 users 배열을 컴포넌트의 상태로써 관리해주게 만드는데 방법은. useState로 감싸주고 users,setUsers를 추출해주면된다.

이번에는 배열에 변화를 줄 차례이다.
users.push나 splice나 sort같은 함수를 사용할 수 없다.
기존의 배열을 바꾸지않고 새로운 배열을 생성하고 거기에 변화를 주는 방식으로 사용해야 하기때문이다. 굳이 사용해야한다면 배열을 복사하고나서 해야함.

첫번째 방법으로 spread연산자를 사용한다.
일단 onCreate에서 새로운 user객체를 만들어준다
```js
/* App.js */
  const user ={
    id : nextId.current,
    username,
    email,
  };

```
id값은 nexId.current 값을 사용하고. username과 email은 현재 input 이 가리키는 값을 사용한다.
```js
/* App.js */
  setUsers([...users,user]);
```
그리고 setUsers에 ...users spread연산자로 기존의 배열을 불러와주고 새로 추가된 user을 추가해주면 기존의 배열을 건드리지 않게된다.

```js
/* App.js */
import React,{ useRef, useState } from 'react';
import UserList from './UserList';
import CreateUser from './CreateUser';
function App() {
  const [inputs, setInputs] = useState({
    username: '',
    email: '',
  });
  const {username, email} = inputs;
  const onChange = e =>{
    const {name, value} = e.target;
    setInputs({
      ...inputs,
      [name] : value
    });
  };

  const [users, setUsers] =useState([
    {
        id: 1,
        username: 'jiwon',
        email: 'pannchat@likelion.org'
    },
    {
        id: 2,
        username: 'tom',
        email: 'tom@tom.org'
    },
    {
        id: 3,
        username: 'sam',
        email: 'sam@sam.org'
    },
]);

const nextId = useRef(4);
const onCreate = () => {
  const user ={
    id : nextId.current,
    username,
    email,
  };
  setUsers([...users,user]);
  setInputs({
    username:'',
    email:'',
  });
  console.log(nextId.current);
  nextId.current += 1;
}
  return (
    <>
    <CreateUser username={username} email={email} onChange={onChange} onCreate={onCreate}/>
    <UserList users={users}/>
    </>
  )
}

export default App;
```
여기까지 실행시켜보면 잘 추가되는것을 확인가능함.

두번째 방법은 concat함수를 사용하는것인데.
concat는 여러개의 배열을 하나로 합쳐주는데 굳이 배열 + 배열 이아니더라도 
배열 + 요소 로 실행해도 잘 생성된다.
```
  setUsers(users.concat(user));
```

이부분만 이렇게 바꿔줄 수 있다.
---
# 배열에 항목 제거하기
우선 UserList 컴포넌트를 수정한다.
```
/* UserList */
.
.
function UserList({users, onRemove}){
.
.
```
UserList function에 onRemove라는 props를 받아와주고 이것을 user컴포넌트에 전달해준다.

```
/* UserList.js */
    users.map(
        user => (<User user={user} key={user.id} onRemove={onRemove}/>) 
    )
```
전달을 해 줬으니 이제 user컴포넌트에서 받아와야한다.

```
/* UserList.js */
.
.
function User({user, onRemove}){
.
.
```
구리고 user컴포넌트 내부에 삭제버튼을 하나 생성해주도록 한다.
```
    return(
        <div>
        <b>{user.username}</b><span>({user.email})</span>
        <button>삭제</button>
        </div>
    )
```
삭제 버튼이 눌렸을때 onRemove가 호출되게 할 것인데, onRemove 함수에 user.id값을 파라미터로 넣어서 호출하고 싶다.
```
<button onClick={() => onRemove(user.id)}>삭제</button>
```
onClick으로 새로운 함수를 만들어준다. 파라미터를 넣어주기 위해

```
 <b>{user.username}</b><span>({user.email})</span>
<button onClick={() => onRemove(user.id)}>삭제</button>
```

이런식으로 user.username user.email ,, user을 계속 붙여 사용하기 번거롭다면
아래와 같이 미리 추출해서 사용할 수 있다.
```
function User({user, onRemove}){
    const {username, email, id} = user;
    return(
        <div>
        <b>{username}</b><span>({email})</span>
        <button onClick={() => onRemove(id)}>삭제</button>
        </div>
    )
}
```

다시, onClick에서 새로운 함수를 정의하는 것은 버튼이 눌렸을 때 onRemove라는 함수를 사용한다. 이 함수의 파라미터로 id(user.id) 값을 넣어 호출을 해준다는 의미이다.

주의할점.
```
<button onClick={onRemove(id)}>삭제</button>
```
이렇게 정의해서 사용한다면 페이지가 렌더링되면서 바로 삭제함수가 실행될 것이다.

이제, onRemove 함수를 구현하기 위해 App 컴포넌트를 열어준다.
```
/* App.js */
```