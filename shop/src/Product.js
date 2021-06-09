import React from 'react';

function Product( props ){
    return (
        <div className="col-md-4">
            <img src={'https://codingapple1.github.io/shop/shoes'+ (props.idx+1) +'.jpg'} width="100%" />
            <h4>{props.shoes.title}</h4>
            <p>{props.shoes.content}</p>
      </div>
    )
}

export default Product;