"use client";

import React, { useState } from "react";
import ManageTripsPopup from "./ManageTripsPopup";
import CloseButton from "../CloseButton";
import BackButtonPopup from "../BackButtonPopup";
import { useTrip } from "../../context/TripContext";
import { FaInfinity } from "react-icons/fa";

interface AddedTripsPopupProps {
  onClose: () => void; // Close the entire popup series
  onGoBack: () => void; // Go back one step
  selectedTrip: string;
  onTripChange: (tripName: string) => void;
}

const AddedTripsPopup: React.FC<AddedTripsPopupProps> = ({
  onClose,
  onGoBack,
  selectedTrip,
  onTripChange,
}) => {
  const { trips } = useTrip();
  const [showManageTrips, setShowManageTrips] = useState(false);

  return (
    <>
      <div style={styles.blurOverlay}></div>
      {!showManageTrips && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            {/* Back Button */}
            <div style={styles.backButtonContainer}>
              <BackButtonPopup
                onClick={onGoBack}
                ariaLabel="Go Back from Added Trips"
              />
            </div>

            {/* Close Button */}
            <div style={styles.closeButtonContainer}>
              <CloseButton onClick={onClose} ariaLabel="Close Added Trips Popup" />
            </div>

            <h1 style={styles.modalTitle}>
              Added Trips
              <span style={styles.underline}></span>
            </h1>
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
                    <span>
                      {trip.dates.includes(" - ") && trip.dates.endsWith(" - ") ? (
                        <span style={{ display: "inline-flex", alignItems: "center" }}>
                          {trip.dates.split(" - ")[0]} -{" "}
                          <FaInfinity
                            style={{
                              fontSize: selectedTrip === trip.name ? "1.2rem" : "1.1rem",
                              marginLeft: "0.2rem",
                              verticalAlign: "middle",
                            }}
                          />
                        </span>
                      ) : (
                        trip.dates
                      )}
                    </span>
                  </div>
                </label>
              ))}
            </div>
            <div style={styles.buttonContainer}>
              <button
                style={styles.manageButton}
                onClick={() => setShowManageTrips(true)}
              >
                Manage
              </button>
            </div>
          </div>
        </div>
      )}

      {showManageTrips && (
        <ManageTripsPopup
          onClose={onClose}
          onGoBack={() => setShowManageTrips(false)}
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
    position: "relative", // Allows positioning of the CloseButton
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    overflowY: "auto",
    boxSizing: "border-box",
  },
  backButtonContainer: {
    position: "absolute",
    top: "20px",
    left: "25px",
    zIndex: 1100, // Ensure it's above other content
  },
  closeButtonContainer: {
    position: "absolute",
    top: "10px",
    right: "10px",
    zIndex: 1100, // Ensure it's above other content
  },
  modalTitle: {
    fontSize: "2.5rem",
    fontFamily: "Verdana, Geneva, Tahoma, sans-serif",
    color: "#000000",
    textAlign: "center",
    marginBottom: "1rem",
    marginTop: "2.5rem",
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
  buttonContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    gap: "1rem",
  },
  manageButton: {
    flex: 1,
    maxWidth: "100%",
    height: "3.1rem",
    backgroundColor: "#003554",
    color: "#FFFFFF",
    border: "1px solid #000000",
    borderRadius: "5px",
    fontSize: "1rem",
    fontFamily: "Verdana, Geneva, Tahoma, sans-serif",
    cursor: "pointer",
  },
};

export default AddedTripsPopup;
