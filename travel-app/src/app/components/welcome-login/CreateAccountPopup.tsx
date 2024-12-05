"use client";

import React, { useState } from "react";
import TravelDetailsModal from "../ArrivalDatePopup";
import DepartureDetailsModal from "../DepartureDatePopup";
import SuccessPopup from "../SuccessPopup";
import CloseButton from "../CloseButton";
import { useRouter } from "next/navigation";
import { useTrip } from "../../context/TripContext";
import { useAccount } from "../../context/AccountContext";

interface CreateAccountModalProps {
  onClose: () => void; // Function to close the entire modal flow
}

const CreateAccountModal: React.FC<CreateAccountModalProps> = ({ onClose }) => {
  const { createAccount } = useAccount();
  const { trips, addTrip } = useTrip();
  const router = useRouter();

  const [currentStep, setCurrentStep] = useState<"account" | "arrival" | "departure" | "success">("account");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [arrivalDate, setArrivalDate] = useState<Date | null>(null); // Arrival date state
  const [departureDate, setDepartureDate] = useState<Date | null>(null); // Departure date state
  const [errorMessage, setErrorMessage] = useState("");

  const validateAccountDetails = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      setErrorMessage("All fields are required.");
      return false;
    }

    if (!emailRegex.test(email)) {
      setErrorMessage("Please enter a valid email address.");
      return false;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return false;
    }

    setErrorMessage("");
    return true;
  };

  const handleNextStep = (step: "arrival" | "departure" | "success") => {
    if (currentStep === "account" && !validateAccountDetails()) {
      return;
    }
    setCurrentStep(step);
  };

  if (currentStep === "arrival") {
    return (
      <TravelDetailsModal
        onClose={onClose}
        onGoBack={() => setCurrentStep("account")}
        onContinue={(date) => {
          setArrivalDate(date); // Save arrival date
          setCurrentStep("departure");
        }}
      />
    );
  }

  if (currentStep === "departure") {
    if (!arrivalDate) {
      setCurrentStep("arrival");
      return null;
    }
    return (
      <DepartureDetailsModal
        onClose={onClose}
        onGoBack={() => setCurrentStep("arrival")}
        onContinue={(date) => {
          setDepartureDate(date); // Save departure date
          setCurrentStep("success");
        }}
        arrivalDate={arrivalDate} // Pass the arrival date as a prop
      />
    );
  }

  if (currentStep === "success") {
    return (
      <SuccessPopup
        title="Success!"
        subtitle="Your account was successfully created."
        buttonText="Get Started"
        onGetStarted={() => {
          createAccount({
            firstName,
            lastName,
            email,
            password,
          });
  
          const baseName = "My Trip";
          const similarTrips = trips.filter((trip) => trip.name.startsWith(baseName));
          const tripName = `${baseName}${similarTrips.length || ""}`;
  
          addTrip({
            name: tripName,
            dates: `${arrivalDate?.toISOString().split("T")[0]} - ${
              departureDate ? departureDate.toISOString().split("T")[0] : ""
            }`,
          });
  
          router.push("/home");
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
          <div style={styles.closeButtonContainer}>
            <CloseButton onClick={onClose} ariaLabel="Close Create Account Popup" />
          </div>

          <h1 style={styles.modalTitle}>
            Create Account
            <span style={styles.underline}></span>
          </h1>

          {/* Error Message */}
          <div style={styles.errorMessageContainer}>
            {errorMessage && <div style={styles.errorMessage}>{errorMessage}</div>}
          </div>

          {/* Input Fields */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>Please enter your first name:</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              style={styles.input}
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Please enter your last name:</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              style={styles.input}
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Please enter your e-mail:</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Please enter a password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Please confirm your password:</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              style={styles.input}
            />
          </div>

          <div style={styles.modalButtonContainer}>
            <button style={styles.continueButton} onClick={() => handleNextStep("arrival")}>
              Continue
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
    backdropFilter: "blur(5px)", // Blur effect
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
    overflowY: "auto",
    boxSizing: "border-box",
  },
  closeButtonContainer: {
    position: "absolute",
    top: "50px",
    right: "20px",
    zIndex: 1100,
  },
  modalTitle: {
    fontSize: "2.5rem",
    fontFamily: "Verdana, Geneva, Tahoma, sans-serif",
    color: "#000000",
    textAlign: "center",
    marginTop: "2.5rem",
  },
  underline: {
    display: "block",
    height: "3px",
    width: "100%",
    backgroundColor: "#000000",
    marginTop: "-10px",
  },
  errorMessageContainer: {
    height: "2rem", // Reserve fixed space for error message
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "-2rem",
    marginTop: "-1.5rem",
  },
  errorMessage: {
    color: "red",
    fontSize: "1rem",
    textAlign: "center",
    marginBottom: "0rem",
  },
  inputGroup: {
    width: "100%",
    marginBottom: "0rem",
    display: "flex",
    flexDirection: "column",
  },
  label: {
    fontSize: "1rem",
    color: "#000000",
    marginBottom: "0.5rem",
  },
  input: {
    width: "100%",
    height: "2.5rem",
    borderRadius: "8px",
    border: "1px solid #000000",
    padding: "0 0.5rem",
  },
  modalButtonContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },
  continueButton: {
    width: "100%",
    height: "3.1rem",
    backgroundColor: "#003554",
    color: "#FFFFFF",
    border: "1px solid #000000",
    borderRadius: "5px",
    fontSize: "1rem",
  },
};

export default CreateAccountModal;
