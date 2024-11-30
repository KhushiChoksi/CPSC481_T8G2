"use client";

import React, { useState } from "react";
// npm install react-calendar
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../../globals.css";

interface DateSelectionModalProps {
  onClose: () => void;
  onGoBack: () => void;
  showSkip?: boolean; // Optional prop to show the "Skip" button
  onSkip?: () => void;
}

const DateSelection: React.FC<DateSelectionModalProps> = ({
  onClose,
  onGoBack,
  showSkip = false,
  onSkip,
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  return (
    <div style={styles.modalOverlay}>
      <div style={styles.modal}>
        {/* Title */}
        <h1 style={styles.modalTitle}>
          Date Selection<span style={styles.underline}></span>
        </h1>

        {/* Subtitle */}
        <h2 style={styles.paragraph}>Select the day you would like to view the itinerary of.</h2>

        {/* Calendar */}
        <div style={styles.calendarContainer}>
          <Calendar
            onChange={(date) => setSelectedDate(date as Date)}
            value={selectedDate}
            tileClassName={({ date }) =>
              selectedDate && date.toDateString() === selectedDate.toDateString()
                ? "selected-date"
                : ""
            }
          />
        </div>

        {/* Skip Button Placeholder */}
        {showSkip ? (
          <div style={styles.skipButtonContainer}>
            <button style={styles.skipButton} onClick={onSkip}>
              Skip
            </button>
          </div>
        ) : (
          <div style={{ height: "4.1rem" }} /> // Placeholder height
        )}

        {/* Go Back and Confirm Buttons */}
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
    alignItems: "center",
    overflowY: "auto",
    boxSizing: "border-box",
  },
  modalTitle: {
    fontSize: "2.5rem",
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
    marginBottom: "2rem",
  },
  skipButtonContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    marginBottom: "1rem",
  },
  skipButton: {
    width: "345px",
    height: "50px",
    backgroundColor: "#FFFFFF",
    color: "#003554",
    border: "1px solid #000000",
    borderRadius: "5px",
    fontSize: "16px",
    cursor: "pointer",
  },
  modalButtonContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
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
  },
};

export default DateSelection;
