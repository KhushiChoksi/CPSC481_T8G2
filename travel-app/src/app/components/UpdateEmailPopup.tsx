"use client";

import React, { useState } from "react";
//import SuccessPopup from "./SuccessPopup"; // Reuse for confirmation

interface UpdateEmailPopupProps {
  onCancel: () => void;
  onComplete: () => void;
}

const UpdateEmailPopup: React.FC<UpdateEmailPopupProps> = ({
  onCancel,
  onComplete,
}) => {
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleConfirm = () => {
    if (!email || !confirmEmail) {
      setErrorMessage("Both email fields are required.");
      return;
    }
    if (email !== confirmEmail) {
      setErrorMessage("Email addresses do not match.");
      return;
    }

    // Reset error message and call onComplete
    setErrorMessage("");
    onComplete();
  };

  return (
    <div style={styles.modalOverlay}>
      <div style={styles.modal}>
        {/* Title */}
        <h1 style={styles.modalTitle}>
          Update Email<span style={styles.underline}></span>
        </h1>

        {/* Input Fields */}
        <div style={styles.inputGroup}>
          <label style={styles.label}>Please enter your email:</label>
          <input
            type="email"
            style={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter new email"
          />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Please confirm your email:</label>
          <input
            type="email"
            style={styles.input}
            value={confirmEmail}
            onChange={(e) => setConfirmEmail(e.target.value)}
            placeholder="Confirm new email"
          />
        </div>

        {/* Reserved Error Message Space */}
        <div style={styles.errorContainer}>
          {errorMessage && (
            <div style={styles.errorMessage}>{errorMessage}</div>
          )}
        </div>

        {/* Buttons */}
        <div style={styles.modalButtonContainer}>
          <button style={styles.longCancelButton} onClick={onCancel}>
            Cancel
          </button>
          <button style={styles.longConfirmButton} onClick={handleConfirm}>
            Confirm Email Update
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
    boxSizing: "border-box",
  },
  modalTitle: {
    fontSize: "2.5rem",
    fontFamily: "Subtitle, sans-serif",
    color: "#000000",
    textAlign: "center",
   // marginBottom: "1rem",
    position: "relative",
  },
  underline: {
    display: "block",
    height: "3px",
    width: "100%",
    backgroundColor: "#000000",
    margin: "0 auto",
  },
  inputGroup: {
    width: "100%",
    marginBottom: "1.5rem",
    display: "flex",
    flexDirection: "column",
  },
  label: {
    fontSize: "1.2rem",
    color: "#000000",
    marginBottom: "0.5rem",
  },
  input: {
    width: "100%",
    height: "2.5rem",
    borderRadius: "8px",
    border: "1px solid #000000",
    padding: "0 0.5rem",
    fontSize: "1rem",
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
  },
  modalButtonContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "3rem",
    width: "100%",
  },
  longCancelButton: {
    width: "100%",
    height: "3.1rem",
    backgroundColor: "#FFFFFF",
    color: "#003554",
    border: "1px solid #000000",
    borderRadius: "5px",
  },
  longConfirmButton: {
    width: "100%",
    height: "3.1rem",
    backgroundColor: "#003554",
    color: "#FFFFFF",
    border: "1px solid #000000",
    borderRadius: "5px",
  },
};

export default UpdateEmailPopup;
