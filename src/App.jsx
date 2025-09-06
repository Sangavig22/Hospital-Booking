import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import { useState } from 'react'
import './App.css'
import Home from './Home.jsx';
import Nav from './nav.jsx';
import About from'./About.jsx';
import Contact from'./Contact.jsx';
import Services from'./Services.jsx';
import LoginForm from './Login.jsx';
import  Footer from './Footer.jsx';
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Router>
      <Nav />
      <div className="h-40"></div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About/>}/>
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/services" element={<Services/>}/>
        <Route path="/login" element={<LoginForm/>}/>
      </Routes>
      <Footer />
    </Router>
    </>
  )
}

export default App
