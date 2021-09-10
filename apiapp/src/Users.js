import axios from 'axios';
import React,{useState, useEffect} from 'react';

const Users = () => {
    const [users, setUsers] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const fetchUsers = async () =>{
        try{
            setUsers(null)
            setLoading(true);
            setError(null)
            const res = await axios.get('https://jsonplaceholder.typicode.com/users/');
            console.log(res.data)
            setUsers(res.data);
            console.log(users)
            setLoading(false)
        }catch(e){
            setError(e)
        }
        setLoading(false)
    }

    useEffect(()=>{

    fetchUsers();
    },[]);      
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