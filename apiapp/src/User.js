import React,{useState} from 'react';
import axios from 'axios';
import useAsync from './useAsync';

async function getUser(id){

    const res = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);
    console.log(res.data)
    return res.data;
}

export default function User({id}){

    const [state] = useAsync( ()=>getUser(id),[id]);
    console.log(state)
    const {loading, data:user, error } = state;

    if(loading) return <div>로딩중</div>
    if(error) return <div>에러</div>
    if(!user) return null;

    return(
        <div>
            <h2>{user.username}</h2>
            <p><b>email :</b> {user.email}</p>
        </div>
    )
}