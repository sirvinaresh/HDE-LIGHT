import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Table from 'react-bootstrap/Table';
import {APIurl} from '../utils'
function Details() {

     const inputfiled = [
        {dis:'Light Name',name:'lname'},
        {dis:'Model',name:'model'},
        {dis:'Watt',name:'watt'},
        {dis:'Width',name:'width'},
        {dis:'height',name:'height'},
        {dis:'Dimension',name:'dimension'},
        {dis:'CCT',name:'cct'},
        {dis:'Lumens',name:'lumens'},
        {dis:'Power Factor',name:'pfactor'},
        {dis:'IP Rating',name:'ip'},
        {dis:'Cut-Out',name:'cout'},
        {dis:'Work Voltage',name:'wvolt'},
        {dis:'Copper Layer',name:'clayer'},
        {dis:'Body Color',name:'bcolor'},
        {dis:'Colour',name:'colour'},
        {dis:'Body',name:'body'},
        {dis:'PCB Dimension',name:'pdemsion'},
        {dis:'Size',name:'size'},
        {dis:'Holder',name:'holder'},
        {dis:'Material',name:'material'},
        {dis:'Diameter',name:'dmeter'},
        {dis:'Pole Diameter',name:'pdmeter'},
    ]

    const {id} = useParams();

    const [record,setrecord] = useState([])
    
    useEffect(()=>{
        axios.get(`${APIurl}/get/${id}`)
            .then((res)=>{setrecord(res.data)})
    },[])
  return (
    <>
        <Container className='my-5'>
            <Row>
                <Col lg={6} md={6} sm={12} xs={12} className=' text-center'>
                    <Image src={`${APIurl}/uploads/${record.image}`} className='shadow  rounded-3' fluid />
                </Col>
                <Col lg={6} md={6} sm={12} xs={12} className='p-3'>
                    <h1>{record.lname}</h1>
                    <Table className='fs-5 my-4'>
                        <tbody>
                            {
                                inputfiled.map((cat,i)=>{
                                    const value = record[cat.name];
                                    if (!value) return null;
                                    return(
                                        <tr key={i}>
                                            <td className='py-3'>{cat.dis}</td>
                                            <td className='py-3'>: {record[cat.name]}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </Table>
                    
                </Col>
            </Row>
        </Container>
    </>
  )
}

export default Details