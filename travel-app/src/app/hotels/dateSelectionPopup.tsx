"use client";
import { useState } from "react";
import Calendar, { CalendarProps } from "react-calendar";
import "react-calendar/dist/Calendar.css"; // Ensures base styles are loaded

type DateSelectionPopupProps = {
  isOpen: boolean;
  onClose: () => void;
  onSelectDates: (startDate: string, endDate: string) => void;
};

export default function DateSelectionPopup({
  isOpen,
  onClose,
  onSelectDates,
}: DateSelectionPopupProps) {
  const [selectedDates, setSelectedDates] = useState<[Date | null, Date | null]>([null, null]);

  const handleDateChange: CalendarProps["onChange"] = (value) => {
    if (Array.isArray(value)) {
      setSelectedDates([value[0], value[1]]);
    } else {
      setSelectedDates([value, null]);
    }
  };

  const handleConfirm = () => {
    if (selectedDates[0] && selectedDates[1]) {
      const startDate = selectedDates[0].toISOString().split("T")[0];
      const endDate = selectedDates[1].toISOString().split("T")[0];
      onSelectDates(startDate, endDate);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div style={styles.modalOverlay}>
      <div style={styles.modal}>
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close"
          style={styles.closeButton}
        >
          &times;
        </button>

        {/* Title */}
        <div style={styles.modalHeader}>
          <h2 style={styles.modalTitle}>Select Dates for Stay</h2>
        </div>

        {/* Calendar */}
        <div style={styles.calendarContainer}>
          <Calendar
            selectRange
            value={selectedDates}
            onChange={handleDateChange}
            className="react-calendar"
          />
        </div>

        {/* Confirm Button */}
        <div style={styles.modalButtonContainer}>
          <button
            onClick={handleConfirm}
            style={styles.confirmButton}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1002,
  },
  modal: {
    width: "96vw",
    height: "90vh",
    backgroundColor: "#A5B6C2",
    padding: "25px",
    borderRadius: "20px",
    border: "1px solid #000000",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    overflowY: "auto",
    boxSizing: "border-box",
    gap: "1rem",
    position: "relative",
  },
  closeButton: {
    position: "absolute",
    top: "15px",
    right: "15px",
    background: "none",
    border: "none",
    fontSize: "2rem",
    cursor: "pointer",
    color: "#000000",
  },
  modalHeader: {
    textAlign: "center",
    marginBottom: "1rem",
  },
  modalTitle: {
    fontSize: "2.5rem",
    fontFamily: "Verdana, Geneva, Tahoma, sans-serif",
    color: "#000000",
  },
  calendarContainer: {
    width: "100%",
    maxWidth: "400px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    border: "1px solid #ddd",
    borderRadius: "8px",
    backgroundColor: "#FFFFFF",
    padding: "10px",
  },
  modalButtonContainer: {
    marginTop: "auto",
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },
  confirmButton: {
    backgroundColor: "#003554",
    color: "#FFFFFF",
    padding: "10px 20px",
    borderRadius: "5px",
    border: "1px solid #000000",
    fontSize: "1rem",
    cursor: "pointer",
  },
};
