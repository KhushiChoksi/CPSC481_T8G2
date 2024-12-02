"use client";

import React, { useState } from "react";
import { FaPlaneDeparture } from "react-icons/fa";
import { IoIosArrowDown, IoIosArrowBack } from "react-icons/io"; // Import both arrows
import AddedTripsPopup from "./trip-settings/AddedTripsPopup";
import { useTrip } from "../context/TripContext";

const TripButton: React.FC = () => {
  const [showPopup, setShowPopup] = useState(false);
  const { selectedTrip, setSelectedTrip } = useTrip();

  return (
    <>
      {/* Trip Button */}
      <div
        className="relative bg-black py-4 px-4 rounded-full cursor-pointer h-[56px] overflow-hidden flex items-center justify-between"
        style={{
          zIndex: 1001,
          width: "200px", // Fixed button width
        }}
        onClick={() => setShowPopup(!showPopup)} // Toggle popup visibility
      >
        {/* Flight Icon */}
        <div
          className="flex items-center justify-center"
          style={{
            width: "24px",
            height: "24px",
          }}
        >
          <FaPlaneDeparture
            className={`transition-colors ${
              showPopup ? "text-hl-orange" : "text-white"
            }`}
            style={{
              width: "20px",
              height: "20px",
            }}
          />
        </div>

        {/* Trip Name */}
        <div
          className={`flex-grow text-[20px] transition-colors ${
            showPopup ? "text-hl-orange" : "text-white"
          }`}
          style={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "clip", // Avoid CSS ellipsis
            textAlign: "center", // Ensure text is centered between icons
          }}
        >
          {selectedTrip?.length > 10 ? `${selectedTrip.slice(0, 8)}..` : selectedTrip}
        </div>

        {/* Arrow Icon */}
        <div
          className="flex items-center justify-center"
          style={{
            width: "16px",
            height: "16px",
          }}
        >
          {showPopup ? (
            <IoIosArrowDown
              className="transition-colors text-hl-orange"
              style={{
                width: "12px",
                height: "12px",
              }}
            />
          ) : (
            <IoIosArrowBack
              className="transition-colors text-white"
              style={{
                width: "12px",
                height: "12px",
              }}
            />
          )}
        </div>
      </div>

      {/* Added Trips Popup */}
      {showPopup && (
        <AddedTripsPopup
          onClose={() => setShowPopup(false)} // Close the entire popup series
          onGoBack={() => setShowPopup(false)} // Navigate "back" (same as close for now)
          selectedTrip={selectedTrip}
          onTripChange={(trip) => setSelectedTrip(trip)} // Update selected trip
        />
      )}
    </>
  );
};

export default TripButton;
