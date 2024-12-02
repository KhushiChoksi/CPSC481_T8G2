"use client";

import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../../globals.css";
import BackButtonPopup from "../BackButtonPopup";
import CloseButton from "../CloseButton";
import { useTrip } from "../../context/TripContext";

interface AddNewDeparturePopupProps {
  tripName: string;
  arrivalDate: Date;
  onClose: () => void; // Final close
  onGoBack: () => void; // Go back to AddNewArrivalPopup
  onComplete: () => void; // Navigate to ManageTripsPopup
}

const AddNewDeparturePopup: React.FC<AddNewDeparturePopupProps> = ({
  tripName,
  arrivalDate,
  onClose,
  onGoBack,
  onComplete,
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
    onComplete(); // Navigate back to ManageTripsPopup
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
    onComplete(); // Navigate back to ManageTripsPopup
  };

  return (
    <div style={styles.modalOverlay}>
      <div style={styles.modal}>
        {/* Back Button */}
        <div style={styles.backButtonContainer}>
          <BackButtonPopup
            onClick={onGoBack} // Navigate back to AddNewArrivalPopup
            ariaLabel="Go Back from Add Departure"
          />
        </div>

        {/* Close Button */}
        <div style={styles.closeButtonContainer}>
          <CloseButton
            onClick={onClose} // Close all popups
            ariaLabel="Close Add Departure Popup"
          />
        </div>

        {/* Title */}
        <h1 style={styles.modalTitle}>
          Add a Trip
          <span style={styles.underline}></span>
        </h1>
        <h2 style={styles.subtitle}>When are you leaving?</h2>

        {/* Calendar */}
        <div style={styles.calendarContainer}>
          <Calendar
            onChange={(date) => setSelectedDate(date as Date)} // Update selected date
            value={selectedDate} // Highlight selected date
            showNeighboringMonth={false} // Exclude days from adjacent months
          />
        </div>

        {/* Skip Button */}
        <div style={styles.skipButtonContainer}>
          <button style={styles.skipButton} onClick={handleSkip}>
            Skip
          </button>
        </div>

        {/* Confirm Date Button */}
        <div style={styles.buttonContainer}>
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
  backButtonContainer: {
    position: "absolute",
    top: "21px",
    left: "34px",
    zIndex: 1100,
  },
  closeButtonContainer: {
    position: "absolute",
    top: "11px",
    right: "19px",
    zIndex: 1100,
  },
  modalTitle: {
    fontSize: "2.5rem",
    fontFamily: "Verdana, Geneva, Tahoma, sans-serif",
    color: "#000000",
    textAlign: "center",
    marginBottom: "1rem",
    marginTop: "2.5rem", // Standardized value
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
    flexGrow: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    marginBottom: "0rem",
  },
  skipButtonContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    marginBottom: "1.5rem",
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
  },
  buttonContainer: {
    width: "100%",
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

export default AddNewDeparturePopup;
