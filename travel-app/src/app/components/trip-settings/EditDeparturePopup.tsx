"use client";

import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../../globals.css";
import BackButtonPopup from "../BackButtonPopup";
import CloseButton from "../CloseButton";
import { useTrip } from "../../context/TripContext";

interface EditDeparturePopupProps {
  tripName: string;
  proposedTripName: string; // New proposed trip name
  arrivalDate: Date; // Newly selected arrival date
  onClose: () => void; // Final close
  onGoBack: () => void; // Go back to EditArrivalPopup
  onComplete: () => void; // Complete editing and navigate to ManageTripsPopup
}

const EditDeparturePopup: React.FC<EditDeparturePopupProps> = ({
  tripName,
  proposedTripName,
  arrivalDate,
  onClose,
  onGoBack,
  onComplete,
}) => {
  const { setTrips, setSelectedTrip } = useTrip();
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

    // Apply updates to the trip
    setTrips((prevTrips) =>
      prevTrips.map((trip) =>
        trip.name === tripName
          ? {
              ...trip,
              name: proposedTripName, // Update the trip name
              dates: `${arrivalDate.toLocaleDateString()} - ${selectedDate.toLocaleDateString()}`, // Update the trip dates
            }
          : trip
      )
    );

    // Update selected trip and complete
    setSelectedTrip(proposedTripName); // Set the new name as the active trip
    setErrorMessage(""); // Clear error message
    onComplete(); // Navigate back to ManageTripsPopup
  };

  const handleSkip = () => {
    // Apply updates to the trip with only arrival date
    setTrips((prevTrips) =>
      prevTrips.map((trip) =>
        trip.name === tripName
          ? {
              ...trip,
              name: proposedTripName, // Update the trip name
              dates: `${arrivalDate.toLocaleDateString()} - `, // Update the trip dates with skipped departure
            }
          : trip
      )
    );

    // Update selected trip and complete
    setSelectedTrip(proposedTripName); // Set the new name as the active trip
    setErrorMessage(""); // Clear error message
    onComplete(); // Navigate back to ManageTripsPopup
  };

  return (
    <div style={styles.modalOverlay}>
      <div style={styles.modal}>
        {/* Back Button */}
        <div style={styles.backButtonContainer}>
          <BackButtonPopup
            onClick={onGoBack} // Navigate back to EditArrivalPopup
            ariaLabel="Go Back from Edit Departure"
          />
        </div>

        {/* Close Button */}
        <div style={styles.closeButtonContainer}>
          <CloseButton
            onClick={onClose} // Close all popups
            ariaLabel="Close Edit Departure Popup"
          />
        </div>

        {/* Title */}
        <h1 style={styles.modalTitle}>
          Editing Trip
          <span style={styles.underline}></span>
        </h1>
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
    top: "11px",
    left: "30px",
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
    marginBottom: "1rem", // Adjusted for error message
  },
  errorContainer: {
    width: "100%",
    height: "0rem", // No extra space unless an error message is displayed
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "0rem",
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

export default EditDeparturePopup;
