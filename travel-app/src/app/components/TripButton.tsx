"use client";

import React, { useState } from "react";
import { FaPlaneDeparture } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import AddedTripsPopup from "./AddedTripsPopup";
import { useTrip } from "../context/TripContext"; // Import the context hook

const TripButton: React.FC = () => {
  const [showPopup, setShowPopup] = useState(false);
  const { selectedTrip, setSelectedTrip } = useTrip(); // Use the context

  return (
    <>
      {/* Trip Button */}
      <div
        className="flex items-center bg-black py-4 px-12 rounded-full cursor-pointer h-[56px]"
        style={{ zIndex: 1001 }} // Ensure TripButton is above the blur
        onClick={() => setShowPopup(!showPopup)} // Toggle popup
      >
        <FaPlaneDeparture
          className={`text-[20px] -ml-6 mr-6 ${
            showPopup ? "text-hl-orange" : "text-white"
          }`}
        />
        <span
          className={`text-[20px] mr-2 ${
            showPopup ? "text-hl-orange" : "text-white"
          }`}
        >
          {selectedTrip}
        </span>
        <IoIosArrowDown
          className={`text-[14px] ml-6 -mr-7 ${
            showPopup ? "text-hl-orange" : "text-white"
          }`}
        />
      </div>

      {/* Added Trips Popup */}
      {showPopup && (
        <AddedTripsPopup
          onClose={() => setShowPopup(false)} // Close popup callback
          selectedTrip={selectedTrip} // Pass current trip
          onTripChange={(trip) => setSelectedTrip(trip)} // Update selected trip
        />
      )}
    </>
  );
};

export default TripButton;
