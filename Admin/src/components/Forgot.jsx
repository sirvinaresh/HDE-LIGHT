import React, { useState } from 'react'
import axios from 'axios';
import { Form, Button, Row, Col } from "react-bootstrap";
import toast, { Toaster } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import {APIurl} from '../utils'

let vali = Yup.object({
    email:Yup.string().email().required('email must be required...'),
    password:Yup.string().matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,'Write strong password (e.g. Admin@1234)').required('password must be required...'),
})  

function Forgot() {
    const [show,setshow]= useState(false)

    let navi = useNavigate()

    let init = {
        email:'',
        password:''
    }

    const {errors,values,handleBlur,handleChange,handleSubmit,resetForm} = useFormik({
        initialValues:init,
        validationSchema:vali,
        onSubmit: async (values)=>{
            try {
                const res = await axios.post(`${APIurl}/login/forgot`,values)
                const {message,token,name} = res.data
                resetForm()
                toast.success(message);
                setTimeout(()=>{
                    navi('/login');
                },1000)

            } catch (error) {
                if(error.response && error.response.status === 400){
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
        <h1 className='text-center my-2'>Forgot Password</h1>

        {/* Email Input */}
        <Form.Group className="my-4" controlId="form2Example1">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter Email"  name='email' value={values.email} onChange={handleChange} onBlur={handleBlur}/>
          {errors.email ? <small className="text-danger">{errors.email}</small>:null}
        </Form.Group>

        {/* Password Input */}
        <Form.Group className="mb-4" controlId="form2Example2">
          <Form.Label>New Password</Form.Label>
          <Form.Control type={show ? 'text':'password'} placeholder="Enter new Password" name='password' value={values.password} onChange={handleChange} onBlur={handleBlur}/>
          {errors.password ? <small className="text-danger">{errors.password}</small>:null}
          <div className='d-flex justify-content-between'>
            <Form.Check 
              type="checkbox"
              label="Show Password"
              id="form2Example31"
              className='mt-2'
              onChange={(e)=>{e.target.checked ? setshow(true) : setshow(false)}}
            />
            <div className='mt-2'><Link to='/login'>Login</Link></div>
          </div>
        </Form.Group>

        {/* Submit Button */}
            <Button variant="primary" type="submit" className="text-center mb-3 w-100">
              Submit
            </Button>
      </Form>
        </Col>
      </Row>
    </Container>

    <div className='w-25 m-auto py-5'>
     <Toaster
        position="top-center"
        reverseOrder={false}
        />
  </div>
        </div>
    </>
  )
}

export default Forgot