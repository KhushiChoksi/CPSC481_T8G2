'use client';

import React, { useState } from 'react';

import Navbar from "../components/Navbar";
import Topbar from "../components/Topbar";
import DayView from "./components/DayView";
import BackButton from '../components/BackButton';
import Link from "next/link";

export default function ItineraryPage() {
  const [isEditing, setIsEditing] = useState(false);

  const buttonStyle = "bg-white text-darkblue p-2 h-8 rounded-lg border border-solid border-black w-full h-full";

  const handleEditToggle = () => {
    setIsEditing((prev: boolean) => !prev);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Topbar />
      <div className="flex flex-col items-start w-full">
        <div className='mt-20 px-4'> <BackButton title='Itinerary Page'/> </div>
        <main className="flex flex-col items-center w-full px-4">

          {/* Calendar */}
          <div className="flex justify-center w-full max-w-[300px]">
            <div className="flex justify-center items-center w-[300px] h-[590px]">
              <DayView isEditing={isEditing}/>
            </div>
          </div>

          {/* Buttons Section */}
          <div className="mt-0 flex flex-row justify-center space-x-8 w-full">

            {/* Edit button */}
            <button
              className={`${isEditing ? 'text-red-500 font-bold' : ''} ${buttonStyle}`}
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
