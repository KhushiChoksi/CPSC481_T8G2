"use client";

import React from "react";

interface SuccessPopupProps {
  title: string; // Title text for the popup
  subtitle: string; // Subtitle text for the popup
  buttonText: string; // Text for the button
  onGetStarted: () => void; // Callback for the button action
  errorMessage?: string; // Optional red message to display
}

const SuccessPopup: React.FC<SuccessPopupProps> = ({
  title,
  subtitle,
  buttonText,
  onGetStarted,
  errorMessage,
}) => {
  return (
    <>
      {/* Blur Effect */}
      <div style={styles.blurOverlay}></div>

      {/* Modal */}
      <div style={styles.modalOverlay}>
        <div style={styles.modal}>
          {/* Title */}
          <h1 style={styles.modalTitle}>
            {title}
            <span style={styles.underline}></span>
          </h1>

          {/* Subtitle */}
          <h2 style={styles.subtitle}>{subtitle}</h2>

          {/* Error Message */}
          {errorMessage && <p style={styles.errorMessage}>{errorMessage}</p>}

          {/* Button */}
          <button style={styles.longButton} onClick={onGetStarted}>
            {buttonText}
          </button>
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
    zIndex: 1001, // Ensure blur is below modal
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
    boxSizing: "border-box",
    zIndex: 1002,
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
    justifyContent: "space-between", // Space between title, subtitle, and button
    alignItems: "center",
    overflowY: "auto", // Add scrolling for overflow content
    boxSizing: "border-box",
  },
  modalTitle: {
    fontSize: "2.5rem", // Adjust for responsiveness
    fontFamily: "Subtitle, sans-serif",
    color: "#000000",
    textAlign: "center",
    marginBottom: "2rem", // Space between title and subtitle
  },
  underline: {
    display: "block",
    height: "3px",
    width: "100%",
    backgroundColor: "#000000",
    margin: "0 auto",
    marginTop: "-10px",
  },
  subtitle: {
    fontSize: "1.5rem",
    fontFamily: "Subtitle, sans-serif",
    color: "#000000",
    textAlign: "center",
    marginBottom: "1rem",
  },
  errorMessage: {
    fontSize: "1.1rem",
    color: "red",
    textAlign: "center",
    marginTop: "0.5rem",
  },
  longButton: {
    width: "100%", // Full width for responsiveness
    height: "3.1rem", // Matches updated button height
    backgroundColor: "#003554",
    color: "#FFFFFF",
    border: "1px solid #000000",
    borderRadius: "5px",
    fontSize: "1rem",
    cursor: "pointer",
    marginTop: "auto", // Push button to the bottom
  },
};

export default SuccessPopup;
