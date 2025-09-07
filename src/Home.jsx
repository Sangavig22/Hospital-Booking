import React, { useEffect, useState } from 'react';
import Background from './assets/Background.jpg';
import styles from './Home.module.css';

function Home() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animations on component mount
    setIsVisible(true);
    
    // Add intersection observer for scroll animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, observerOptions);

    // Observe all animated sections
    const animatedElements = document.querySelectorAll(`.${styles.statCard}, .${styles.doctorCard}, .${styles.featureCard}`);
    animatedElements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const handleBookingClick = () => {
    // Add your booking logic here
    console.log('Booking appointment...');
  };

  const handleEmergencyCall = () => {
    // Add emergency call logic here
    console.log('Calling emergency number...');
  };

  const featuredDoctors = [
    {
      id: 1,
      name: "Dr. Samantha Perera",
      specialty: "General Medicine",
      hospital: "National Hospital Colombo",
      experience: "15 years experience",
      availability: "Today 2:00 PM",
      isAvailable: true
    },
    {
      id: 2,
      name: "Dr. Rajesh Jayawardene",
      specialty: "Dermatology",
      hospital: "Nawaloka Hospital",
      experience: "10 years experience",
      availability: "Today 4:00 PM",
      isAvailable: true
    },
    {
      id: 3,
      name: "Dr. Priya Fernando",
      specialty: "Pediatrics",
      hospital: "Asiri Hospital Kandy",
      experience: "12 years experience",
      availability: "Tomorrow 11:00 AM",
      isAvailable: false
    },
    {
      id: 4,
      name: "Dr. Rohan Silva",
      specialty: "Cardiology",
      hospital: "Lanka Hospital Colombo",
      experience: "18 years experience",
      availability: "Tomorrow 9:00 AM",
      isAvailable: true
    },
    {
      id: 5,
      name: "Dr. Nuwan Gunawardena",
      specialty: "Orthopedics",
      hospital: "Durdans Hospital",
      experience: "14 years experience",
      availability: "Today 5:30 PM",
      isAvailable: true
    },
    {
      id: 6,
      name: "Dr. Kavitha Mendis",
      specialty: "Gynecology",
      hospital: "Apollo Hospital",
      experience: "16 years experience",
      availability: "Tomorrow 2:00 PM",
      isAvailable: true
    }
  ];

  const statistics = [
    {
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      ),
      number: "100+",
      label: "Doctors Available"
    },
    {
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      ),
      number: "500+",
      label: "Appointments Booked"
    },
    {
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
      ),
      number: "98%",
      label: "Patient Satisfaction"
    }
  ];

  const features = [
    {
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      ),
      title: "Real-time Availability",
      description: "See live doctor schedules and book instantly with real-time updates."
    },
    {
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      ),
      title: "Secure & Private",
      description: "Your medical data is encrypted and protected with bank-level security."
    },
    {
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      ),
      title: "Expert Doctors",
      description: "50+ certified and experienced doctors across all specialties in Sri Lanka."
    },
    {
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      ),
      title: "24/7 Support",
      description: "Emergency support and assistance available round the clock, every day."
    }
  ];

  return (
    <div className={styles.homeContainer}>
      {/* Main Section */}
      <main className={styles.mainSection}>
        {/* Left Content */}
        <div className={styles.leftContent}>
          <h1 className={styles.title}>
            Smart Healthcare<br />
            
              Appointments
           
          </h1>
          <p className={styles.description}>
            Book doctor appointments instantly with real-time availability across Sri Lanka. 
            Connect with certified healthcare professionals in minutes.
          </p>
          <div className={styles.buttonContainer}>
            <button className={styles.primaryButton} onClick={handleBookingClick}>
              <svg className={styles.buttonIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>Book Your Appointment</span>
            </button>
            <button className={styles.secondaryButton} onClick={handleEmergencyCall}>
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
            alt="Healthcare professionals providing quality medical care"
            className={styles.doctorImage}
            loading="lazy"
            onError={(e) => {
              e.target.style.display = 'none';
              console.error('Image failed to load:', e.target.src);
            }}
          />
        </div>
      </main>

      {/* Statistics Section */}
      <section className={styles.statisticsSection}>
        <div className={styles.statisticsContainer}>
          {statistics.map((stat, index) => (
            <div key={index} className={styles.statCard}>
              <div className={styles.statIcon}>
                <svg className={styles.statSvgIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {stat.icon}
                </svg>
              </div>
              <h3 className={styles.statNumber}>{stat.number}</h3>
              <p className={styles.statLabel}>{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Doctors Section */}
      <section className={styles.featuredDoctorsSection}>
        <div className={styles.featuredContainer}>
          <div className={styles.featuredHeader}>
            <h2 className={styles.featuredTitle}>Featured Doctors</h2>
            <p className={styles.featuredSubtitle}>
              Top-rated doctors available for immediate consultation and appointment booking.
            </p>
          </div>
          <div className={styles.doctorsGrid}>
            {featuredDoctors.map((doctor, index) => (
              <div key={doctor.id} className={styles.doctorCard}>
                <div className={styles.doctorHeader}>
                  <div className={styles.doctorAvatar}>
                    <svg className={styles.avatarIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div className={styles.doctorInfo}>
                    <h3 className={styles.doctorName}>{doctor.name}</h3>
                    <p className={styles.doctorSpecialty}>{doctor.specialty}</p>
                  </div>
                </div>
                <p className={styles.doctorHospital}>{doctor.hospital}</p>
                <p className={styles.doctorExperience}>{doctor.experience}</p>
                <p className={styles.doctorAvailability}>Next available: {doctor.availability}</p>
                <button 
                  className={styles.bookNowButton}
                  onClick={() => console.log(`Booking with ${doctor.name}`)}
                >
                  <svg className={styles.bookIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>Book Now</span>
                </button>
                <div className={`${styles.availabilityDot} ${doctor.isAvailable ? styles.available : styles.unavailable}`}></div>
              </div>
            ))}
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
            {features.map((feature, index) => (
              <div key={index} className={styles.featureCard}>
                <div className={styles.featureIcon}>
                  <svg className={styles.featureSvgIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {feature.icon}
                  </svg>
                </div>
                <h3 className={styles.featureTitle}>{feature.title}</h3>
                <p className={styles.featureDescription}>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;