  import React, { useState, useCallback } from 'react';
  import SuccessVisitPopup from './SuccessVisitPopup';
  import CloseButton from "../components/CloseButton";
  import BackButtonPopup from "../components/BackButtonPopup";

  interface TimeSelectionPopupProps {
    isOpen: boolean;
    onClose: () => void;
    onBack: () => void;
    selectedSuggestion: {
      title: string;
      address: string;
      timeOpen: string;
      visitDate: string;
      booked: boolean;
      timeStart: string | null;
      timeEnd: string| null;
    };
    selectedDate: Date;
    startTime: string | null;
    endTime: string | null;
    setStartTime: (value: string | null) => void;
    setEndTime: (value: string | null) => void;
  }

  const parseTimeString = (timeString: string) => {
    const [start, end] = timeString.split(' - ');
    const startHour = parseInt(start.split(' ')[0]);
    const endHour = parseInt(end.split(' ')[0]);
    const isStartAM = start.toLowerCase().includes('a.m.');
    const isEndAM = end.toLowerCase().includes('a.m.');

    // Convert to 24 hour format
    const startHour24 = isStartAM ? startHour : startHour + 12;
    const endHour24 = isEndAM ? endHour : endHour + 12;

    return { startHour24, endHour24 };
  };

  const generateTimeOptions = (selectedSuggestion: { timeOpen: string }) => {
    const { startHour24, endHour24 } = parseTimeString(selectedSuggestion.timeOpen);
    const options = [];

    for (let hour = startHour24; hour <= endHour24; hour++) {
      const isPM = hour >= 12;
      const displayHour = hour % 12 || 12;
      for (let minute = 0; minute < 60; minute += 15) {
        const formattedHour = displayHour.toString();
        const formattedMinute = minute.toString().padStart(2, '0');
        const period = isPM ? 'PM' : 'AM';
        const timeString = `${formattedHour}:${formattedMinute} ${period}`;
        options.push(timeString);
      }
    }
    return options;
  };

  export default function TimeSelectionPopup({
    isOpen,
    onClose,
    onBack,
    selectedSuggestion,
    selectedDate,
    startTime,
    endTime,
    setStartTime,
    setEndTime,
  }: TimeSelectionPopupProps) {
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);

    const convertToMinutes = (time: string) => {
      const [timePart, period] = time.split(' ');
      const [hour, minute] = timePart.split(':').map(Number);
      const hour24 = period === 'PM' && hour !== 12 ? hour + 12 : hour === 12 && period === 'AM' ? 0 : hour;
      return hour24 * 60 + minute;
    };

    const validateTimes = useCallback(() => {
      if (!startTime || !endTime) {
        return false;
      }
      const startTotalMinutes = convertToMinutes(startTime);
      const endTotalMinutes = convertToMinutes(endTime);
      return startTotalMinutes < endTotalMinutes;
    }, [startTime, endTime]);

    const handleConfirmTimes = () => {
      if (validateTimes()) {
        selectedSuggestion.timeStart = startTime;
        selectedSuggestion.timeEnd = endTime;
        selectedSuggestion.booked = true;
        setShowSuccessPopup(true);
      }
    };

    if (!isOpen) return null;

    return (
      <>
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
                onClick={onBack}
                ariaLabel="Go Back from Add Visit"
              />
            </div>
            <div style={{
              position: "absolute",
              top: "20px",
              right: "25px",
              zIndex: 1100,
            }}>
              <CloseButton onClick={onClose} ariaLabel="Close Manage Trips Popup" />
            </div>
            <h2 style={{
              fontSize: "24px",
              color: "#000",
              marginTop: "90px",
              textAlign: "center",
            }}>
              Select visit time for {selectedSuggestion.title}
            </h2>

            <p style={{ color: "black", marginBottom: "20px", marginTop: "-150px" }}>
              Location hours: {selectedSuggestion.timeOpen}
            </p>

            <div style={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              alignItems: "flex-start",
              marginBottom: "40px",
              width: "100%",
              maxWidth: "300px",
              color: "black",
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                <label style={{ color: "black", width: "120px", fontWeight: "bold", }}>Start Time:</label>
                <select 
                  value={startTime || ''}
                  onChange={(e) => setStartTime(e.target.value)}
                  style={{
                    padding: "8px",
                    borderRadius: "8px",
                    border: "1px solid #003554",
                    backgroundColor: "white",
                    fontSize: "16px",
                    width: "140px"
                  }}
                >
                  <option value="">Select Time</option>
                  {generateTimeOptions(selectedSuggestion).map(time => (
                    <option key={time} value={time}>{time}</option>
                  ))}
                </select>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                <label style={{ color: "black", width: "100px",fontWeight: "bold", }}>End Time:</label>
                <select 
                  value={endTime || ''}
                  onChange={(e) => setEndTime(e.target.value)}
                  style={{
                    padding: "8px",
                    borderRadius: "8px",
                    border: "1px solid #003554",
                    backgroundColor: "white",
                    fontSize: "16px",
                    width: "140px"
                  }}
                >
                  <option value="">Select Time</option>
                  {generateTimeOptions(selectedSuggestion).map(time => (
                    <option key={time} value={time}>{time}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Conditional Message */}
            {!validateTimes() && (
              <p style={{
                color: "red",
                fontSize: "16px",
                textAlign: "center",
                marginBottom: "20px"
              }}>
                Please select a valid start and end time pair to continue.
              </p>
            )}

            <div style={{
              display: "flex",
              flexDirection: "column",
              gap: "15px",
              width: "100%",
              maxWidth: "300px",
            }}>
              <button
                onClick={handleConfirmTimes}
                disabled={!validateTimes()}
                style={{
                  width: "100%",
                  height: "3.1rem",
                  backgroundColor: validateTimes() ? "#003554" : "#cccccc",
                  color: "white",
                  border: "1px solid #000000",
                  borderRadius: "5px",
                  fontSize: "1rem",
                  fontFamily: "Verdana, Geneva, Tahoma, sans-serif",
                  cursor: validateTimes() ? "pointer" : "not-allowed",
                  marginTop: "2.2rem",
                }}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>

        {showSuccessPopup && (
          <SuccessVisitPopup
            isOpen={showSuccessPopup}
            onClose={() => {
              setShowSuccessPopup(false);
              onClose();
            }}
            selectedSuggestion={selectedSuggestion}
            selectedDate={selectedDate}
            startTime={startTime}
            endTime={endTime}
          />
        )}
      </>
    );
  }