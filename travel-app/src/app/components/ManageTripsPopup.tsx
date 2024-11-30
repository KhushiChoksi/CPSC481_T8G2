"use client";

import React from "react";
import { FaTimesCircle } from "react-icons/fa"; // Red X icon
import { FaEdit } from "react-icons/fa"; // Edit icon

interface ManageTripsPopupProps {
  onClose: () => void; // Callback to close the popup
  onAddTrip: () => void; // Callback to add a trip
  onEditTrip: (tripName: string) => void; // Callback to edit a trip
  onRemoveTrip: (tripName: string) => void; // Callback to remove a trip
}

const ManageTripsPopup: React.FC<ManageTripsPopupProps> = ({
  onClose,
  onAddTrip,
  onEditTrip,
  onRemoveTrip,
}) => {
  const trips = [
    { name: "Trip 1", dates: "2024/09/02 - 2024/09/16" },
    { name: "Trip 2", dates: "2024/10/20 - 2024/11/20" },
    { name: "Trip 3", dates: "2025/01/05 - 2025/02/05" },
  ];

  return (
    <>
      {/* Modal */}
      <div style={styles.modalOverlay}>
        <div style={styles.modal}>
          {/* Title */}
          <h1 style={styles.modalTitle}>
            Manage Trips<span style={styles.underline}></span>
          </h1>

          {/* Trips List */}
          <div style={styles.tripList}>
            {trips.map((trip) => (
              <div key={trip.name} style={styles.tripItem}>
                {/* Remove Icon */}
                <FaTimesCircle
                  style={styles.removeIcon}
                  onClick={() => onRemoveTrip(trip.name)}
                  title="Remove Trip"
                />

                {/* Trip Details */}
                <div style={styles.tripDetails}>
                  <span>{trip.name}</span>
                  <br />
                  <span style={{ fontWeight: "normal" }}>{trip.dates}</span>
                </div>

                {/* Edit Icon */}
                <FaEdit
                  style={styles.editIcon}
                  onClick={() => onEditTrip(trip.name)}
                  title="Edit Trip"
                />
              </div>
            ))}
          </div>

          {/* Add Trip Button */}
          <div style={styles.bottomSection}>
            <button style={styles.addTripButton} onClick={onAddTrip}>
              Add a Trip
            </button>

            {/* Bottom Buttons */}
            <div style={styles.buttonContainer}>
              <button style={styles.backButton} onClick={onClose}>
                Back
              </button>
              <button style={styles.doneButton} onClick={onClose}>
                Done
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
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
  removeIcon: {
    color: "#FF0000",
    fontSize: "1.5rem",
    cursor: "pointer",
  },
  tripDetails: {
    flex: 1,
    marginLeft: "1rem",
    marginRight: "1rem",
    textAlign: "left",
  },
  editIcon: {
    color: "#000000",
    fontSize: "1.5rem",
    cursor: "pointer",
  },
  bottomSection: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  addTripButton: {
    width: "100%",
    height: "3.1rem",
    backgroundColor: "#FFFFFF",
    color: "#003554",
    border: "1px solid #000000",
    borderRadius: "5px",
    fontSize: "1rem",
    cursor: "pointer",
    marginBottom:"2rem",
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
  doneButton: {
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

export default ManageTripsPopup;
