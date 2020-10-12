import React from 'react';

function Receiver({seq, data}){
    return(
        <div>
            {seq}
            {data}
        </div>
    );
}
Receiver.defaultProps={
    seq:"none",
    data:"none",
}

export default Receiver;