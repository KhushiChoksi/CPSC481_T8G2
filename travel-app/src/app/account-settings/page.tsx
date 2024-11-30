"use client";

import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Topbar from "../components/Topbar";
import { FaArrowLeft } from "react-icons/fa";
import UpdateEmailPopup from "../components/UpdateEmailPopup"; // Import the new popup component
import { useRouter } from "next/navigation";

const AccountSettings: React.FC = () => {
  const router = useRouter();
  const [showUpdateEmailPopup, setShowUpdateEmailPopup] = useState(false);

  // Placeholder for the current user's email address
  const currentEmail = "example@ucalgary.ca";

  return (
    <div className="flex flex-col items-center min-h-screen text-darkblue">
      {/* Topbar */}
      <Topbar />

      {/* Main Content */}
      <main className="mt-10 flex flex-col items-start w-full px-4 py-6 pt-10">
        {/* Header with Back Arrow and Title */}
        <div className="flex items-center mb-2">
          <button
            type="button"
            onClick={() => router.back()}
            className="mr-2"
            aria-label="Go back"
            title="Go back"
          >
            <FaArrowLeft className="text-black h-6 w-6" />
          </button>
          <h1 className="text-2xl font-bold text-black">
            Account Settings
          </h1>
        </div>

        {/* Content Section */}
        <div className="w-full max-w-md flex flex-col items-start mb-8 pt-10">
          {/* Current Email Address */}
          <div className="w-full mb-6 flex flex-col items-start mt-10 px-4">
            <label className="block text-lg text-black mb-2">
              Current email address: {currentEmail}
            </label>
            <button
              type="button"
              className="max-w-lg w-full h-[50px] bg-darkblue text-white rounded-md border border-black text-lg mb-[60px]"
              onClick={() => setShowUpdateEmailPopup(true)}
            >
              Update Email Address
            </button>
          </div>

          {/* Security Section */}
          <div className="w-full mb-6 flex flex-col items-start px-4">
            <label className="block text-lg text-black mb-2">
              Security
            </label>
            <button
              type="button"
              className="max-w-lg w-full h-[50px] bg-darkblue text-white rounded-md border border-black text-lg mb-[60px]"
              onClick={() => {
                // Handle update password action
                alert("Update Password functionality to be added.");
              }}
            >
              Update Password
            </button>
          </div>

          {/* Sign Out Section */}
          <div className="w-full mb-6 flex flex-col items-start px-4">
            <label className="block text-lg text-black mb-2">
              Sign Out
            </label>
            <button
              type="button"
              className="max-w-lg w-full h-[50px] bg-white text-[#003554] rounded-lg border border-black text-lg"
              onClick={() => router.push("/")}
            >
              Sign Out
            </button>
          </div>
        </div>
      </main>

      {/* Bottom Navbar */}
      <Navbar />

      {/* Update Email Popup */}
      {showUpdateEmailPopup && (
        <UpdateEmailPopup
          onCancel={() => setShowUpdateEmailPopup(false)}
          onComplete={() => setShowUpdateEmailPopup(false)}
        />
      )}
    </div>
  );
};

export default AccountSettings;
