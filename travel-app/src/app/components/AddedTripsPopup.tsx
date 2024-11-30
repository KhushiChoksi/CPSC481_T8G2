"use client";

import React from "react";

interface AddedTripsPopupProps {
  onClose: () => void; // Callback to close the popup
  selectedTrip: string; // Currently selected trip
  onTripChange: (tripName: string) => void; // Callback to update the selected trip
}

const AddedTripsPopup: React.FC<AddedTripsPopupProps> = ({
  onClose,
  selectedTrip,
  onTripChange,
}) => {
  const trips = [
    { name: "Trip 1", dates: "2024/09/02 - 2024/09/16" },
    { name: "Trip 2", dates: "2024/10/20 - 2024/11/20" },
    { name: "Trip 3", dates: "2025/01/05 - 2025/02/05" },
  ];

  return (
    <div style={styles.modalOverlay}>
      <div style={styles.modal}>
        {/* Title */}
        <h1 style={styles.modalTitle}>
          Added Trips<span style={styles.underline}></span>
        </h1>

        {/* Trips List */}
        <div style={styles.radioGroup}>
          {trips.map((trip) => (
            <label
              key={trip.name}
              style={{
                ...styles.radioItem,
                fontWeight: selectedTrip === trip.name ? "bold" : "normal",
              }}
            >
              <input
                type="radio"
                name="trip"
                value={trip.name}
                checked={selectedTrip === trip.name}
                onChange={() => onTripChange(trip.name)} // Update the active trip
                style={styles.radioInput}
              />
              <div>
                <span>{trip.name}</span>
                <br />
                <span style={{ fontWeight: "normal" }}>{trip.dates}</span>
              </div>
            </label>
          ))}
        </div>

        {/* Buttons */}
        <div style={styles.buttonContainer}>
          <button style={styles.backButton} onClick={onClose}>
            Back
          </button>
          <button
            style={styles.manageButton}
            onClick={() => alert("Manage clicked!")}
          >
            Manage
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
    zIndex: 1000,
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
  radioGroup: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  radioItem: {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
    padding: "1rem",
    borderRadius: "8px",
    backgroundColor: "#FFFFFF",
    border: "1px solid #000000",
    cursor: "pointer",
  },
  radioInput: {
    marginRight: "1rem",
  },
  buttonContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    gap: "1rem",
  },
  backButton: {
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
  manageButton: {
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

export default AddedTripsPopup;
