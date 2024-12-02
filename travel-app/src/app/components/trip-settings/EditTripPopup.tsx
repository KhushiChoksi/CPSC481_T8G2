"use client";

import React, { useState } from "react";
import { useTrip } from "../../context/TripContext";
import EditArrivalPopup from "./EditArrivalPopup";

interface EditTripPopupProps {
  tripName: string;
  onClose: () => void;
}

const EditTripPopup: React.FC<EditTripPopupProps> = ({ tripName, onClose }) => {
  const { trips, setTrips, setSelectedTrip } = useTrip();
  const [editedTripName, setEditedTripName] = useState(tripName);
  const [showArrivalPopup, setShowArrivalPopup] = useState(false);

  const handleSaveName = () => {
    const trimmedName = editedTripName.trim();
    if (trimmedName === "") {
      alert("Trip name cannot be empty.");
      return;
    }

    if (trips.some((trip) => trip.name === trimmedName && trip.name !== tripName)) {
      alert("A trip with this name already exists.");
      return;
    }

    // Update the trip name
    setTrips((prevTrips) =>
      prevTrips.map((trip) =>
        trip.name === tripName ? { ...trip, name: trimmedName } : trip
      )
    );

    setSelectedTrip(trimmedName); // Update the selected trip
    setShowArrivalPopup(true); // Move to the next step
  };

  return (
    <>
      {!showArrivalPopup && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <h1 style={styles.modalTitle}>
              Editing: {tripName}
              <span style={styles.underline}></span>
            </h1>

            <p style={styles.label}>
              Edit trip name or press continue to change the trip dates.
            </p>
            <input
              type="text"
              value={editedTripName}
              onChange={(e) => setEditedTripName(e.target.value)}
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
        <EditArrivalPopup
          tripName={editedTripName}
          onClose={onClose} // Pass the same close handler
          onGoBack={() => setShowArrivalPopup(false)} // Navigate back to EditTripPopup
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
  modalTitle: {
    fontSize: "2.5rem",
    fontFamily: "Verdana, Geneva, Tahoma, sans-serif",
    color: "#000000",
    textAlign: "center",
    marginBottom: "5rem",
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
    marginBottom: "0rem", // Reduced margin between label and input
    fontFamily: "Verdana, Geneva, Tahoma, sans-serif",
  },
  inputField: {
    width: "100%", // Matches the combined width of the buttons
    padding: "0.75rem",
    fontSize: "1rem",
    fontFamily: "Verdana, Geneva, Tahoma, sans-serif",
    borderRadius: "5px",
    border: "1px solid #000000",
    marginBottom: "1.5rem",
    textAlign: "center",
    marginTop: "0",
  },
  buttonContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    gap: "1rem",
    marginTop: "auto",
  },
  cancelButton: {
    flex: 1,
    maxWidth: "44%",
    height: "3.1rem",
    backgroundColor: "#FFFFFF",
    color: "#003554",
    border: "1px solid #000000",
    borderRadius: "5px",
    fontSize: "1rem",
    fontFamily: "Verdana, Geneva, Tahoma, sans-serif",
    cursor: "pointer",
  },
  saveButton: {
    flex: 1,
    maxWidth: "44%",
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

export default EditTripPopup;
