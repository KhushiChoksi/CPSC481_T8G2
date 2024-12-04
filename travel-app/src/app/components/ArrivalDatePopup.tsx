"use client";
// npm install react-calendar
import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../globals.css";
import CloseButton from "./CloseButton";
import BackButtonPopup from "./BackButtonPopup";

interface TravelDetailsModalProps {
  onClose: () => void; // Close all popups
  onGoBack: () => void; // Navigate back to the previous popup
  onContinue: (date: Date | null) => void; // Proceed with selected date
}

const TravelDetailsModal: React.FC<TravelDetailsModalProps> = ({
  onClose,
  onGoBack,
  onContinue,
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleConfirmDate = () => {
    if (!selectedDate) {
      setErrorMessage("Please select an arrival date before continuing.");
      return;
    }
    setErrorMessage("");
    onContinue(selectedDate); // Pass selected date to the next popup
  };

  return (
    <div style={styles.modalOverlay}>
      <div style={styles.modal}>
        {/* Back Button */}
        <div style={styles.backButtonContainer}>
          <BackButtonPopup
            onClick={onGoBack} // Navigate to the previous popup
            ariaLabel="Go Back from Travel Details"
          />
        </div>

        {/* Close Button */}
        <div style={styles.closeButtonContainer}>
          <CloseButton
            onClick={onClose} // Close all popups
            ariaLabel="Close Travel Details Popup"
          />
        </div>

        {/* Title */}
        <h1 style={styles.modalTitle}>
          Travel Details
          <span style={styles.underline}></span>
        </h1>

        {/* Subtitle */}
        <h2 style={styles.subtitle}>When are you arriving?</h2>

        {/* Error Message */}
        <div style={styles.errorContainer}>
          {errorMessage && <div style={styles.errorMessage}>{errorMessage}</div>}
        </div>

        {/* Calendar */}
        <div style={styles.calendarContainer}>
          <Calendar
            onChange={(date) => setSelectedDate(date as Date)} // Update selected date
            value={selectedDate} // Highlight selected date
            showNeighboringMonth={false} // Exclude days from adjacent months
          />
        </div>

        {/* Go Back and Confirm Buttons */}
        <div style={styles.modalButtonContainer}>
          <button style={styles.cancelButton} onClick={onGoBack}>
            Back
          </button>
          <button style={styles.continueButton} onClick={handleConfirmDate}>
            Confirm Date
          </button>
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
    zIndex: "1002",
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
    justifyContent: "flex-start", // Align content at the top
    alignItems: "center",
    overflowY: "auto",
    boxSizing: "border-box",
    gap: "1rem", // Add spacing between elements
  },
  backButtonContainer: {
    position: "absolute",
    top: "10px",
    left: "20px",
    zIndex: 1100,
  },
  closeButtonContainer: {
    position: "absolute",
    top: "10px",
    right: "20px",
    zIndex: 1100,
  },
  modalTitle: {
    fontSize: "2.5rem",
    fontFamily: "Verdana, Geneva, Tahoma, sans-serif",
    color: "#000000",
    textAlign: "center",
    marginBottom: "1rem",
  },
  underline: {
    display: "block",
    height: "3px",
    width: "100%",
    backgroundColor: "#000000",
    margin: "0 auto",
    marginTop: "-10px",
  },
  subtitle: {
    fontSize: "1.5rem",
    fontFamily: "Verdana, Geneva, Tahoma, sans-serif",
    color: "#000000",
    textAlign: "center",
    marginBottom: "2rem",
  },
  errorContainer: {
    height: "2rem", // Reserve space for error message
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "1rem",
  },
  errorMessage: {
    color: "red",
    fontSize: "1rem",
    textAlign: "center",
    fontFamily: "Verdana, Geneva, Tahoma, sans-serif",
  },
  calendarContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    marginBottom: "1rem",
  },
  modalButtonContainer: {
    marginTop: "auto", // Push buttons to the bottom
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    gap: "1rem",
  },
  cancelButton: {
    flex: "1",
    maxWidth: "44%",
    height: "3.1rem",
    backgroundColor: "#FFFFFF",
    color: "#003554",
    border: "1px solid #000000",
    borderRadius: "5px",
    fontSize: "1rem",
    cursor: "pointer",
    fontFamily: "Verdana, Geneva, Tahoma, sans-serif",
  },
  continueButton: {
    flex: "1",
    maxWidth: "44%",
    height: "3.1rem",
    backgroundColor: "#003554",
    color: "#FFFFFF",
    border: "1px solid #000000",
    borderRadius: "5px",
    fontSize: "1rem",
    cursor: "pointer",
    fontFamily: "Verdana, Geneva, Tahoma, sans-serif",
  },
};

export default TravelDetailsModal;
