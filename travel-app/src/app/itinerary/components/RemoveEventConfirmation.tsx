// RemoveEventConfirmation.tsx
import React from 'react';

interface RemoveEventConfirmationProps {
    // isOpen: boolean;
    eventTitle: string;
    onCancel: () => void;
    onConfirm: () => void;
}

const RemoveEventConfirmation: React.FC<RemoveEventConfirmationProps> = ({ eventTitle, onCancel, onConfirm }) => {

  return (
    <div style={styles.modalOverlay}>
      <div style={styles.modal}>
        {/* Title */}
        <h1 style={styles.modalTitle}>
          Remove event?<span style={styles.underline}></span>
        </h1>

        {/* Subtitle */}
        <h2 style={styles.paragraph}>Press YES to remove "{eventTitle}" from your itinerary. Otherwise, press NO.</h2>

        {/* Yes and No options */}
        <div style={styles.modalButtonContainer}>
          <button style={styles.cancelButton} onClick={onConfirm}>
            YES
          </button>
          <button style={styles.continueButton} onClick={onCancel}>
            NO
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
      zIndex: 9999,
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
      color: "#000000",
      textAlign: "center",
      marginBottom: "1rem",
    },
    underline: {
      display: "block",
      height: "3px",
      width: "100%",
      backgroundColor: "#000000",
      margin: "0 auto",
      marginTop: "-10px",
    },
    paragraph: {
      fontSize: "1.5rem",
      color: "#000000",
      textAlign: "center",
      marginBottom: "2rem",
    },
    calendarContainer: {
      width: "100%",
      flexGrow: 1,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      marginBottom: "2rem",
    },
    skipButtonContainer: {
      width: "100%",
      display: "flex",
      justifyContent: "center",
      marginBottom: "1rem",
    },
    skipButton: {
      width: "345px",
      height: "50px",
      backgroundColor: "#FFFFFF",
      color: "#003554",
      border: "1px solid #000000",
      borderRadius: "5px",
      fontSize: "16px",
      cursor: "pointer",
    },
    modalButtonContainer: {
      width: "100%",
      display: "flex",
      justifyContent: "space-between",
      gap: "1rem",
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
    

export default RemoveEventConfirmation;
