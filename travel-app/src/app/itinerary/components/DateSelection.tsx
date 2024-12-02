"use client";

import React, { useState } from "react";
// npm install react-calendar
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../../globals.css";
import { Value } from "react-calendar/dist/esm/shared/types.js";
import { IoClose } from "react-icons/io5";

interface DateSelectionModalProps {
  onClose: () => void;
  onGoBack: () => void;
  handleDateChange: (value: Value) => void
}

const DateSelection: React.FC<DateSelectionModalProps> = ({
  onClose,
  onGoBack,
  handleDateChange,
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handlePopUpDateChange = (date : Value) => {
    // handleDateChange(date);
    setSelectedDate(date as Date);
  }

  const handleConfirmButton = () => {
    if (selectedDate) {
      handleDateChange(selectedDate);
      onClose();
    } else {
      setErrorMessage('Please select a date before confirming.');
    }
  }

  return (
    <div style={styles.modalOverlay}>
      <div style={styles.modal}>
        <div>
          <button style={styles.cancelButton} onClick={onGoBack} aria-label="Close popup">
              <IoClose/>
          </button>
        </div>

        <div style={styles.content}>
        {/* Title */}
        <h1 style={styles.modalTitle}>
          Date Selection
        </h1>

        {/* Subtitle */}
        <h2 style={styles.paragraph}>Select the day you would like to view the itinerary of.</h2>
        

        {/* Calendar */}
        <div style={styles.calendarContainer}>
          <Calendar
            onChange={handlePopUpDateChange} // Update state with selected date
            value={selectedDate} // Highlight selected date
            showNeighboringMonth={false} // Exclude days from adjacent months
          />
        </div>

        {/* Error Message */}
        {errorMessage && <p style={styles.errorMessage}>{errorMessage} </p>}
        

        {/* Go Back and Confirm Buttons */}
        <div style={styles.modalButtonContainer}>
          <button style={styles.continueButton} onClick={handleConfirmButton}>
            Confirm Date
          </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
  },
  modal: {
    width: "96vw",
    height: "91vh",
    backgroundColor: "#A5B6C2",
    borderRadius: "20px",
    border: "1px solid #000000",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    // alignItems: "center",
    alignItems: "end",
    overflowY: "auto",
    boxSizing: "border-box",
  },
  modalTitle: {
    fontSize: "2.5rem",
    color: "#000000",
    textAlign: "center",
    marginBottom: "1rem",
    textDecoration: "underline",
    textDecorationThickness: "2px",
    textDecorationSkipInk: "auto",
    textUnderlineOffset: "10px",
  },
  // underline: {
  //   display: "block",
  //   height: "3px",
  //   width: "80%",
  //   backgroundColor: "#000000",
  //   margin: "0 auto",
  //   marginTop: "-10px",
  // },
  paragraph: {
    fontSize: "1.2rem",
    color: "#000000",
    textAlign: "center",
    marginBottom: "2rem",
  },
  calendarContainer: {
    width: "100%",
    flexGrow: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "0rem",
  },
  modalButtonContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    gap: "1rem",
    marginTop: "30px",
  },
  cancelButton: {
    maxWidth: "100%", // Ensures buttons resize on smaller screens
    fontSize: "2.8rem",
    marginBottom: "10px",
    cursor: "pointer",
  },
  continueButton: {
    flex: "1",
    maxWidth: "100%",
    height: "3.1rem",
    backgroundColor: "#003554",
    color: "#FFFFFF",
    border: "1px solid #000000",
    borderRadius: "5px",
    fontSize: "1rem",
    cursor: "pointer",
  },
  errorMessage: {
    color: 'red',
    fontSize: '18px',
    textAlign: 'center',
  },
  content: {
    width: "100%",
    height: "91vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
  },
};

export default DateSelection;
