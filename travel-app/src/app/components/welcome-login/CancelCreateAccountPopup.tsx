"use client";

import React from "react";

interface CancelAccountPopupProps {
  onConfirm: () => void; // Callback for confirming account cancellation
  onCancel: () => void; // Callback for going back to account creation
}

const CancelAccountPopup: React.FC<CancelAccountPopupProps> = ({
  onConfirm,
  onCancel,
}) => {
  return (
    <div style={styles.modalOverlay}>
      <div style={styles.modal}>
        {/* Title */}
        <h1 style={styles.modalTitle}>
          Create Account<span style={styles.underline}></span>
        </h1>

        {/* Subtitle */}
        <h2 style={styles.subtitle}>
          Are you sure you want to cancel account creation?
        </h2>

        {/* Buttons */}
        <div style={styles.modalButtonContainer}>
          <button style={styles.longCancelButton} onClick={onConfirm}>
            Yes, cancel account creation
          </button>
          <button style={styles.longConfirmButton} onClick={onCancel}>
            No, go back to complete account
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
    width: "100vw", // Full width of the viewport
    height: "100vh", // Full height of the viewport
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    boxSizing: "border-box",
  },
  modal: {
    width: "96vw", // Responsive width
    height: "91vh", // Responsive height
    backgroundColor: "#A5B6C2",
    borderRadius: "20px",
    border: "1px solid #000000",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    overflowY: "auto", // Add scrolling for overflow content
    boxSizing: "border-box",
  },
  modalTitle: {
    fontSize: "2.5rem",
    fontFamily: "Verdana, Geneva, Tahoma, sans-serif",
    color: "#000000",
    textAlign: "center",
    position: "relative",
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
    marginTop: "10px", // Space below the title
    marginBottom: "100px", // Space above the buttons
  },
  modalButtonContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "column", // Keeps buttons stacked vertically
    alignItems: "center",
    gap: "3rem", // Adds consistent vertical spacing between buttons
  },
  longCancelButton: {
    width: "100%",
    height: "3.1rem", 
    backgroundColor: "#FFFFFF",
    color: "#003554",
    border: "1px solid #000000",
    borderRadius: "5px",
    fontSize: "1rem",
    cursor: "pointer",
    fontFamily: "Verdana, Geneva, Tahoma, sans-serif",
  },
  longConfirmButton: {
    width: "100%",
    height: "3.1rem",
    backgroundColor: "#003554",
    color: "#FFFFFF",
    border: "1px solid #000000",
    borderRadius: "5px",
    fontSize: "1rem",
    cursor: "pointer",
    fontFamily: "Verdana, Geneva, Tahoma, sans-serif",
  },
};

export default CancelAccountPopup;
