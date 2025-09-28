import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import styles from "./Doctors.module.css";
import doctorsData from "./doctorsData";

// Import your doctor photos
import photo1 from "./assets/id 1.jpeg";
import photo2 from "./assets/id 2.jpg";
import photo3 from "./assets/id 3.jpeg";
import photo4 from "./assets/id 4.jpeg";

// Map filenames in doctorsData → actual imports
const photoMap = {
  "id 1.jpeg": photo1,
  "id 2.jpg": photo2,
  "id 3.jpeg": photo3,
  "id 4.jpeg": photo4,
};

// Replace photo string in data with actual imported image
const featuredDoctors = doctorsData.map((doc) => ({
  ...doc,
  photo: photoMap[doc.photo] || doc.photo,
}));

const Doctors = () => {
  return (
    <Fragment>
      <div className={styles.container}>
        {/* Header */}
        <header className={`${styles.header} ${styles.fadeInDown}`}>
          <h1 className={styles.headerTitle}>Our Doctors</h1>
          <p className={styles.headerSubtitle}>
            Our doctors are friendly and skilled.
          </p>
        </header>
      </div>

      {/* Doctors Grid */}
      <section className={styles.featuredDoctorsSection}>
        <div className={styles.featuredContainer}>
          <div className={styles.doctorsGrid}>
            {featuredDoctors.map((doctor) => (
              <Link
                to={`/doctorDetails/${doctor.id}`}
                key={doctor.id}
                className={styles.doctorCard}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <img
                  src={doctor.photo}
                  alt={doctor.name}
                  className={styles.doctorPhoto}
                />
                <h3 className={styles.doctorName}>{doctor.name}</h3>
                <p className={styles.doctorSpecialty}>{doctor.specialty}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default Doctors;
