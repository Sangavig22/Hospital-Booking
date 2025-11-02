import doctorDetails from "./DoctorDetail"; 
import { useParams, Link, useNavigate, useLocation } from "react-router-dom"; 
import { useState } from "react";
import styles from './DoctorDetail.module.css'; 
import { useAuth } from './AuthContext.jsx';
import photo1 from './assets/id 1.jpeg'; 
import photo2 from './assets/id 2.jpg'; 
import photo3 from './assets/id 3.jpg'; 
import photo4 from './assets/id 4.jpeg'; 
import photo5 from './assets/id 5.jpg'; 
import photo6 from './assets/id 6.jpg'; 
import photo7 from './assets/id 7.jpg'; 

 import photo9 from './assets/id 9.jpg';
import photo10 from './assets/id 10.jpg'; 
import photo11 from './assets/id 11.jpg';                   
import photo12 from './assets/id 12.jpg'; 
import photo14 from './assets/id 14.jpg';
import photo15 from './assets/id 15.jpeg';





                            
const photoMap = {
  'id 1.jpeg': photo1,
  'id 2.jpg': photo2,
  'id 3.jpg': photo3,
  'id 4.jpeg': photo4,
  'id 5.jpg': photo5,
  'id 6.jpg': photo6,
  'id 7.jpg': photo7,
 
  'id 9.jpg': photo9,
  'id 10.jpg': photo10,
  'id 11.jpg': photo11,
  'id 12.jpg': photo12,
  'id 14.jpg': photo14,
  'id 15.jpeg': photo15,
};

const DoctorDetails = () => {
  const { id } = useParams();
  const doctor = doctorDetails.find((doc) => doc.id.toString() === id);
  const [selectedDate, setSelectedDate] = useState(
    doctor && doctor.bookingDates ? Object.keys(doctor.bookingDates)[0] : null
  );
  const [selectedSlot, setSelectedSlot] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const rescheduleId = query.get('rescheduleId');
  const { user } = useAuth();

  const dateKeys = doctor.bookingDates ? Object.keys(doctor.bookingDates) : [];
  const slots = selectedDate && doctor.bookingDates ? doctor.bookingDates[selectedDate] : [];
  return (
    <div className={styles.detailContainer}>
      <div className={styles.profileSection}>
        <img src={photoMap[doctor.photo]} alt={doctor.name} className={styles.doctorPhoto} />
        <div className={styles.infoSection}>
          <h2 className={styles.doctorName}>{doctor.name}</h2>
          <div className={styles.meta}>
            <span>{doctor.qualification}</span> &bull; <span>{doctor.specialty}</span> &bull; <span>{doctor.experience} Years</span>
          </div>
          <div className={styles.aboutSection}>
            <strong>About</strong>
            <p>{doctor.about}</p>
            <div className={styles.fee}>Appointment fee: <b>${doctor.appointmentFee}</b></div>
          </div>
        </div>
      </div>
      <div className={styles.bookingSection}>
        <div className={styles.bookingHeader}>Booking slots</div>
        {!selectedSlot && (
          <div className={styles.selectHint}>
            <span className={styles.hintArrow}>➤</span>
            <span className={styles.hintText}>Select a time slot to enable booking</span>
          </div>
        )}
        <div className={styles.datesRow}>
          {dateKeys.map((date) => (
            <button
              key={date}
              className={selectedDate === date ? styles.selectedDateButton : styles.dateButton}
              onClick={() => {
                setSelectedDate(date);
                setSelectedSlot(null); // reset slot when date changes
              }}
            >
              {date}
            </button>
          ))}
        </div>
        <div className={styles.slotsRow}>
          {slots && slots.length > 0 ? (
            slots.map((slot, idx) => (
              <button
                key={idx}
                className={
                  selectedSlot === slot
                    ? `${styles.slotButton} ${styles.selected}`
                    : styles.slotButton
                }
                onClick={() => setSelectedSlot(slot)}
              >
                {slot}
              </button>
            ))
          ) : (
            <span className={styles.noSlots}>No slots available</span>
          )}
        </div>
        {selectedSlot && (
            <button
              className={styles.bookButton}
              onClick={() => {
                const base = `/book/${doctor.id}?date=${encodeURIComponent(selectedDate)}&time=${encodeURIComponent(selectedSlot)}`;
                const target = rescheduleId ? `${base}&rescheduleId=${encodeURIComponent(rescheduleId)}` : base;
                if (!user) {
                  navigate('/login', { state: { from: location } });
                } else {
                  navigate(target);
                }
              }}
            >
              Book Appointment
            </button>
        )}
          <Link to="/doctors" className={styles.backButton}>← Back to Doctors</Link>
      </div>
    </div>
  );
};

export default DoctorDetails;