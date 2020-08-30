import React, { useState } from 'react';

function Counter(){
    const [count, setCount] = useState(0);
    const upCount = () => {
        setCount(count + 1);
    };
    const downCount = () => {
        setCount(prevCount => prevCount-1);
    }
    return(
        <div>
            <p>count : {count}</p>
            <button onClick={upCount}>up</button>
            <button onClick={downCount}>down</button>
        </div>
    );
}

export default Counter;