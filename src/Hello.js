import React from 'react';


function Hello({color, name, isSpecial}){
    return <div style={{color}}>
        {isSpecial ? <b>*</b> : null}
        ㅎㅇ {name}</div>;
}

Hello.defaultProps={
    name: 'default name'
}
export default Hello; // Hello component 를 내보낸다.

