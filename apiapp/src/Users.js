import axios from 'axios';
import React,{useState, useEffect} from 'react';
import { useReducer } from 'react/cjs/react.development';
import useAsync from './useAsync';
import User from './User'

async function getUsers(){
    const res = await axios.get('https://jsonplaceholder.typicode.com/users/');
    return res.data;
}
const Users = () => {
    const [state,refetch] = useAsync(getUsers,[],true);
    const [userId, setUserId] = useState(null);
    const {loading,data:users,error} = state;
    if (loading) return <div>로딩</div>
    if(error) return <div>에러가 발생했음</div>
    if(!users) return <button onClick={refetch}>로딩</button>;
    return(
        <>
        <ul>
            {users.map(user=>(
                <li key={user.id} onClick={()=>setUserId(user.id)}>
                    {user.username} ({user.email});
                </li>
            ))}
        </ul>
        <button onClick={refetch}>다시불러오기</button>
        {userId && <User id={userId}/>}
        </>
    )
}

export default Users