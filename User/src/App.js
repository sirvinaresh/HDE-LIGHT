import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Header from './components/Header';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Indoor from './components/Indoor';
import Contact from './components/Contact';
import About from './components/About';
import Details from './components/Details';
import Outdoor from './components/Outdoor';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/indoor' element={<Indoor/>}/>
        <Route path='/outdoor' element={<Outdoor/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/details/:id' element={<Details/>}/>
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
