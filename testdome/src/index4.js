import React, { useState } from 'react';
import ReactDOM from 'react-dom';
// React is loaded and is available as React and ReactDOM
// imports should NOT be used
const Cards = (props) => {
    const amount = props.amount;
    let updown = new Array(amount);
    
    for(var i=0; i<amount; i++){
        updown[i] = 'down';
    }
    const [card, setCard] = React.useState(updown);
    const onClick=(key)=>{
        let tmp = [...card];
        if(tmp[key]==='down'){
            tmp[key]='up';
        }else{
            tmp[key]='down';
        }
        console.log(tmp);
        setCard(tmp);
    }


    return (
        <table>
            <tbody>
                <tr>
                    {
                        card.map((n,key) =>(
                            <td onClick={()=>onClick(key)} key={key}>{n}</td>
                        ))
                    }
                </tr>
            </tbody>
        </table>
    );
  };
  
  document.body.innerHTML = "<div id='root'> </div>";
    
  const rootElement = document.getElementById("root");
  ReactDOM.render(<Cards amount={4} />, rootElement);
  
  let row = document.getElementById("root").getElementsByTagName("tr")[0];
  if(row) {
    let cell = row.getElementsByTagName("td")[1];
    if(cell) {
      cell.click();
    }
  }
  setTimeout(() => console.log(document.getElementById("root").innerHTML));