"use client";

import React, { useState } from "react";
import TravelDetailsModal from "../components/ArrivalDatePopup";
import DepartureDetailsModal from "../components/DepartureDatePopup";
import SuccessPopup from "../components/SuccessPopup";
import CancelAccountPopup from "./CancelCreateAccountPopup"; // Ensure the path is correct
import { useRouter } from "next/navigation";

interface CreateAccountModalProps {
  onClose: () => void; // Function to close the entire modal
}

const CreateAccountModal: React.FC<CreateAccountModalProps> = ({ onClose }) => {
  const router = useRouter();
  // State for tracking the current step
  const [currentStep, setCurrentStep] = useState<
    "account" | "arrival" | "departure" | "success" | "cancel"
  >("account");

  // Render the Arrival Date Modal
  if (currentStep === "arrival") {
    return (
      <TravelDetailsModal
        onClose={() => setCurrentStep("departure")} // Transition to Departure Date Modal
        onGoBack={() => setCurrentStep("account")} // Navigate back to Create Account Modal
      />
    );
  }

  // Render the Departure Date Modal
  if (currentStep === "departure") {
    return (
      <DepartureDetailsModal
        onClose={() => setCurrentStep("success")} // Transition to Success Popup
        onSkip={() => setCurrentStep("success")} // Skip to Success Popup
        onGoBack={() => setCurrentStep("arrival")} // Navigate back to Arrival Date Modal
      />
    );
  }

  // Render the Success Popup
  if (currentStep === "success") {
    return (
      <SuccessPopup
        title="Success!"
        subtitle="Your account was successfully created."
        buttonText="Get Started"
        onGetStarted={() => router.push("/home")} // Navigate to home on "Get Started"
      />
    );
  }

  // Render the Cancel Account Popup
  if (currentStep === "cancel") {
    return (
      <CancelAccountPopup
        onConfirm={onClose} // Confirm cancellation and close all modals
        onCancel={() => setCurrentStep("account")} // Return to Create Account screen
      />
    );
  }

  // Default: Render the Create Account Modal
  return (
    <div style={styles.modalOverlay}>
      <div style={styles.modal}>
        <h1 style={styles.modalTitle}>
          Create Account<span style={styles.underline}></span>
        </h1>

        {/* Input Fields */}
        <div style={styles.inputGroup}>
          <label style={styles.label}>Please enter your first name:</label>
          <input type="text" style={styles.input} />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Please enter your last name:</label>
          <input type="text" style={styles.input} />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Please enter your e-mail:</label>
          <input type="text" style={styles.input} />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Please enter a password:</label>
          <input type="password" style={styles.input} />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Please confirm your password:</label>
          <input type="password" style={styles.input} />
        </div>

        {/* Buttons */}
        <div style={styles.modalButtonContainer}>
          <button style={styles.cancelButton} onClick={() => setCurrentStep("cancel")}>
            Cancel
          </button>
          <button
            style={styles.continueButton}
            onClick={() => setCurrentStep("arrival")} // Transition to Arrival Date Modal
          >
            Continue
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
    width: "96vw", // Makes the modal width responsive
    height: "91vh", // Adjusts height based on content
    backgroundColor: "#A5B6C2",
    borderRadius: "20px",
    border: "1px solid #000000",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    overflowY: "auto", // Adds scrolling for overflow content
    boxSizing: "border-box",
  },
  modalTitle: {
    fontSize: "2.5rem", // Scales for responsiveness
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
    marginBottom: "1.5rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },
  label: {
    fontSize: "1rem", // Scales for smaller screens
    fontFamily: "Subtitle, sans-serif",
    color: "#000000",
    marginBottom: "0.5rem",
  },
  input: {
    width: "100%",
    height: "2.5rem", // Adjusts height for responsiveness
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
    justifyContent: "space-between",
    gap: "1rem", // Adds spacing between buttons
    flexWrap: "wrap", // Allows buttons to stack on small screens
  },
  cancelButton: {
    flex: "1",
    maxWidth: "44%", // Ensures buttons resize on smaller screens
    height: "3.1rem",
    backgroundColor: "#FFFFFF",
    color: "#003554",
    border: "1px solid #000000",
    borderRadius: "5px",
    fontSize: "1rem",
    cursor: "pointer",
  },
  continueButton: {
    flex: "1",
    maxWidth: "44%",
    height: "3.1rem",
    backgroundColor: "#003554",
    color: "#FFFFFF",
    border: "1px solid #000000",
    borderRadius: "5px",
    fontSize: "1rem",
    cursor: "pointer",
  },
};

export default CreateAccountModal;
