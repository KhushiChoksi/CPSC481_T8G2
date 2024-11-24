"use client";

import React from 'react';

interface CancelAccountPopupProps {
  onConfirm: () => void; // Callback for confirming account cancellation
  onCancel: () => void; // Callback for going back to account creation
}

const CancelAccountPopup: React.FC<CancelAccountPopupProps> = ({ onConfirm, onCancel }) => {
  return (
    <div style={styles.modalOverlay}>
      <div style={styles.modal}>
        {/* Title */}
        <h1 style={styles.modalTitle}>
          Create Account<span style={styles.underline}></span>
        </h1>

        {/* Subtitle */}
        <h2 style={styles.subtitle}>
          Are you sure you want to cancel account creation?
        </h2>

        {/* Buttons */}
        <div style={styles.modalButtonContainer}>
          <button style={styles.longCancelButton} onClick={onConfirm}>
            Yes, cancel account creation
          </button>
          <button style={styles.longConfirmButton} onClick={onCancel}>
            No, go back to complete account
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
    marginTop: '20px', // Spacing below the title
    marginBottom: '40px', // Space above buttons
  },
  modalButtonContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '20px', // Space between buttons
  },
  longCancelButton: {
    width: '307px',
    height: '50px',
    backgroundColor: '#FFFFFF',
    color: '#003554',
    border: '1px solid #000000',
    borderRadius: '5px',
    fontSize: '16px',
    cursor: 'pointer',
  },
  longConfirmButton: {
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

export default CancelAccountPopup;
