import React, { useState } from "react";
import DateTimePopup from "./DateTimePopup";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

type Suggestion = {
  name: string;
  address: string;
  timeOpen: string;
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
  const [selectedTime, setSelectedTime] = useState<string | null>('12:00');

  if (!isOpen || !selectedSuggestion) return null;

  return (
    <>
      {!showDateTimePicker ? (
        <div
          style={{
            position: "fixed",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              backgroundColor: "#aaa",
              borderRadius: "10px",
              padding: "20px",
              width: "90%",
              height: "70%",
              maxWidth: "none",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              overflow: "auto",
            }}
          >
            <div style={{color:'black'}}>
            <h3
              style={{
                fontSize: "1.5rem",
                fontWeight: "bold",
                marginBottom: "10px",
              }}
            >
              {selectedSuggestion.name}
            </h3>
            <p>{`Location: ${selectedSuggestion.address}`}</p>
            <p>{`Time open: ${selectedSuggestion.timeOpen}`}</p>
            </div>
            <div style={{ marginTop: "30px", textAlign: "center" }}>
              <button
                onClick={() => setShowDateTimePicker(true)}
                style={{
                  padding: "15px 30px",
                  backgroundColor: "#007bff",
                  color: "#fff",
                  border: "none",
                  borderRadius: "8px",
                  fontSize: "1.2rem",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                Confirm
              </button>

              <div
                onClick={onClose}
                style={{
                  marginTop: "15px",
                  textDecoration: "underline",
                  color: "#000",
                  cursor: "pointer",
                  fontSize: "1rem",
                  fontWeight: "bold",
                }}
              >
                Back
              </div>
            </div>
          </div>
        </div>
      ) : (
        <DateTimePopup
          isOpen={showDateTimePicker}
          onClose={onClose}
          onBack={() => setShowDateTimePicker(false)}
          selectedSuggestion={selectedSuggestion}
          selectedDate={selectedDate}
          selectedTime={selectedTime}
          setSelectedDate={setSelectedDate}
          setSelectedTime={setSelectedTime}
        />
      )}
    </>
  );
};

export default PopupModal;