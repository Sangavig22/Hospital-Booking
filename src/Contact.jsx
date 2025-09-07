import React, { useState, useEffect } from 'react';
import styles from './contact.module.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    emailAddress: '',
    phoneNumber: '',
    inquiryType: '',
    message: ''
  });

  const [isVisible, setIsVisible] = useState(false);
  const [formFocus, setFormFocus] = useState({});
  const [submitLoading, setSubmitLoading] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFocus = (fieldName) => {
    setFormFocus(prev => ({ ...prev, [fieldName]: true }));
  };

  const handleBlur = (fieldName) => {
    setFormFocus(prev => ({ ...prev, [fieldName]: false }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Form submitted:', formData);
      setSubmitLoading(false);
      // Reset form
      setFormData({
        fullName: '',
        emailAddress: '',
        phoneNumber: '',
        inquiryType: '',
        message: ''
      });
    }, 2000);
  };

  return (
    <div className={styles.healthsyncContainer}>
      {/* Header */}
      <header className={`${styles.header} ${isVisible ? styles.fadeInDown : ''}`}>
        <div className={styles.headerContent}>
          <h1 className={styles.animatedTitle}>Contact HealthSync</h1>
          <p className={styles.animatedSubtitle}>We're here to help and answer any questions you might have about our products or services. We look forward to hearing from you.</p>
        </div>
      </header>

      {/* Main Content */}
      <main className={styles.mainContent}>
        <div className={styles.contentWrapper}>
          {/* Left Column: Form + Location */}
          <div className={styles.leftColumn}>
            {/* Form Section */}
            <div className={`${styles.formSection} ${isVisible ? styles.slideInLeft : ''}`}>
              <h2 className={styles.sectionTitle}>Send Us a Message</h2>
              <form onSubmit={handleSubmit} className={styles.contactForm}>
                <div className={`${styles.formGroup} ${formFocus.fullName ? styles.focused : ''}`}>
                  <label htmlFor="fullName">Full Name *</label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    onFocus={() => handleFocus('fullName')}
                    onBlur={() => handleBlur('fullName')}
                    placeholder="Enter your full name"
                    required
                    className={styles.animatedInput}
                  />
                </div>

                <div className={`${styles.formGroup} ${formFocus.emailAddress ? styles.focused : ''}`}>
                  <label htmlFor="emailAddress">Email Address *</label>
                  <input
                    type="email"
                    id="emailAddress"
                    name="emailAddress"
                    value={formData.emailAddress}
                    onChange={handleChange}
                    onFocus={() => handleFocus('emailAddress')}
                    onBlur={() => handleBlur('emailAddress')}
                    placeholder="Enter your email address"
                    required
                    className={styles.animatedInput}
                  />
                </div>

                <div className={`${styles.formGroup} ${formFocus.phoneNumber ? styles.focused : ''}`}>
                  <label htmlFor="phoneNumber">Phone Number</label>
                  <input
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    onFocus={() => handleFocus('phoneNumber')}
                    onBlur={() => handleBlur('phoneNumber')}
                    placeholder="Enter your phone number"
                    className={styles.animatedInput}
                  />
                </div>

                <div className={`${styles.formGroup} ${formFocus.inquiryType ? styles.focused : ''}`}>
                  <label htmlFor="inquiryType">Inquiry Type *</label>
                  <select
                    id="inquiryType"
                    name="inquiryType"
                    value={formData.inquiryType}
                    onChange={handleChange}
                    onFocus={() => handleFocus('inquiryType')}
                    onBlur={() => handleBlur('inquiryType')}
                    required
                    className={styles.animatedInput}
                  >
                    <option value="">Please select inquiry type</option>
                    <option value="general">General Inquiry</option>
                    <option value="support">Technical Support</option>
                    <option value="billing">Billing</option>
                    <option value="partnership">Partnership</option>
                  </select>
                </div>

                <div className={`${styles.formGroup} ${formFocus.message ? styles.focused : ''}`}>
                  <label htmlFor="message">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    onFocus={() => handleFocus('message')}
                    onBlur={() => handleBlur('message')}
                    placeholder="Please describe how we can help"
                    rows="5"
                    required
                    className={styles.animatedInput}
                  ></textarea>
                </div>

                <div className={styles.formCheckbox}>
                  <input type="checkbox" id="privacy" required className={styles.animatedCheckbox} />
                  <label htmlFor="privacy">
                    I agree to HealthSync's privacy policy and consent to the processing of my personal data for the purposes outlined in the privacy policy.
                  </label>
                </div>

                <button 
                  type="submit" 
                  className={`${styles.submitBtn} ${submitLoading ? styles.loading : ''}`}
                  disabled={submitLoading}
                >
                  {submitLoading ? (
                    <span className={styles.loadingSpinner}>
                      <span className={styles.spinner}></span>
                      Sending...
                    </span>
                  ) : (
                    'Send Message'
                  )}
                </button>
              </form>
            </div>

            {/* Location Section */}
            <div className={styles.locationSection}>
              <h3>Our Location</h3>
              <p>Visit us at our office</p>
              <div className={`${styles.mapPlaceholder} ${styles.interactive}`}>
                <div className={styles.mapIcon}>📍</div>
                <p>Interactive Map<br />
                  <span className={styles.clickText}>Click to view directions</span>
                </p>
              </div>
              <div className={styles.locationOptions}>
                <span className={styles.locationFeature}>🚗 Parking available on site</span>
                <span className={styles.locationFeature}>🚇 Accessible by metro</span>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Information */}
          <div className={`${styles.infoSection} ${isVisible ? styles.slideInRight : ''}`}>
            <h2 className={styles.sectionTitle}>Get in Touch</h2>
            
            <div className={styles.contactInfo}>
              <div className={`${styles.infoItem} ${styles.hoverable}`}>
                <div className={styles.infoIcon}>📍</div>
                <div className={styles.infoDetails}>
                  <h4>Office Address</h4>
                  <p>123 Hospital Road<br />
                  Katubedda, Colombo 10001<br />
                  Sri Lanka</p>
                </div>
              </div>

              <div className={`${styles.infoItem} ${styles.hoverable}`}>
                <div className={styles.infoIcon}>📞</div>
                <div className={styles.infoDetails}>
                  <h4>Phone Numbers</h4>
                  <p>Main:(+94) 123-4567<br />
                  Emergency:1990<br />
                  Toll-free: (+94) 123-4567</p>
                </div>
              </div>

              <div className={`${styles.infoItem} ${styles.hoverable}`}>
                <div className={styles.infoIcon}>✉️</div>
                <div className={styles.infoDetails}>
                  <h4>Email Addresses</h4>
                  <p>General: info@healthsync.com<br />
                  Support: support@healthsync.com<br />
                  Sales: sales@healthsync.com</p>
                </div>
              </div>
              <div className={`${styles.infoItem} ${styles.hoverable}`}>
  <div className={styles.infoIcon}>🏥</div>
  <div className={styles.infoDetails}>
    <h4>Hospital Service Hours</h4>
    <p>Open 24/7</p>
  </div>
</div>

              <div className={`${styles.infoItem} ${styles.hoverable}`}>
                <div className={styles.infoIcon}>🕒</div>
                <div className={styles.infoDetails}>
                  <h4>Pharmacy Service Hours</h4>
                  <p> 8 AM - 6 PM EST<br />
                  Saturday: 9 AM - 4 PM EST<br />
                  Sunday: Closed</p>
                </div>
              </div>
            </div>

            {/* Emergency Section */}
            <div className={styles.emergencySection}>
              <h4>Need Immediate Assistance?</h4>
              <p>For urgent healthcare support or technical emergencies, please call our 24/7 support line at <strong>(555) 911-HELP</strong> or email <strong>emergency@healthsync.com</strong></p>
              <div className={styles.emergencyPulse}></div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Contact;