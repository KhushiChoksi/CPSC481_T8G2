"use client";

import React from "react";
import { useTrip } from "../../context/TripContext";

interface RemoveTripPopupProps {
  tripName: string;
  onClose: () => void; // Callback to close the popup
}

const RemoveTripPopup: React.FC<RemoveTripPopupProps> = ({ tripName, onClose }) => {
  const { removeTrip } = useTrip();

  const handleRemove = () => {
    removeTrip(tripName);
    onClose();
  };

  return (
    <>
      {/* Modal */}
      <div style={styles.modalOverlay}>
        <div style={styles.modal}>
          {/* Title */}
          <h1 style={styles.modalTitle}>
            Remove Trip<span style={styles.underline}></span>
          </h1>
          {/* Confirmation Text */}
          <p style={styles.confirmText}>
            Are you sure you want to remove
            <br />
            <strong>{tripName}</strong>?
          </p>
          {/* Buttons */}
          <div style={styles.buttonContainer}>
            <button style={styles.cancelButton} onClick={onClose}>
              Cancel
            </button>
            <button style={styles.removeButton} onClick={handleRemove}>
              Remove the Trip
            </button>
          </div>
        </div>
      </div>
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
  confirmText: {
    fontSize: "1.2rem",
    textAlign: "center",
    color: "#000000",
    marginBottom: "0rem", // Reduced margin between label and input
    fontFamily: "Verdana, Geneva, Tahoma, sans-serif",
  },
  buttonContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    marginTop: "auto",
  },
  cancelButton: {
    width: "100%",
    height: "3.1rem",
    backgroundColor: "#003554", // Blue button, matching other screens
    color: "#FFFFFF",
    border: "1px solid #000000",
    borderRadius: "5px",
    fontSize: "1rem",
    fontFamily: "Verdana, Geneva, Tahoma, sans-serif",
    cursor: "pointer",
    marginBottom: "2rem"
  },
  removeButton: {
    width: "100%",
    height: "3.1rem",
    backgroundColor: "#FFFFFF", // White background, matching style
    color: "#003554",
    border: "1px solid #000000",
    borderRadius: "5px",
    fontSize: "1rem",
    fontFamily: "Verdana, Geneva, Tahoma, sans-serif",
    cursor: "pointer",
  },
};

export default RemoveTripPopup;
