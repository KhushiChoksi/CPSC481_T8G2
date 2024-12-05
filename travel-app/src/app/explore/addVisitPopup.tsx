import React, { useState } from "react";
import DateTimePopup from "./DateTimePopup";

import CloseButton from "../components/CloseButton"; // Import CloseButton component
import BackButtonPopup from "../components/BackButtonPopup"; // Import BackButtonPopup component

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

type Suggestion = {
  title: string;
  description: string;
  address: string;
  timeOpen: string;
  visitDate: string;
  booked: boolean;
  timeStart: string | null;
  timeEnd: string | null;
};
interface PopupModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedSuggestion: Suggestion | null;
}

const PopupModal: React.FC<PopupModalProps> = ({
  isOpen,
  onClose,
  selectedSuggestion,
}) => {
  const [showDateTimePicker, setShowDateTimePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Value>(new Date());
  const [startTime, setStartTime] = useState<string | null>(null);
  const [endTime, setEndTime] = useState<string | null>(null);

  const handleAddToSchedule = () => {
    if (selectedSuggestion && selectedDate instanceof Date && startTime && endTime) {
      const formattedDate = selectedDate.toLocaleDateString('en-CA');
      selectedSuggestion.visitDate = formattedDate;
      selectedSuggestion.timeStart = startTime;
      selectedSuggestion.timeEnd = endTime;
    }
    onClose();
  };
  if (!isOpen || !selectedSuggestion) return null;

  return (
    <>
      {!showDateTimePicker ? (
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
            <div style={{
              position: "absolute",
              top: "20px",
              left: "25px",
              zIndex: 1100,
            }}>
              <BackButtonPopup
                onClick={onClose}
                ariaLabel="Go Back from Add Visit"
              />
            </div>
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
              fontSize: "2.5rem",
              fontFamily: "Verdana, Geneva, Tahoma, sans-serif",
              color: "#000000",
              textAlign: "center",
              marginBottom: "1rem",
              marginTop: "2.5rem",
            }}>
              {selectedSuggestion.title}
              <span style={{
                display: "block",
                height: "3px",
                width: "100%",
                backgroundColor: "#000000",
                marginTop: "-10px",
              }}></span>
            </h1>

            <div style={{ color: 'black', flex: 1, marginTop: "2rem" }}>
              <p style={{ marginBottom: "25px" }}>{selectedSuggestion.description}</p>
              <p>{`Location: ${selectedSuggestion.address}`}</p>
              <p>{`Time open: ${selectedSuggestion.timeOpen}`}</p>
            </div>

            <button
              onClick={() => setShowDateTimePicker(true)}
              style={{
                width: "100%",
                height: "3.1rem",
                backgroundColor: "#003554",
                color: "#FFFFFF",
                border: "1px solid #000000",
                borderRadius: "5px",
                fontSize: "1rem",
                fontFamily: "Verdana, Geneva, Tahoma, sans-serif",
                cursor: "pointer",
                marginTop: "2.2rem",
              }}
            >
              Confirm
            </button>
          </div>
        </div>
      ) : (
        <DateTimePopup
          isOpen={showDateTimePicker}
          onClose={handleAddToSchedule}
          onBack={() => setShowDateTimePicker(false)}
          selectedSuggestion={selectedSuggestion}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
      )}
    </>
  );
};
export default PopupModal;