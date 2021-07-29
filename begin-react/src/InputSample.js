import React, { useState, useRef } from 'react';

function InputSample(){

    const {name, nickname} = inputs;
    const nameInput = useRef();
    const onChange = (e) => {
        const { name, value } = e.target;
        setInputs({
            ...inputs,
            [name]: value
        })
        console.log(inputs)
    }
    const onReset = () =>{
        setInputs({
            name:'',
            nickname:'',
        })
        nameInput.current.focus();
    }

    return (
        <>
        <input name="tankWidth" onChange={onChange}/>
        <input name="nickname" onChange={onChange} value={nickname}/>
        <button onClick={onReset}>초기화</button>
        <p>{name}:({nickname})</p>
        </>
    );
}

export default InputSample;