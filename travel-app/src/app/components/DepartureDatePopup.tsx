"use client";

import React, { useState } from "react";
// npm install react-calendar
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../globals.css";
import CloseButton from "./CloseButton";
import BackButtonPopup from "./BackButtonPopup";

interface DepartureDetailsModalProps {
  onClose: () => void; // Close all popups
  onGoBack: () => void; // Navigate back to the Arrival Date modal
  onContinue: (date: Date | null) => void; // Proceed with the selected date
  onSkip?: () => void; // Callback for "Skip" button
  arrivalDate: Date; // Arrival date for validation
}

const DepartureDetailsModal: React.FC<DepartureDetailsModalProps> = ({
  onClose,
  onGoBack,
  onContinue,
  arrivalDate,
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleConfirmDate = () => {
    if (!selectedDate) {
      setErrorMessage("Please select a departure date before continuing or press skip.");
      return;
    }

    if (selectedDate < arrivalDate) {
      setErrorMessage("Departure date cannot be earlier than the arrival date.");
      return;
    }

    setErrorMessage("");
    onContinue(selectedDate); // Pass the selected date to the next step
  };

  const handleSkip = () => {
    setErrorMessage(""); // Clear error messages
    onContinue(null); // Skip setting the departure date
  };

  return (
    <>
      {/* Blur Effect */}
      <div style={styles.blurOverlay}></div>

      <div style={styles.modalOverlay}>
        <div style={styles.modal}>
          {/* Back Button */}
          <div style={styles.backButtonContainer}>
            <BackButtonPopup
              onClick={onGoBack} // Navigate to the Arrival Date modal
              ariaLabel="Go Back from Departure Details"
            />
          </div>

          {/* Close Button */}
          <div style={styles.closeButtonContainer}>
            <CloseButton
              onClick={onClose} // Close all popups
              ariaLabel="Close Departure Details Popup"
            />
          </div>

          {/* Title */}
          <h1 style={styles.modalTitle}>
            Travel Details
            <span style={styles.underline}></span>
          </h1>

          {/* Subtitle */}
          <h2 style={styles.subtitle}>When are you leaving?</h2>

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

          {/* Skip and Confirm Buttons */}
          <div style={styles.buttonContainer}>
            <button style={styles.skipButton} onClick={handleSkip}>
              Skip
            </button>
            <button style={styles.confirmButton} onClick={handleConfirmDate}>
              Confirm Date
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  blurOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Dim background
    backdropFilter: "blur(5px)", // Blur effect
    zIndex: 1020, // Ensure blur is below modal but above everything else
  },
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw", // Full width of the viewport
    height: "100vh", // Full height of the viewport
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2000,
  },
  modal: {
    width: "96vw", // Responsive width
    height: "91vh", // Responsive height
    backgroundColor: "#A5B6C2",
    borderRadius: "20px",
    border: "1px solid #000000",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start", // Align content at the top
    alignItems: "center",
    overflowY: "auto", // Add scrolling for overflow content
    boxSizing: "border-box",
    gap: "1rem", // Consistent spacing between elements
  },
  backButtonContainer: {
    position: "absolute",
    top: "50px",
    left: "25px",
    zIndex: 1100,
  },
  closeButtonContainer: {
    position: "absolute",
    top: "50px",
    right: "20px",
    zIndex: 1100,
  },
  modalTitle: {
    fontSize: "2.5rem",
    fontFamily: "Verdana, Geneva, Tahoma, sans-serif",
    color: "#000000",
    textAlign: "center",
    marginBottom: "1rem",
    marginTop: "2.5rem", // Align with standard spacing
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
    marginBottom: "1rem", // Adjust margin for error message
  },
  errorContainer: {
    width: "100%",
    height: "0rem", // No extra space by default
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "0.6rem",
  },
  errorMessage: {
    color: "red",
    fontSize: "1rem",
    textAlign: "center",
    fontFamily: "Verdana, Geneva, Tahoma, sans-serif",
  },
  calendarContainer: {
    width: "100%",
    flexGrow: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start", // Align calendar closer to the top
    marginBottom: "1rem", // Adjust spacing
  },
  buttonContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "column", // Stack Skip and Confirm buttons vertically
    gap: "1rem",
  },
  skipButton: {
    width: "100%",
    height: "3.1rem",
    backgroundColor: "#FFFFFF",
    color: "#003554",
    border: "1px solid #000000",
    borderRadius: "5px",
    fontSize: "1rem",
    fontFamily: "Verdana, Geneva, Tahoma, sans-serif",
    cursor: "pointer",
    marginBottom: "1.5rem",
  },
  confirmButton: {
    width: "100%",
    height: "3.1rem",
    backgroundColor: "#003554", // Dark blue button
    color: "#FFFFFF",
    border: "1px solid #000000",
    borderRadius: "5px",
    fontSize: "1rem",
    fontFamily: "Verdana, Geneva, Tahoma, sans-serif",
    cursor: "pointer",
  },
};

export default DepartureDetailsModal;
