import React,{useState,useRef} from 'react';

function InputTest(){
    const [inputs,setInputs] = useState({
        name:'',
        nickname:'',
    });
    const nameInput = useRef();
    const {name,nickname} = inputs;

    const onChange = (e) => {
        const {name,value} = e.target;
        setInputs({
            ...inputs,
            [name]: value,
        });
    }

    const onReset = (e) =>{
        setInputs({
            name:'',
            nickname:'',
        });
        nameInput.current.focus();
    }
    return(
        <div>
            <input name="name" placeholder="이름" onChange={onChange} value={name} ref={nameInput}/>
            <input name="nickname" placeholder="닉네임" onChange={onChange} value={nickname}/>
            <button onClick={onReset}>초기화</button>
            <div>
                <span>값 : </span>
                {name}({nickname})
            </div>
        </div>
    );
}

export default InputTest;