"use client";

import React, { useState } from "react";
import { FaTimesCircle } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import EditTripPopup from "./EditTripPopup";
import RemoveTripPopup from "./RemoveTripPopup";
import AddNewTripPopup from "./AddNewTripPopup";
import { useTrip } from "../../context/TripContext";
import { FaInfinity } from "react-icons/fa";

const ManageTripsPopup: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { trips } = useTrip();
  const [showRemovePopup, setShowRemovePopup] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [showAddTripPopup, setShowAddTripPopup] = useState(false); // New state
  const [selectedTripToRemove, setSelectedTripToRemove] = useState<string | null>(null);
  const [selectedTripToEdit, setSelectedTripToEdit] = useState<string | null>(null);

  const handleRemoveClick = (tripName: string) => {
    setSelectedTripToRemove(tripName);
    setShowRemovePopup(true);
  };

  const handleEditClick = (tripName: string) => {
    setSelectedTripToEdit(tripName);
    setShowEditPopup(true);
  };

  return (
    <>
      <div style={styles.modalOverlay}>
        <div style={styles.modal}>
          <h1 style={styles.modalTitle}>Manage Trips
          <span style={styles.underline}></span>
          </h1>
          <div style={styles.tripList}>
            {trips.map((trip) => (
              <div key={trip.name} style={styles.tripItem}>
                <FaTimesCircle
                  style={styles.removeIcon}
                  onClick={() => handleRemoveClick(trip.name)}
                  title="Remove Trip"
                />
                <div style={styles.tripDetails}>
                  <span>{trip.name}</span>
                  <br />
                  <span>
                    {trip.dates.includes(" - ") && trip.dates.endsWith(" - ") ? (
                      <span style={{ display: "inline-flex", alignItems: "center" }}>
                        {trip.dates.split(" - ")[0]} - <FaInfinity style={{ fontSize: "1.1rem", marginLeft: "0.2rem" }} />
                      </span>
                    ) : (
                      trip.dates
                    )}
                  </span>
                </div>
                <FaEdit
                  style={styles.editIcon}
                  onClick={() => handleEditClick(trip.name)}
                  title="Edit Trip"
                />
              </div>
            ))}
          </div>

          {/* Bottom Buttons */}
          <div style={styles.bottomSection}>
            <button
              style={styles.addTripButton}
              onClick={() => setShowAddTripPopup(true)} // Show AddNewTripPopup
            >
              Add a Trip
            </button>
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

      {/* Add New Trip Popup */}
      {showAddTripPopup && (
        <AddNewTripPopup onClose={() => setShowAddTripPopup(false)} />
      )}

      {/* Remove Trip Popup */}
      {showRemovePopup && selectedTripToRemove && (
        <RemoveTripPopup
          tripName={selectedTripToRemove}
          onClose={() => setShowRemovePopup(false)}
        />
      )}

      {/* Edit Trip Popup */}
      {showEditPopup && selectedTripToEdit && (
        <EditTripPopup
          tripName={selectedTripToEdit}
          onClose={() => setShowEditPopup(false)}
        />
      )}
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
    fontFamily: "Verdana, Geneva, Tahoma, sans-serif",
    color: "#000000",
    textAlign: "center",
    marginBottom: "1rem",
  },
  underline: {
    display: "block",
    height: "3px",
    width: "100%",
    backgroundColor: "#000000",
    marginTop: "-10px",
  },
  tripList: {
    width: "100%",
    flex: 1,
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
    fontFamily: "Verdana, Geneva, Tahoma, sans-serif",
    cursor: "pointer",
    marginBottom: "2rem",
    marginTop: "2.2rem",
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
    fontFamily: "Verdana, Geneva, Tahoma, sans-serif",
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
    fontFamily: "Verdana, Geneva, Tahoma, sans-serif",
  },
};

export default ManageTripsPopup;