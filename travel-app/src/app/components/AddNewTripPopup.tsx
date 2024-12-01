"use client";

import React, { useState } from "react";
import { useTrip } from "../context/TripContext";
import AddNewArrivalPopup from "./AddNewArrivalPopup";

interface AddNewTripPopupProps {
  onClose: () => void;
}

const AddNewTripPopup: React.FC<AddNewTripPopupProps> = ({ onClose }) => {
  const { trips } = useTrip(); // No direct trip updates here
  const [newTripName, setNewTripName] = useState("");
  const [showArrivalPopup, setShowArrivalPopup] = useState(false);

  const handleSaveName = () => {
    const trimmedName = newTripName.trim();
    if (trimmedName === "") {
      alert("Trip name cannot be empty.");
      return;
    }

    if (trips.some((trip) => trip.name === trimmedName)) {
      alert("A trip with this name already exists.");
      return;
    }

    setShowArrivalPopup(true); // Move to the next step
  };

  return (
    <>
      {!showArrivalPopup && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <h1 style={styles.modalTitle}>
              Add a Trip
              <span style={styles.underline}></span>
            </h1>

            <p style={styles.label}>Enter a trip name:</p>
            <input
              type="text"
              value={newTripName}
              onChange={(e) => setNewTripName(e.target.value)}
              style={styles.inputField}
              placeholder="Enter a new trip name"
            />
            <div style={styles.buttonContainer}>
              <button style={styles.cancelButton} onClick={onClose}>
                Cancel
              </button>
              <button style={styles.saveButton} onClick={handleSaveName}>
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
    justifyContent: "space-between",
    alignItems: "center",
    boxSizing: "border-box",
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
  label: {
    fontSize: "1.2rem",
    textAlign: "center",
    color: "#000000",
    marginBottom: "2rem",
  },
  inputField: {
    width: "90%",
    padding: "0.75rem",
    fontSize: "1rem",
    borderRadius: "5px",
    border: "1px solid #000000",
    marginBottom: "1.5rem",
    textAlign: "center",
  },
  buttonContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    gap: "1rem",
  },
  cancelButton: {
    flex: 1,
    height: "3.1rem",
    backgroundColor: "#FFFFFF",
    color: "#003554",
    border: "1px solid #000000",
    borderRadius: "5px",
    fontSize: "1rem",
    cursor: "pointer",
  },
  saveButton: {
    flex: 1,
    height: "3.1rem",
    backgroundColor: "#003554",
    color: "#FFFFFF",
    border: "1px solid #000000",
    borderRadius: "5px",
    fontSize: "1rem",
    cursor: "pointer",
  },
};

export default AddNewTripPopup;
