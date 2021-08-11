import React, { useRef,useState, useReducer, useMemo, useCallback } from 'react';
import UserList from './UserList';
import CreateUser from './CreateUser';
import useInputs from './useInputs';
import produce from 'immer';

window.produce = produce;

function countActiveUsers(users){
    console.log("z")
    return users.filter(user => user.active).length;
};

const initialState = {

    users :
        [
            {
                id : 1,
                username: 'test1',
                email: 'test1@naver.com',
                active: true
            },
            {
                id : 2,
                username: 'test2',
                email: 'test2@naver.com',
                active: false
            },
            {
                id : 3,
                username: 'test3',
                email: 'test3@naver.com',
                active : false
            },
        ]
    
}

function reducer(state, action){
    switch(action.type){

        case 'CREATE_USER':
            return produce(state, draft =>{
                draft.users.push(action.user)
            })
        case 'TOGGLE_USER':
            return produce(state, draft=>{
                const user = draft.users.find(user => user.id === action.id);
                user.active = !user.active;
            })
            
        case 'REMOVE_USER':
            return produce(state, draft =>{
                const index = draft.users.findIndex(user => user.id === action.id);
                draft.users.splice(index,1);
            })
    }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {users} = state;
  const [form, onChange, reset] = useInputs({
      username:'',
      email:'',
  })
  const {username, email} = form;
  const nextId = useRef(4);

  const onCreate = useCallback(() => {
      dispatch({
          type:'CREATE_USER',
          user:{
              id : nextId.current,
              username,
              email,
          }
      });
      nextId.current += 1;
      reset();
  }, [username,email,reset])
  const onToggle = useCallback(id =>{
      dispatch({
          type: 'TOGGLE_USER',
          id
      })
    },[]);
  

  const onRemove = useCallback(id =>{
      dispatch({
          type:'REMOVE_USER',
          id
      })
  },[]);
  const  count = useMemo(() => countActiveUsers(users),[users])

  return (
    <>  
        <CreateUser username={username} email={email} onChange={onChange} onCreate={onCreate}/>
        <UserList users={users} onToggle={onToggle} onRemove={onRemove}  />
        <div>활성 사용자 수: {count}</div>

    </>
  );
}

export default App;
