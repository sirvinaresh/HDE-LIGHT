import React, { useState } from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { HiMiniBars3BottomLeft } from "react-icons/hi2";
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useEffect } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import { APIurl } from '../utils';
import { ScaleLoader } from 'react-spinners';

function Outdoor() {

   const category = [
  { cat: 'WALL LIGHT', catSlug: 'wall-light' },
  { cat: 'ANTIQUE WALL LIGHT', catSlug: 'antique-wall-light' },
  { cat: 'HIGHLIGHTER LIGHTS', catSlug: 'highlighter-lights' },
  { cat: 'GATE LIGHTS', catSlug: 'gate-lights' },
  { cat: 'BOLLARD LIGHTS', catSlug: 'bollard-lights' },
  { cat: 'ANTIQUE POLE LIGHTS', catSlug: 'antique-pole-lights' },
  { cat: 'MODERN POLE LIGHTS', catSlug: 'modern-pole-lights' },
  { cat: 'POST TOP LIGHTS', catSlug: 'post-top-lights' }
    ]

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [products,setproducts] = useState([]);
    const [active,setactive] = useState('antique-wall-light');
    const [loading,setloading] = useState(false);

    const getCategory = (catSlug) => {
    setactive(catSlug);
    setloading(true)
    sessionStorage.setItem('activeoutdoor',catSlug)
    axios.get(`${APIurl}/product/Outdoor/${catSlug}`)
      .then(res => setproducts(res.data))
      .catch(err => console.log(err))
      .finally(()=>setloading(false))
    }

    useEffect(()=>{
        const savedcat = sessionStorage.getItem('activeoutdoor') || 'antique-wall-light';
        setactive(savedcat)
        setloading(true)
        axios.get(`${APIurl}/product/Outdoor/${savedcat}`)
        .then((res)=>{setproducts(res.data); console.log(res.data)})
        .finally(()=>setloading(false))
    },[])

  return (
    <>
         <div className='app-cat p-3'>
            <h5 onClick={handleShow}><HiMiniBars3BottomLeft className='mb-1'/> Category List</h5>

            <Offcanvas show={show} onHide={handleClose} className="w-75">
                <Offcanvas.Header closeButton>
                <Offcanvas.Title><span style={{color:'#d4a373'}}>Outdoor</span> Lights</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <ul>
                        {
                           category.map((val, i) => (
                            <li key={i} className='my-4'>
                                <strong>
                                    <button className={`in-text btn btn-link p-0 ${active === val.catSlug ? 'active-cat' : ''}`} onClick={() =>{getCategory(val.catSlug); handleClose()}}>{val.cat}</button>
                                </strong>
                            </li>
                            ))
                        }
                    </ul>
                </Offcanvas.Body>
            </Offcanvas>
        </div>
        <Container fluid >
            <Row>
                <Col lg={3} md={4} sm={2} xs={4} className='cate shadow pb-5 position-sticky overflow-auto' style={{height:'88vh',top:'12%'}}>
                    <ul className='pb-2'>
                        {
                           category.map((val, i) => (
                            <li key={i} className='my-4'>
                                <strong>
                                    <button className={`in-text btn btn-link p-0 ${active === val.catSlug ? 'active-cat' : ''}`} onClick={() => getCategory(val.catSlug)}>{val.cat}</button>
                                </strong>
                            </li>
                            ))
                        }
                    </ul>
                </Col>

                <Col className='' lg={9} md={8} sm={12} xs={12}>
                    {
                        loading ? 
                        
                        <div className="d-flex justify-content-center align-items-center" style={{ height: '70vh', width: '100%' }}>
                          <ScaleLoader color="#d4a373" />
                        </div>
                        
                        : <Row>
                        {
                            products.map((val,i)=>{
                                return(
                                    <Col lg={3} md={4} sm={6} xs={6} className='my-3 mt-5 ' key={i}>
                                        <Card className='border-0 shadow card-dis'>
                                            <Link to={`/details/${val._id}`} className=' stretched-link'></Link>
                                            <Card.Img variant="top" className='p-2' src={val.image} />
                                            <Card.Body>
                                                <Card.Title>{val.lname}</Card.Title>
                                                <Card.Text>{val.model}</Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                )
                            })  
                        }
                    </Row>
                    }
                </Col>
            </Row>
        </Container>
    </>
  )
}

export default Outdoor