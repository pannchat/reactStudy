import React from 'react';
import {Table} from 'react-bootstrap'
import { connect } from 'react-redux';
function Cart(props){
    return(
        <div>
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>상품명</th>
                        <th>수량</th>
                        <th>변경</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        props.state.map((products,idx)=>{
                            return(
                                <tr key={idx}>
                                <td>{products.id}</td>
                                <td> {products.name} </td>
                                <td> {products.quan} </td>
                                <td><button onClick={ ()=>{props.dispatch({ type:'INCREMENT' })} }>+</button><button onClick={ ()=>{props.dispatch({ type:'DECREMENT' })} }>-</button></td>
                                </tr>
                            )
                        })
                    }


                </tbody>
                </Table>
        </div>
    )
}
function fnc(state){ // state를 props 화
    return {
        state : state
    }
}
export default connect(fnc)(Cart)
// export default Cart;