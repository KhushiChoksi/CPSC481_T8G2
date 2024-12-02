"use client";

import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../../globals.css";
import AddNewDeparturePopup from "./AddNewDeparturePopup";
import BackButtonPopup from "../BackButtonPopup";
import CloseButton from "../CloseButton";

interface AddNewArrivalPopupProps {
  tripName: string;
  onClose: () => void; // Final close
  onGoBack: () => void; // Go back to AddNewTripPopup
  onComplete: () => void; // Complete adding and navigate to ManageTripsPopup
}

const AddNewArrivalPopup: React.FC<AddNewArrivalPopupProps> = ({
  tripName,
  onClose,
  onGoBack,
  onComplete,
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showDeparturePopup, setShowDeparturePopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleConfirmDate = () => {
    if (!selectedDate) {
      setErrorMessage("Please select an arrival date before continuing.");
      return;
    }

    // Clear error message and proceed to departure popup
    setErrorMessage("");
    setShowDeparturePopup(true);
  };

  return (
    <>
      {!showDeparturePopup && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            {/* Back Button */}
            <div style={styles.backButtonContainer}>
              <BackButtonPopup
                onClick={onGoBack} // Navigate back to AddNewTripPopup
                ariaLabel="Go Back from Add Arrival"
              />
            </div>

            {/* Close Button */}
            <div style={styles.closeButtonContainer}>
              <CloseButton
                onClick={onClose} // Close all popups
                ariaLabel="Close Add Arrival Popup"
              />
            </div>

            {/* Title */}
            <h1 style={styles.modalTitle}>
              Add a Trip
              <span style={styles.underline}></span>
            </h1>
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

            {/* Confirm Button */}
            <div style={styles.buttonContainer}>
              <button style={styles.confirmButton} onClick={handleConfirmDate}>
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
          onGoBack={() => setShowDeparturePopup(false)} // Go back to this popup
          onComplete={onComplete} // Navigate back to ManageTripsPopup
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
    marginBottom: "1rem", // Adjust margin for error message
  },
  errorContainer: {
    width: "100%",
    height: "0rem", // Reserve no extra space by default
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
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start", // Ensure the calendar is closer to the top
    marginBottom: "1rem", // Reduce the bottom margin
  },
  buttonContainer: {
    width: "100%",
    marginTop: "auto",
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

export default AddNewArrivalPopup;
