import React, { useRef,useState, useReducer, useMemo, useCallback } from 'react';
import UserList from './UserList';
import CreateUser from './CreateUser';
import useInputs from './useInputs';
import InputSample from './InputSample'
function countActiveUsers(users){
    console.log("z")
    return users.filter(user => user.active).length;
};

const initialState = {
    inputs : {
        username:'',
        email:''
    },
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
        case 'CHANGE_INPUT':
            return{
                ...state,
                inputs:{
                    ...state.inputs,
                    [action.name] : action.value
                }
            }
        case 'CREATE_USER':
            return{
                inputs: initialState.inputs,
                users: state.users.concat(action.user )
            }
        case 'TOGGLE_USER':
            return{
                ...state,
                users:state.users.map(user => 
                    user.id === action.id
                    ? {...user, active: !user.active} : user
                    )
            }
        case 'REMOVE_USER':
            return{
                ...state,
                users: state.users.filter( user => user.id !== action.id)
            }
    }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {users} = state;
  const {username, email} = state.inputs;
  const nextId = useRef(4);
  const onChange = useCallback(e => {
      const { name, value} = e.target;
      dispatch({
          type: 'CHANGE_INPUT',
          name,
          value
      })
  }, []);
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
  }, [username,email])
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
        {/* <CreateUser username={username} email={email} onChange={onChange} onCreate={onCreate}/>
        <UserList users={users} onToggle={onToggle} onRemove={onRemove}  />
        <div>활성 사용자 수: {count}</div> */}
        <InputSample></InputSample>
    </>
  );
}

export default App;
