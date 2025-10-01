import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import { useState } from 'react'
import './App.css'
import Home from './Home.jsx';
import Nav from './nav.jsx';
import About from'./About.jsx';
import Contact from'./Contact.jsx';
import Services from'./Services.jsx';
import Doctors from'./Doctors.jsx';
import LoginForm from './Login.jsx';
import  Footer from './Footer.jsx';
import MyProfile from "./MyProfile.jsx";
import MyAppoinment from './MyAppoinment.jsx';
import Appionment from "./Appionment.jsx";
import { AppContentProvider } from './content/AppContent.jsx';
import { ToastContainer } from 'react-toastify';
import DoctorDetails from "./DoctorDetails.jsx";
import BookAppointment from "./BookAppointment.jsx";
function App() {
  const [count, setCount] = useState(0)

  return (
    <AppContentProvider>
      <ToastContainer />
    
      <Nav />
      <div className="h-40"></div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About/>}/>
        <Route path="/doctors" element={<Doctors/>}/>
        <Route path="/doctors/:speciality" element={<Doctors/>}/>
        <Route path="/Contact" element={<Contact/>}/>
        <Route path="/services" element={<Services/>}/>
        <Route path="/login" element={<LoginForm/>}/>
        <Route path="/my-profile" element={<MyProfile/>}/>
        <Route path="/my-appointment" element={<MyAppoinment/>}/>
        <Route path="/appointment/:doctorid" element={<MyAppoinment/>}/>
  <Route path="/doctorDetails/:id" element={<DoctorDetails/>}/>
  <Route path="/book/:id" element={<BookAppointment/>}/>
      </Routes>
      <Footer />
    
    </AppContentProvider>
  )
}

export default App
