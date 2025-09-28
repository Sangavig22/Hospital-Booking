import React, { useState, useEffect, createContext, useContext } from "react";
import styles from './Login.module.css';
import {AppContent} from "./content/AppContent";
import axios from 'axios';
import {toast} from 'react-toastify';
import { useNavigate } from "react-router-dom";


function LoginForm() {
  const navigate = useNavigate();

  const [isAnimating, setIsAnimating] = useState(false);



  const {backendUrl, isLoginMode, setIsLoginMode}=useContext(AppContent)
  const { setToken } = useContext(AppContent);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  


 

  // Add animation delay for form elements
useEffect(() => {
  setIsAnimating(false);
  const timer = setTimeout(() => setIsAnimating(true), 100);
  return () => clearTimeout(timer);
}, [isLoginMode]);

  const onSubmitHandler=async (e) => {
    try{
      e.preventDefault();
      axios.defaults.withCredentials=true;

      if(!isLoginMode){
        const {data}=await axios.post(backendUrl+'/api/auth/register',{fullName,email,password,confirmPassword})
        if(data.success){
          setIsLoginMode(true);
           toast.success(data.message);
             navigate("/");
             setToken(true);
        }
        else{
          toast.error(data.message);
        }
      }
      else{
        const {data}=await axios.post(backendUrl+'/api/auth/login',{email,password})
        
        if(data.success){
          setIsLoginMode(true);
             toast.success(data.message);
             navigate("/");
              setToken(true);
        }
        else{
          toast.error(data.message);
        }
      }


      }
    
    catch(error){
  toast.error(error.response?.data?.message || error.message || "Something went wrong");
}
  }

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
        <form onSubmit={onSubmitHandler} className={styles.form}>
            {/* Signup-only Field */}
{!isLoginMode && (
  <div className={`${styles.inputGroup} ${isAnimating ? styles.animateIn : ''}`}>
    <input
      type="text"
      placeholder="Full Name"
      required
      className={styles.input}
      value={fullName}
      onChange={e => setFullName(e.target.value)}
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
    value={email}
    onChange={e => setEmail(e.target.value)}
  />
</div>

{/* Password field */}
<div className={`${styles.inputGroup} ${isAnimating ? styles.animateIn : ''}`}>
  <input
    type="password"
    placeholder="Password"
    required
    className={styles.input}
    value={password}
    onChange={e => setPassword(e.target.value)}
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
      value={confirmPassword}
      onChange={e => setConfirmPassword(e.target.value)}
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
          <button type='submit' className={styles.submitButton}>
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