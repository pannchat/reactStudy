import React from 'react';

function Hello({color, name}){
    return <div style={{color:color}}>ㅎㅇ {name}</div>;
}

Hello.defaultProps={
    name: 'default name'
}
export default Hello; // Hello component 를 내보낸다.

