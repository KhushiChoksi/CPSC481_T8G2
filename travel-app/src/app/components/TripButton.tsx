"use client";

import React, { useState } from "react";
import { FaPlaneDeparture } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import AddedTripsPopup from "./trip-settings/AddedTripsPopup";
import { useTrip } from "../context/TripContext";

const TripButton: React.FC = () => {
  const [showPopup, setShowPopup] = useState(false);
  const { selectedTrip, setSelectedTrip } = useTrip();

  return (
    <>
      {/* Trip Button */}
      <div
        className="flex items-center bg-black py-4 px-12 rounded-full cursor-pointer h-[56px]"
        style={{ zIndex: 1001 }}
        onClick={() => setShowPopup(!showPopup)}
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
