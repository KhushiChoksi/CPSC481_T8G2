"use client";
import React, {useState} from 'react';
import CreateAccountModal from './create-account';

const WelcomeScreen: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => setShowModal(!showModal);

  return (
    <div style={styles.pageContainer}>
      {/* iPhone Screen */}
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
          {/* Email Input */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>Please enter your email:</label>
            <input type="text" style={styles.input} />
          </div>

          {/* Password Input */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>Please enter your password:</label>
            <input type="password" style={styles.input} />
          </div>
        </div>

        {/* Buttons */}
        <div style={styles.buttonContainer}>
          <button style={styles.button}>Login</button>
          <button style={styles.button}>Reset Password</button>
          <button style={styles.button} onClick={toggleModal}>New? Create an Account!</button>
        </div>
      </div>
      {/* Show Modal */}{showModal && <CreateAccountModal onClose={toggleModal} />}
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
    marginBottom: '30px', // Increased spacing between input groups
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
    justifyContent: 'space-evenly', // Evenly distribute buttons in the bottom half
    alignItems: 'center', // Center buttons horizontally
    height: '50%', // Occupy the bottom half of the screen
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
