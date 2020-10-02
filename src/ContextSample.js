import React, {createContext, useContext, useState } from 'react';

const MyContext = createContext('defaultValue');

function Child(){
    const text = useContext(MyContext);
    return <div>안녕하세요? {text}</div>
}

function Parent({text}){
    return <div><Child text={text}/></div>
}

function GrandParent({text}){
    return <div><Child text={text}/></div>
}

function ContextSample(){
    const [value, setValue] = useState(true);
    return(
        <MyContext.Provider value={value ? 'good': 'bad'}>
            <GrandParent />
            <button onClick={(()=> setValue(!value))}>Click</button>
        </MyContext.Provider>
    ) 
}
export default ContextSample;