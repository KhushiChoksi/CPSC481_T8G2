"use client";

import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../globals.css";
import AddNewDeparturePopup from "./AddNewDeparturePopup";

interface AddNewArrivalPopupProps {
  tripName: string;
  onClose: () => void;
  onGoBack: () => void;
}

const AddNewArrivalPopup: React.FC<AddNewArrivalPopupProps> = ({
  tripName,
  onClose,
  onGoBack,
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showDeparturePopup, setShowDeparturePopup] = useState(false);

  const handleConfirmDate = () => {
    if (!selectedDate) {
      alert("Please select an arrival date before continuing.");
      return;
    }
    setShowDeparturePopup(true); // Move to the departure date popup
  };

  return (
    <>
      {!showDeparturePopup && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <h1 style={styles.modalTitle}>
              Add a Trip
              <span style={styles.underline}></span>
            </h1>
            <h2 style={styles.subtitle}>When are you arriving?</h2>
            <div style={styles.calendarContainer}>
              <Calendar
                onChange={(date) => setSelectedDate(date as Date)} // Update selected date
                value={selectedDate} // Highlight selected date
                showNeighboringMonth={false} // Exclude days from adjacent months
              />
            </div>
            <div style={styles.modalButtonContainer}>
              <button style={styles.cancelButton} onClick={onGoBack}>
                Go Back
              </button>
              <button style={styles.continueButton} onClick={handleConfirmDate}>
                Confirm Date
              </button>
            </div>
          </div>
        </div>
      )}

      {showDeparturePopup && selectedDate && (
        <AddNewDeparturePopup
          tripName={tripName}
          arrivalDate={selectedDate}
          onClose={onClose} // Final close
          onGoBack={() => setShowDeparturePopup(false)} // Go back to arrival popup
        />
      )}
    </>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  modalOverlay: {
    position: "fixed",
    top: "63px", // Align with other popups
    left: 0,
    width: "100vw",
    height: "calc(100vh - 63px)",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    zIndex: 1001,
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
    fontFamily: "Subtitle, sans-serif",
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
    fontFamily: "Subtitle, sans-serif",
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

export default AddNewArrivalPopup;
