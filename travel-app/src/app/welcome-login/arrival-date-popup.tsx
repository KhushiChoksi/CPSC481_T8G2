"use client";

import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Default styles
import '../globals.css'; // Import global styles

interface TravelDetailsModalProps {
  onClose: () => void;
  onGoBack: () => void;
}

const TravelDetailsModal: React.FC<TravelDetailsModalProps> = ({ onClose, onGoBack }) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  return (
    <div style={styles.modalOverlay}>
      <div style={styles.modal}>
        <h1 style={styles.modalTitle}>
          Travel Details<span style={styles.underline}></span>
        </h1>

        {/* Subtitle */}
        <h2 style={styles.subtitle}>When are you arriving?</h2>

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

        {/* Buttons */}
        <div style={styles.modalButtonContainer}>
          <button style={styles.cancelButton} onClick={onGoBack}>
            Go Back
          </button>
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
    marginBottom: '10px', // Adjusted spacing below title
  },
  subtitle: {
    fontSize: '24px',
    fontFamily: 'Subtitle, sans-serif',
    color: '#000000',
    marginTop: '50px', // Slightly increased to lower the subtitle
    marginBottom: '0px', // Keeps space below subtitle consistent
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
    flexGrow: 1, // Allows the calendar to expand naturally
    marginTop: '-50px', // Raised calendar slightly
    marginBottom: '20px', // Adds space below calendar for buttons
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalButtonContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between', // Buttons stay evenly spaced
    marginTop: '20px', // Adds space above buttons
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

export default TravelDetailsModal;