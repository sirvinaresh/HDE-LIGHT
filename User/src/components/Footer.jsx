import React from 'react'
import { Container, Row, Col } from "react-bootstrap";
import { FaFacebookF, FaTwitter, FaGoogle, FaInstagram } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { FaLocationDot } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { IoMdCall } from "react-icons/io";
function Footer() {
  return (
    <>
        <footer className="text-center text-lg-start text-white mt-2" style={{ backgroundColor: "black" }}>
        <Container className="py-5 pb-3">
          <section>
            <Row>
              <Col md={6} lg={3} xl={3} className="mx-auto mt-3">
                <p>
                  <img src={require('../images/footer1.png')} className='img-fluid rounded-3'  style={{height:'230px',width:'80%'}}/>
                </p>
                <h1 className="text-uppercase font-weight-bold">HDE PVT LTD</h1>
                <p>Manufacturer of LED Light & Electrical Products</p>
              </Col>

              <Col md={6} lg={2} xl={2} className="mx-auto mt-3">
                <h6 className="text-uppercase mb-4 font-weight-bold">Information</h6>
                <p><Link className='nav-link' to="/">HOME</Link></p>
                <p><Link className='nav-link' to="/indoor">INDOOR</Link></p>
                <p><Link className='nav-link' to="/outdoor">OUTDOOR</Link></p>
                <p><Link className='nav-link' to="/about">ABOUT</Link></p>
                <p><Link className='nav-link' to="/contact">CONTACT</Link></p>
              </Col>

              <Col md={6} lg={3} xl={3} className="mx-auto mt-3">
                <h6 className="text-uppercase mb-4 font-weight-bold">Contact</h6>
                <p><FaLocationDot /> New York, NY 10012, US</p>
                <p><MdEmail /> hdenterprise90@gmail.com</p>
                <p><IoMdCall /> +91 9909437120</p>
              </Col>

              <Col md={6} lg={2} xl={3} className="mx-auto mt-3">
                <h6 className="text-uppercase mb-4 font-weight-bold">Follow us</h6>
                <a className="btn btn-outline-light btn-floating m-1 rounded-5"><FaFacebookF /></a>
                <a className="btn btn-outline-light btn-floating m-1 rounded-5"><FaTwitter /></a>
                <a className="btn btn-outline-light btn-floating m-1 rounded-5"><FaGoogle /></a>
                <a className="btn btn-outline-light btn-floating m-1 rounded-5"><FaInstagram /></a>

              </Col>
            </Row>
          </section>
        </Container>

        <div className="text-center p-3" style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}>
          <span>© 2025 HDE PVT LTD. All Rights Reserved. | Designed & Developed by Naresh Sirvi</span>
          {/* © 2025 Copyright: <a className="text-white">HDE PVT LTD</a> */}
        </div>
      </footer>

    </>
  )
}

export default Footer