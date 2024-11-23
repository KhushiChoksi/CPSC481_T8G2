"use client";

import React, { useState } from 'react';
import TravelDetailsModal from './arrival-date-popup';

interface CreateAccountModalProps {
  onClose: () => void; // Function to close the modal
}

const CreateAccountModal: React.FC<CreateAccountModalProps> = ({ onClose }) => {
  // State to toggle TravelDetailsModal
  const [showTravelModal, setShowTravelModal] = useState(false);

  // If TravelDetailsModal is active, render it
  if (showTravelModal) {
    return (
      <TravelDetailsModal
        onClose={onClose} // Pass close function to close all modals
        onGoBack={() => setShowTravelModal(false)} // Navigate back to this modal
      />
    );
  }

  return (
    <div style={styles.modalOverlay}>
      <div style={styles.modal}>
        <h1 style={styles.modalTitle}>
          Create Account<span style={styles.underline}></span>
        </h1>

        {/* Input Fields */}
        <div style={styles.inputGroup}>
          <label style={styles.label}>Please enter your first name:</label>
          <input type="text" style={styles.input} />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Please enter your last name:</label>
          <input type="text" style={styles.input} />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Please enter your e-mail:</label>
          <input type="text" style={styles.input} />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Please enter a password:</label>
          <input type="password" style={styles.input} />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Please confirm your password:</label>
          <input type="password" style={styles.input} />
        </div>

        {/* Buttons */}
        <div style={styles.modalButtonContainer}>
          <button style={styles.cancelButton} onClick={onClose}>
            Cancel
          </button>
          <button
            style={styles.continueButton}
            onClick={() => setShowTravelModal(true)} // Show the Travel Details Modal
          >
            Continue
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
  },
  modalTitle: {
    fontSize: '40px',
    fontFamily: 'Subtitle, sans-serif',
    color: '#000000',
    textAlign: 'center',
  },
  underline: {
    display: 'block',
    height: '3px',
    width: '100%',
    backgroundColor: '#000000',
    marginTop: '-10px',
  },
  inputGroup: {
    width: '100%',
    marginBottom: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
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
  modalButtonContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
  },
  cancelButton: {
    width: '150px',
    height: '50px',
    backgroundColor: '#FFFFFF',
    color: '#003554',
    border: '1px solid #000000',
    borderRadius: '5px',
    fontSize: '16px',
    cursor: 'pointer',
  },
  continueButton: {
    width: '150px',
    height: '50px',
    backgroundColor: '#003554',
    color: '#FFFFFF',
    border: '1px solid #000000',
    borderRadius: '5px',
    fontSize: '16px',
    cursor: 'pointer',
  },
};

export default CreateAccountModal;
