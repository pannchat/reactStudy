import React from 'react';
import Hello from './Hello'; // .js 생략가능
import Wrapper from './Wrapper';
function App() {

  return (
    <Wrapper>
    <Hello name ="jiwon" color="green" isSpecial={true}/>
    <Hello color="pink" />
    </Wrapper>
  )
}

export default App;
