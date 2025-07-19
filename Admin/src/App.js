import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Home from "./components/Home";
import Show from "./components/Show";
import Regi from "./components/Regi";
import Login from "./components/Login";
import { Navigate, Route, Routes } from "react-router-dom";
import { useState } from "react";
import ProtectedRoute from "./ProtectedRoute";
import Forgot from "./components/Forgot";

function App() {
  const [isAuthenticated,setisAuthenticated] = useState(false)

  const PrivateRoute = ({element})=>{
    return isAuthenticated ? element : <Navigate  to='/login' />
  }
  return (
    <div className="App">
      <ProtectedRoute setisAuthenticated={setisAuthenticated}/>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/home" element={<PrivateRoute element={<Home/>}/>} />
        <Route path="/show" element={<PrivateRoute element={<Show />}/>} />
        <Route path="/regi" element={<Regi />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot" element={<Forgot />} />
      </Routes>
    </div>
  );
}

export default App;
