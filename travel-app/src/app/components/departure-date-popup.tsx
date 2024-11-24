"use client";

import React, { useState } from 'react';
// npm install react-calendar *** need to add to instructions for library. on version 18.3 no warnings or issues with downloading/installing this
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Default styles
import '../globals.css'; // Import global styles

interface DepartureDetailsModalProps {
  onClose: () => void;
  onGoBack?: () => void;
  onSkip?: () => void; // Callback for "Skip" button
}

const DepartureDetailsModal: React.FC<DepartureDetailsModalProps> = ({
  onClose,
  onGoBack,
  onSkip,
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  return (
    <div style={styles.modalOverlay}>
      <div style={styles.modal}>
        {/* Title */}
        <h1 style={styles.modalTitle}>
          Travel Details<span style={styles.underline}></span>
        </h1>

        {/* Subtitle */}
        <h2 style={styles.subtitle}>When are you leaving?</h2>

        {/* Calendar */}
        <div style={styles.calendarContainer}>
          <Calendar
            onChange={(date) => setSelectedDate(date as Date)}
            value={selectedDate}
            tileClassName={({ date }) =>
              selectedDate && date.toDateString() === selectedDate.toDateString()
                ? 'selected-date'
                : ''
            }
          />
        </div>

        {/* Skip Button */}
        {onSkip && (
          <div style={styles.skipButtonContainer}>
            <button style={styles.skipButton} onClick={onSkip}>
              Skip
            </button>
          </div>
        )}

        {/* Go Back and Confirm Date Buttons */}
        <div style={styles.modalButtonContainer}>
          {onGoBack && (
            <button style={styles.cancelButton} onClick={onGoBack}>
              Go Back
            </button>
          )}
          <button style={styles.continueButton} onClick={onClose}>
            Confirm Date
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
  subtitle: {
    fontSize: '24px',
    fontFamily: 'Subtitle, sans-serif',
    color: '#000000',
    marginTop: '50px',
    marginBottom: '10px',
  },
  underline: {
    display: 'block',
    height: '3px',
    width: '100%',
    backgroundColor: '#000000',
    marginTop: '-10px',
  },
  calendarContainer: {
    width: '100%',
    flexGrow: 1,
    marginTop: '-20px',
    marginBottom: '20px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  skipButtonContainer: {
    width: '100%', // Full width for proper alignment
    display: 'flex',
    justifyContent: 'center', // Center the Skip button
    marginBottom: '10px', // Space between Skip and other buttons
  },
  skipButton: {
    width: '345px',
    height: '50px',
    backgroundColor: '#FFFFFF',
    color: '#003554',
    border: '1px solid #000000',
    borderRadius: '5px',
    fontSize: '16px',
    cursor: 'pointer',
  },
  modalButtonContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between', // Ensure buttons stay side by side
    alignItems: 'center',
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

export default DepartureDetailsModal;
