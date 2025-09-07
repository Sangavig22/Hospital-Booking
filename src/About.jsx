
import React, { useEffect, useState, useRef } from "react";
import styles from "./about.module.css";

const AboutHealthSync = () => {
  const [patients, setPatients] = useState(0);
  const [providers, setProviders] = useState(0);
  const [doctors, setDoctors] = useState(0);
  const [treatments, setTreatments] = useState(0);

  const statsRef = useRef(null);
  const [animated, setAnimated] = useState(false);

  // Animate numbers (count up)
  const animateValue = (setter, end, duration) => {
    let start = 0;
    const interval = 20;
    const increment = Math.max(end / (duration / interval), 1);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setter(end);
        clearInterval(timer);
      } else {
        setter(Math.floor(start));
      }
    }, interval);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !animated) {
            animateValue(setPatients, 500, 2000);
            animateValue(setProviders, 1200, 2000);
            animateValue(setDoctors, 100, 2000);
            animateValue(setTreatments, 200000, 2000);
            setAnimated(true);
          }
        });
      },
      { threshold: 0.4 }
    );

    if (statsRef.current) observer.observe(statsRef.current);

    return () => {
      if (statsRef.current) observer.unobserve(statsRef.current);
    };
  }, [animated]);

  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={`${styles.header} ${styles.fadeInDown}`}>
        <h1 className={styles.headerTitle}>About HealthSync</h1>
        <p className={styles.headerSubtitle}>
          Revolutionizing Healthcare in Sri Lanka
        </p>
      </header>

      <main className={styles.main}>
        {/* Mission & Vision */}
        <section className={`${styles.missionVision} ${styles.fadeInUp}`}>
          <div className={styles.missionVisionCard}>
            <h2 className={styles.sectionTitle}>Our Mission</h2>
            <p className={styles.sectionDescription}>
              To make healthcare accessible to every Sri Lankan through
              innovative technology, compassionate care and quality education,
              ensuring excellence in service delivery.
            </p>
          </div>

          <div className={styles.missionVisionCard}>
            <h2 className={styles.sectionTitle}>Our Vision</h2>
            <p className={styles.sectionDescription}>
              A Sri Lanka where every individual has access to healthcare
              solutions regardless of location, financial or technological
              barriers.
            </p>
          </div>
        </section>

        {/* Values */}
        <section className={`${styles.valuesSection} ${styles.fadeInUp}`}>
          <h2 className={styles.valuesTitle}>Our Values</h2>
          <div className={styles.valuesGrid}>
            {/* Patient First */}
            <div className={styles.valueCard}>
              <div className={styles.valueIcon}>
                <svg
                  className={styles.svgIcon}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </div>
              <h3 className={styles.valueTitle}>Patient First</h3>
              <p className={styles.valueDescription}>
                Every decision we make prioritizes patient outcomes and
                experiences above all else.
              </p>
            </div>

            {/* Excellence */}
            <div className={styles.valueCard}>
              <div className={styles.valueIcon}>
                <svg
                  className={styles.svgIcon}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className={styles.valueTitle}>Excellence</h3>
              <p className={styles.valueDescription}>
                We strive for the highest standards in everything we do, from
                patient care to technological innovation.
              </p>
            </div>

            {/* Inclusivity */}
            <div className={styles.valueCard}>
              <div className={styles.valueIcon}>
                <svg
                  className={styles.svgIcon}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h3 className={styles.valueTitle}>Inclusivity</h3>
              <p className={styles.valueDescription}>
                Healthcare for all, bringing everyone into our health system
                without bias.
              </p>
            </div>

            {/* Sustainability */}
            <div className={styles.valueCard}>
              <div className={styles.valueIcon}>
                <svg
                  className={styles.svgIcon}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                  />
                </svg>
              </div>
              <h3 className={styles.valueTitle}>Sustainability</h3>
              <p className={styles.valueDescription}>
                Building durable solutions working forward by future
                generations.
              </p>
            </div>
          </div>
        </section>

        {/* Statistics */}
        <section
          className={`${styles.statisticsSection} ${styles.fadeInUp}`}
          ref={statsRef}
        >
          <div className={styles.statisticsGrid}>
            <div className={styles.statBox}>
              <div className={styles.statNumber}>
                {patients.toLocaleString()}+
              </div>
              <div className={styles.statLabel}>Patients Served</div>
            </div>
            <div className={styles.statBox}>
              <div className={styles.statNumber}>
                {providers.toLocaleString()}+
              </div>
              <div className={styles.statLabel}>Health Providers</div>
            </div>
            <div className={styles.statBox}>
              <div className={styles.statNumber}>
                {doctors.toLocaleString()}+
              </div>
              <div className={styles.statLabel}>Doctors Available</div>
            </div>
            <div className={styles.statBox}>
              <div className={styles.statNumber}>
                {treatments.toLocaleString()}+
              </div>
              <div className={styles.statLabel}>Successful Treatments</div>
            </div>
          </div>
        </section>

        {/* Team */}
        <section className={`${styles.teamSection} ${styles.fadeInUp}`}>
          <div className={styles.teamCard}>
            <h2 className={styles.teamTitle}>Our Team</h2>
            <div className={styles.teamDescriptionWrapper}>
              <p className={styles.teamDescription}>
                We are a passionate team of healthcare professionals,
                technology experts, and community advocates who have come
                together with a shared vision to revolutionize healthcare in Sri
                Lanka. Our multidisciplinary approach combines clinical
                expertise with cutting-edge technology to deliver exceptional
                care and improve health outcomes for all Sri Lankans.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AboutHealthSync;
