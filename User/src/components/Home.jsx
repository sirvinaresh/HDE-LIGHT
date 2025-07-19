import React, { useEffect, useState } from 'react'
import Carousel from 'react-bootstrap/Carousel';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Container from 'react-bootstrap/Container';
import {APIurl} from '../utils';
import axios from 'axios';
import Image from 'react-bootstrap/Image';

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
          <img src={require('../images/s2.jpeg')} alt="" style={{height:'80vh' ,width:'100%',objectFit:'cover'}}/>
      </Carousel.Item>
      <Carousel.Item>
        <img src={require('../images/s1.jpeg')} alt="" style={{height:'80vh' ,width:'100%',objectFit:'cover'}}/>
      </Carousel.Item>
      <Carousel.Item>
        <img src={require('../images/s3.jpeg')} alt="" style={{height:'80vh' ,width:'100%',objectFit:'cover'}}/>
      </Carousel.Item>
      <Carousel.Item>
        <img src={require('../images/s4.jpeg')} alt="" style={{height:'80vh' ,width:'100%',objectFit:'cover'}}/>
      </Carousel.Item>  
    </Carousel>

    <Container className=' my-5'>
      <h1 className='text-center pb-3 pt-5'><span style={{color:'#d4a373'}}>Customized</span> Profile Lights</h1>
      <div className="slider-container ">
        <Slider {...settings}>
          {
            products.map((val,i)=>{
              return(
                 <div className='px-1' key={i} >
                    <p className='border rounded-3 shadow-sm'>
                      <Image src={`${APIurl}/uploads/${val.image}`}  style={{height:'300px',width:'100%',borderRadius:'12px'}} fluid />
                    </p>
                  </div>
              )
            })
          }
        </Slider>
      </div>
    </Container>
    </>
  )
}

export default Home