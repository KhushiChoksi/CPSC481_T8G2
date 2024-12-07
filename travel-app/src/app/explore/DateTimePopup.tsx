import React, { useState } from "react";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import 'react-time-picker/dist/TimePicker.css';
import TimeSelectionPopup from './TimeSelectionPopup';
import CloseButton from "../components/CloseButton"; // Import CloseButton component
import BackButtonPopup from "../components/BackButtonPopup"; // Import BackButtonPopup component

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

type Suggestion = {
  title: string;
  address: string;
  timeOpen: string;
  visitDate: string;
  booked: boolean;
  timeStart: string | null;
  timeEnd: string | null;
};

interface DateTimePopupProps {
  isOpen: boolean;
  onClose: () => void;
  onBack: () => void;
  selectedSuggestion: Suggestion;
  selectedDate: Value;
  setSelectedDate: (value: Value) => void;
}

export default function DateTimePopup({
  isOpen,
  onClose,
  onBack,
  selectedSuggestion,
  selectedDate,
  setSelectedDate,
}: DateTimePopupProps) {
  const [showTimeSelection, setShowTimeSelection] = useState<boolean>(false);
  // Initial state setup
  const [startTime, setStartTime] = useState<string | null>(null);
  const [endTime, setEndTime] = useState<string | null>(null);

  if (!isOpen) return null;

  return (
    <>
      {!showTimeSelection ? (
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
            {/* Back Button */}
            <div style={{
              position: "absolute",
              top: "20px",
              left: "25px",
              zIndex: 1100,
            }}>
              <BackButtonPopup
                onClick={onBack}
                ariaLabel="Go Back from Date Selection"
              />
            </div>

            {/* Close Button */}
            <div style={{
              position: "absolute",
              top: "20px",
              right: "25px",
              zIndex: 1100,
            }}>
              <CloseButton onClick={onClose} ariaLabel="Close Date Selection Popup" />
            </div>

           
            {/* <h1 style={{
              fontSize: "2.5rem",
              fontFamily: "Verdana, Geneva, Tahoma, sans-serif",
              color: "#000000",
              textAlign: "center",
              marginBottom: "1rem",
              marginTop: "2rem",
            }}>
              Add a Visit
              <span style={{
                display: "block",
                height: "3px",
                width: "100%",
                backgroundColor: "#000000",
                marginTop: "-10px",
              }}></span>
            </h1> */}

            <h1 style={{
              fontSize: "1.5rem",
              fontFamily: "Verdana, Geneva, Tahoma, sans-serif",
              color: "#000000",
              textAlign: "center",
              marginBottom: "30px",
              marginTop: "5rem"
            }}>
              When would you like to visit {selectedSuggestion.title}?
            </h1>

            <div style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-start",
              marginBottom: "1rem",
            }}>
              <Calendar
                onChange={(value: Value) => setSelectedDate(value)}
                value={selectedDate}
                showNeighboringMonth={false}
              />
            </div>

            <div style={{
              width: "100%",
              marginTop: "auto",
            }}>
              <button
                onClick={() => setShowTimeSelection(true)}
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
                }}
              >
                Confirm Date
              </button>
            </div>
          </div>
        </div>
      ) : (
        <TimeSelectionPopup
          isOpen={showTimeSelection}
          onClose={onClose}
          onBack={() => setShowTimeSelection(false)}
          selectedSuggestion={selectedSuggestion}
          selectedDate={selectedDate instanceof Date ? selectedDate : new Date()}
          startTime={startTime}
          endTime={endTime}
          setStartTime={setStartTime}
          setEndTime={setEndTime}
        />
      )}
    </>
  );
}
