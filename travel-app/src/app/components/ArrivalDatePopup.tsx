"use client";
// npm install react-calendar
import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../globals.css";

interface TravelDetailsModalProps {
  onClose: () => void;
  onGoBack: () => void;
}

const TravelDetailsModal: React.FC<TravelDetailsModalProps> = ({
  onClose,
  onGoBack,
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
        <h2 style={styles.subtitle}>When are you arriving?</h2>

        {/* Calendar */}
        <div style={styles.calendarContainer}>
          <Calendar
            onChange={(date) => setSelectedDate(date as Date)} // Update state with selected date
            value={selectedDate} // Highlight selected date
            showNeighboringMonth={false} // Exclude days from adjacent months
          />
        </div>

        {/* Go Back and Confirm Buttons */}
        <div style={styles.modalButtonContainer}>
          <button style={styles.cancelButton} onClick={onGoBack}>
            Back
          </button>
          <button
            style={styles.continueButton}
            onClick={() => {
              console.log("Selected Date:", selectedDate);
              onClose();
            }}
          >
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
  calendarContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start", // Ensure the calendar is closer to the top
    marginBottom: "1rem", // Reduce the bottom margin
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