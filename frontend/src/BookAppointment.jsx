import React from "react";
import { useContext,useState } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import doctorDetails from "./DoctorDetail";
import styles from './BookAppionement.module.css';
import axios from 'axios';
import {toast} from 'react-toastify';
import {AppContent} from "./content/AppContent";



import photo1 from './assets/id 1.jpeg';
import photo2 from './assets/id 2.jpg';
import photo3 from './assets/id 3.jpeg';
import photo4 from './assets/id 4.jpeg';
const photoMap = {
  'id 1.jpeg': photo1,
  'id 2.jpg': photo2,
  'id 3.jpeg': photo3,
  'id 4.jpeg': photo4,
};

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const BookAppointment = () => {
  const { id } = useParams();
  const query = useQuery();
  const doctor = doctorDetails.find((doc) => doc.id.toString() === id);
  const date = query.get("date");
  const time = query.get("time");

const { backendUrl } = useContext(AppContent);
  const [form, setForm] = React.useState({
    fullName: '',
    age: '',
    contactNo: '',
    address: ''
  });
  const [submitted, setSubmitted] = React.useState(false);


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(
        backendUrl + '/api/auth/booking',
        {
          fullName: form.fullName,
          age: form.age,
          contactNo: form.contactNo,
          address: form.address,
          doctorId: doctor.id,
          doctorName: doctor.name,
          date: date,
          time: time
        }
      );
      if (data.success) {
        toast.success(data.message);
        setSubmitted(true);
        setForm({fullName:'',age:'',contactNo:'',address:''})
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message || "Something went wrong");
    }
  };

  return (
    <div className={styles.detailContainer}>
      <div className={styles.doctorCard}>
        <img
          src={photoMap[doctor.photo]}
          alt={doctor.name}
          className={styles.doctorPhoto}
        />
        <div className={styles.doctorDetails}>
          <div className={styles.doctorName}>{doctor.name}</div>
          <div className={styles.doctorMeta}>{doctor.qualification} &bull; {doctor.specialty} &bull; {doctor.experience} Years</div>
          <div className={styles.appointmentHeader}>Your Appointment Details</div>
          <div className={styles.appointmentInfo}>
            <span><b>Date:</b> {date}</span>
            <span><b>Time:</b> {time}</span>
          </div>
        </div>
      </div>
  
  <form className={styles.appointmentForm} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
        <div className={styles.formHeader}>Enter your details</div>
          <label>Full Name</label>
          <input type="text" name="fullName" value={form.fullName} onChange={handleChange} required placeholder="Enter your full name" />
        </div>
        <div className={styles.formGroup}>
          <label>Age</label>
          <input type="number" name="age" value={form.age} onChange={handleChange} required min="0" placeholder="Enter your age" />
        </div>
        <div className={styles.formGroup}>
          <label>Contact Number</label>
          <input type="tel" name="contactNo" value={form.contactNo} onChange={handleChange} required pattern="[0-9]{10,}" placeholder="Enter your contact number" />
        </div>
        <div className={styles.formGroup}>
          <label>Address</label>
          <textarea name="address" value={form.address} onChange={handleChange} required rows={2} placeholder="Enter your address" />
        </div>
        <button type="submit" className={styles.bookButton} style={{marginTop: 10}}>Confirm Appointment</button>
      </form>
      {submitted && (
        <div className={styles.confirmMsg}>
          <b>Appointment submitted!</b> We will contact you soon.
        </div>
      )}
      <Link to="/doctors" className={styles.backButton} style={{marginLeft: 16}}>← Back to Doctors</Link>
    </div>
  );
};

export default BookAppointment;
