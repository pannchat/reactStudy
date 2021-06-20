import React,{useContext} from 'react'
import {stockContext} from './App'
function Product( props ){
    let stock = useContext(stockContext);
    return (
        <div className="col-md-4">
            <img src={'https://codingapple1.github.io/shop/shoes'+ (props.idx+1) +'.jpg'} width="100%" />
            <h4>{props.shoes.title}</h4>
            <p>{props.shoes.content}</p>
            {stock}
      </div>
    )
  }
function Test(){
    let stock = useContext(stockContext)
    return (
        <p>재고는 : {stock}</p>
    )
}
export default Product;