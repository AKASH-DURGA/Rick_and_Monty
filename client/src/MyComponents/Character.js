import React from 'react'
import Button from 'react-bootstrap/Button';
import './style.css';
import Card from 'react-bootstrap/Card';
import { useParams } from 'react-router-dom';
import { useState,useEffect } from 'react'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { UrlConstant } from '../apiProvider';


export default function Character() {

  const {id}=useParams();
  const [characterData,setCharacterData]=useState([{}])
  const [allLocations,setAllLocations]=useState([])
  const [num,setNum]=useState([])
    
  useEffect(()=>{
    async function func(){
      try{
        const response = await fetch(`${UrlConstant.getCharacterById}${id}`);
        const json=await response.json();
        const len=await json.episode.length;
        const allName=[]
        const allNum=[]
        for(let i=0;i<len;i++){
          const location=await fetch(json.episode[i]);
          let temp=await location.json();
          allName[i]=await temp.name;
          allNum[i]=await temp.episode;
        }
        setAllLocations(allName);
        setNum(allNum);
        setCharacterData(json);
        return json;
      }
      catch(error){
        console.log(error)
      }
    }
    func()
          
  },[])

  const elements=[]
  for (let i = 0; i < num.length; i++) {
    elements.push(
      <span key={i}>
        <strong>{num[i]}:</strong> {allLocations[i]}{i < num.length - 1 ? ', ' : ''}
        <br />
      </span>
      
    );
  }

  return (
    <div>
    <Navbar expand="lg" data-bs-theme="dark" className="d-flex bg-body-tertiary justify-content-between customNav">
      <Container>
        <Navbar.Brand href="/">Rick and Morty</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar> 
   <div className='d-flex flex-row'> 

    <img className='ms-4 mt-4' style={{height: '400px', width:'400px'}} src={characterData.image} alt="" />
    <Card style={{ width: '60rem'}}
    className="d-flex flex-row bg-dark text-white mx-auto customCharDetails"
    bg="dark"
    display="flex"
          key="Dark"
          text={"dark" === 'light' ? 'dark' : 'white'}>
      <Card.Body>
      <Card.Title className='text-center mt-2 mb-4 charTitle'>{characterData?.name}</Card.Title>
              <Card.Text>
                             
              <div className={characterData?.status==="Alive"?"onlineStatus":characterData?.status==="unknown"?"unknownStatus":"offlineStatus"}></div><div className='status'><strong style={{fontSize:"x-large"}}>{characterData.status}-{characterData.species}</strong></div>
              <br />
              <p className='status'><strong style={{fontSize:"large"}}>Gender : </strong><br />{characterData?.gender}</p>
              <p className='status'><strong style={{fontSize:"large"}}>Origin : </strong><br />{characterData?.origin?.name}</p>
              <p className='status'><strong style={{fontSize:"large"}}>Last Known Location:</strong> <br />{characterData?.location?.name}</p>
              
              <p style={{fontSize:"large"}} ><strong style={{fontSize:"x-large"}}>All episodes: </strong><br />{elements}</p>
              </Card.Text>
        <Button variant="secondary" href='/'>Back</Button>
      </Card.Body>
    </Card>
   </div>
   </div> 
  );
}
