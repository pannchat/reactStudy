/* eslint-disable */
import React from 'react';
import Sender from './Sender';
import Receiver from './Receiver';
import './App.css';
let N = 10;
let pk = 1000;
let base = 1;
let seqn = 1;
let runWindow = false;
let windows = [];

let receiverQ = [];
let rcvpkt = [];
let buf = [];
let i;
let seq, data;
let rcvV = 1;
let Timeout = [];
function channel(who, seq, data) {
  Timeout[seq] = new Date();
  if (who === 'sender') {
    if (Math.random() < 0.1) {
      console.log('---------- send error' + seq + 'and' + data + '----------');
    } else {
      console.log('sender : seq' + seq + ' 전송 완료.');
      rcv('rcv', seq, data);
    }
  } else if (who === 'resender') {
    console.log([seq] + '재전송 됨');
    rcv('resend', seq, data);
  } else if (who === 'receiver') {
    // rcv('rcv', seq, data);
    receiverQ.push([seq, data]);
  }
}
function rcv(state, seq, data) {
  if (state === 'rcv') {
    if (seq === rcvV) {
      channel('receiver', seq, data);
      // receiverQ.push([seq, data]);
      console.log('receiver application: ' + seq + '수신 완료');
      rcvV++;
    } else {
      channel('receiver', seq, data);
      // receiverQ.push([seq, data]);
      buf.push([seq, data]);
      console.log('????순서 안맞아 : ' + buf, rcvV);
    }
  } else if (state === 'resend') {
    receiverQ.unshift([seq, data]);
    buf.push([seq, data]);
    buf.sort((a, b) => a[0] - b[0]);
    try {
      while (true) {
        // console.log('while 실행햇어 ㅡㅡ<<<<', buf[0][0] + 1 === buf[1][0]);
        // if (buf[1] !== undefined) {
        if (buf[0][0] + 1 === buf[1][0]) {
          // console.log(buf[i][0] + ' while ' + seq);

          console.log(
            'receiver application(buffer) : ' + buf.shift()[0] + ' 수신 완료?',
          );

          console.log('buffer' + buf);
          rcvV++;
        } else if (buf[0] === pk) {
          console.log(
            'receiver application(buffer) : ' + buf.shift()[0] + ' 수신 완료?',
          );
          console.log('break;');
          break;
        } else {
          console.log('break;');
          break;
        }
      }
    } catch {
      console.log(
        'receiver application(buffer) : ' + buf.shift()[0] + ' 수신 완료?',
      );
      rcvV++;
    }
  }
}

function App() {
  (function snd() {
    var packt = new Array(pk);
    for (var i = 0; i < pk; i++) {
      packt[i] = '!';
    }
    // console.log(packt);

    while (!runWindow || windows.length !== 0) {
      while (base + N > seqn && !runWindow) {
        var sndpkt = [];
        sndpkt.push(seqn);
        sndpkt.push(packt.shift());
        // console.log(sndpkt, packt.length);

        windows.push(sndpkt); //[1~]
        console.log(sndpkt);
        channel('sender', sndpkt[0], sndpkt[1]);

        // socket.emit('init', { seq: sndpkt[0], data: sndpkt[1] });
        console.log(
          'send packet seq N = ',
          seqn,
          'windows.length',
          windows.length,
        );
        seqn++;

        if (packt.length === 0) {
          runWindow = true;
          console.log('end');
          break;
        }

        // if (seqn === 10) runWindow = true;
      }

      try {
        // if (receiverQ[0][0] !== undefined) {

        let Ack = receiverQ[0][0];
        if (Ack == windows[0][0]) {
          console.log('sender : ACK' + receiverQ.shift()[0] + '수신');

          windows.shift();

          base++;
        } else {
          var nowDate = new Date();
          if (nowDate - Timeout[receiverQ[0][0]] > 150) {
            // alert('timeout 재발송');
            console.log(windows[0], '재발송했어');
            channel('resender', windows[0][0], windows[0][1]);
          }
        }
        // } else {
        //   console.log('시발련아');
        // }
      } catch {
        if (receiverQ.length === 0 && windows[0][0] === pk) {
          var nowDate = new Date();
          // alert('timeout 재발송');
          console.log(windows[0][0], '재발송했어 catch');
          channel('resender', windows[0][0], windows[0][1]);
          console.log(
            'sender : ACK',
            receiverQ.shift()[0],
            '수신\n캐치함 프로그램 종료',
          );
          break;
        }
        // var nowDate = new Date();
        // if (nowDate - Timeout > 150) {
        //   alert('timeout 재발송');
        // }
      }
    }
  })();

  return (
    <div>
      <div>console 확인해주세요</div>
    </div>
  );
}

export default App;
