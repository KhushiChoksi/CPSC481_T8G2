"use client";

import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../globals.css";
import { useTrip } from "../context/TripContext";

interface AddNewDeparturePopupProps {
  tripName: string;
  arrivalDate: Date;
  onClose: () => void;
  onGoBack: () => void; // Function to go back to the arrival popup
}

const AddNewDeparturePopup: React.FC<AddNewDeparturePopupProps> = ({
  tripName,
  arrivalDate,
  onClose,
  onGoBack,
}) => {
  const { setTrips, setSelectedTrip } = useTrip();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleConfirmDate = () => {
    if (!selectedDate) {
      alert("Please select a departure date before continuing or use 'Skip'.");
      return;
    }

    // Add the new trip with both arrival and departure dates
    setTrips((prevTrips) => [
      ...prevTrips,
      {
        name: tripName,
        dates: `${arrivalDate.toLocaleDateString()} - ${selectedDate.toLocaleDateString()}`,
      },
    ]);
    setSelectedTrip(tripName); // Update the selected trip
    onClose(); // Close the modal
  };

  const handleSkip = () => {
    // Add the new trip with only the arrival date
    setTrips((prevTrips) => [
      ...prevTrips,
      {
        name: tripName,
        dates: `${arrivalDate.toLocaleDateString()} - `,
      },
    ]);
    setSelectedTrip(tripName); // Update the selected trip
    onClose(); // Close the modal
  };

  return (
    <div style={styles.modalOverlay}>
      <div style={styles.modal}>
        <h1 style={styles.modalTitle}>
          Add a Trip
          <span style={styles.underline}></span>
        </h1>
        <h2 style={styles.subtitle}>When are you leaving?</h2>
        <div style={styles.calendarContainer}>
          <Calendar
            onChange={(date) => setSelectedDate(date as Date)} // Update selected date
            value={selectedDate} // Highlight selected date
            showNeighboringMonth={false} // Exclude days from adjacent months
          />
        </div>
        <div style={styles.skipButtonContainer}>
          <button style={styles.skipButton} onClick={handleSkip}>
            Skip
          </button>
        </div>
        <div style={styles.modalButtonContainer}>
          <button style={styles.cancelButton} onClick={onGoBack}>
            Go Back
          </button>
          <button style={styles.confirmButton} onClick={handleConfirmDate}>
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
    top: "63px",
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
    justifyContent: "flex-start",
    alignItems: "center",
    overflowY: "auto",
    boxSizing: "border-box",
    gap: "1rem",
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
    flexGrow: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    marginBottom: "1rem",
  },
  skipButtonContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "center", // Center the skip button
    marginBottom: "1rem",
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
  },
  modalButtonContainer: {
    marginTop: "auto",
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
  },
};

export default AddNewDeparturePopup;
