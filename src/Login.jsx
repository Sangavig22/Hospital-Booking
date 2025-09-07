import React, { useState, useEffect } from "react";
import styles from './Login.module.css';

function LoginForm() {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);

  // Add animation delay for form elements
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimating(true);
    }, 100);
    return () => clearTimeout(timer);
  }, [isLoginMode]);

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginForm}>
        {/* Header Titles */}
        <div className={styles.header}>
          <h2 className={styles.title}>
            {isLoginMode ? "Login" : "Sign Up"}
          </h2>
        </div>

        {/* Tab Controls */}
        <div className={styles.tabContainer}>
          <button
            className={`${styles.tabButton} ${isLoginMode ? styles.active : styles.inactive}`}
            onClick={() => setIsLoginMode(true)}
          >
            Login
          </button>
          <button
            className={`${styles.tabButton} ${!isLoginMode ? styles.active : styles.inactive}`}
            onClick={() => setIsLoginMode(false)}
          >
            Signup
          </button>
          <div
            className={`${styles.tabSlider} ${isLoginMode ? styles.login : styles.signup}`}
          ></div>
        </div>

        {/* Form Section */}
        <form className={styles.form}>
          {/* Signup-only Field */}
          {!isLoginMode && (
            <div className={`${styles.inputGroup} ${isAnimating ? styles.animateIn : ''}`}>
              <input
                type="text"
                placeholder="Full Name"
                required
                className={styles.input}
              />
            </div>
          )}

          {/* Email field */}
          <div className={`${styles.inputGroup} ${isAnimating ? styles.animateIn : ''}`}>
            <input
              type="email"
              placeholder="Email Address"
              required
              className={styles.input}
            />
          </div>

          {/* Password field */}
          <div className={`${styles.inputGroup} ${isAnimating ? styles.animateIn : ''}`}>
            <input
              type="password"
              placeholder="Password"
              required
              className={styles.input}
            />
          </div>

          {/* Confirm Password field - only for signup */}
          {!isLoginMode && (
            <div className={`${styles.inputGroup} ${isAnimating ? styles.animateIn : ''}`}>
              <input
                type="password"
                placeholder="Confirm Password"
                required
                className={styles.input}
              />
            </div>
          )}

          {/* Forgot Password - only for login */}
          {isLoginMode && (
            <div className={styles.forgotPassword}>
              <a href="#" className={styles.forgotLink}>
                Forgot password?
              </a>
            </div>
          )}

          {/* Submit Button */}
          <button className={styles.submitButton}>
            {isLoginMode ? "Login" : "Signup"}
          </button>

          {/* Switch Mode Link */}
          <p className={styles.switchMode}>
            {isLoginMode ? "Don't have an account?" : "Already have an account?"}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setIsLoginMode(!isLoginMode);
              }}
              className={styles.switchLink}
            >
              {isLoginMode ? "Signup now" : "Login"}
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;