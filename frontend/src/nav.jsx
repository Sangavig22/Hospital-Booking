import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef,useContext} from 'react';
import { Bell, Search, Menu, X, User, ChevronDown } from 'lucide-react';
import { AppContent } from "./content/AppContent";
import logo from './assets/logo.png';
import styles from './Nav.module.css';

function Navbar() {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

 const[showMenu,setShowMenu]=useState(false);
const { token, setToken } = useContext(AppContent);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setShowMenu(false);
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
            <img onClick={() => navigate('/')} src={logo} alt="logo" className={styles.logoImage} />
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
          <Link to="/doctors" className={styles.navLink} onClick={() => setIsMobileMenuOpen(false)}>Doctors</Link>
          <Link to="/contact" className={styles.navLink} onClick={() => setIsMobileMenuOpen(false)}>Contact</Link>
          <Link to="/services" className={styles.navLink} onClick={() => setIsMobileMenuOpen(false)}>Services</Link>
        </div>

        {/* Right Elements */}
        <div className={`${styles.rightElements} ${isMobileMenuOpen ? styles.mobileMenuOpen : ''}`}>
          {/* Notification Bell */}
          <button className={styles.notificationButton}>
            <Bell className={styles.notificationIcon} />
          </button>
           {/* Create Account Button */}
          <div>
            {
              token 
              ?<div ref={dropdownRef}> 
                <button className={styles.notificationButton} onClick={() => setShowMenu(!showMenu)}>
                  <User className={styles.notificationIcon} />
                  <ChevronDown className={styles.notificationIcon} />
                </button>
                
                {showMenu && (
                  <div className={styles.profileDropdown}>
                    <Link to="/my-profile" onClick={() => {setShowMenu(false); setIsMobileMenuOpen(false);}}>
                      My Profile
                    </Link>
                    <Link to="/my-appointment" onClick={() => {setShowMenu(false); setIsMobileMenuOpen(false);}}>
                      My Appointments
                    </Link>
                    <button onClick={() => {setToken(false); setShowMenu(false);}}>
                      Logout
                    </button>
                  </div>
                )}
              </div>
              :  <Link to="/login" className={styles.loginButton} onClick={() => setIsMobileMenuOpen(false)}>
            Create Account
          </Link>
            }
        
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;