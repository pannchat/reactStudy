import React,{useReducer,useCallback} from 'react';
import { useEffect } from 'react/cjs/react.development';
import axios from 'axios';
function reducer(state,action){
    switch(action.type){
        case 'LOADING':
            return{
                loading: true,
                data:null,
                error:null,
            }
        case 'SUCCESS':
            return{
                loading:false,
                data:action.data,
                error:null,
            }
        case 'ERROR':
            return {
                loading:false,
                data:null,
                error:action.error,
            }
        default:
            throw new Error('unhandled'+action.type)
    }
}

function useAsync(callback, deps=[],skip=false) {
    const [state,dispatch] = useReducer(reducer,{
        loading:false,
        data:null,
        error:null,
    })
    const fetchUsers = useCallback(async() => {
        try{
            dispatch({type:'LOADING'});
            const res = await callback();
            dispatch({type:'SUCCESS', data:res});
        }catch(e){
            dispatch({type:'ERROR', error:e});
        }
    },[callback])

    useEffect(()=>{
        if(skip) return;
        fetchUsers();
    },deps);

    return [state, fetchUsers];
}

export default useAsync;