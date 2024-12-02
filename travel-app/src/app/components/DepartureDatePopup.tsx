"use client";

import React, { useState } from "react";
// npm install react-calendar
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../globals.css";

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
            onChange={(date) => setSelectedDate(date as Date)} // Update state with selected date
            value={selectedDate} // Highlight selected date
            showNeighboringMonth={false} // Exclude days from adjacent months
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

        {/* Go Back and Confirm Buttons */}
        <div style={styles.modalButtonContainer}>
          {onGoBack && (
            <button style={styles.cancelButton} onClick={onGoBack}>
              Back
            </button>
          )}
          <button style={styles.confirmButton} onClick={onClose}>
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
    width: "100vw", // Full width of the viewport
    height: "100vh", // Full height of the viewport
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: "1002",
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
  modalTitle: {
    fontSize: "2.5rem", // Adjust for responsiveness
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
    marginTop: "-10px",
  },
  subtitle: {
    fontSize: "1.5rem",
    fontFamily: "Verdana, Geneva, Tahoma, sans-serif",
    color: "#000000",
    textAlign: "center",
    marginBottom: "2rem", // Space below subtitle
  },
  calendarContainer: {
    width: "100%",
    flexGrow: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start", // Align calendar closer to the top
    marginBottom: "1rem", // Adjust spacing
  },
  skipButtonContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "center", // Center the Skip button
    marginBottom: "2rem", // Space between Skip and other buttons
  },
  skipButton: {
    width: "100%",
    height: "3.1rem",
    backgroundColor: "#FFFFFF",
    color: "#003554",
    border: "1px solid #000000",
    borderRadius: "5px",
    fontSize: "1rem",
    cursor: "pointer",
    fontFamily: "Verdana, Geneva, Tahoma, sans-serif",
  },
  modalButtonContainer: {
    marginTop: "auto", // Push buttons to the bottom
    width: "100%",
    display: "flex",
    justifyContent: "space-between", // Keep Go Back and Confirm buttons side by side
    gap: "1rem",
  },
  cancelButton: {
    flex: "1",
    maxWidth: "44%", // Ensures buttons resize on smaller screens
    height: "3.1rem",
    backgroundColor: "#FFFFFF",
    color: "#003554",
    border: "1px solid #000000",
    borderRadius: "5px",
    fontSize: "1rem",
    cursor: "pointer",
    fontFamily: "Verdana, Geneva, Tahoma, sans-serif",
  },
  confirmButton: {
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

export default DepartureDetailsModal;