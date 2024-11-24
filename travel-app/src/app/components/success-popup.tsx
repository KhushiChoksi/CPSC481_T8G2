"use client";

import React from "react";

interface SuccessPopupProps {
  title: string; // Title text for the popup
  subtitle: string; // Subtitle text for the popup
  buttonText: string; // Text for the button
  onGetStarted: () => void; // Callback for the button action
}

const SuccessPopup: React.FC<SuccessPopupProps> = ({
  title,
  subtitle,
  buttonText,
  onGetStarted,
}) => {
  return (
    <div style={styles.modalOverlay}>
      <div style={styles.modal}>
        {/* Title */}
        <h1 style={styles.modalTitle}>
          {title}
          <span style={styles.underline}></span>
        </h1>

        {/* Subtitle */}
        <h2 style={styles.subtitle}>{subtitle}</h2>

        {/* Button */}
        <button style={styles.longButton} onClick={onGetStarted}>
          {buttonText}
        </button>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    width: "386px",
    height: "796px",
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
    fontSize: "40px",
    fontFamily: "Subtitle, sans-serif",
    color: "#000000",
    textAlign: "center",
    marginBottom: "10px",
  },
  underline: {
    display: "block",
    height: "3px",
    width: "100%",
    backgroundColor: "#000000",
    marginTop: "-10px",
  },
  subtitle: {
    fontSize: "24px",
    fontFamily: "Subtitle, sans-serif",
    color: "#000000",
    textAlign: "center",
    marginBottom: "40px", // Consistent spacing
  },
  longButton: {
    width: "307px",
    height: "50px",
    backgroundColor: "#003554",
    color: "#FFFFFF",
    border: "1px solid #000000",
    borderRadius: "5px",
    fontSize: "16px",
    cursor: "pointer",
  },
};

export default SuccessPopup;
