"use client";
import React, { useState } from "react";
import AddHotelGuests from "./addHotelGuests";


type PopupModalProps = {
  isOpen: boolean;
  onClose: () => void;
  selectedHotel: {
    title: string;
    address: string;
    timeStart: string;
    timeEnd: string;
    visitdate:string;
    booked:boolean;
  } | null;
  onHotelBooked: () => void;
};

export default function PopupModal({
  isOpen,
  onClose,
  selectedHotel,
  onHotelBooked,
}: PopupModalProps) {
  const [showGuestsPopup, setShowGuestsPopup] = useState(false); 
  const handleConfirm = () => {
    setShowGuestsPopup(true); // Open guests popup
    if (selectedHotel) {
      onHotelBooked();
    }
  };

  

  const handleGuestsPopupClose = () => {
    setShowGuestsPopup(false); // Close guests popup
    onClose();
  };

  if (!isOpen || !selectedHotel) {
    return null;
  }

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div
          className="shadow-lg flex flex-col justify-between relative"
          style={{
            width: "95%",
            height: "80%",
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

          {/* Title */}
          <div className="text-center mb-4">
            <h2 className="text-2xl font-bold text-black">Booking For</h2>
            <p className="italic text-xl text-gray-800">{selectedHotel.title}</p>
          </div>

          {/* Content */}
          <div
            className="flex flex-col items-start justify-center gap-6 flex-grow text-left"
            style={{
              padding: "15px",
            }}
          >
            {/* Location */}
            <div>
              <p className="text-black font-bold text-3xl mb-2">Location:</p>
              <p className="text-gray-700 text-2xl">{selectedHotel.address}</p>
            </div>

            {/* Time of Stay */}
            <div>
              <p className="text-black font-bold text-3xl mb-2">Time of Stay:</p>
              <p className="text-gray-700 text-2xl">
                {selectedHotel.visitdate
                  ? `${selectedHotel.visitdate}`
                  : "No Date Selected"}
              </p>
            </div>
          </div>

          {/* Buttons Section */}
          <div className="mt-auto flex justify-end pt-8">
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

      <AddHotelGuests
        isOpen={showGuestsPopup}
        onClose={handleGuestsPopupClose}
        selectedHotel={selectedHotel}
      />
    </>
  );
}
