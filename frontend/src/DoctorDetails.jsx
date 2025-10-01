import doctorDetails from "./DoctorDetail"; 
import { useParams, Link, useNavigate } from "react-router-dom"; 
import { useState } from "react";
import styles from './DoctorDetail.module.css'; 
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

const DoctorDetails = () => {
  const { id } = useParams();
  const doctor = doctorDetails.find((doc) => doc.id.toString() === id);
  const [selectedDate, setSelectedDate] = useState(
    doctor && doctor.bookingDates ? Object.keys(doctor.bookingDates)[0] : null
  );
  const [selectedSlot, setSelectedSlot] = useState(null);
  const navigate = useNavigate();

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
                navigate(`/book/${doctor.id}?date=${encodeURIComponent(selectedDate)}&time=${encodeURIComponent(selectedSlot)}`);
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