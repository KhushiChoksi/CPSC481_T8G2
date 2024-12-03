"use client";

import React, { useState } from "react";
import { useAccount } from "../../context/AccountContext";
import CloseButton from "../CloseButton";

interface UpdateEmailPopupProps {
  onCancel: () => void;
  onComplete: () => void;
}

const UpdateEmailPopup: React.FC<UpdateEmailPopupProps> = ({
  onCancel,
  onComplete,
}) => {
  const { updateEmail } = useAccount(); // Get the updateEmail method from context
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleConfirm = () => {
    if (!email || !confirmEmail) {
      setErrorMessage("Both email fields are required.");
      return;
    }
    if (email !== confirmEmail) {
      setErrorMessage("Email addresses do not match.");
      return;
    }
    if (!isValidEmail(email)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    setErrorMessage("");
    updateEmail(email); // Update email in context
    onComplete();
  };

  return (
    <>
      <div style={styles.blurOverlay}></div>
      <div style={styles.modalOverlay}>
        <div style={styles.modal}>
          <div style={styles.closeButtonContainer}>
            <CloseButton
              onClick={onCancel}
              ariaLabel="Close Update Email Popup"
            />
          </div>
          <h1 style={styles.modalTitle}>
            Update Email<span style={styles.underline}></span>
          </h1>
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
          <div style={styles.errorContainer}>
            {errorMessage && <div style={styles.errorMessage}>{errorMessage}</div>}
          </div>
          <div style={styles.modalButtonContainer}>
            <button style={styles.longConfirmButton} onClick={handleConfirm}>
              Confirm Email Update
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  blurOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Dim background
    backdropFilter: "blur(5px)",
    zIndex: 1020, // Ensure blur is below modal but above everything else
  },
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2000, // Ensure modal is above blur
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
    position: "relative",
  },
  closeButtonContainer: {
    position: "absolute",
    top: "10px",
    right: "10px",
    zIndex: 1100,
  },
  modalTitle: {
    fontSize: "2.5rem",
    fontFamily: "Verdana, Geneva, Tahoma, sans-serif",
    color: "#000000",
    textAlign: "center",
    marginBottom: "0rem",
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
    fontFamily: "Verdana, Geneva, Tahoma, sans-serif",
  },
  input: {
    width: "100%",
    height: "2.5rem",
    borderRadius: "8px",
    border: "1px solid #000000",
    padding: "0 0.5rem",
    fontSize: "1rem",
    fontFamily: "Verdana, Geneva, Tahoma, sans-serif",
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
  modalButtonContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "3rem",
    width: "100%",
  },
  longConfirmButton: {
    width: "100%",
    height: "3.1rem",
    backgroundColor: "#003554",
    color: "#FFFFFF",
    border: "1px solid #000000",
    borderRadius: "5px",
    fontFamily: "Verdana, Geneva, Tahoma, sans-serif",
  },
};

export default UpdateEmailPopup;
