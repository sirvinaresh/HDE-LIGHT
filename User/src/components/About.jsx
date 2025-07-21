import React from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';
function About() {

  const about = [
  {
    title: 'CORE VALUE',
    des: 'Established in 2016 as H D ENTERPRISE, an ISO 9001:2015 certified company, we have illuminated numerous residential and commercial projects. In 2023, HDE PVT LTD was formed with the same prime focus on client satisfaction and high-quality products. We\'ve developed a range of residential, commercial, and industrial luminaries. With growing client demand, we stepped into customization—especially architectural lighting solutions. We also embrace industrial challenges and solve them in the best possible way.'
  },
  {
    title: 'VISION',
    des: 'Our prime vision at HDE PVT LTD is “INNOVATING THE NEXT.” It drives us to continually create new innovations and deliver the best products to our customers. We hold certifications such as ISO, CE & RoHS, and maintain strong logistics for fast and economical delivery. Our visionary thinking is designed to reach every corner of the world. As Plato wrote, “Our need will be the real creator.” Your wish is what we create at HDE PVT LTD.'
  },
  {
    title: 'MISSION',
    des: 'Our mission aligns with the vision of our Honorable Prime Minister: “MAKE IN INDIA.” We’ve added our own mantra: “MAKE FOR BETTER INDIA.” We are committed to manufacturing and delivering top-quality lighting solutions. Our mission extends beyond lighting—we aim to explore multiple technological platforms, gaining recognition for both our company and our country.'
  }
];
  return (
    <>
         <Container className='contact-box' fluid>
            <h1>About Us</h1>
            <p><Link to='/' className=' text-decoration-none text-black'>Home</Link> / <Link to='/about' className='text-decoration-none text-black'>About Us</Link></p>
        </Container>

        <Container>
          <div>
            {
              about.map((val,i)=>{
                return(
                  <>
                     <div key={i} className="my-5">
                        <h2>{val.title}</h2>
                        <p style={{textAlign:'justify'}}>{val.des}</p>
                      </div>
                  </>
                )
              })
            }
          </div>
        </Container>
    </>
  )
}

export default About