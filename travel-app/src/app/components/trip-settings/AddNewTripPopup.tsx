"use client";

import React, { useState } from "react";
import { useTrip } from "../../context/TripContext";
import AddNewArrivalPopup from "./AddNewArrivalPopup";
import CloseButton from "../CloseButton";
import BackButtonPopup from "../BackButtonPopup";

interface AddNewTripPopupProps {
  onClose: () => void; // Final close
  onGoBack: () => void; // Go back to ManageTripsPopup
  onComplete: () => void; // Notify ManageTripsPopup that the flow is complete
}

const AddNewTripPopup: React.FC<AddNewTripPopupProps> = ({
  onClose,
  onGoBack,
  onComplete,
}) => {
  const { trips } = useTrip();
  const [newTripName, setNewTripName] = useState("");
  const [showArrivalPopup, setShowArrivalPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSaveName = () => {
    const trimmedName = newTripName.trim();

    if (trimmedName === "") {
      setErrorMessage("Trip name cannot be empty.");
      return;
    }

    if (trimmedName.length > 20) {
      setErrorMessage("Trip name cannot exceed 20 characters.");
      return;
    }

    if (trips.some((trip) => trip.name === trimmedName)) {
      setErrorMessage("A trip with this name already exists.");
      return;
    }

    // Clear error message and move to the next step
    setErrorMessage("");
    setShowArrivalPopup(true);
  };

  return (
    <>
      {!showArrivalPopup && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            {/* Back Button */}
            <div style={styles.backButtonContainer}>
              <BackButtonPopup
                onClick={onGoBack} // Navigate back to ManageTripsPopup
                ariaLabel="Go Back from Add Trip"
              />
            </div>

            {/* Close Button */}
            <div style={styles.closeButtonContainer}>
              <CloseButton onClick={onClose} ariaLabel="Close Add Trip Popup" />
            </div>

            <h1 style={styles.modalTitle}>
              Add a Trip
              <span style={styles.underline}></span>
            </h1>

            {/* Error Message */}
            <div style={styles.errorContainer}>
              {errorMessage && <div style={styles.errorMessage}>{errorMessage}</div>}
            </div>

            <p style={styles.label}>Enter a trip name:</p>
            <input
              type="text"
              value={newTripName}
              onChange={(e) => setNewTripName(e.target.value)}
              style={styles.inputField}
              placeholder="Enter a new trip name"
            />
            <div style={styles.buttonContainer}>
              <button style={styles.continueButton} onClick={handleSaveName}>
                Continue
              </button>
            </div>
          </div>
        </div>
      )}

      {showArrivalPopup && (
        <AddNewArrivalPopup
          tripName={newTripName}
          onClose={onClose} // Final close
          onGoBack={() => setShowArrivalPopup(false)} // Go back to this popup
          onComplete={onComplete} // Notify ManageTripsPopup
        />
      )}
    </>
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
    gap: "0.2rem",
    alignItems: "center",
    boxSizing: "border-box",
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
    marginBottom: "5rem",
    marginTop: "2.5rem",
  },
  underline: {
    display: "block",
    height: "3px",
    width: "100%",
    backgroundColor: "#000000",
    margin: "0 auto",
    marginTop: "-10px",
  },
  errorContainer: {
    width: "100%",
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
  label: {
    fontSize: "1.2rem",
    fontFamily: "Verdana, Geneva, Tahoma, sans-serif",
    textAlign: "center",
    color: "#000000",
    marginBottom: "0rem", // Reduced margin between label and input
  },
  inputField: {
    width: "100%",
    padding: "0.75rem",
    fontSize: "1rem",
    fontFamily: "Verdana, Geneva, Tahoma, sans-serif",
    color: "#000000", // Ensure the hex value has the '#' prefix
    backgroundColor: "#FFFFFF", // Explicitly set the background color for clarity
    borderRadius: "5px",
    border: "1px solid #000000",
    marginBottom: "1.5rem",
    textAlign: "center",
    marginTop: "0",
  },
  buttonContainer: {
    width: "100%",
    marginTop: "auto",
  },
  continueButton: {
    width: "100%", // Full width
    height: "3.1rem",
    backgroundColor: "#003554",
    color: "#FFFFFF",
    border: "1px solid #000000",
    borderRadius: "5px",
    fontSize: "1rem",
    fontFamily: "Verdana, Geneva, Tahoma, sans-serif",
    cursor: "pointer",
  },
};

export default AddNewTripPopup;
