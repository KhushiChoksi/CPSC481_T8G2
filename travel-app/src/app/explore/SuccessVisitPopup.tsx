import React from 'react';

interface SuccessVisitPopupProps {
  isOpen: boolean;
  onClose: () => void;
  selectedSuggestion: {
    title: string;
    address: string;
    visitDate: string;
    timeStart: string;
    timeEnd: string;
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
      left: "0",
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 2000,
    }}>
      <div style={{
        backgroundColor: "#A5B6C2",
        borderRadius: "10px",
        padding: "20px",
        width: "95%",
        height: "80%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
      }}>
        <h2 style={{
          fontSize: "24px",
          fontWeight: "bold",
          color: "#000",
          marginBottom: "25px",
        }}>
          Would you like to add this visit to your itinerary?
        </h2>

        <div style={{
          padding: "20px",
          borderRadius: "8px",
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
              fontWeight: "bold",
              border: "none",
              cursor: "pointer",
            }}
          >
            Add to Itinerary
          </button>
          
          <button
            onClick={() => onClose()}
            style={{
              color: "#003554",
              fontWeight: "bold",
              background: "none",
              border: "none",
              cursor: "pointer",
              textDecoration: "underline",
            }}
          >
            Do not add to itinerary
          </button>
        </div>
      </div>
    </div>
  );
}