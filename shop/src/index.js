import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from 'react-router-dom'
import {Provider} from 'react-redux'
import { createStore } from 'redux';

let defaultValue = [
  {id:0 , name: '멋진 신발', 'quan' : 2 },
  {id:1 , name: '별로 안 예쁜신발', 'quan' : 6 },
  {id:2 , name: '그냥 신발', 'quan' : 3 }
]

function reducer(state = defaultValue, action){
  if (action.type === 'INCREMENT'){
    let copy = [...state]
    copy[0].quan++;
    return copy
  }else if (action.type==='DECREMENT'){
    let copy = [...state]
    if (copy[0].quan > 0){
      copy[0].quan--;
    }
    
    return copy
  }else{
  
    return state
  }

}
let store = createStore(reducer);

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
