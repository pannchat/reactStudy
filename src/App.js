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
]);

const nextId = useRef(4);
const onCreate = () => {
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
};

const onRemove = (id) =>{
  setUsers(users.filter(user => user.id !== id));
};
const onToggle = id =>{
  setUsers(users.map(
    user => user.id === id
    ? { ...user, active: !user.active}
    :user
  ));
};
  return (
    <>
    <CreateUser username={username} email={email} onChange={onChange} onCreate={onCreate}/>
    <UserList users={users} onRemove={onRemove} onToggle={onToggle}/>
    </>
  )
}

export default App;
