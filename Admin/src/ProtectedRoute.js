import React from 'react'
import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

function ProtectedRoute({setisAuthenticated}) {
    const navi = useNavigate()
    const location = useLocation()

    useEffect(()=>{
        if(sessionStorage.getItem('token')){
            setisAuthenticated(true);
            if(location.pathname==='/' ||
                location.pathname ==='/login'||
                location.pathname==='/regi'
            ){
                navi('/home',{replace:false})
            }
        }
    },[location,setisAuthenticated,navi])
  return (
   null
  )
}

export default ProtectedRoute