import React,{useState} from 'react';

function InputTest(){
    const [text,setText] = useState('');

    const onChange = (e) => {
        setText(e.target.value);
    }

    const onReset = (e) =>{
        setText('');
    }
    return(
        <div>
            <input onChange={onChange} value={text}/>
            <button onClick={onReset}>초기화</button>
            <div>
                <span>값 : </span>
                <b>{text}</b>
            </div>
        </div>
    );
}

export default InputTest;