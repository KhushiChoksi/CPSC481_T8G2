import React from "react";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

type Suggestion = {
  name: string;
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

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-[1000]">
      <div className="bg-bg-lightblue rounded-lg p-8 w-[90%] max-w-2xl">
        <div className="flex flex-col gap-6">
          {/* Header */}
          <div className="text-center">
            <h2 className="text-2xl font-bold text-darkblue mb-2">
              Select Visit Date and Time
            </h2>
            <p className="text-gray-600">
              When would you like to visit {selectedSuggestion.name}?
            </p>
          </div>

          {/* Calendar */}
          <div className="bg-white rounded-lg p-4 shadow-md">
            <Calendar
              onChange={(value: Value) => setSelectedDate(value)}
              value={selectedDate}
              className="mx-auto"
            />
          </div>

          {/* Time Picker */}
          <div className="bg-white rounded-lg p-4 shadow-md">
            <TimePicker
              onChange={(value: string | null) => setSelectedTime(value)}
              value={selectedTime}
              className="mx-auto"
            />
          </div>

          {/* Buttons */}
          <div className="flex flex-col gap-3">
            <button
              onClick={onClose}
              className="bg-darkblue text-white py-3 px-6 rounded-lg font-semibold hover:bg-opacity-90 transition-all"
            >
              Add to Schedule
            </button>
            
            <button
              onClick={onBack}
              className="text-darkblue font-semibold hover:underline"
            >
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
