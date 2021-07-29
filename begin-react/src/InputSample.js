import React, { useState, useRef } from 'react';

function InputSample(){
    const [inputs, setInputs] = useState({
        tankWidth: '',
        tankHeight: '',
        tankDepth: '',
        tankSand: '',
        waterLevel: '',
        tankWeight: '',
        capacity: '내 수조의 용량을 계산해보세요.',
    })
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
    const { tankWidth, tankDepth, tankHeight } = inputs;
    return (
        <>
        <input name="tankWidth" onChange={onChange} value={tankWidth}/>
        <input name="nickname" onChange={onChange} value={nickname}/>
        <button onClick={onReset}>초기화</button>
        <p>{name}:({nickname})</p>
        </>
    );
}

export default InputSample;