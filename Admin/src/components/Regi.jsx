import axios from 'axios';
import { useFormik } from 'formik';
import React from 'react'
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import * as Yup from 'yup';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import {APIurl} from '../utils'

let vali = Yup.object({
    fname:Yup.string().required('first name must be required...'),
    email:Yup.string().email().required('email must be required...'),
    password:Yup.string().matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,'Write strong password (e.g. Admin@1234)').required('password must be required...'),
    mobile:Yup.string().matches(/^(\+91|\+91\-|0)?[6789]\d{9}$/,'please enter correct number')
})   

function Regi() {

    var nav = useNavigate()

    let init = {
        fname:'',
        lname:'',
        email:'',
        password:'',
        mobile:''
    }

    const {values,errors,touched,handleBlur,handleChange,handleSubmit,resetForm} = useFormik({
        initialValues:init,
        validationSchema:vali,
        onSubmit: async (values)=>{
            try {
                const res = await axios.post(`${APIurl}/regi/`,values)
                resetForm();
                toast.success('Successfully Registered')
                setTimeout(()=>{
                  nav('/login')
                })
            } catch (error) {
                if(error.response && error.response.status === 400){
                    toast.error(error.response.data.message)
                }else{
                    toast.error('Something went wrong!')
                    console.error(error)
                }
            }
        }
    })
  return (
    <>
    <section style={{ backgroundColor: "#eee", minHeight: "100vh" }}>
      <Container className="h-100 pt-4">
        <Row className="justify-content-center align-items-center h-100">
          <Col lg={12} xl={11}>
            <Card className="text-black" style={{ borderRadius: "25px" }}>
              <Card.Body className="p-md-5">
                <Row className="justify-content-center">
                  <Col md={10} lg={6} xl={5} className="order-2 order-lg-1">
                    <h1 className="text-center fw-bold mb-5 mx-1 mx-md-4 mt-4">Register here</h1>

                    <Form className="mx-1 mx-md-4" onSubmit={handleSubmit}>
                      <Form.Group className=" mb-4" controlId="formfName">
                        <Form.Control type="text" placeholder="First Name" name='fname' value={values.fname} onChange={handleChange} onBlur={handleBlur}/>
                        {(touched.fname && errors.fname) ? <font className="text-danger">{errors.fname}</font> : null}
                      </Form.Group>

                      <Form.Group className=" mb-4" controlId="formlName">
                        <Form.Control type="text" placeholder="Last Name" name='lname' value={values.lname} onChange={handleChange} onBlur={handleBlur}/>
                      </Form.Group>

                      <Form.Group className=" mb-4" controlId="formEmail">
                        <Form.Control type="email" placeholder="Your Email" name='email' value={values.email} onChange={handleChange} onBlur={handleBlur} />
                        {(touched.email && errors.email) ? <font className="text-danger">{errors.email}</font> : null}
                      </Form.Group>

                      <Form.Group className=" mb-4" controlId="formPassword">
                        <Form.Control type="password" placeholder="Password" name='password' value={values.password} onChange={handleChange} onBlur={handleBlur}/>
                        {(touched.password && errors.password) ? <font className="text-danger">{errors.password}</font> : null}
                      </Form.Group>

                      <Form.Group className=" mb-4" controlId="formRepeatPassword">
                        <Form.Control type="number" placeholder="Mobile No." name='mobile' value={values.mobile} onChange={handleChange} onBlur={handleBlur}/>
                        {(touched.mobile && errors.mobile) ? <font className="text-danger">{errors.mobile}</font> : null}
                      </Form.Group>

                      <Form.Check
                        type="checkbox"
                        label={
                          <>
                            I agree to all statements in <a href="#!">Terms of service</a>
                          </>
                        }
                        className="d-flex justify-content-center mb-5"
                      />

                      <div className="d-flex justify-content-center justify-content-between mx-4 mb-3 mb-lg-4">
                        <Button variant="primary" size="lg" type="submit">
                          Register
                        </Button>
                      </div>
                    </Form>
                  </Col>

                  <Col md={10} lg={6} xl={7} className="d-flex align-items-center order-1 order-lg-2">
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                      alt="Sample"
                      className="img-fluid"
                    />
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  
      <Toaster
    position="top-center"
    reverseOrder={false}
    />
    </>
  )
}

export default Regi