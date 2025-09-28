import React, { useEffect, useState } from 'react';
import styles from './services.module.css';

const Services = () => {
  const [visibleCards, setVisibleCards] = useState([]);

  const services = [
    {
      icon: '📄',
      category: 'Digital Health',
      title: 'Electronic Health Records Integration',
      description: 'Streamlined clinical data sharing, EHR systems with advanced data standardization and web-view enabled.',
      features: [
        'Real-time synchronization',
        'Seamless data migration',
        'HIPAA compliant',
        'Multi-provider access',
        'Custom workflows'
      ],
      link: 'Learn More'
    },
    {
      icon: '👤',
      category: 'Healthcare',
      title: 'Patient Management System',
      description: 'Comprehensive patient care coordination with advanced scheduling, tracking, and care management tools.',
      features: [
        'Appointment scheduling',
        'Treatment tracking',
        'Patient portal',
        'Communication hub'
      ],
      link: 'Learn More'
    },
    {
      icon: '💊',
      category: 'Healthcare',
      title: 'Telemedicine Platform',
      description: 'Secure video consultations with integrated medical data and seamless workflow management.',
      features: [
        'HD video calls',
        'Prescription management',
        'Screen sharing',
        'Secure messaging'
      ],
      link: 'Learn More'
    },
    {
      icon: '📊',
      category: 'Digital Health',
      title: 'Healthcare Analytics & Reporting',
      description: 'Advanced analytics and business intelligence tools for data-driven healthcare decision making.',
      features: [
        'Real-time dashboards',
        'Custom reporting',
        'Predictive analytics',
        'Performance metrics'
      ],
      link: 'Learn More'
    },
    {
      icon: '☁️',
      category: 'Healthcare',
      title: 'Cloud Infrastructure & Security',
      description: 'Secure cloud-based solutions with enterprise-grade security and compliance management.',
      features: [
        'Cloud migration',
        'Data encryption',
        'Backup solutions',
        'SOC monitoring'
      ],
      link: 'Learn More'
    },
    {
      icon: '⚖️',
      category: 'Healthcare',
      title: 'Compliance & Risk Management',
      description: 'Comprehensive compliance solutions ensuring regulatory adherence and risk mitigation.',
      features: [
        'HIPAA compliance',
        'Risk assessment',
        'Audit management',
        'Policy management'
      ],
      link: 'Learn More'
    }
  ];

  // Animate service cards on load
  useEffect(() => {
    services.forEach((_, i) => {
      setTimeout(() => {
        setVisibleCards(prev => [...prev, i]);
      }, i * 150);
    });
  }, []);

  return (
    <div className={styles.servicesContainer}>
      {/* Header */}
      <header className={`${styles.header} ${styles.fadeDown}`}>
        <div className={styles.headerContent}>
          <h1>Healthcare Technology Services</h1>
          <p>Comprehensive healthcare technology solutions designed to improve patient care, streamline operations, and ensure regulatory compliance.</p>
        </div>
      </header>

      {/* Services Section */}
      <section className={styles.servicesSection}>
        <div className={styles.container}>
          <div className={`${styles.sectionHeader} ${styles.fadeDown}`}>
            <h2>Our Services</h2>
            <p>We offer a comprehensive suite of healthcare technology services to modernize your practice and improve patient outcomes.</p>
          </div>

          <div className={styles.servicesGrid}>
            {services.map((service, index) => (
              <div
                key={index}
                className={`${styles.serviceCard} ${visibleCards.includes(index) ? styles.fadeUp : styles.hidden}`}
              >
                <div className={styles.serviceHeader}>
                  <div className={styles.serviceIcon}>{service.icon}</div>
                  <span className={styles.serviceCategory}>{service.category}</span>
                </div>
                
                <h3 className={styles.serviceTitle}>{service.title}</h3>
                <p className={styles.serviceDescription}>{service.description}</p>
                
                <div className={styles.serviceFeatures}>
                  <h4>Key Features:</h4>
                  <ul>
                    {service.features.map((feature, idx) => (
                      <li key={idx}>{feature}</li>
                    ))}
                  </ul>
                </div>
                
                <a href="#" className={styles.serviceLink}>
                  {service.link} →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
