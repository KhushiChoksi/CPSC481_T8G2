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
        onClick={() => setShowPopup(true)} // Toggle popup
      >
        <FaPlaneDeparture className="text-white text-[20px] -ml-6 mr-6" />
        <span className="text-white text-[20px] mr-2">{selectedTrip}</span>
        <IoIosArrowDown className="text-white text-[14px] ml-6 -mr-7" />
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
