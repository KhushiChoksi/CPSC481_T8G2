import React from 'react';

interface TimeSelectionPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onBack: () => void;
  selectedSuggestion: {
    title: string;
    timeOpen: string;
  };
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
    startTime,
    endTime,
    setStartTime,
    setEndTime,
}: TimeSelectionPopupProps) {
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
      zIndex: 1000,
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
      }}>
        <h2 style={{
          fontSize: "24px",
          fontWeight: "bold",
          color: "#000",
          marginBottom: "25px",
          textAlign: "center",
        }}>
          Select visit time for {selectedSuggestion.title}
        </h2>

        <p style={{ color: "black", marginBottom: "20px" }}>
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
            <label style={{ color: "black", width: "100px" }}>Start Time:</label>
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
            <label style={{ color: "black", width: "100px" }}>End Time:</label>
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

        <div style={{
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          width: "100%",
          maxWidth: "300px",
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
            Confirm Times
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
  );
}