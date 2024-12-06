"use client";

import React, { useState } from "react";
import SuccessPopup from "../SuccessPopup";
import CloseButton from "../CloseButton";
import { useRouter } from "next/navigation";
import { useAccount } from "../../context/AccountContext"; // Context to update password

interface ResetPasswordPopupLoginProps {
  onClose?: () => void; // Close the popup (optional chaining for safety)
  redirectTo?: string; // Determines where to navigate after success (optional)
}

const ResetPasswordPopupLogin: React.FC<ResetPasswordPopupLoginProps> = ({
  onClose,
  redirectTo = "/", // Default redirect for login flow
}) => {
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [step, setStep] = useState<"inputEmail" | "emailSent">("inputEmail");
  const router = useRouter();
  const { resetPassword } = useAccount(); // Use context to update the password

  const handleConfirm = () => {
    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      setErrorMessage("Email cannot be empty.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      setErrorMessage("Invalid email address.");
      return;
    }

    // Clear errors and proceed to the success step
    setErrorMessage("");
    setStep("emailSent");
  };

  // Handle "X" button functionality
  const handleClose = () => {
    onClose?.(); // Safely call onClose if it's defined
  };

  // If step is "emailSent", show success popup
  if (step === "emailSent") {
    return (
      <SuccessPopup
        title="Reset Password"
        subtitle="Please check your email for password reset instructions."
        errorMessage="We do not have email capabilities at this time. Your password was reset to 'password'."
        buttonText="Continue"
        onGetStarted={() => {
          resetPassword("password"); // Reset password to 'password'
          onClose?.(); // Safely close the popup
          router.push(redirectTo); // Navigate to the specified or default screen
        }}
      />
    );
  }

  // Email input step
  return (
    <>
      {/* Blur Effect */}
      <div style={styles.blurOverlay}></div>

      {/* Modal */}
      <div style={styles.modalOverlay}>
        <div style={styles.modal}>
          {/* Close Button */}
          <div style={styles.closeButtonContainer}>
            <CloseButton onClick={handleClose} ariaLabel="Close Reset Password Popup" />
          </div>

          {/* Title */}
          <h1 style={styles.modalTitle}>
            Reset Password<span style={styles.underline}></span>
          </h1>

          {/* Input Field */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>Please enter your e-mail:</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
              placeholder="Enter your email address"
            />
          </div>

          {/* Error Message */}
          <div style={styles.errorContainer}>
            {errorMessage && <div style={styles.errorMessage}>{errorMessage}</div>}
          </div>

          {/* Confirm Button */}
          <div style={styles.modalButtonContainer}>
            <button style={styles.longConfirmButton} onClick={handleConfirm}>
              Confirm Reset Password
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
    width: "100vw", // Full width of the viewport
    height: "100vh", // Full height of the viewport
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2000, // Ensure modal is above blur
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
    boxSizing: "border-box",
    position: "relative",
  },
  closeButtonContainer: {
    position: "absolute",
    top: "10px",
    right: "10px",
    zIndex: 1100, // Ensure it stays above the modal content
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
    marginBottom: "-25rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    marginTop: "-20rem",
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
    fontFamily: "Verdana, Geneva, Tahoma, sans-serif",
    color: "#000000",
    backgroundColor: "#FFFFFF",
  },
  errorContainer: {
    width: "100%",
    height: "0rem", // Reserve space for the error message
    display: "flex",
    justifyContent: "flex-start", // Aligns error message to match input alignment
  },
  errorMessage: {
    color: "red",
    fontSize: "1rem",
    fontFamily: "Verdana, Geneva, Tahoma, sans-serif",
  },
  modalButtonContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "column", // Keeps buttons stacked vertically
    alignItems: "center",
    gap: "3rem", // Adds consistent vertical spacing between buttons
  },
  longConfirmButton: {
    width: "100%",
    height: "3.1rem", // Matches the confirm button height
    backgroundColor: "#003554",
    color: "#FFFFFF",
    border: "1px solid #000000",
    borderRadius: "5px",
    fontSize: "1rem",
    fontFamily: "Verdana, Geneva, Tahoma, sans-serif",
    cursor: "pointer",
  },
};

export default ResetPasswordPopupLogin;
