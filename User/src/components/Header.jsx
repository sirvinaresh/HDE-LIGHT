import React from 'react'
import { NavLink } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
function Header() {
  return (
    <>
    <Navbar expand="lg" className="bg-body-tertiary shadow-sm" sticky='top'>
      <Container>
        <Navbar.Brand href="#home"><img src={require('../images/hd.png')} style={{height:'60px'}} alt="" /></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto gap-lg-5">
            <NavLink to="/" className='nav-link text-black menu fs-5'>Home</NavLink>
            <NavLink to="/indoor" className='nav-link text-black menu  fs-5'>Indoor</NavLink>
            <NavLink to="/outdoor" className='nav-link text-black menu fs-5'>Outdoor</NavLink>
            <NavLink to="/about" className='nav-link text-black menu fs-5'>About</NavLink>
            <NavLink to="/contact" className='nav-link text-black menu fs-5'>Contact</NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </>
  )
}

export default Header