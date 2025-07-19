import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { RxExit } from "react-icons/rx";
import Image from 'react-bootstrap/Image';
function Header() {

    const logout = ()=>{
    sessionStorage.removeItem('name')
    sessionStorage.removeItem('token')
  }
  return (
    <>
        <Navbar expand="lg" className="bg-body-tertiary shadow-sm py-3" sticky='top'>
        <Container>
            <div><Image src={require('../images/logo.png')} style={{height:'48px'}} fluid /> <Navbar.Brand className=''>HDE Admin</Navbar.Brand></div>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="m-auto gap-lg-5">
                <Link to='/home' className='nav-link'>Home</Link>
                <Link to='/show' className='nav-link'>View Listing</Link>
            </Nav>
                <Link to='/login' className='nav-link out-btn rounded-5 py-1 px-3' onClick={logout}>Log out <RxExit /></Link>
            </Navbar.Collapse>
        </Container>
        </Navbar>
    </>
  )
}

export default Header