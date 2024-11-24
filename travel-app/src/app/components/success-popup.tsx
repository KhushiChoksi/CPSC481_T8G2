"use client";

import React from 'react';

interface SuccessPopupProps {
  title?: string; // Customizable title (default: "Success!")
  subtitle?: string; // Customizable subtitle (default provided below)
  buttonText?: string; // Customizable button text (default: "Get Started")
  onGetStarted: () => void; // Callback for the button
}

const SuccessPopup: React.FC<SuccessPopupProps> = ({
  title = "Success!",
  subtitle = "Your account was successfully created.",
  buttonText = "Get Started",
  onGetStarted,
}) => {
  return (
    <div style={styles.modalOverlay}>
      <div style={styles.modal}>
        {/* Title */}
        <h1 style={styles.modalTitle}>
          {title}<span style={styles.underline}></span>
        </h1>

        {/* Subtitle */}
        <h2 style={styles.subtitle}>{subtitle}</h2>

        {/* Button */}
        <div style={styles.modalButtonContainer}>
          <button style={styles.continueButton} onClick={onGetStarted}>
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    width: '386px',
    height: '796px',
    backgroundColor: '#A5B6C2',
    borderRadius: '20px',
    border: '1px solid #000000',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxSizing: 'border-box',
  },
  modalTitle: {
    fontSize: '40px',
    fontFamily: 'Subtitle, sans-serif',
    color: '#000000',
    textAlign: 'center',
    marginBottom: '10px',
  },
  underline: {
    display: 'block',
    height: '3px',
    width: '100%',
    backgroundColor: '#000000',
    marginTop: '-10px',
  },
  subtitle: {
    fontSize: '24px',
    fontFamily: 'Subtitle, sans-serif',
    color: '#000000',
    textAlign: 'center',
    marginTop: '20px',
    marginBottom: '20px',
  },
  modalButtonContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
  continueButton: {
    width: '200px',
    height: '50px',
    backgroundColor: '#003554',
    color: '#FFFFFF',
    border: '1px solid #000000',
    borderRadius: '5px',
    fontSize: '16px',
    cursor: 'pointer',
  },
};

export default SuccessPopup;
