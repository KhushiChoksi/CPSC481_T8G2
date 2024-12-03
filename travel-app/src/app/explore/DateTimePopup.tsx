import React, { useState } from "react";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
// import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css';
import TimeSelectionPopup from './TimeSelectionPopup';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

type Suggestion = {
  title: string;
  address: string;
  timeOpen: string;
};

interface DateTimePopupProps {
  isOpen: boolean;
  onClose: () => void;
  onBack: () => void;
  selectedSuggestion: Suggestion;
  selectedDate: Value;
  selectedTime: string | null;
  setSelectedDate: (value: Value) => void;
  setSelectedTime: (value: string | null) => void;
}

export default function DateTimePopup({
  isOpen,
  onClose,
  onBack,
  selectedSuggestion,
  selectedDate,
  selectedTime,
  setSelectedDate,
  setSelectedTime,
}: DateTimePopupProps) {
  if (!isOpen) return null;

  const [showTimeSelection, setShowTimeSelection] = useState<boolean>(false);
const [startTime, setStartTime] = useState<string | null>('12:00');
const [endTime, setEndTime] = useState<string | null>('13:00');

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
      zIndex: 1000,
    }}>
      <div style={{
        backgroundColor: "#A5B6C2",
        borderRadius: "10px",
        padding: "20px",
        width: "95%",
        height: "80%",
        alignItems: "center",
        flexDirection: "column",   // Add this
        justifyContent: "center"
      }}>

        <div style={{ marginTop: "20px", marginLeft: "20px" }}>
          <h2 style={{
            fontSize: "24px",
            fontWeight: "bold",
            color: "#000",
            marginBottom: "25px",
            textAlign: "center",
          }}>
            When would you like to visit {selectedSuggestion.title}?
          </h2>

          <div style={{
            marginBottom: "20px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            maxWidth: "350px",
            border: "1px solid #ddd",
            borderRadius: "8px",
          }}>
            <Calendar
              onChange={(value: Value) => setSelectedDate(value)}
              value={selectedDate}
            />
          </div>

          <div style={{
            marginTop: "40px", 
            display: "flex", 
            flexDirection: "column", 
            alignItems: "center",
            width: "100%",
            maxWidth: "350px",
            gap: "15px"
          }}>
            <button
              onClick={() => setShowTimeSelection(true)}
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
              Confirm Date
            </button>
            
            <button
              onClick={onBack}
              style={{
                color: "#003554",
                fontWeight: "bold",
                background: "none",
                border: "none",
                cursor: "pointer",
                textDecoration: "underline",
              }}
            >
              Back
            </button>
          </div>
        </div>
      </div>
      {showTimeSelection && (
        <TimeSelectionPopup
          isOpen={showTimeSelection}
          onClose={onClose}
          onBack={() => setShowTimeSelection(false)}
          selectedSuggestion={selectedSuggestion}
          startTime={startTime}
          endTime={endTime}
          setStartTime={setStartTime}
          setEndTime={setEndTime}
        />
      )}
    </div>
  );
}