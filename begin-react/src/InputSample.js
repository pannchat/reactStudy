import React, { useState } from 'react';

function InputSample(){
    const [inputs, setInputs] = useState({
        name:'',
        nickname :'', 
    });
    const {name, nickname} = inputs;
    const onChange = (e) => {
        const { name, value } = e.target;
        setInputs({
            ...inputs,
            [name]: value
        })
    }
    const onReset = () =>{
        setInputs({
            name:'',
            nickname:'',
        })
    }
    return (
        <>
        <input name="name" onChange={onChange} value={name}/>
        <input name="nickname" onChange={onChange} value={nickname}/>
        <button onClick={onReset}>초기화</button>
        <p>{name}:({nickname})</p>
        </>
    );
}

export default InputSample;