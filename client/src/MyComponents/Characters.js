import React, { useState,useEffect } from 'react'
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Pagination from 'react-bootstrap/Pagination';
import './style.css';
import {useNavigate } from 'react-router-dom';
import { UrlConstant } from '../apiProvider';



export default function Characters 
(props) {
    
    const navigate=useNavigate();
    const [characterData,setCharacterData]=useState([{}])
    const [firstseen,setFirstseen]=useState([])
    const [id,setid]=useState(1);
    const totalPages = 42;
    
    useEffect(() => {

      async function fetchCharacters () {
          try {
              const response = await fetch(`${UrlConstant.fetchCharactersURL}${id}`, {
                  method: "GET"
              });
              const json = await response.json();
              const first = []
              for(let i=0;i<Object.keys(json).length;i++){
                  
                  const location=await fetch(json[i].episode[0],{
                    method: "GET"
                  });
                  first[i]=await location.json();
                  first[i]=await first[i].name;
              }
              setCharacterData(json)
              setFirstseen(first)
              
          } catch (error) {
              console.log(error)
          }
      }
      
        fetchCharacters()
      
    }, [id])


    useEffect(()=>{
      if(props.res !== null){
        console.log(props.res)
        
        setCharacterData(props.res);
      }
      else{
        window.location.reload();
      }
      

    },[props.res])

  
    const paginationItems = () => {
      const items = [];
      const ellipsisThreshold = 3;
      const visiblePages = 5; 
  
      const startPage = Math.max(
        1,
        Math.min(id - Math.floor(visiblePages / 2), totalPages - visiblePages + 1)
      );
      const endPage = Math.min(startPage + visiblePages - 1, totalPages);
  
      items.push(
        <Pagination.First key="first" onClick={() => setid(1)} disabled={id === 1} />
      );
      items.push(
        <Pagination.Prev key="prev" onClick={() => setid(id - 1)} disabled={id === 1} />
      );
  
      if (startPage > 1) {
        items.push(
          <Pagination.Item key={1} onClick={() => setid(1)}>
            {1}
          </Pagination.Item>
        );
        if (startPage >= ellipsisThreshold) {
          items.push(<Pagination.Ellipsis key="start-ellipsis" />);
        }
      }
  
      for (let i = startPage; i <= endPage; i++) {
        items.push(
          <Pagination.Item
            key={i}
            active={i === id}
            onClick={() => setid(i)}
          >
            {i}
          </Pagination.Item>
        );
      }
  
      if (endPage < totalPages) {
        if (endPage <= totalPages - ellipsisThreshold + 1) {
          items.push(<Pagination.Ellipsis key="end-ellipsis" />);
        }
        items.push(
          <Pagination.Item key={totalPages} onClick={() => setid(totalPages)}>
            {totalPages}
          </Pagination.Item>
        );
      }
  
      items.push(
        <Pagination.Next key="next" onClick={() => setid(id + 1)} disabled={id === totalPages} />
      );
      items.push(
        <Pagination.Last key="last" onClick={() => setid(totalPages)} disabled={id === totalPages} />
      );
  
      return items;
    };



  return (
    <div>
    <div className='mx-4 my-3'>
      <h1 style={{color:'white'}}>All Characters</h1>
        <Row xs={1} md={5} className="g-4">
      {Array.from({ length: 20 }).map((_, idx) =>{
        const data=characterData[idx];
        
        const firstSeenIn= firstseen[idx];
      return data?(
        
        <Col key={idx}>
          <Card
          onClick={() => navigate(`/charinfo/${data.id}`)}
          bg="dark"
          key="Dark"
          text={"dark" === 'light' ? 'dark' : 'white'}
          style={{ width: '18rem', cursor: 'pointer' }}
          className="customCard">
            <Card.Img variant="top" src={data?.image} />
            <Card.Body>
              <Card.Title className='charTitle'>{data?.name}</Card.Title>
              <Card.Text>
              <div className={data?.status==="Alive"?"onlineStatus":data?.status==="unknown"?"unknownStatus":"offlineStatus"}></div><div className='status'>{data.status}-{data.species}</div>
              <br />
              <p className='status'>Last Known Location: <br />{data?.location?.name}</p>
              <p className='status'>First seen in: <br />{firstSeenIn}</p>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ):"";
      })}
    </Row>
    
    <Pagination className='pagination-container'>
      {paginationItems()}
    </Pagination>
    </div>
    </div>
  )

}
