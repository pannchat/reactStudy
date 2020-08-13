import React from 'react';
import Hello from './Hello'; // .js 생략가능
import './App.css'; // App.css import
function App() {
  const name = 'jiwon';
  const style = {
    backgroundColor : '#e3e3e3',
    fontWeight: 'bold',
    fontsize: '2em',
    padding: '10px'
  };
  return (
    <>
      <Hello />
      <div style={style}>{name}</div>
      <div className="myClass">ㅂㅇ</div>
    </>
  );
}

export default App;
