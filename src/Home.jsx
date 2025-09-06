import Background from './assets/Background.jpg';
import styles from './Home.module.css';

function Home() {
  return (
    <div className={styles.homeContainer}>
      {/* Main Section */}
      <main className={styles.mainSection}>
        {/* Left Content */}
        <div className={styles.leftContent}>
          <h1 className={styles.title}>
            Smart Healthcare<br />Appointments
          </h1>
          <p className={styles.description}>
            Book doctor appointments instantly<br />
            with real-time availability across Sri Lanka
          </p>
          <div className={styles.buttonContainer}>
            <button className={styles.primaryButton}>
              <svg className={styles.buttonIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>Book Your Appointment</span>
            </button>
            <button className={styles.secondaryButton}>
              <svg className={styles.buttonIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span>Emergency 1990</span>
            </button>
          </div>
        </div>
        {/* Right Image */}
        <div className={styles.rightImage}>
          <img
            src={Background}
            alt="Doctors"
            className={styles.doctorImage}
          />
        </div>
      </main>

      {/* Statistics Section */}
      <section className={styles.statisticsSection}>
        <div className={styles.statisticsContainer}>
          <div className={styles.statCard}>
            <div className={styles.statIcon}>
              <svg className={styles.statSvgIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className={styles.statNumber}>50+</h3>
            <p className={styles.statLabel}>Doctors Available</p>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statIcon}>
              <svg className={styles.statSvgIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className={styles.statNumber}>1K+</h3>
            <p className={styles.statLabel}>Appointments Booked</p>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statIcon}>
              <svg className={styles.statSvgIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
            </div>
            <h3 className={styles.statNumber}>98%</h3>
            <p className={styles.statLabel}>Patient Satisfaction</p>
          </div>
        </div>
      </section>

      {/* Featured Doctors Section */}
      <section className={styles.featuredDoctorsSection}>
        <div className={styles.featuredContainer}>
          <div className={styles.featuredHeader}>
            <h2 className={styles.featuredTitle}>Featured Doctors</h2>
            <p className={styles.featuredSubtitle}>Top-rated doctors available for immediate consultation.</p>
          </div>
          <div className={styles.doctorsGrid}>
            {/* Dr. Samantha Perera */}
            <div className={styles.doctorCard}>
              <div className={styles.doctorHeader}>
                <div className={styles.doctorAvatar}>
                  <svg className={styles.avatarIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div className={styles.doctorInfo}>
                  <h3 className={styles.doctorName}>Dr. Samantha Perera</h3>
                  <p className={styles.doctorSpecialty}>General Medicine</p>
                </div>
              </div>
              <p className={styles.doctorHospital}>National Hospital Colombo</p>
              <p className={styles.doctorExperience}>15 years experience</p>
              <p className={styles.doctorAvailability}>Next available: Today 2:00 PM</p>
              <button className={styles.bookNowButton}>
                <svg className={styles.bookIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>Book Now</span>
              </button>
              <div className={styles.availabilityDot + ' ' + styles.available}></div>
            </div>

            {/* Dr. Jayawardene */}
            <div className={styles.doctorCard}>
              <div className={styles.doctorHeader}>
                <div className={styles.doctorAvatar}>
                  <svg className={styles.avatarIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div className={styles.doctorInfo}>
                  <h3 className={styles.doctorName}>Dr. Jayawardene</h3>
                  <p className={styles.doctorSpecialty}>Dermatology</p>
                </div>
              </div>
              <p className={styles.doctorHospital}>Nawaloka Hospital</p>
              <p className={styles.doctorExperience}>10 years experience</p>
              <p className={styles.doctorAvailability}>Next available: Today 4:00 PM</p>
              <button className={styles.bookNowButton}>
                <svg className={styles.bookIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>Book Now</span>
              </button>
              <div className={styles.availabilityDot + ' ' + styles.available}></div>
            </div>

            {/* Dr. Priya Fernando */}
            <div className={styles.doctorCard}>
              <div className={styles.doctorHeader}>
                <div className={styles.doctorAvatar}>
                  <svg className={styles.avatarIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div className={styles.doctorInfo}>
                  <h3 className={styles.doctorName}>Dr. Priya Fernando</h3>
                  <p className={styles.doctorSpecialty}>Pediatrics</p>
                </div>
              </div>
              <p className={styles.doctorHospital}>Asiri Hospital Kandy</p>
              <p className={styles.doctorExperience}>12 years experience</p>
              <p className={styles.doctorAvailability}>Next available: Tomorrow 11:00 PM</p>
              <button className={styles.bookNowButton}>
                <svg className={styles.bookIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>Book Now</span>
              </button>
              <div className={styles.availabilityDot + ' ' + styles.unavailable}></div>
            </div>
            
            {/* Dr. Jayawardene */}
            <div className={styles.doctorCard}>
              <div className={styles.doctorHeader}>
                <div className={styles.doctorAvatar}>
                  <svg className={styles.avatarIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div className={styles.doctorInfo}>
                  <h3 className={styles.doctorName}>Dr. Jayawardene</h3>
                  <p className={styles.doctorSpecialty}>Dermatology</p>
                </div>
              </div>
              <p className={styles.doctorHospital}>Nawaloka Hospital</p>
              <p className={styles.doctorExperience}>10 years experience</p>
              <p className={styles.doctorAvailability}>Next available: Today 4:00 PM</p>
              <button className={styles.bookNowButton}>
                <svg className={styles.bookIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>Book Now</span>
              </button>
              <div className={styles.availabilityDot + ' ' + styles.available}></div>
            </div>

            
 {/* Dr. Jayawardene */}
            <div className={styles.doctorCard}>
              <div className={styles.doctorHeader}>
                <div className={styles.doctorAvatar}>
                  <svg className={styles.avatarIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div className={styles.doctorInfo}>
                  <h3 className={styles.doctorName}>Dr. Jayawardene</h3>
                  <p className={styles.doctorSpecialty}>Dermatology</p>
                </div>
              </div>
              <p className={styles.doctorHospital}>Nawaloka Hospital</p>
              <p className={styles.doctorExperience}>10 years experience</p>
              <p className={styles.doctorAvailability}>Next available: Today 4:00 PM</p>
              <button className={styles.bookNowButton}>
                <svg className={styles.bookIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>Book Now</span>
              </button>
              <div className={styles.availabilityDot + ' ' + styles.available}></div>
            </div>



            {/* Dr. Rohan Silva */}
            <div className={styles.doctorCard}>
              <div className={styles.doctorHeader}>
                <div className={styles.doctorAvatar}>
                  <svg className={styles.avatarIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div className={styles.doctorInfo}>
                  <h3 className={styles.doctorName}>Dr. Rohan Silva</h3>
                  <p className={styles.doctorSpecialty}>Cardiology</p>
                </div>
              </div>
              <p className={styles.doctorHospital}>Lanka Hospital Colombo</p>
              <p className={styles.doctorExperience}>12 years experience</p>
              <p className={styles.doctorAvailability}>Next available: Tomorrow 9:00 AM</p>
              <button className={styles.bookNowButton}>
                <svg className={styles.bookIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>Book Now</span>
              </button>
              <div className={styles.availabilityDot + ' ' + styles.available}></div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose HealthSync Section */}
      <section className={styles.whyChooseSection}>
        <div className={styles.whyChooseContainer}>
          <div className={styles.whyChooseHeader}>
            <h2 className={styles.whyChooseTitle}>Why Choose HealthSync</h2>
          </div>
          <div className={styles.featuresGrid}>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <svg className={styles.featureSvgIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className={styles.featureTitle}>Real-time Availability</h3>
              <p className={styles.featureDescription}>See live doctor schedules and book instantly.</p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <svg className={styles.featureSvgIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className={styles.featureTitle}>Secure & Private</h3>
              <p className={styles.featureDescription}>Your medical data is encrypted and protected.</p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <svg className={styles.featureSvgIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className={styles.featureTitle}>Expert Doctors</h3>
              <p className={styles.featureDescription}>50+ certified doctors across Sri Lanka.</p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <svg className={styles.featureSvgIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className={styles.featureTitle}>24/7 Support</h3>
              <p className={styles.featureDescription}>Emergency support available round the clock.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;