"use client";
import { useState } from "react";
import Calendar, { CalendarProps } from "react-calendar";
import "react-calendar/dist/Calendar.css";

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

  const handleDateChange: CalendarProps['onChange'] = (value) => {
    if (Array.isArray(value)) {
      setSelectedDates([value[0], value[1]]);
    } else {
      setSelectedDates([value, null]);
    }
  };

  const handleConfirm = () => {
    if (selectedDates[0] && selectedDates[1]) {
      // Format the dates as strings
      const startDate = selectedDates[0].toISOString().split('T')[0];
      const endDate = selectedDates[1].toISOString().split('T')[0];
      onSelectDates(startDate, endDate); // Save selected dates
      onClose(); // Close the modal
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
      <div
        className="shadow-lg flex flex-col justify-between relative"
        style={{
          width: "96vw",
          height: "90vh",
          backgroundColor: "#A5B6C2",
          padding: "25px",
          borderRadius: "20px",
          border: "1px solid #000000",
        }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-black hover:text-gray-600"
          style={{
            background: "none",
            border: "none",
            fontSize: "2rem",
            cursor: "pointer",
          }}
          aria-label="Close"
        >
          &times;
        </button>

        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-black">Select Dates for Stay</h2>
        </div>

        {/* Date Selection Section */}
        <div className="text-left mb-8">
          <div className="mb-4">
            <label className="text-lg font-semibold text-black">Select Dates:</label>
            <div
              style={{
                marginBottom: "20px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                maxWidth: "350px",
                border: "1px solid #ddd",
                borderRadius: "8px",
              }}
            >
              <Calendar
                selectRange
                value={selectedDates}
                onChange={handleDateChange}
                className="react-calendar"
              />
            </div>
          </div>
        </div>

        <div className="mt-auto flex justify-center pt-8">
          <button
            onClick={handleConfirm}
            className="bg-[#003554] text-white px-8 py-4 text-lg rounded-lg hover:bg-[#002a42]"
            style={{
              border: "1px solid #000000",
            }}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
