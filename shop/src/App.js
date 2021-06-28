import logo from './logo.svg';
import './App.css';
import React,{useState, useContext} from 'react';
import Data from './data'
import Product from './Product'
import {Navbar, Container, Nav, NavDropdown} from 'react-bootstrap';
import {Route, Switch, Link} from 'react-router-dom';
import Detail from './Detail';
import axios from 'axios';
import Cart from './Cart.js'
export let stockContext = React.createContext();

function App() {
  let [shoes, setShoes] = useState(Data);
  let [stock, setStock] = useState([10,11,12]);
  return (
    <div className="App">
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              <Nav.Link as={Link} to="/detail">Detail</Nav.Link>
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

    <Switch>
    <Route exact path="/">
    <div class="jumbotron">
        <h1>20% season off</h1>
        <p>blabloa</p>
        <button class="btn">확인</button>
      </div>
      <div className="container">
        <stockContext.Provider value={stock}>
        <div className="row">


          {
            shoes.map((i,idx)=>{
              return(
              <Product shoes={shoes[idx]} idx={idx} key={idx}/>
              )
            })
          }

        </div>
        </stockContext.Provider>
        <button onClick={ () => {

          axios.get('https://codingapple1.github.io/shop/data2.json')
          .then((res)=>{
            setShoes([
              ...shoes,
              ...res.data
            ])
            console.log(shoes)
          })
          .catch(()=>{
            console.log("실패했음")
          })
        } } className="btn btn-primary">더보기</button>
      </div>
    </Route>
    <Route path="/detail/:id">
          <Detail shoes={shoes} stock={stock} setStock={setStock}/>

    </Route>
    <Route path="/cart">
      <Cart/>
    </Route>
    <Route path="/:id">
      <div>아무내용</div>
    </Route>

    </Switch>
    </div>
    
  );
}

export default App;
