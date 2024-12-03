"use client";

import React, { useState } from "react";
import SuccessPopup from "../SuccessPopup"; // Reuse the SuccessPopup for confirmation
import { useRouter } from "next/navigation";

interface ResetPasswordPopupLoginProps {
  onCancel: () => void; // Close the popup
  onComplete: () => void; // Callback after reset flow
  redirectTo?: string; // Determines where to navigate after success (optional)
}

const ResetPasswordPopupLogin: React.FC<ResetPasswordPopupLoginProps> = ({
  onCancel,
  onComplete,
  redirectTo = "/", // Default redirect for login flow
}) => {
  const [step, setStep] = useState<"inputEmail" | "emailSent">("inputEmail");
  const router = useRouter();

  // Email Sent Step
  if (step === "emailSent") {
    return (
      <SuccessPopup
        title="Reset Password"
        subtitle="Please check your email for password reset instructions."
        buttonText="Continue"
        onGetStarted={() => {
          onComplete(); // Close the popup
          router.push(redirectTo); // Navigate to the specified or default screen
        }}
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
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    boxSizing: "border-box",
    zIndex: "1002",
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
    overflowY: "auto",
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
  inputGroup: {
    width: "100%",
    marginBottom: "2rem",
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
    flexDirection: "column",
    alignItems: "center",
    gap: "3rem",
  },
  longCancelButton: {
    width: "100%",
    height: "3.1rem",
    backgroundColor: "#FFFFFF",
    color: "#003554",
    border: "1px solid #000000",
    borderRadius: "5px",
    fontSize: "1rem",
    fontFamily: "Verdana, Geneva, Tahoma, sans-serif",
    cursor: "pointer",
  },
  longConfirmButton: {
    width: "100%",
    height: "3.1rem",
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
