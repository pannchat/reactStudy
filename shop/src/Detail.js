import React,{useState} from 'react';
import {useHistory, useParams} from 'react-router-dom';
import styled from 'styled-components';
let box = styled.div`
    padding : 20px;

`;
let 제목 = styled.h4`
 font-size: 40px;
 color : ${props => props.color}
`;
function Detail(props){
    let history = useHistory();
    let {id} =useParams();
    let fid = props.shoes.find((Product)=>{
        return Product.id == id
    })
    return(
      <div className="container">
          <box><제목 color={'red'}>상세페이지</제목></box>
      <div className="row">
        <div className="col-md-6">
          <img src={'https://codingapple1.github.io/shop/shoes1.jpg'} width="100%" />
        </div>
        <div className="col-md-6 mt-4">
          <h4 className="pt-5">{fid.title}</h4>
          <p>{fid.content}</p>
          <p>{fid.price}</p>
          <button className="btn btn-danger">주문하기</button> 
          <button className="btn btn-danger" onClick={()=>{
              history.goBack();
          }}>뒤로가기</button> 
        </div>
      </div>
  </div> 
    )
  }

  export default Detail;