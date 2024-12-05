"use client";
import { useState } from "react";
import Calendar, { CalendarProps } from "react-calendar";
import "react-calendar/dist/Calendar.css"; // Import Calendar base styles
import "../globals.css"; // Import your global styles

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
      const adjustedStartDate = new Date(selectedDates[0]);
      adjustedStartDate.setDate(adjustedStartDate.getDate() + 1);
      const startDate = adjustedStartDate.toISOString().split("T")[0];
  
      const endDate = selectedDates[1].toISOString().split("T")[0];
  
      onSelectDates(startDate, endDate);
      onClose();
    }
  };
  
  
  

  if (!isOpen) return null;

  const formatDisplayDate = (date: Date | null) =>
    date ? date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }) : "---";

  const formattedDates = selectedDates[0] && selectedDates[1]
    ? `${formatDisplayDate(selectedDates[0])} - ${formatDisplayDate(selectedDates[1])}`
    : "---";

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
      <div className="relative flex flex-col justify-between w-[95%] h-[80%] bg-[#A5B6C2] p-6 rounded-2xl border border-black">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-black text-4xl hover:text-gray-600 cursor-pointer"
          aria-label="Close"
        >
          ×
        </button>

        {/* Title */}
        <div className="text-center">
          <h1 className="text-3xl text-black underline underline-offset-4 decoration-2 mb-4">
            Date Selection
          </h1>
          <p className="text-lg text-black">
            Select the dates for your stay below.
          </p>
        </div>

        {/* Formatted Dates */}
        <div className="text-center mt-2">
          <p className="text-md font-semibold text-black">
            {formattedDates}
          </p>
        </div>

        {/* Calendar */}
        <div className="flex justify-center items-center w-full mt-4">
          <Calendar
            selectRange
            value={selectedDates}
            onChange={handleDateChange}
            className="react-calendar border border-black rounded-lg shadow-sm"
          />
        </div>

        {/* Confirm Button */}
        <div className="mt-6 flex justify-center">
          <button
            onClick={handleConfirm}
            className="bg-[#003554] text-white px-8 py-3 text-lg font-semibold rounded-lg hover:bg-[#002a42] transition duration-300 border border-black"
          >
            Confirm Dates
          </button>
        </div>
      </div>
    </div>
  );
}
