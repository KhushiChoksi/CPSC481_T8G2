"use client";

import React, { useState } from "react";
import SuccessPopup from "./SuccessPopup"; // Reuse the SuccessPopup for confirmation

interface ResetPasswordPopupProps {
  onCancel: () => void; // Close the popup
  onComplete: () => void; // Callback to return to login after the flow
}

const ResetPasswordPopup: React.FC<ResetPasswordPopupProps> = ({
  onCancel,
  onComplete,
}) => {
  const [step, setStep] = useState<"inputEmail" | "emailSent">("inputEmail");

  // Email Sent Step
  if (step === "emailSent") {
    return (
      <SuccessPopup
        title="Reset Password"
        subtitle="Please check your email for password reset instructions."
        buttonText="Continue"
        onGetStarted={onComplete} // Return to login on "Continue"
      />
    );
  }

  // Email Input Step
  return (
    <div style={styles.modalOverlay}>
      <div style={styles.modal}>
        {/* Title */}
        <h1 style={styles.modalTitle}>
          Reset Password<span style={styles.underline}></span>
        </h1>

        {/* Input Field */}
        <div style={styles.inputGroup}>
          <label style={styles.label}>Please enter your e-mail:</label>
          <input type="text" style={styles.input} />
        </div>

        {/* Buttons */}
        <div style={styles.modalButtonContainer}>
          <button style={styles.longCancelButton} onClick={onCancel}>
            Cancel
          </button>
          <button
            style={styles.longConfirmButton}
            onClick={() => setStep("emailSent")} // Move to the "email sent" step
          >
            Confirm Reset Password
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
    fontFamily: "Subtitle, sans-serif",
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
  inputGroup: {
    width: "100%",
    marginBottom: "2rem", // Space below the input field
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },
  label: {
    fontSize: "1.2rem",
    fontFamily: "Subtitle, sans-serif",
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
    color: "#000000",
    backgroundColor: "#FFFFFF",
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
    height: "3.1rem", // Matches the cancel button height
    backgroundColor: "#FFFFFF",
    color: "#003554",
    border: "1px solid #000000",
    borderRadius: "5px",
    fontSize: "1rem",
    cursor: "pointer",
  },
  longConfirmButton: {
    width: "100%",
    height: "3.1rem", // Matches the confirm button height
    backgroundColor: "#003554",
    color: "#FFFFFF",
    border: "1px solid #000000",
    borderRadius: "5px",
    fontSize: "1rem",
    cursor: "pointer",
  },
};

export default ResetPasswordPopup;
