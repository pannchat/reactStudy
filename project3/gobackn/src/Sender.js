import React from 'react';
import Receiver from './Receiver';


// (function () {
//     var pk = 4;
//     var packt = new Array(pk);
//     for (var i = 0; i < pk; i++) {
//         packt[i] = i;
//     }
//     console.log(packt);
//     let N = 4;
//     let base = 0;
//     let seqn = 0;
//     let runWindow = false;
//     let windows = [];
//     while (!runWindow) {
        
        
//             socket.emit('message', { seq: sndpkt[0], data: sndpkt[1] });
//         if (base + N > seqn && !runWindow) {
//             var sndpkt = [];
//             sndpkt.push(seqn);
//             sndpkt.push(packt.shift());
//             console.log(sndpkt, packt.length);

//             socket.emit('message', { seq: sndpkt[0], data: sndpkt[1] });

//             // socket.emit('init', { seq: sndpkt[0], data: sndpkt[1] });
//             console.log(
//                 'send packet seq N = ',
//                 seqn,
//                 'windows',
//                 windows.length,
//             );
//             seqn++;
//             windows.push(sndpkt);
//             console.log(windows);
//             if (packt.length === 0) {
//                 runWindow = true;
//                 console.log('end');
//             }
//             console.log(
//                 'send packet seq N = ',
//                 seqn,
//                 'windows',
//                 windows.length,
//             );
//             // if (seqn === 10) runWindow = true;
//         }

//         sockets.on('res', (msg) => {
//             alert('중간');
//             let rcvpkt = [];
//             let buf;
//             rcvpkt.push(msg);

//             buf = rcvpkt[0].pop();

//             while (
//                 rcvpkt[0].length > base === true &&
//                 (windows.length !== 0) === true
//             ) {
//                 windows.shift();
//                 base++;
//                 console.log(base, 'windows:', windows, '-------');
//             }
//             console.log(
//                 base,
//                 '<-base',
//                 rcvpkt[0].length,
//                 '<- rcv lenght\n',
//                 windows.length,
//                 '<- windowlength',
//                 seqn,
//                 '<--seq',
//             );
//             // console.log(buf, rcvpkt, base, windows);
//             ReactDOM.render(
//                 <React.StrictMode>
//                     <App msg={msg} buf={buf} />
//                 </React.StrictMode>,
//                 document.getElementById('root'),
//             );
//         });
//         socket.off('res');
//         socket.off('message');
//         // socket.emit('init', { seq: 'whatever' });
//     }
// })();

function Sender({seq,data}){
    function Channel(seq, data){
        return <Receiver seq={seq} data={data} />
    }
    Channel(seq,data);
    return(
        
        <div>
            {seq}
            {data} 전송 완료
            <div Channel={seq, data}></div>
            </div>
    );
};

export default Sender;