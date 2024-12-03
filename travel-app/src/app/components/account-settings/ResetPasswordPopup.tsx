"use client";

import React, { useState } from "react";
import SuccessPopup from "../SuccessPopup";
import CloseButton from "../CloseButton";
import BackButtonPopup from "../BackButtonPopup";
import { useRouter } from "next/navigation";

interface ResetPasswordPopupProps {
  onClose: () => void; // Close all popups
  onGoBack: () => void; // Go back to the previous popup
  onComplete: () => void; // Callback after reset flow
  redirectTo: string; // Determines where to navigate after success
}

const ResetPasswordPopup: React.FC<ResetPasswordPopupProps> = ({
  onClose,
  onGoBack,
  onComplete,
  redirectTo,
}) => {
  const [step, setStep] = useState<"inputEmail" | "emailSent">("inputEmail");
  const router = useRouter();

  if (step === "emailSent") {
    return (
      <SuccessPopup
        title="Reset Password"
        subtitle="Please check your email for password reset instructions."
        buttonText="Continue"
        onGetStarted={() => {
          onComplete();
          router.push(redirectTo);
        }}
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
          {/* Back Button */}
          <div style={styles.backButtonContainer}>
            <BackButtonPopup
              onClick={onGoBack}
              ariaLabel="Go Back from Reset Password Popup"
            />
          </div>

          {/* Close Button */}
          <div style={styles.closeButtonContainer}>
            <CloseButton onClick={onClose} ariaLabel="Close Reset Password Popup" />
          </div>

          {/* Title */}
          <h1 style={styles.modalTitle}>
            Reset Password<span style={styles.underline}></span>
          </h1>

          {/* Input Field */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>Please enter your e-mail:</label>
            <input type="text" style={styles.input} />
          </div>

          {/* Confirm Button */}
          <div style={styles.modalButtonContainer}>
            <button
              style={styles.longConfirmButton}
              onClick={() => setStep("emailSent")}
            >
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
  backButtonContainer: {
    position: "absolute",
    top: "10px",
    left: "17px",
    zIndex: 1100,
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
    marginBottom: "2rem", // Space below the input field
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
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

export default ResetPasswordPopup;
