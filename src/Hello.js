import React from 'react';

function Hello({color,name}){

return <div style={{
    color
}}>ㅎㅇ {name}</div>;
}

Hello.defualtProps = {
    name : '이름없음'
}
export default Hello; // Hello component 를 내보낸다.

