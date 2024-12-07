import React from 'react';
import CloseButton from "../components/CloseButton"; // Import CloseButton component

interface SuccessVisitPopupProps {
  isOpen: boolean;
  onClose: () => void;
  selectedSuggestion: {
    title: string;
    address: string;
    visitDate: string;
    timeStart: string | null;
    timeEnd: string | null;
    booked: boolean;
  };
  selectedDate: Date;
  startTime: string | null;
  endTime: string | null;
}

export default function SuccessVisitPopup({
  isOpen,
  onClose,
  selectedSuggestion,
  selectedDate,
  startTime,
  endTime,
}: SuccessVisitPopupProps) {
  if (!isOpen) return null;
    return (
      <div style={{
        position: "fixed",
        top: "0",
        left: 0,
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        backdropFilter: "blur(5px)",
        zIndex: 1001,
      }}>
        <div style={{
          width: "96vw",
          height: "91vh",
          backgroundColor: "#A5B6C2",
          borderRadius: "20px",
          border: "1px solid #000000",
          padding: "20px",
          position: "relative",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          overflowY: "auto",
          boxSizing: "border-box",
        }}>

        {/* Close Button */}
        <div style={{
          position: "absolute",
          top: "20px",
          right: "25px",
          zIndex: 1100,
        }}>
          <CloseButton onClick={onClose} ariaLabel="Close Manage Trips Popup" />
        </div>

        <h1 style={{
          fontSize: "30px",
          fontWeight: "bold",
          color: "#000",
          marginTop: "25px",
          textDecoration: "underline",
        }}>
          Success!
        </h1>
        
        <h2 style={{
          fontSize: "1.5rem",
          // fontWeight: "bold",
          color: "#000",
          marginTop: "25px",
          padding: "12px",
          // textDecoration: "underline",
        }}>
          The following visit has been added to your itinerary:
        </h2>
        
        <div style={{
          padding: "20px",
          borderRadius: "8px",
          marginTop: "-70px",
          width: "100%",
          marginBottom: "20px",
          textAlign: "left",
          fontSize: "18px",
        }}>
          <p style={{ color: "black", marginBottom: "10px" }}>
            <strong>Location:</strong> {selectedSuggestion.title}
          </p>
          <p style={{ color: "black", marginBottom: "10px" }}>
            <strong>Address:</strong> {selectedSuggestion.address}
          </p>
          <p style={{ color: "black", marginBottom: "10px" }}>
            <strong>Date:</strong> {selectedDate.toLocaleDateString()}
          </p>
          <p style={{ color: "black", marginBottom: "10px" }}>
            <strong>Time:</strong> {startTime} - {endTime}
          </p>
        </div>

        <div style={{
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          width: "100%",
        }}>
          <button
            onClick={onClose}
            style={{
              backgroundColor: "#003554",
              color: "white",
              padding: "15px 30px",
              borderRadius: "8px",
              // fontWeight: "bold",
              border: "none",
              cursor: "pointer",
            }}
          >
            Return to page
          </button>
        </div>
      </div>
    </div>
  );
}