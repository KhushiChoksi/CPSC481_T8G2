"use client";

import React, { useState } from "react";
import CloseButton from "../CloseButton";
import ResetPasswordPopup from "./ResetPasswordPopup";
import { useAccount } from "../../context/AccountContext";

interface UpdatePasswordPopupProps {
  onClose: () => void; // Close all popups
  onGoBack: () => void; // Go back to the previous popup
  onComplete: () => void; // Callback after password update flow
}

const UpdatePasswordPopup: React.FC<UpdatePasswordPopupProps> = ({
  onClose,
  onComplete,
}) => {
  const { updatePassword } = useAccount(); // Use the context function
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showResetPasswordPopup, setShowResetPasswordPopup] = useState(false);

  const handleConfirm = () => {
    // Front-end validation
    if (!currentPassword || !newPassword || !confirmNewPassword) {
      setErrorMessage("All fields are required.");
      return;
    }
    if (newPassword !== confirmNewPassword) {
      setErrorMessage("New passwords do not match.");
      return;
    }

    // Use the context to validate and update the password
    const isSuccess = updatePassword(currentPassword, newPassword);
    if (!isSuccess) {
      setErrorMessage("Current password is incorrect.");
      return;
    }

    // Close popup and let the main page handle success messages
    setErrorMessage("");
    onComplete(); // Notify parent component of successful update
  };

  if (showResetPasswordPopup) {
    return (
      <ResetPasswordPopup
        onClose={onClose}
        onGoBack={() => setShowResetPasswordPopup(false)}
        redirectTo="/account-settings"
      />
    );
  }

  return (
    <>
      {/* Blur Effect */}
      <div style={styles.blurOverlay}></div>

      {/* Modal */}
      <div style={styles.modalOverlay}>
        <div style={styles.modal}>
          {/* Close Button */}
          <div style={styles.closeButtonContainer}>
            <CloseButton onClick={onClose} ariaLabel="Close Update Password Popup" />
          </div>

          {/* Title */}
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
            onClick={() => setShowResetPasswordPopup(true)}
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
          <div style={styles.errorContainer}>
            {errorMessage && <div style={styles.errorMessage}>{errorMessage}</div>}
          </div>

          {/* Confirm Button */}
          <div style={styles.modalButtonContainer}>
            <button style={styles.longConfirmButton} onClick={handleConfirm}>
              Confirm Password Update
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
    zIndex: 2000,
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
    marginBottom: "1.5rem",
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
    fontFamily: "Verdana, Geneva, Tahoma, sans-serif",
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
    fontFamily: "Verdana, Geneva, Tahoma, sans-serif",
    cursor: "pointer",
    marginBottom: "1.5rem",
    textAlign: "center",
  },
  errorContainer: {
    width: "100%",
    height: "0.5rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "1rem",
  },
  errorMessage: {
    color: "red",
    fontSize: "1rem",
    fontFamily: "Verdana, Geneva, Tahoma, sans-serif",
  },
  modalButtonContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "1.5rem",
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

export default UpdatePasswordPopup;
