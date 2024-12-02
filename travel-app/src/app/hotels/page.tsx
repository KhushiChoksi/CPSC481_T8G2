"use client";
import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import Topbar from "../components/Topbar";
import BackButton from "../components/BackButton";
import { useState } from "react";



export default function HotelsPage() {
  const [showPopup, setShowPopup] = useState(false);

  const handleButtonClick = () => {
      setShowPopup(true); // Show popup when button is clicked
  };

  const handleClosePopup = () => {
      setShowPopup(false); // Close popup
  };

    // current hotel data
    const hotels = [
      {
        name: "Comfort Inn & Suites",
        description:
          "With an indoor pool and hot tub, only 5 minutes' drive away from the airport.",
        location: "147 Freeport Crescent Northeast, Calgary",
        imgSrc: "/images/hotel1.jpg",
        booked: false,
      },
      {
        name: "Hilton Garden Inn",
        description:
          "Featuring a rooftop hot tub, this hotel is close to downtown attractions.",
        location: "711 4th St. S.E., Calgary",
        imgSrc: "/images/hotel2.jpg",
        booked: false,
      },

    ];

    return (
      <div className="min-h-screen bg-lightblue px-4 pt-6">
        <Topbar/>

        <div className="flex items-center mt-12">
                <BackButton 
                    title="Hotels" 
                />
        </div>
        <div className="mt-2">
          <button
            onClick={handleButtonClick}
            className="border-2 border-black rounded-full px-3 py-1 flex items-center shadow-md hover:shadow-lg transition text-sm"
          >
            <span className="mr-1 text-black">📅</span> 
            <span className="text-black">Select Dates for Stay</span>
          </button>
        </div>

        <div className="mt">
        <SearchBar />
        </div>

        <div className="mt-6 overflow-y-auto max-h-[60vh] bg-white rounded-lg shadow-md p-4">
        {hotels.map((hotel, index) => (
          <div
            key={index}
            className="bg-lightblue mb-4 p-4 rounded-lg shadow flex flex-col"
          >
            <div className="flex">
              <img
                src={hotel.imgSrc}
                alt={hotel.name}
                className="w-32 h-32 rounded-lg object-cover"
              />
              <div className="ml-auto bg-white px-3 rounded-lg shadow-md text-sm text-gray-700 flex items-center">
                <span>{hotel.location}</span>
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-lg font-semibold text-gray-800">
                {hotel.name}
              </h3>
              <p className="text-sm text-gray-600">{hotel.description}</p>
            </div>
          </div>
        ))}
      </div>
        {showPopup && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-3/4 max-w-md">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">DATE SELECTION</h2>

              <p className="text-gray-600 mb-6 text-center">Please select your dates of stay below.</p>

              <div className="flex justify-between mt-6">
                <button
                  onClick={handleClosePopup}
                  className="bg-transparent text-gray-700 px-4 py-2 rounded-md border border-gray-400 hover:bg-gray-100 transition"
                >
                  Go Back
                </button>

                <button
                  onClick={() => {
                    handleClosePopup();
                  }}
                  className="bg-darkblue text-white px-4 py-2 rounded-md border border-gray-400 hover:bg-gray-100 transition"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}


        <Navbar/>
      </div>
    );
}