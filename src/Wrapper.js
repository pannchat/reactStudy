import React from 'react';

function Wrapper({children}){
    const style = {
        border : '3px solid black',
        padding : 10
    };

return <div style={style}>{children}</div>
}
export default Wrapper;