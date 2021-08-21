import React, { useState } from 'react';
import ReactDOM from 'react-dom';
const CommentList = (props) => {
    const [text,setText] = React.useState('');
    const [li, setLi] = React.useState([]);
    const onChange = (e) =>{
        setText(e.target.value);
    }
    const onClick = () =>{
        if(text!==''){
            setLi([...li, text]);
            setText('');
        }
    }
    console.log(text);
    return (<div>
        <form>
          <input type="text" value={text} onChange={onChange}/>
          <input type="button" value="Post" onClick={onClick} />
        </form>
        <ul>
            {li.map( (content,key) => (
                <li key={key}>{content}</li>
            ))}
        </ul>
      </div>);
  }
  
  document.body.innerHTML = "<div id='root'> </div>";
    
  const rootElement = document.getElementById("root");
  ReactDOM.render(<CommentList />, rootElement);
                  
  var input = document.querySelector("input[type='text']");
  input.value = "test";
  input._valueTracker.setValue("");
  input.dispatchEvent(new Event('change', { bubbles: true }));
  
  document.querySelector("input[type='button']").click();
  console.log(document.getElementsByTagName("ul")[0].innerHTML);