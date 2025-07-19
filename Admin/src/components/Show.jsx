import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Header from "./Header";
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import { useNavigate } from "react-router-dom";
import Pagination from 'react-bootstrap/Pagination';
import {APIurl} from '../utils';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
function Show() {
  const navi = useNavigate();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [delitem,setdelitem] = useState('');

  const [cat, setcat] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRec , settotalRec] = useState('');
  const [searchope,setsearchope] = useState('');

  //data fetch
  const fetchData = () => {
    axios
      .get(`${APIurl}/get?pageNo=${pageNo}&search=${searchope}`)
      .then((res) => {
        setcat(res.data.data);
        setTotalPages(res.data.totalpage);
        settotalRec(res.data.totalRecoard);
      })
      .catch((err) => console.error("Fetch Error:", err));
  };

  //delete data
  const handleremove = (del) => {
    setPageNo(1);
    axios.delete(`${APIurl}/delete/${del}`)
    .then(() => {
      fetchData();
    });
  };

  useEffect(() => {
    const dely = setTimeout(()=>{
      fetchData();
    },500)
    return ()=>clearTimeout(dely)
  }, [pageNo,searchope]);


  const handletype = (event)=> {
    axios.get(`${APIurl}/product/${event}`)
      .then(res => setcat(res.data))
      .catch(err => console.log(err));
  }

  

  return (
   <>
    <Header/>
     <div className="container my-5">
       <div className="d-flex justify-content-end ">
        <div className="col-lg-4">
          <input type="search" className="form-control" id="inputEmail4" placeholder="Search here product ...." onChange={(e)=>{setsearchope(e.target.value)}}/>
        </div>
       </div>
      <h2 className="mt-3">Product Listing</h2>
      <div className="d-lg-flex justify-content-between align-items-center">
        <h6 className="mb-3">Total Product Listing : {totalRec} </h6>

        <div className="col-md-2 mb-3">
          <label htmlFor="inputState" className="form-label mb-1">Filter by type:</label>
          <select id="inputState" className="form-select rounded-0" onChange={(e)=>{handletype(e.target.value)}}>
            <option value="">All</option>
            <option value="Indoor">Indoor</option>
            <option value="Outdoor">Outdoor</option>
          </select>
        </div>


      </div>
        <div className=" overflow-auto">
          {
            cat.length > 0 ? <Table striped bordered hover>
          <thead>
            <tr>
              <th>Light type</th>
              <th>Category</th>
              <th>Sub-Category</th>
              <th>Image</th>
              <th>Name</th>
              <th>Model</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {
              cat?.map((item,i)=>{
                return(
                  <tr key={i}>
                    <td>{item.type}</td>
                    <td>{item.cat}</td>
                    <td>{item.scat}</td>
                    <td style={{width:'3%'}}><Image src={item.image} className='shadow rounded-3' fluid /></td>
                    <td>{item.lname}</td>
                    <td>{item.model}</td>
                    <td className="d-flex justify-content-around">
                      <span><button className="btn btn-success" onClick={()=>{localStorage.setItem('edititem',JSON.stringify(item)); navi('/home')}}>Edit</button></span>
                      <span><button className="btn btn-danger" onClick={()=>{handleShow(); setdelitem(item._id)}}>Delete</button></span>
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
          </Table> : <div className="text-center"><img src={require('../images/no found.jpg')} alt="" className="img-fluid" style={{height:'50vh'}} /> <p>No products available.</p></div>
          }

          <Pagination className="justify-content-end mt-4 flex-wrap ">
              <Pagination.Prev disabled={pageNo === 1} onClick={() => setPageNo(pageNo - 1)} />

              {pageNo > 2 && <Pagination.Item onClick={() => setPageNo(1)}>1</Pagination.Item>}
              {pageNo > 3 && <Pagination.Ellipsis disabled />}

              {[...Array(5)].map((_, i) => {
                const page = pageNo - 2 + i;
                if (page > 0 && page <= totalPages) {
                  return (
                    <Pagination.Item
                      key={page}
                      active={page === pageNo}
                      onClick={() => setPageNo(page)}
                    >
                      {page}
                    </Pagination.Item>
                  );
                }
                return null;
              })}

              {pageNo < totalPages - 2 && <Pagination.Ellipsis disabled />}
              {pageNo < totalPages - 1 && (
                <Pagination.Item onClick={() => setPageNo(totalPages)}>
                  {totalPages}
                </Pagination.Item>
              )}

              <Pagination.Next disabled={pageNo === totalPages} onClick={() => setPageNo(pageNo + 1)} />
          </Pagination>

        </div>

        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this ?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancle
          </Button>
          <Button variant="danger"  onClick={() => {handleremove(delitem); handleClose()}}>
            Yes, delete it
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
   </>
  );
}

export default Show;
