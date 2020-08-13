import React from 'react';
import Hello from './Hello'; // .js 생략가능
function App() {
  return (
    <div>
      <Hello/>    
      <Hello/>  //재사용 가능
      <Hello/> 
    </div>
  );
}

export default App;
