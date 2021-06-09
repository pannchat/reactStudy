import logo from './logo.svg';
import './App.css';
import React,{useState} from 'react';
import Data from './data'
import Product from './Product'
import {Navbar, Container, Nav, NavDropdown} from 'react-bootstrap';
import {Route, Switch, Link} from 'react-router-dom';
import Detail from './Detail'
function App() {
  let [shoes, setShoes] = useState(Data);
  return (
    <div className="App">
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link><Link to="/">Home</Link></Nav.Link>
              <Nav.Link><Link to="/detail">Detail</Link></Nav.Link>
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
        <div className="row">


          {
            shoes.map((i,idx)=>{
              return(
              <Product shoes={shoes[idx]} idx={idx}/>
              )
            })
          }
          

        </div>
      </div>
    </Route>
    <Route path="/detail/:id">
          <Detail shoes={shoes} />

    </Route>
    <Route path="/:id">
      <div>아무내용</div>
    </Route>
    </Switch>
    </div>
  );
}


export default App;
