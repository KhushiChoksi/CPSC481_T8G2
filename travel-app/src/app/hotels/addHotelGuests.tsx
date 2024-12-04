"use client";
import React, { useState } from "react";
import ConfirmBooking from "./confirmBooking"; 

type AddHotelGuestsProps = {
    isOpen: boolean;
    onClose: () => void;
    selectedHotel: {
      title: string;
      address: string;
      timeStart: string;
      timeEnd: string;
    } | null;
  };

export default function AddHotelGuests({
  isOpen,
  onClose,
  selectedHotel,
}: AddHotelGuestsProps) {
  const [showConfirmPopup, setShowConfirmPopup] = useState(false); 
  const [guests, setGuests] = useState(1); // State to store guests
  const [rooms, setRooms] = useState(1); // State to store rooms


  const handleContinue = () => {
    setShowConfirmPopup(true); // Show confirm booking popup
  };

  const handleConfirmPopupClose = () => {
    setShowConfirmPopup(false); // Close confirm booking popup
    onClose(); 
  };

  if (!isOpen || !selectedHotel) {
    return null;
  }

  return (
    <>
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
          {/*Button */}
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


          <div className="text-center mb-4">
            <h2 className="text-2xl font-bold text-black">Booking For</h2>
            <p className="italic text-xl text-gray-800">{selectedHotel.title}</p>
          </div>

          <div className="text-center">
            <p className="text-lg text-gray-600 mb-12">
              Select the number of people visiting, and the number of rooms you would like to book.
            </p>
          </div>

          {/* Dropdown*/}
          <div className="flex flex-col items-center gap-10 text-center my-auto">
            {/* Guests*/}
            <div className="flex items-center gap-6">
              <img
                src="/images/guests.png"
                alt="Guests"
                className="w-10 h-10"
              />
              <label htmlFor="guests" className="text-lg font-medium text-black">
                Guests
              </label>
              <select
                id="guests"
                className="bg-gray-300 text-gray-700 border-2 border-gray-400 rounded-md px-6 py-3 text-lg"
                onChange={(e) => setGuests(Number(e.target.value))}
              >
                {[...Array(5).keys()].map((n) => (
                  <option key={n + 1} value={n + 1}>
                    {n + 1}
                  </option>
                ))}
              </select>
            </div>

            {/* Rooms*/}
            <div className="flex items-center gap-6">
              <img
                src="/images/bed.png"
                alt="Rooms"
                className="w-10 h-10"
              />
              <label htmlFor="rooms" className="text-lg font-medium text-black">
                Rooms
              </label>
              <select
                id="rooms"
                className="bg-gray-300 text-gray-700 border-2 border-gray-400 rounded-md px-6 py-3 text-lg"
                onChange={(e) => setRooms(Number(e.target.value))}
              >
                {[...Array(5).keys()].map((n) => (
                  <option key={n + 1} value={n + 1}>
                    {n + 1}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Buttons*/}
          <div className="mt-auto flex justify-end pt-8">
            <button
              onClick={handleContinue}
              className="bg-[#003554] text-white px-8 py-4 text-lg rounded-lg hover:bg-[#002a42]"
              style={{
                border: "1px solid #000000",
              }}
            >
              Continue
            </button>
          </div>
        </div>
      </div>


      <ConfirmBooking
        isOpen={showConfirmPopup}
        onClose={handleConfirmPopupClose}
        selectedHotel={selectedHotel}
        guests={guests} // Guest state cached and used
        rooms={rooms}
      />
    </>
  );
}
