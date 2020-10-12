import React from 'react';
import Sender from './Sender';
import Receiver from './Receiver';
import './App.css';

let receiverQ = [];
let rcvpkt = [];
let i,j;
let seq, data;
let rcvV = 1;
function channel(who, seq, data) {
  if (who === 'sender'){
    if ((Math.random()) < 0.1){
      console.log("send error" + seq +"and"+ data)
    }else{
      rcv(seq,data)
    }
  }else if(who === 'resender'){
    console.log([seq]+"재전송 됨")
    rcv(seq,data)
  }
}
function rcv(seq, data ) {
  console.log([seq, data] + "전송받음. ACK발송") 
  if (seq === rcvV){
    
    receiverQ.push([seq,data]);
    rcvV++;
  }
}

function App() {

  (function snd() {
    var pk = 1000;
    var packt = new Array(pk);
    for (var i = 0; i < pk; i++) {
      packt[i] = i;
    }
    // console.log(packt);
    let N = 10;
    let base = 1;
    let seqn = 1;
    let runWindow = false;
    let windows = [];
    
    while (!runWindow || windows.length !== 0) {
      while(base + N > seqn && !runWindow) {
        var sndpkt = [];
        sndpkt.push(seqn);
        sndpkt.push(packt.shift());
        console.log(sndpkt, packt.length);
        
        windows.push(sndpkt); //[1~]
        channel("sender",sndpkt[0], sndpkt[1]);

        // socket.emit('init', { seq: sndpkt[0], data: sndpkt[1] });
        console.log('send packet seq N = ', seqn, 'windows', windows);
        seqn++;
        console.log(windows);
        if (packt.length === 0) {
          runWindow = true;
          console.log('end');
          break;
        }

        // if (seqn === 10) runWindow = true;
      }

        
        try{
          console.log('ACK'+receiverQ[0][0] + "수신")
        if (receiverQ[0][0] == windows[0][0]){ //같으면
          if(receiverQ[0][0] === 1000){
            console.log("프로그램 종료")
            break;
          }
          receiverQ.shift();
          windows.shift();
          base++;
          console.log("base 증가>> "+base);
        }
        }catch{
          receiverQ = [];
          for(i in windows){
            console.log(windows[i] +" 패킷에 대하여 재전송")
            // alert("retransmit seq:"+windows[i][0])
            channel("resender",windows[i][0], windows[i][1]  )
            // receiverQ.push(windows[i]);
          }
        }
        
      
    }
  
  })();
  
  return (
    <div>
      <div>
        console 확인해주세요

      </div>
    </div>
  );
}

export default App;
