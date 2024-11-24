"use client";

import React, { useState } from 'react';
import ResetPasswordPopup from '../components/reset-password-popup';
import CreateAccountModal from './create-account-popup'; // Ensure the path to your component is correct

const WelcomeScreen: React.FC = () => {
  const [showResetPopup, setShowResetPopup] = useState(false); // For Reset Password Popup
  const [showCreateAccountPopup, setShowCreateAccountPopup] = useState(false); // For Create Account Popup

  return (
    <div style={styles.pageContainer}>
      {/* Main Login Screen */}
      <div style={styles.iphoneScreen}>
        {/* Top Left Logo */}
        <div style={styles.logoContainer}>
          <div style={styles.logo}>
            <span style={styles.logoText}>TB</span>
          </div>
        </div>

        {/* Welcome Header */}
        <h1 style={styles.welcomeTitle}>
          Welcome!<span style={styles.underline}></span>
        </h1>

        {/* Input Section */}
        <div style={styles.inputSection}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Please enter your email:</label>
            <input type="text" style={styles.input} />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Please enter your password:</label>
            <input type="password" style={styles.input} />
          </div>
        </div>

        {/* Buttons */}
        <div style={styles.buttonContainer}>
          <button style={styles.button}>Login</button>
          <button style={styles.button} onClick={() => setShowResetPopup(true)}>
            Reset Password
          </button>
          <button style={styles.button} onClick={() => setShowCreateAccountPopup(true)}>
            New? Create an Account!
          </button>
        </div>
      </div>

      {/* Reset Password Popup */}
      {showResetPopup && (
        <ResetPasswordPopup
          onCancel={() => setShowResetPopup(false)} // Close Reset Password Popup
          onComplete={() => setShowResetPopup(false)} // Close and return to login screen
        />
      )}

      {/* Create Account Popup */}
      {showCreateAccountPopup && (
        <CreateAccountModal onClose={() => setShowCreateAccountPopup(false)} />
      )}
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  pageContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh', // Full viewport height
    backgroundColor: '#f0f0f0', // Light gray background outside the iPhone screen
  },
  iphoneScreen: {
    width: '402px',
    height: '874px',
    background: 'linear-gradient(0deg, #65BFFF 0%, #FFFFFF 100%)',
    border: '1px solid #000', // Optional: To visually distinguish the screen
    borderRadius: '20px', // Adds rounded corners to simulate a phone screen
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px',
    boxSizing: 'border-box',
    position: 'relative',
  },
  logoContainer: {
    position: 'absolute',
    top: '20px',
    left: '20px',
  },
  logo: {
    width: '65px',
    height: '65px',
    backgroundColor: '#FFD426',
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    fontFamily: '"Caveat", cursive',
    fontSize: '24px',
    color: '#000000',
  },
  welcomeTitle: {
    fontSize: '40px',
    fontFamily: 'Subtitle, sans-serif',
    color: '#000000',
    textAlign: 'center',
    marginTop: '100px',
    position: 'relative',
  },
  underline: {
    display: 'block',
    height: '3px',
    width: '100%',
    backgroundColor: '#000000',
    marginTop: '-10px',
  },
  inputSection: {
    marginTop: '20px',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  inputGroup: {
    width: '307px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginBottom: '30px', // Space between input groups
  },
  label: {
    fontSize: '18px',
    fontFamily: 'Subtitle, sans-serif',
    color: '#000000',
    marginBottom: '5px',
  },
  input: {
    width: '100%',
    height: '40px',
    borderRadius: '8px',
    border: '1px solid #000000',
    padding: '0 10px',
    fontSize: '16px',
    color: '#000000',
    backgroundColor: '#FFFFFF',
  },
  buttonContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    height: '50%',
    marginTop: '20px',
  },
  button: {
    width: '307px',
    height: '50px',
    backgroundColor: '#003554',
    color: '#FFFFFF',
    border: '1px solid #000000',
    borderRadius: '5px',
    fontSize: '16px',
    cursor: 'pointer',
  },
};

export default WelcomeScreen;
