import React from 'react';

<<<<<<< HEAD
function Hello({color,name}){

return <div style={{
    color
}}>ㅎㅇ {name}</div>;
}

Hello.defualtProps = {
    name : '이름없음'
=======
function Hello({color, name}){
    return <div style={{color:color}}>ㅎㅇ {name}</div>;
}

Hello.defaultProps={
    name: 'default name'
>>>>>>> aab574a768a16fdd622a8610d15af7651be3ee4f
}
export default Hello; // Hello component 를 내보낸다.

