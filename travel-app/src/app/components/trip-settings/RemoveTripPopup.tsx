"use client";

import React from "react";
import CloseButton from "../CloseButton"; // Import CloseButton component
import BackButtonPopup from "../BackButtonPopup"; // Import BackButtonPopup component
import { useTrip } from "../../context/TripContext";

interface RemoveTripPopupProps {
  tripName: string;
  onClose: () => void; // Close all popups
  onGoBack: () => void; // Navigate back to ManageTripsPopup
}

const RemoveTripPopup: React.FC<RemoveTripPopupProps> = ({
  tripName,
  onClose,
  onGoBack,
}) => {
  const { removeTrip } = useTrip();

  const handleRemove = () => {
    removeTrip(tripName);
    onGoBack();
  };

  return (
    <>
      {/* Modal */}
      <div style={styles.modalOverlay}>
        <div style={styles.modal}>
          {/* Back Button */}
          <div style={styles.backButtonContainer}>
            <BackButtonPopup
              onClick={onGoBack} // Navigate back to ManageTripsPopup
              ariaLabel="Go Back from Remove Trip"
            />
          </div>

          {/* Close Button */}
          <div style={styles.closeButtonContainer}>
            <CloseButton onClick={onClose} ariaLabel="Close Remove Trip Popup" />
          </div>

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
  confirmText: {
    fontSize: "1.2rem",
    textAlign: "center",
    color: "#000000",
    marginBottom: "0rem",
    fontFamily: "Verdana, Geneva, Tahoma, sans-serif",
  },
  buttonContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    marginTop: "auto",
  },
  removeButton: {
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

export default RemoveTripPopup;
