import {BrowserRouter as Router,Routes,Route, Navigate, useLocation} from "react-router-dom";
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
import Appointments from './Appointments.jsx';
import { useAuth } from './AuthContext.jsx';

function RequireAuth({ children }) {
  const { user } = useAuth();
  const location = useLocation();
  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  return children;
}
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
        <Route path="/my-profile" element={<RequireAuth><MyProfile/></RequireAuth>}/>
        <Route path="/my-appointment" element={<RequireAuth><MyAppoinment/></RequireAuth>}/>
        <Route path="/appointments" element={<RequireAuth><Appointments/></RequireAuth>}/>
        <Route path="/appointment/:doctorid" element={<RequireAuth><MyAppoinment/></RequireAuth>}/>
  <Route path="/doctorDetails/:id" element={<DoctorDetails/>}/>
  <Route path="/book/:id" element={<RequireAuth><BookAppointment/></RequireAuth>}/>
      </Routes>
      <Footer />
    
    </AppContentProvider>
  )
}

export default App
