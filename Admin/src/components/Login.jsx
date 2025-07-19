import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react'
import { Form, Button, Row, Col } from "react-bootstrap";
import toast, { Toaster } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import {APIurl} from '../utils';


function Login() {
    const [show,setshow]= useState(false)
    let navi = useNavigate()
    
    let init = {
        email:'',
        password:''
    }

    const {values,handleBlur,handleChange,handleSubmit,resetForm} = useFormik({
        initialValues:init,
        onSubmit: async (values)=>{
            try {
                const res = await axios.post(`${APIurl}/login/`,values)
                const {message,token,name} = res.data
                console.log(name)
                resetForm()
                toast.success(message);

                setTimeout(()=>{
                    navi('/home');
                },1000)

                sessionStorage.setItem('token',token)
                sessionStorage.setItem('name',name)

            } catch (error) {
                if(error.response && error.response.status === 400){
                    toast.error(error.response.data.message);
                }else if(error.response && error.response.status === 403){
                  toast.error(error.response.data.message);
                }
                else{
                    toast.error('Something went wrong!')
                    console.error(error)
                }    
            }
        }
    })

  return (
    <>
  <div style={{backgroundColor:'#edf2f4',height:'100vh',paddingTop:'6rem'}}>
    <Container className=''>
      <Row>
        <Col lg={4} md={8} sm={10} xs={11} className='bg-light shadow rounded-4 m-auto p-4'>
          <Form onSubmit={handleSubmit}>
        <h1 className='text-center my-2'>Admin Login</h1>
        {/* Email Input */}
        <Form.Group className="my-4" controlId="form2Example1">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter Email"  name='email' value={values.email} onChange={handleChange} onBlur={handleBlur}/>
        </Form.Group>

        {/* Password Input */}
        <Form.Group className="mb-4" controlId="form2Example2">
          <Form.Label>Password</Form.Label>
          <Form.Control type={show ? 'text':'password'} placeholder="Enter Password" name='password' value={values.password} onChange={handleChange} onBlur={handleBlur}/>
          <div className='d-flex justify-content-between'>
            <Form.Check 
              type="checkbox"
              label="Show Password"
              id="form2Example31"
              className='mt-2'
              onChange={(e)=>{e.target.checked ? setshow(true) : setshow(false)}}
            />
             <div className='mt-2'><Link to='/forgot'>Forgot Password</Link></div>
          </div>
        </Form.Group>

        {/* Submit Button */}
            <Button variant="primary" type="submit" className="text-center mb-3 w-100">
              Log in
            </Button>
        
        {/* Social and Register */}
        <div className="text-center">
          <p>Not a member? <Link to='/regi'>Register</Link></p> 
        </div>
          </Form>
        </Col>
      </Row>
    </Container>

     <Toaster
        position="top-center"
        reverseOrder={false}
      />

  </div>
    </>
  )
}

export default Login