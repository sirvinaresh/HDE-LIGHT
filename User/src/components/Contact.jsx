import React from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';
import { FaFacebook,FaInstagram,FaTwitter,FaLinkedin,FaRegClock } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { IoMdCall } from "react-icons/io";
import { MdEmail } from "react-icons/md";

function Contact() {
  return (
   <>
        <Container className='contact-box' fluid>
            <h1>Contact Us</h1>
            <p><Link to='/' className=' text-decoration-none text-black'>Home</Link> / <Link to='/contact' className='text-decoration-none text-black'>Contact Us</Link></p>
        </Container>

        <Container className='my-5'>
             <Row>
                <Col lg={7} md={6} sm={12} className='p-4 rounded-3'>
                   <form className="row g-3">
                        <h3>Contact with us ...</h3>
                        <div className=''>
                            <label htmlFor="inputEmail4" className="form-label">Your Name</label>
                            <input type="text" className="form-control border-black" id="inputEmail4" />
                        </div>

                        <div>
                            <label htmlFor="inputEmail4" className="form-label">Your Email</label>
                            <input type="email" className="form-control border-black" id="inputEmail4" />
                        </div>

                         <div>
                            <label htmlFor="inputEmail4" className="form-label">Subject</label>
                            <input type="text" className="form-control border-black" id="inputEmail4" />
                        </div>

                         <div>
                            <label htmlFor="inputEmail4" className="form-label">Your Message (optional)</label>
                            <textarea class="form-control border-black" rows={6} id="floatingTextarea"></textarea>
                        </div>
                        
                        <div className="col-12">
                            <button type="submit" className="btn btn-dark">Submit</button>
                        </div>
                    </form>
                </Col>
                <Col lg={5} md={6} sm={11} xs={11} className='border border-black rounded-2 p-3 m-auto'>
                    <div className=''>
                        <iframe src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3720.1093176966497!2d72.908647075261!3d21.187815880501688!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjHCsDExJzE2LjEiTiA3MsKwNTQnNDAuNCJF!5e0!3m2!1sen!2sin!4v1752559167460!5m2!1sen!2sin" 
                        style={{width:'100%', height:'300px'}} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
                    </div>
                    
                    <div className='my-3'>
                        <p><font className="text-dark fw-bold"><FaLocationDot />  Address :</font>  <br /> Surat, Gujarat, India</p>
                        <p><font className="text-dark fw-bold"><IoMdCall /> Phone :</font>  <br /> +91 9909437120</p>
                        <p><font className="text-dark fw-bold"><MdEmail /> Email :</font>  <br /> hdenterprise90@gmail.com</p>
                        <p><font className="text-dark fw-bold">Follow Us:</font>  <br /><span className='gap-2 fs-4 d-flex'><FaFacebook /><FaInstagram /><FaTwitter /><FaLinkedin /></span></p>
                    </div>
                </Col>
            </Row>
        </Container>
   </>
  )
}

export default Contact