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
import {APIurl} from '../utils'
import { ScaleLoader } from "react-spinners";
function Indoor() {

   const category = [
  {
    cat: 'LED TUBE LIGHT',
    catSlug: 'led-tube-light',
    scat: '',
    scatSlug: ''
  },
  {
    cat: 'PANEL LIGHTS',
    catSlug: 'panel-lights',
    scat: [
      { name: 'RECESSED PANEL LIGHT', slug: 'recessed-panel-light' },
      { name: 'SURFACE PANEL LIGHT', slug: 'surface-panel-light' }
    ]
  },
  {
    cat: 'ARCHITECHURAL LIGHTS',
    catSlug: 'architechural-lights',
    scat: [
      { name: 'SPOT LIGHT', slug: 'spot-light' },
      { name: 'ARCHITECTURAL SPOT LIGHT', slug: 'architectural-spot-light' },
      { name: 'LINEA LASER LIGHT', slug: 'linea-laser-light' },
      { name: 'CYLINDER SPOT LIGHT', slug: 'cylinder-spot-light' },
      { name: 'TRACK SPOT LIGHT', slug: 'track-spot-light' },
      { name: 'IP65 COB’S & IP65 CYLINDER LIGHT', slug: 'ip65-cobs-and-ip65-cylinder-light' },
      { name: 'WALL WASHER LIGHTS', slug: 'wall-washer-lights' }
    ]
  },
  {
    cat: 'PROFILE & STRIP LIGHTS',
    catSlug: 'profile-and-strip-lights',
    scat: [
      { name: 'STRIP LIGHT & POWER SUPPLY', slug: 'strip-light-and-power-supply' },
      { name: 'ALUMINUM PROFILE', slug: 'aluminum-profile' },
      { name: 'NEON FLEXIBLE PROFILE', slug: 'neon-flexible-profile' },
      { name: 'MAGNETIC PROFILE LIGHT', slug: 'magnetic-profile-light' }
    ]
  },
  {
    cat: 'CUSTOMIZED PROFILE LIGHT',
    catSlug: 'customized-profile-lights',
    scat: '',
    scatSlug: ''
  },
  {
    cat: 'INDUSTRIAL LIGHTS',
    catSlug: 'industrial-lights',
    scat: [
      { name: 'LITE STREET LIGHT', slug: 'lite-street-light' },
      { name: 'STREET LIGHT', slug: 'street-light' },
      { name: 'LITE FLOOD LIGHT', slug: 'lite-flood-light' },
      { name: 'DC FLOOD LIGHT', slug: 'dc-flood-light' },
      { name: 'BC FLOOD LIGHT', slug: 'bc-flood-light' },
      { name: 'LITE HIGH-BAY LIGHT', slug: 'lite-high-bay-light' },
      { name: 'HIGH-BAY LIGHT', slug: 'high-bay-light' }
    ]
  }
    ];

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [products,setproducts] = useState([]);
    const [active,setactive] = useState('led-tube-light');
    const [loading, setLoading] = useState(false);

    const getCategory = (catSlug) => {
    sessionStorage.setItem('activeindoorcat',JSON.stringify({catSlug}));
    setactive(catSlug)
    setLoading(true)
    axios.get(`${APIurl}/product/Indoor/${catSlug}`)
      .then(res => setproducts(res.data))
      .catch(err => console.log(err))
      .finally(()=>setLoading(false))
    }

    const getSubCategory = (catSlug, scatSlug) => {
        sessionStorage.setItem('activeindoorcat',JSON.stringify({catSlug,scatSlug}));
        setactive(scatSlug)
        setLoading(true)
        axios.get(`${APIurl}/product/Indoor/${catSlug}/${scatSlug}`)
        .then(res => setproducts(res.data))
        .catch(err => console.log(err))
        .finally(()=>setLoading(false))
    }

   
    useEffect(()=>{
        const saved = JSON.parse(sessionStorage.getItem('activeindoorcat')) || {catSlug:'led-tube-light'};
        setLoading(true)

        if(saved.scatSlug){
          setactive(saved.scatSlug)
          axios.get(`${APIurl}/product/Indoor/${saved.catSlug}/${saved.scatSlug}`)
          .then((res)=>{setproducts(res.data); console.log(res.data)})
          .catch(err => console.log(err))
          .finally(()=>setLoading(false))
        }else{
          setactive(saved.catSlug);
            axios.get(`${APIurl}/product/Indoor/${saved.catSlug}`)
            .then(res => setproducts(res.data))
            .catch(err => console.log(err))
            .finally(()=>setLoading(false))
        }
    },[])
    
  return (
    <>  
        <div className='app-cat p-3'>
            <h5 onClick={handleShow}><HiMiniBars3BottomLeft className='mb-1'/> Category List</h5>
            <Offcanvas show={show} onHide={handleClose} className="w-75">
                <Offcanvas.Header closeButton>
                <Offcanvas.Title> <span style={{color:'#d4a373'}}>Indoor</span> Lights</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <ul>
                        {
                           category.map((val, i) => (
                            <li key={i} className='my-4'>
                                <strong>
                                    <button className={`in-text btn btn-link p-0 ${active === val.catSlug ? 'active-cat' : ''}`} onClick={() =>{getCategory(val.catSlug); handleClose()}}>{val.cat}</button>
                                </strong>
                                {val.scat && val.scat.length > 0 && (
                                <ul>
                                    {val.scat.map((sub, j) => (
                                    <li key={j}><button className={`in-text btn btn-link p-0 ${active === sub.slug ? 'active-cat' : ''}`} onClick={() =>{getSubCategory(val.catSlug, sub.slug); handleClose()}}>{sub.name}</button></li>
                                    ))}
                                </ul>
                                )}
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
                                    <button className={`in-text fw-bold btn btn-link p-0 ${active === val.catSlug ? 'active-cat' : ''}`} onClick={() => getCategory(val.catSlug)}>{val.cat}</button>
                                </strong>
                                {val.scat && val.scat.length > 0 && (
                                <ul>
                                    {val.scat.map((sub, j) => (
                                    <li key={j}><button className={`in-text btn btn-link p-0 ${active === sub.slug ? 'active-cat' : ''}`} onClick={() => getSubCategory(val.catSlug, sub.slug)}>{sub.name}</button></li>
                                    ))}
                                </ul>
                                )}
                            </li>
                            ))
                        }
                    </ul>
                </Col>

                <Col lg={9} md={8} sm={12} xs={12}>
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
                                            <Link to={`/details/${val._id}`} className='stretched-link'></Link>
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

export default Indoor