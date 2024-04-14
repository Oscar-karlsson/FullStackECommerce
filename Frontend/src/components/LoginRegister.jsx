import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faGooglePlusG, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import styles from './LoginRegister.module.css'; 
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { registerUser, login } from '../utils/api'; 
import { useAuth } from '../context/AuthContext';




const LoginRegister = () => {
  const [isRightPanelActive, setIsRightPanelActive] = useState(false);
  const [registerError, setRegisterError] = useState(null);
  const navigate = useNavigate();
  const { logIn } = useAuth();
  const [showSocials, setShowSocials] = useState(false);
  
  const toggleSocials = () => {
    setShowSocials(!showSocials);
  };

  // Initial values for registration and login forms
  const initialLoginValues = {
    email: '',
    password: '',
  };

  const initialRegisterValues = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  // Validation schema for registration and login forms
  const loginValidationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const registerValidationSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, 'Name must be at least 2 characters')
      .required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
      )
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
  });

  // Handle registration form submission
  const handleRegisterSubmit = async (values) => {
    setRegisterError(null);  // Clear previous error messages
    try {
      const response = await registerUser(values.email, values.password);
      console.log('Registration response:', response);  // Log the response to the console
      if (response && response.message === 'User created successfully') {
        if (response.token) {
          localStorage.setItem('token', response.token); // Store the token in local storage
        }
        logIn(response.token); 
        navigate('/account');
      } else {
        // Check if response has a message property
        setRegisterError(response?.message || 'Unknown error occurred during registration');
      }
    } catch (error) {
      console.error('Error registering user:', error);
      if (error.message === 'Email already exists') {
        setRegisterError('This email is already in use. Please use a different email.');
      } else {
        setRegisterError('An error occurred during registration');
      }
    }
  };

  // Handle login form submission
  const handleLoginSubmit = async (values) => {
    try {
      const response = await login(values.email, values.password);
      console.log('Login response:', response);
      if (response && response.message === 'Login successful') {
        // Store the token and update isLoggedIn state
        localStorage.setItem('token', response.token); 
        logIn(response.token);
        
     // Navigate to account page
     navigate('/account');
    } else {
      console.log('Login failed:', response);
    }
  } catch (error) {
    console.error('Error logging in user:', error);
    setRegisterError(error.message || 'An error occurred during login');
  }
};

  return (
    <div className={`${styles.container} ${isRightPanelActive ? styles.rightPanelActive : ''}`}>
      {/* Sign-in form */}
      <div className={`${styles.formContainer} ${styles.signInContainer}`}>
        <Formik
          initialValues={initialLoginValues}
          validationSchema={loginValidationSchema}
          onSubmit={handleLoginSubmit}
        >
          <Form className={styles.form}>
            <h1>Sign In</h1>
            <div className={styles.socialContainer}>
           
              
              <a href="#" className={styles.social}><FontAwesomeIcon icon={faFacebookF} /></a>
              <a href="#" className={styles.social}><FontAwesomeIcon icon={faGooglePlusG} /></a>
              <a href="#" className={styles.social}><FontAwesomeIcon icon={faLinkedinIn} /></a>
            </div>
            <span className={styles.signInOption}>or use your account</span>
            <Field type="email" name="email" placeholder="Email" className={styles.loginRegisterInput} />
            <ErrorMessage name="email" component="p" className={styles.errorMessage} />
            <Field type="password" name="password" placeholder="Password" className={styles.loginRegisterInput} />
            <ErrorMessage name="password" component="p" className={styles.errorMessage} />
            <button type="submit" className={styles.loginRegisterButton}>Sign In</button>
            <a href="#" className={styles.forgotPassword}>Forgot your password?</a>
          </Form>
        </Formik>
      </div>

      {/* Sign-up form */}
      <div className={`${styles.formContainer} ${styles.signUpContainer}`}>
        <Formik
          initialValues={initialRegisterValues}
          validationSchema={registerValidationSchema}
          onSubmit={handleRegisterSubmit}
        >
          <Form className={styles.form}>
            <h1 >Create Account</h1>
            <div className={styles.socialContainer}>
              <a href="#" className={styles.social}><FontAwesomeIcon icon={faFacebookF} /></a>
              <a href="#" className={styles.social}><FontAwesomeIcon icon={faGooglePlusG} /></a>
              <a href="#" className={styles.social}><FontAwesomeIcon icon={faLinkedinIn} /></a>
            </div>
            <span className={styles.signInOption}>or use your email for registration</span>
            <Field type="text" name="name" placeholder="Name" className={styles.loginRegisterInput} />
            <ErrorMessage name="name" component="p" className={styles.errorMessage} />
            <Field type="email" name="email" placeholder="Email" className={styles.loginRegisterInput} />
            <ErrorMessage name="email" component="p" className={styles.errorMessage} />
            <Field type="password" name="password" placeholder="Password" className={styles.loginRegisterInput} />
            <ErrorMessage name="password" component="p" className={styles.errorMessage} />
            <Field type="password" name="confirmPassword" placeholder="Repeat Password" className={styles.loginRegisterInput} />
            <ErrorMessage name="confirmPassword" component="p" className={styles.errorMessage} />
            {registerError && <div className={styles.errorMessage}>{registerError}</div>}
            <button type="submit" className={styles.loginRegisterButton}>Sign Up</button>
          </Form>
        </Formik>
      </div>

      {/* Overlay Container */}
      <div className={styles.overlayContainer}>
        <div className={styles.overlay}>
          <div className={styles.overlayPanel} style={{ left: '0' }}>
            <h1>Welcome Back!</h1>
            <p>To keep connected with us please login with your personal info</p>
            <button className={`${styles.loginRegisterButton} ${styles.ghost}`} onClick={() => setIsRightPanelActive(false)}>Sign In</button>
          </div>
          <div className={styles.overlayPanel} style={{ right: '0' }}>
            <h1>Hello, Friend!</h1>
            <p>Enter your personal details and start the journey with us</p>
            <button className={`${styles.loginRegisterButton} ${styles.ghost}`} onClick={() => setIsRightPanelActive(true)}>Sign Up</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginRegister;
