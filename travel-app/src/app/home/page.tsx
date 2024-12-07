"use client";

import React from "react";
import Navbar from "../components/Navbar";
import Image from "next/image";
import Topbar from "../components/Topbar";
import { useAccount } from "../context/AccountContext";

export default function HomePage() {
  const { account } = useAccount(); // Access the account details from the context

  // Helper function to truncate text
  const truncateText = (text: string) => {
    return text.length > 30 ? `${text.slice(0, 27)}...` : text;
  };

  // ------- (START) Used ChatGPT for these functions
  const getOrdinalSuffix = (day: number) => {
    if (day > 3 && day < 21) return 'th'; // For days 4-20, we use 'th'
    switch (day % 10) {
      case 1: return 'st';
      case 2: return 'nd';
      case 3: return 'rd';
      default: return 'th';
    }
  };
  const formatDate = () => {
    const today = new Date();
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', // long format for weekday
      month: 'long', // long format for month
      day: 'numeric', // numeric for day
      year: 'numeric' // numeric for year
    };
    const formattedDate = today.toLocaleDateString('en-US', options); // Format like "Tuesday, October 29, 2024"
    const day = today.getDate();
    const ordinal = getOrdinalSuffix(day);
    return formattedDate.replace(day.toString(), `${day}${ordinal}`); // Append the correct ordinal suffix
  };
  // ------- (END)

  return (
    <div className="flex flex-col items-center min-h-screen text-darkblue">
      <Topbar/>
      {/* Welcome Section */}
      <main className="mt-10 flex flex-col items-start w-full px-4 py-6 pt-10">
        <h1 className="text-2xl font-bold text-black mb-2">
          Welcome, {truncateText(account.firstName)} {truncateText(account.lastName)}!
        </h1>

        {/* Date Section */}
        <p className="text-md text-navy-800 italic mb-1 mt-2">
          {formatDate()}
          </p>

        {/* Todays plan */}
        <div className="w-full bg-white shadow-md rounded-lg p-4 text-center mb-6">
          <h2 className="font-bold mb-2">TODAY&apos;S PLAN</h2>
          <p className="text-gray-500">(work in progress)</p>
        </div>

        {/* images section */}
        <div className="w-full space-y-4">
          <Image
            src="/images/backdrop1.jpg"
            alt="Backdrop 1"
            width={400}
            height={200}
            className="rounded-lg shadow-lg"
          />
          <Image
            src="/images/backdrop2.jpg"
            alt="Backdrop 2"
            width={400}
            height={200}
            className="rounded-lg shadow-lg"
          />
          <Image
            src="/images/backdrop3.jpg"
            alt="Backdrop 3"
            width={400}
            height={200}
            className="rounded-lg shadow-lg"
          />
        </div>
      </main>

      {/* Bottom Navbar */}
      <Navbar />
    </div>
  );
}
