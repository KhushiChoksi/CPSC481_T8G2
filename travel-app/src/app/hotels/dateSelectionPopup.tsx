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
      const startDate = selectedDates[0].toISOString().split("T")[0];
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
      <div className="relative flex flex-col justify-between w-[96vw] h-[90vh] bg-[#A5B6C2] p-6 rounded-2xl border border-black">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-black text-3xl hover:text-gray-600"
          aria-label="Close"
        >
          &times;
        </button>

        {/* Title */}
        <div className="text-left mb-4">
          <h2 className="text-med text-gray-600">Date Selection</h2>
          <div className="text-lg font-bold mt-2 text-black">
            <p>{formattedDates}</p>
          </div>
        </div>

        {/* Calendar */}
        <div className="flex justify-center items-center w-full max-w-lg border border-gray-300 rounded-lg bg-transparent p-4">
          <Calendar
            selectRange
            value={selectedDates}
            onChange={handleDateChange}
            className="react-calendar"
          />
        </div>

        {/* Confirm Button */}
        <div className="mt-auto flex justify-center">
          <button
            onClick={handleConfirm}
            className="bg-[#003554] text-white px-8 py-4 text-lg rounded-lg hover:bg-[#002a42] border border-black"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
