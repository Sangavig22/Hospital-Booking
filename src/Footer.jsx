import React from 'react';
import { Facebook, Instagram, Twitter } from 'lucide-react';
import styles from './Footer.module.css';

const Footer = () => {
  const handleLinkHover = (e) => {
    e.target.style.color = '#10b981';
    e.target.style.paddingLeft = '8px';
    e.target.style.borderLeft = '3px solid #10b981';
  };

  const handleLinkLeave = (e) => {
    e.target.style.color = '#64748b';
    e.target.style.paddingLeft = '0px';
    e.target.style.borderLeft = 'none';
  };

  const handleSocialHover = (e) => {
    e.target.style.color = '#ffffff';
    e.target.style.background = '#10b981';
    e.target.style.transform = 'translateY(-3px) scale(1.1)';
    e.target.style.boxShadow = '0 8px 25px rgba(16, 185, 129, 0.4)';
  };

  const handleSocialLeave = (e) => {
    e.target.style.color = '#10b981';
    e.target.style.background = 'rgba(16, 185, 129, 0.1)';
    e.target.style.transform = 'translateY(0) scale(1)';
    e.target.style.boxShadow = 'none';
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.decorativeShape}></div>
      <div className={styles.container}>
        <div className={styles.topSection}>
          <p className={styles.tagline}>
            Making healthcare accessible and convenient through modern technology and compassionate care.
          </p>
          
          <div className={styles.socialLinks}>
            <Facebook 
              size={24} 
              className={styles.socialLink}
              onMouseEnter={handleSocialHover}
              onMouseLeave={handleSocialLeave}
            />
            <Instagram 
              size={24} 
              className={styles.socialLink}
              onMouseEnter={handleSocialHover}
              onMouseLeave={handleSocialLeave}
            />
            <Twitter 
              size={24} 
              className={styles.socialLink}
              onMouseEnter={handleSocialHover}
              onMouseLeave={handleSocialLeave}
            />
          </div>
        </div>

        <div className={styles.footerContent}>
          {/* Main Pages */}
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Main</h3>
            <ul className={styles.linksList}>
              <li>
                <a 
                  href="#" 
                  className={styles.link}
                  onMouseEnter={handleLinkHover}
                  onMouseLeave={handleLinkLeave}
                >
                  Book Appointment
                </a>
              </li>
              <li>
                <a 
                  href="/services" 
                  className={styles.link}
                  onMouseEnter={handleLinkHover}
                  onMouseLeave={handleLinkLeave}
                >
                  Services
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className={styles.link}
                  onMouseEnter={handleLinkHover}
                  onMouseLeave={handleLinkLeave}
                >
                  Find Doctors
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className={styles.link}
                  onMouseEnter={handleLinkHover}
                  onMouseLeave={handleLinkLeave}
                >
                  Patient Portal
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Support</h3>
            <ul className={styles.linksList}>
              <li>
                <a 
                  href="/contact" 
                  className={styles.link}
                  onMouseEnter={handleLinkHover}
                  onMouseLeave={handleLinkLeave}
                >
                  Contact Us
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className={styles.link}
                  onMouseEnter={handleLinkHover}
                  onMouseLeave={handleLinkLeave}
                >
                  Help Center
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className={styles.link}
                  onMouseEnter={handleLinkHover}
                  onMouseLeave={handleLinkLeave}
                >
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* About Hospital */}
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>About Hospital</h3>
            <ul className={styles.linksList}>
              <li>
                <a 
                  href="#" 
                  className={styles.link}
                  onMouseEnter={handleLinkHover}
                  onMouseLeave={handleLinkLeave}
                >
                  About
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className={styles.link}
                  onMouseEnter={handleLinkHover}
                  onMouseLeave={handleLinkLeave}
                >
                  Careers
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className={styles.link}
                  onMouseEnter={handleLinkHover}
                  onMouseLeave={handleLinkLeave}
                >
                  News
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Legal</h3>
            <ul className={styles.linksList}>
              <li>
                <a 
                  href="#" 
                  className={styles.link}
                  onMouseEnter={handleLinkHover}
                  onMouseLeave={handleLinkLeave}
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className={styles.link}
                  onMouseEnter={handleLinkHover}
                  onMouseLeave={handleLinkLeave}
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className={styles.link}
                  onMouseEnter={handleLinkHover}
                  onMouseLeave={handleLinkLeave}
                >
                  HIPAA Notice
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className={styles.copyright}>
          © 2025 HealthSync Hospital. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;