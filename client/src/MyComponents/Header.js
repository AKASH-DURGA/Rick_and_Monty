import React, { useState } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './style.css';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Characters from './Characters';
import { UrlConstant } from '../apiProvider';
export default function Header (props) {
  

const [results,setResults]=useState([{}])
  
    async function fetchCharacters (name) {
        try {
          if(name!==""){
            const response = await fetch(`${UrlConstant.searchURL}${name}`, {
                method: "GET"
            });
            const json = await response.json();
            const res=await json.results;
            setResults(res)
          }
          else{
            setResults(null)
          }

        } catch (error) {
            console.log(error)
        }
    }
    const handleChange=(e)=>{
      fetchCharacters(e.target.value)
    }
  
  
  return (
    <div>
       <Navbar expand="lg" data-bs-theme="dark" className="d-flex bg-body-tertiary justify-content-between customNav">
      <Container>
        <Navbar.Brand href="/">{props.title}</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <Form inline>
        <Row>
          <Col xs="auto">
            <Form.Control
              type="text"
              placeholder="Search by Name"
              className=" mr-sm-2"
              onChange={(e)=>{handleChange(e)}}
            />
          </Col>
        </Row>
      </Form>
      </Container>
    </Navbar> 
    <Characters res={results}/>
    </div>
  )
}
