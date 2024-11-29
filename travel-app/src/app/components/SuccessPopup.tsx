"use client";

import React from "react";
import Link from "next/link";

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
        <Link href="/home" style={styles.longButton}>
          <button style={styles.longButton} onClick={onGetStarted}>
            {buttonText}
          </button>
        </Link>
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
    marginBottom: "auto", // Push the button to the bottom
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
