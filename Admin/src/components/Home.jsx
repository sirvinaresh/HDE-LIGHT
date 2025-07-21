import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import { useFormik } from 'formik';
import axios from 'axios';
import Header from './Header';
import toast, { Toaster } from 'react-hot-toast';
import * as Yup from 'yup'
import { RxCross2 } from "react-icons/rx";
import { useNavigate } from 'react-router-dom';
import {APIurl} from '../utils';

let vali = Yup.object({
    type:Yup.string().required('type must be required...'),
    cat:Yup.string().required('category must be required...')
})

function Home() {
    
    const navi = useNavigate();

    // all input fileds
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

    const [category,setcategory] = useState([])
    const [subcategory,setsubcategory] = useState([])

    //category
    const indoorCategories = [
    "LED TUBE LIGHT",
    "PANEL LIGHTS",
    "ARCHITECHURAL LIGHTS",
    "PROFILE & STRIP LIGHTS",
    "CUSTOMIZED PROFILE LIGHTS",
    "INDUSTRIAL LIGHTS"
  ];

  const outdoorCategories = [
   "WALL LIGHT", 
   "ANTIQUE WALL LIGHT", 
   "HIGHLIGHTER LIGHTS", 
   "GATE LIGHTS", "BOLLARD LIGHTS", 
   "ANTIQUE POLE LIGHTS", 
   "MODERN POLE LIGHTS", 
   "POST TOP LIGHTS", 
   "OUR SATISFIED CUSTOMERS"
  ];


  //sub-category
  const pannel = [
    "RECESSED PANEL LIGHT",
    "SURFACE PANEL LIGHT"
  ]

  const ARCHITECHURAL = [
    "SPOT LIGHT",
    "ARCHITECTURAL SPOT LIGHT",
    "LINEA LASER LIGHT",
    "CYLINDER SPOT LIGHT",
    "TRACK SPOT LIGHT",
    "IP65 COB’S & IP65 CYLINDER LIGHT",
    "WALL WASHER LIGHTS"
  ]

  const PROFILE = [
    "STRIP LIGHT & POWER SUPPLY",
    "ALUMINUM PROFILE",
    "NEON FLEXIBLE PROFILE",
    "MAGNETIC PROFILE LIGHT"
  ]

  const INDUSTRIAL = [
    "LITE STREET LIGHT",
    "STREET LIGHT",
    "LITE FLOOD LIGHT",
    "DC FLOOD LIGHT",
    "BC FLOOD LIGHT",
    "LITE HIGH-BAY LIGHT",
    "HIGH-BAY LIGHT"
  ]
  
  const handlechange = (event)=>{
    if(event.target.value === 'Indoor'){
        setcategory(indoorCategories)
        setsubcategory([])
    }
    else{
        setcategory(outdoorCategories)
        setsubcategory([])
    }
    // console.log(category)
  }

  const handlesubcat = (event) =>{
    if(event.target.value === 'PANEL LIGHTS'){
        setsubcategory(pannel)
    }
    else if(event.target.value === 'ARCHITECHURAL LIGHTS'){
        setsubcategory(ARCHITECHURAL)
    }
    else if(event.target.value === 'PROFILE & STRIP LIGHTS'){
        setsubcategory(PROFILE)
    }
    else if(event.target.value === 'INDUSTRIAL LIGHTS'){
        setsubcategory(INDUSTRIAL)
    }
  }

  
    // image file store
    const [file, setFile] = useState(null);
        function handleChanges(e) {
        setFile(e.target.files[0]); // Actual file
    }
 
  let init = {
    type:'',
    cat:'',
    scat:'',
    lname:'',
    model:'',
    width:'',
    height:'',
    dimension:'',
    cct:'',
    watt:'',
    lumens:'',
    pfactor:'',
    ip:'',
    cout:'',
    wvolt:'',
    clayer:'',
    bcolor:'',
    colour:'',
    body:'',
    pdemsion:'',
    size:'',
    holder:'',
    material:'',
    dmeter:'',
    pdmeter:''
  }

  const {errors,touched,values,handleBlur,handleChange,handleSubmit,resetForm,setValues} = useFormik({
    initialValues:init,
    validationSchema:vali,
    onSubmit: async (values)=>{
         const formData = new FormData();

            for (let key in values) {
                if(values[key]!==''){ // if value not-empty send data
                    formData.append(key, values[key]);
                }
            }

            if (file) {
                formData.append("image", file); // key should match multer
            }

        try {

            if(values._id){
                var res = await axios.post(`${APIurl}/update/${values._id}`,formData);
                toast.success('Product Updated');
                setTimeout(()=>{
                    sessionStorage.removeItem('edititem')
                    navi('/show');
                    resetForm();
                    setFile(null)
                },1000)
            }
            else{
                var res = await  axios.post(`${APIurl}/`,formData)
                toast.success('Product Added')
                resetForm();
                setFile(null)
            }
            

        } catch (error) {
            console.error("Upload failed:", error.response?.data || error.message);
        }
    }
  })

  const [username,setusername] = useState('');

  useEffect(()=>{
    const editdata= JSON.parse(sessionStorage.getItem('edititem'))

    if(editdata){
        setValues(editdata)
        handlechange({ target: { value: editdata.type } }); // set category dropdown
        handlesubcat({ target: { value: editdata.cat } });
    }
    setusername(sessionStorage.getItem('name'));
  },[])
 
  return (
    <>  
        <Header/>
        <Container className='my-5'>
            <h1>{username}</h1> 

            <form className="row g-3 my-3  p-4 rounded-4 shadow" onSubmit={handleSubmit}>

                    {/* type */}
                    <div className="col-md-4">
                        <label htmlFor="inputState11" className="form-label">Light Type <span className='text-danger'>*</span></label>
                        <select id="inputState11" className="form-select" onChange={(event)=>{handlechange(event); handleChange(event)}} name="type" value={values.type}  onBlur={handleBlur} >
                        <option value="">Choose...</option>
                        <option value="Indoor">Indoor</option>
                        <option value="Outdoor">Outdoor</option>
                        </select>
                        {(touched.type && errors.type) ? <small className='text-danger'>{errors.type}</small> : null}
                    </div>

                    {/* category */}
                    <div className="col-md-4">
                        <label htmlFor="inputState12" className="form-label">Category <span className='text-danger'>*</span></label>
                        <select id="inputState12" className="form-select" onChange={(event)=>{handlesubcat(event); handleChange(event)}} name="cat" value={values.cat}  onBlur={handleBlur}>
                        <option value="">Choose...</option>
                        {category.map((cal,i)=>{
                            return(
                                <option key={i} value={cal}>{cal}</option>
                            )
                        })}
                        </select>
                        {(touched.cat && errors.cat) ? <small className='text-danger'>{errors.cat}</small> : null}
                    </div>

                    {/* sub-category */}
                    <div className="col-md-4">
                        <label htmlFor="inputState13" className="form-label">Sub-Category</label>
                        <select id="inputState13" className="form-select" onChange={handleChange} name="scat" value={values.scat}  onBlur={handleBlur}>
                        <option value="">Choose...</option>
                        {subcategory.map((cal,i)=>{
                            return(
                                <option key={i} value={cal}>{cal}</option>
                            )
                        })}
                        </select>
                    </div>
                    
                    {/* all fileds */}
                    {
                        inputfiled.map((val,i)=>{
                            return(
                                <div className="col-md-3" key={i}>
                                    <label htmlFor={i} className="form-label">{val.dis}</label>
                                    <input type="text" className="form-control" id={i} onChange={handleChange} name={val.name} value={values[val.name]}  onBlur={handleBlur} />
                                </div>
                            )
                        })
                    }

                        {/* image upload */}
                        <div className='col-md-12'>
                            <RxCross2 className='text-danger fs-4 me-2' onClick={()=>{setFile(null)}}/>
                            <input type="file" onChange={handleChanges} /> 
                            <br /> <br />
                            {file && <img src={URL.createObjectURL(file)} alt="preview" className='w-25' />}            
                        </div>

                {/* add , update , reset button */}
                <div className="col-md-12">
                    <button type="submit" className="btn btn-success">{values._id ? 'Update' : 'Add'}</button>
                    <button type='button' className='btn btn-danger ms-5' onClick={()=>{resetForm(); sessionStorage.removeItem('edititem'); setFile(null)}}>Reset</button>
                </div>
            </form>
        </Container>
              
        <Toaster
        position="top-center"
        reverseOrder={false}
        />

    </>
  )
}

export default Home