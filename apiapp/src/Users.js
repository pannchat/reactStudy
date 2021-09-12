import axios from 'axios';
import React,{useState, useEffect} from 'react';
import { useReducer } from 'react/cjs/react.development';


function reducer(state,action){
    switch(action.type){
        case 'LOADING':
            return{
                loading: true,
                data:null,
                error:null,
            }
        case 'SUCCESS':
            return{
                loading:false,
                data:action.data,
                error:null,
            }
        case 'ERROR':
            return {
                loading:false,
                data:null,
                error:action.error,
            }
        default:
            throw new Error('unhandled'+action.type)
    }
}
const Users = () => {
    const [state, dispatch] = useReducer(reducer,{
        loading:false,
        data:null,
        error:null,
        
    })
    const fetchUsers = async () =>{
        try{
            dispatch({type:'LOADING'});
            const res = await axios.get('https://jsonplaceholder.typicode.com/users/');
            console.log(res.data)
            dispatch({type:'SUCCESS', data:res.data})
            console.log(users)

        }catch(e){
            dispatch({type:'ERROR',error:e})
        }
    }

    useEffect(()=>{

    fetchUsers();
    },[]);      
    const {loading,data:users,error} = state;
    if (loading) return <div>로딩</div>
    if(error) return <div>에러가 발생했음</div>
    if(!users) return null;
    return(
        <>
        <ul>
            {users.map(user=>(
                <li key={user.id}>
                    {user.username} ({user.email});
                </li>
            ))}
        </ul>
        <button onClick={fetchUsers}>다시불러오기</button>
        </>
    )
}

export default Users