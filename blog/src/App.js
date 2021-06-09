import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  let [글제목,글제목변경] = useState(['남자 코트 추천','강남 우동 맛집','코딩맛집']);
  let [글내용,글내용변경] = useState(['코트는 무신사','우동 맛집은 용우동','코딩맛집은 코딩애플'])
  let [modal, modal변경] = useState(false);
  let [like, setLike] = useState(0);
  let [number,setNumber] = useState(0);
  let [inputs, setInputs] = useState('');
  function rename(){
    var newArray = [...글제목];
    newArray.sort()
    글제목변경(newArray);
  }
  function addList(){
    var newArray = [inputs,...글제목];
    글제목변경(newArray);
  }
  return (
    <div className="App">
      <div className="black-nav">
        <div style={{ color:'blue', fontSize : '30px'}}>개발 Blog</div>
      </div>
      <button onClick={rename}>변경</button>

{
  글제목.map((i,idx)=>{
    return(
      <div className="list" key={idx}>
        <h3 onClick={()=>{setNumber(idx)}}>{i} <span onClick={()=>{setLike(like+1)}}>👍{like}</span></h3>
        <div>글내용</div>
        <hr />
      </div>
    )
  })
}
<div className="publish">
  <input onChange={ (e) => {setInputs(e.target.value)} } />
  <button onClick={ ()=>{
    // var arr = [...글제목]
    // arr.unshift(inputs);
    // 글제목변경(arr);
    addList()
  } }>저장</button>
</div>

<button onClick={()=>{ modal변경(!modal)}}>on/off</button>
    {
      modal
      ? <Modal number={number} 글제목={글제목} />
      : null
    }
    </div>
  );
}

function Modal(props){
  return(
    <div className="modal">
      <h3>{props.글제목[props.number]}</h3>
      <span>날짜</span>
    </div>
  )
}
export default App;
