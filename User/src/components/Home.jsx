import React, { useEffect, useState } from 'react'
import Carousel from 'react-bootstrap/Carousel';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import {Container,Row,Col} from 'react-bootstrap';
import {APIurl} from '../utils';
import axios from 'axios';
import Image from 'react-bootstrap/Image';
import { Link } from 'react-router-dom';

function Home() {
  const settings = {
    dots: false,
    infinite: true,
    autoplay:true,
    speed:2800,
    autoplaySpeed: 2000,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: false
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          speed:1000,
          autoplaySpeed: 2000,
        }
      }
    ]
  };


  const [products,setproducts] = useState([]);
  useEffect(()=>{
    axios.get(`${APIurl}/product/Indoor/customized-profile-lights`)
      .then(res => setproducts(res.data))
      .catch(err => console.log(err));
  })
  return (
    <>
      <Carousel >
      <Carousel.Item>
          <img src={require('../images/n2.png')} alt="" style={{height:'80vh' ,width:'100%',objectFit:'cover'}}/>
      </Carousel.Item>
      <Carousel.Item>
        <img src={require('../images/s1.jpeg')} alt="" style={{height:'80vh' ,width:'100%',objectFit:'cover'}}/>
      </Carousel.Item>
      <Carousel.Item>
        <img src={require('../images/s5.jpeg')} alt="" style={{height:'80vh' ,width:'100%',objectFit:'cover'}}/>
      </Carousel.Item>
      <Carousel.Item>
        <img src={require('../images/s4.jpeg')} alt="" style={{height:'80vh' ,width:'100%',objectFit:'cover'}}/>
      </Carousel.Item>  
    </Carousel>

    <Container className=' my-5'>
      {/* Slider */}
      <div>
      <h1 className='text-center pb-3 pt-5'><span style={{color:'#d4a373'}}>Customized</span> Profile Lights</h1>
      <div className="slider-container ">
        <Slider {...settings}>
          {
            products.map((val,i)=>{
              return(
                 <div className='px-1' key={i} >
                    <p className='border rounded-3 shadow-sm'>
                      <Image src={val.image}  style={{height:'300px',width:'100%',borderRadius:'12px'}} fluid />
                    </p>
                  </div>
              )
            })
          }
        </Slider>
      </div>
      </div>
      
      {/* display image */}
      <Row className='my-5'>
      <h1 className='text-center pb-3 pt-5'><span style={{color:'#d4a373'}}>Indoor</span> Lights</h1>
        <Col lg={3} md={6} sm={12}><Image src={require('../images/displayimg/i1.jpg')}  className='dis-image' fluid /></Col>
        <Col lg={3} md={6} sm={12}><Image src={require('../images/displayimg/i2.jpg')}  className='dis-image' fluid /></Col>
        <Col lg={3} md={6} sm={12}><Image src={require('../images/displayimg/i3.webp')} className='dis-image' fluid /></Col>
        <Col lg={3} md={6} sm={12}><Image src={require('../images/displayimg/i4.webp')} className='dis-image' fluid /></Col>
      </Row>

      <Row className='pt-4'>
          <Col lg={6} md={12} sm={12}>
            <div className="hover-image-wrapper position-relative overflow-hidden">
            <Image src={require('../images/displayimg/b1.jpg')}  className='dis-image' fluid />
              <div className="overlay-mask d-flex justify-content-center align-items-center">
                <h2 className="text-white text-center"><Link to='/indoor' className='nav-link stretched-link'>Visit Indoor Lights</Link></h2>
              </div>
            </div>
          </Col>
          <Col lg={6} md={12} sm={12}>
            <div className="hover-image-wrapper position-relative overflow-hidden">
              <Image src={require('../images/displayimg/b2.jpg')}  className='dis-image' fluid />
              <div className="overlay-mask d-flex justify-content-center align-items-center">
                <h2 className="text-white text-center"><Link to='/outdoor' className='nav-link stretched-link'>Visit Outdoor Lights</Link></h2>
              </div>
             </div>
          </Col>
      </Row>

      <Row className='my-5' >
      <h1 className='text-center pb-3 pt-5'><span style={{color:'#d4a373'}}>Outdoor</span> Lights</h1>
        <Col lg={3} md={6} sm={12}><Image src={require('../images/displayimg/o1.jpg')}  className='dis-image' fluid /></Col>
        <Col lg={3} md={6} sm={12}><Image src={require('../images/displayimg/o2.jpg')}  className='dis-image' fluid /></Col>
        <Col lg={3} md={6} sm={12}><Image src={require('../images/displayimg/o3.webp')} className='dis-image' fluid /></Col>
        <Col lg={3} md={6} sm={12}><Image src={require('../images/displayimg/o4.jpg')}  className='dis-image' fluid /></Col>
      </Row>
    </Container>
    </>
  )
}

export default Home