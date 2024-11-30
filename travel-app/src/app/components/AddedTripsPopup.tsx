"use client";

import React, { useState } from "react";
import ManageTripsPopup from "./ManageTripsPopup"; // Import the ManageTripsPopup

interface AddedTripsPopupProps {
  onClose: () => void; // Callback to close the popup
  selectedTrip: string; // Currently selected trip
  onTripChange: (tripName: string) => void; // Callback to update the selected trip
}

const AddedTripsPopup: React.FC<AddedTripsPopupProps> = ({
  onClose,
  selectedTrip,
  onTripChange,
}) => {
  const [showManageTrips, setShowManageTrips] = useState(false);

  const trips = [
    { name: "Trip 1", dates: "2024/09/02 - 2024/09/16" },
    { name: "Trip 2", dates: "2024/10/20 - 2024/11/20" },
    { name: "Trip 3", dates: "2025/01/05 - 2025/02/05" },
  ];

  return (
    <>
      {/* Background Blur Overlay */}
      <div style={styles.blurOverlay}></div>

      {/* Modal */}
      {!showManageTrips && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            {/* Title */}
            <h1 style={styles.modalTitle}>
              Added Trips<span style={styles.underline}></span>
            </h1>

            {/* Trips List */}
            <div style={styles.tripList}>
              {trips.map((trip) => (
                <label
                  key={trip.name}
                  style={{
                    ...styles.tripItem,
                    fontWeight: selectedTrip === trip.name ? "bold" : "normal",
                  }}
                >
                  <input
                    type="radio"
                    name="trip"
                    value={trip.name}
                    checked={selectedTrip === trip.name}
                    onChange={() => onTripChange(trip.name)}
                    style={styles.radioInput}
                  />
                  <div style={styles.tripDetails}>
                    <span>{trip.name}</span>
                    <br />
                    <span style={{ fontWeight: "normal" }}>{trip.dates}</span>
                  </div>
                </label>
              ))}
            </div>

            {/* Bottom Section */}
            <div style={styles.bottomSection}>
              <div style={styles.buttonContainer}>
                <button style={styles.backButton} onClick={onClose}>
                  Back
                </button>
                <button
                  style={styles.manageButton}
                  onClick={() => setShowManageTrips(true)}
                >
                  Manage
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ManageTripsPopup */}
      {showManageTrips && (
        <ManageTripsPopup
          onClose={() => setShowManageTrips(false)}
          onAddTrip={() => alert("Add Trip clicked!")}
          onEditTrip={(trip) => alert(`Edit Trip: ${trip}`)}
          onRemoveTrip={(trip) => alert(`Remove Trip: ${trip}`)}
        />
      )}
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
    backdropFilter: "blur(5px)", // Apply blur effect
    zIndex: 998, // Ensure blur stays below modal and TripButton
  },
  modalOverlay: {
    position: "fixed",
    top: "63px",
    left: 0,
    width: "100vw",
    height: "calc(100vh - 63px)",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    zIndex: 1001,
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
    fontFamily: "Subtitle, sans-serif",
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
  tripList: {
    width: "100%",
    flex: 1, // Ensure it takes up remaining space
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    overflowY: "auto",
    marginTop: "6rem",
  },
  tripItem: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "1rem",
    borderRadius: "8px",
    backgroundColor: "#FFFFFF",
    border: "1px solid #000000",
    cursor: "pointer",
  },
  radioInput: {
    marginRight: "1.69rem",
  },
  tripDetails: {
    flex: 1,
    textAlign: "left",
  },
  bottomSection: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  buttonContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    gap: "1rem",
  },
  backButton: {
    flex: 1,
    maxWidth: "44%",
    height: "3.1rem",
    backgroundColor: "#FFFFFF",
    color: "#003554",
    border: "1px solid #000000",
    borderRadius: "5px",
    fontSize: "1rem",
    cursor: "pointer",
  },
  manageButton: {
    flex: 1,
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

export default AddedTripsPopup;
