'use client';

import React, { useState } from 'react';

import Navbar from "../components/Navbar";
import Topbar from "../components/Topbar";
import DayView from "./components/DayView";
import Link from "next/link";

export default function ItineraryPage() {
  const [isEditing, setIsEditing] = useState(false);

  const buttonStyle = "bg-white text-darkblue p-2 h-8 rounded-lg border border-solid border-black w-full h-full";

  const handleEditToggle = () => {
    setIsEditing((prev: any) => !prev);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Topbar />
      <div className="flex flex-col items-center w-full">
        <main className="mt-10 flex flex-col items-center w-full px-4 py-6">

          {/* Calendar */}
          <div className="flex justify-center w-full max-w-[300px]">
            <div className="flex justify-center items-center w-[300px] h-[630px]">
              <DayView isEditing={isEditing}/>
            </div>
          </div>

          {/* Buttons Section */}
          <div className="mt-0.5 flex flex-row justify-center space-x-8 w-full">

            {/* Edit button */}
            <button
              className={`${buttonStyle} ${isEditing ? 'bg-darkblue2 text-white font-bold' : 'bg-[white]'}`}
              onClick={handleEditToggle}
            >
              {isEditing ? 'Stop Editing' : 'Edit'}
            </button>

            <div className="flex flex-col space-y-4 w-full">
              <Link href="/explore"><button className={buttonStyle}>Add events/spots</button></Link>
              <Link href="/restaurants"><button className={buttonStyle}>Add restaurants</button></Link>
            </div>
          </div>

        </main>
      </div>
      <Navbar />
    </div>
  );
}
