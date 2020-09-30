import React, { useReducer } from 'react';

function Counter(){
    function reducer(state, action){
        switch(action.type){
            case 'INCREMENT':
                return state + 1;
            case 'DECREMENT':
                return state - 1;
            default:
                throw new Error('Unhandled action');
        }
    }
    const [number, dispatch] = useReducer(reducer, 0);

    const upCount = () => {
        dispatch({
            type: 'INCREMENT'
        })
    };
    const downCount = () => {
        dispatch({
            type: 'DECREMENT'
        })
    }
    return(
        <div>
            <p>count : {number}</p>
            <button onClick={upCount}>up</button>
            <button onClick={downCount}>down</button>
        </div>
    );
}

export default Counter;