import React,{useState, useEffect} from 'react';
import {useHistory, useParams} from 'react-router-dom';
import styled from 'styled-components';
import './Detail.scss';

let box = styled.div`
    padding : 20px;

`;
let 제목 = styled.h4`
 font-size: 40px;
 color : ${props => props.color}
`;
function MyAlert(){
    return (
    <div className="my-alert-red">
        <p>재고가 얼마 남지 않았습니다.</p>
    </div>
    )
}
function Detail(props){

    let history = useHistory();
    let {id} =useParams();
    let fid = props.shoes.find((Product)=>{
        return Product.id == id
    })
    const [myAlert,setMyAlert] = useState(MyAlert);
    useEffect(()=>{
        setTimeout(()=>{
            setMyAlert(null);
        },2000);
        console.log('test');
    },[myAlert])
    return(
      <div className="container">
          <box><제목 className="red">상세페이지</제목></box>
          {myAlert}
      <div className="row">
        <div className="col-md-6">
          <img src={'https://codingapple1.github.io/shop/shoes1.jpg'} width="100%" />
        </div>
        <div className="col-md-6 mt-4">
          <h4 className="pt-5">{fid.title}</h4>
          <p>{fid.content}</p>
          <p>{fid.price}</p>
          <StockInfo stock={props.stock}>재고</StockInfo>
          <button className="btn btn-danger" onClick={()=>{props.setStock([9,...props.stock])}}>주문하기</button> 
          <button className="btn btn-danger" onClick={()=>{
              history.goBack();
          }}>뒤로가기</button> 
        </div>
      </div>
  </div> 
    )
  }

  function StockInfo(props){
      return (
          <p>재고 : {props.stock[0]} </p>
      )
  }
  export default Detail;