import React from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';
function About() {
  return (
    <>
         <Container className='contact-box' fluid>
            <h1>About Us</h1>
            <p><Link to='/' className=' text-decoration-none text-black'>Home</Link> / <Link to='/about' className='text-decoration-none text-black'>About Us</Link></p>
        </Container>
    </>
  )
}

export default About