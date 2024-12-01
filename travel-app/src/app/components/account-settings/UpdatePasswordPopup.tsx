"use client";

import React, { useState } from "react";
import ResetPasswordPopup from "./ResetPasswordPopup"; // Import ResetPasswordPopup

interface UpdatePasswordPopupProps {
  onCancel: () => void;
  onComplete: () => void;
}

const UpdatePasswordPopup: React.FC<UpdatePasswordPopupProps> = ({
  onCancel,
  onComplete,
}) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showResetPasswordPopup, setShowResetPasswordPopup] = useState(false); // Toggle ResetPasswordPopup

  const handleConfirm = () => {
    if (!currentPassword || !newPassword || !confirmNewPassword) {
      setErrorMessage("All fields are required.");
      return;
    }
    if (newPassword !== confirmNewPassword) {
      setErrorMessage("New passwords do not match.");
      return;
    }

    setErrorMessage("");
    onComplete(); // Close UpdatePasswordPopup
  };

  if (showResetPasswordPopup) {
    return (
      <ResetPasswordPopup
        onCancel={() => setShowResetPasswordPopup(false)} // Close ResetPasswordPopup
        onComplete={() => {
          setShowResetPasswordPopup(false); // Close ResetPasswordPopup
        }}
        redirectTo="/account-settings" // Redirect to Account Settings
      />
    );
  }

  return (
    <div style={styles.modalOverlay}>
      <div style={styles.modal}>
        <h1 style={styles.modalTitle}>
          Update Password<span style={styles.underline}></span>
        </h1>

        {/* Current Password */}
        <div style={styles.inputGroup}>
          <label style={styles.label}>Please enter your current password:</label>
          <input
            type="password"
            style={styles.input}
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            placeholder="Enter current password"
          />
        </div>

        {/* Forgot Password */}
        <button
          style={styles.forgotPasswordButton}
          onClick={() => setShowResetPasswordPopup(true)} // Open ResetPasswordPopup
        >
          Forgot Password?
        </button>

        {/* New Password */}
        <div style={styles.inputGroup}>
          <label style={styles.label}>Please enter your new password:</label>
          <input
            type="password"
            style={styles.input}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Enter new password"
          />
        </div>

        {/* Confirm New Password */}
        <div style={styles.inputGroup}>
          <label style={styles.label}>Please confirm your new password:</label>
          <input
            type="password"
            style={styles.input}
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            placeholder="Confirm new password"
          />
        </div>

        {/* Error Message */}
        {errorMessage && (
          <div style={styles.errorMessage}>{errorMessage}</div>
        )}

        {/* Buttons */}
        <div style={styles.modalButtonContainer}>
          <button style={styles.longCancelButton} onClick={onCancel}>
            Cancel Password Update
          </button>
          <button style={styles.longConfirmButton} onClick={handleConfirm}>
            Confirm Password Update
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
  forgotPasswordButton: {
    width: "100%",
    height: "3.1rem",
    backgroundColor: "#FFFFFF",
    color: "#003554",
    border: "1px solid #000000",
    borderRadius: "5px",
    fontSize: "1rem",
    cursor: "pointer",
    marginBottom: "1.5rem",
    textAlign: "center",
  },
  errorMessage: {
    color: "red",
    fontSize: "1rem",
    textAlign: "center",
    marginBottom: "1rem",
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

export default UpdatePasswordPopup;
