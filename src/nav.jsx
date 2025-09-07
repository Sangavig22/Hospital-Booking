import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from 'react';
import { Bell, Globe, Search, Menu, X } from 'lucide-react';
import logo from './assets/logo.png';
import styles from './Nav.module.css';

function Navbar() {
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleLanguageDropdown = () => {
    console.log('Toggle clicked, current state:', isLanguageOpen);
    setIsLanguageOpen(!isLanguageOpen);
  };

  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language);
    setIsLanguageOpen(false);
    console.log(`${language} selected`);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsLanguageOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setIsLanguageOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        {/* Logo & Brand */}
        <div className={styles.logoSection}>
          <div>
            <img src={logo} alt="logo" className={styles.logoImage} />
          </div>
          <span className={styles.brandName}>HealthSync</span>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className={styles.mobileMenuButton}
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? <X className={styles.mobileMenuIcon} /> : <Menu className={styles.mobileMenuIcon} />}
        </button>

        {/* Search Bar */}
        <div className={styles.searchContainer}>
          <div className={styles.searchWrapper}>
            <div className={styles.searchIcon}>
              <Search className={styles.searchIcon} />
            </div>
            <input
              type="text"
              placeholder="Search"
              className={styles.searchInput}
            />
          </div>
        </div>

        {/* Navigation Menu */}
        <div className={`${styles.navMenu} ${isMobileMenuOpen ? styles.mobileMenuOpen : ''}`}>
          <Link to="/" className={styles.navLink} onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
          <Link to="/about" className={styles.navLink} onClick={() => setIsMobileMenuOpen(false)}>About</Link>
          <Link to="/contact" className={styles.navLink} onClick={() => setIsMobileMenuOpen(false)}>Contact</Link>
          <Link to="/services" className={styles.navLink} onClick={() => setIsMobileMenuOpen(false)}>Services</Link>
        </div>

        {/* Right Elements */}
        <div className={`${styles.rightElements} ${isMobileMenuOpen ? styles.mobileMenuOpen : ''}`}>
          {/* Notification Bell */}
          <button className={styles.notificationButton}>
            <Bell className={styles.notificationIcon} />
          </button>

          {/* Language Dropdown */}
          <div 
            className={styles.languageDropdown} 
            ref={dropdownRef}
          >
            <button 
              onClick={toggleLanguageDropdown}
              className={styles.languageButton}
              aria-expanded={isLanguageOpen}
              aria-haspopup="true"
            >
              <Globe className={styles.languageIcon} />
              {selectedLanguage}
              <svg 
                className={`${styles.dropdownArrow} ${isLanguageOpen ? styles.arrowRotated : ''}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <ul className={styles.languageList} role="menu" style={{ display: isLanguageOpen ? 'block' : 'none' }}>
              <li className={styles.languageItem} role="none">
                <button 
                  className={`${styles.languageLink} ${selectedLanguage === 'English' ? styles.selectedLanguage : ''}`}
                  onClick={() => handleLanguageSelect('English')}
                  role="menuitem"
                >
                  English
                </button>
              </li>
              <li className={styles.languageItem} role="none">
                <button 
                  className={`${styles.languageLink} ${selectedLanguage === 'Tamil' ? styles.selectedLanguage : ''}`}
                  onClick={() => handleLanguageSelect('Tamil')}
                  role="menuitem"
                >
                  Tamil
                </button>
              </li>
              <li className={styles.languageItem} role="none">
                <button 
                  className={`${styles.languageLink} ${selectedLanguage === 'Sinhala' ? styles.selectedLanguage : ''}`}
                  onClick={() => handleLanguageSelect('Sinhala')}
                  role="menuitem"
                >
                  Sinhala
                </button>
              </li>
            </ul>
          </div>

          {/* Login Button */}
          <Link to="/login" className={styles.loginButton} onClick={() => setIsMobileMenuOpen(false)}>
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;