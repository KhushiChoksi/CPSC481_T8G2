"use client";

import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Topbar from "../components/Topbar";
import { FaArrowLeft } from "react-icons/fa";
import UpdateEmailPopup from "../components/UpdateEmailPopup"; 
import UpdatePasswordPopup from "../components/UpdatePasswordPopup"; 
import { useRouter } from "next/navigation";

const AccountSettings: React.FC = () => {
  const router = useRouter();
  const [showUpdateEmailPopup, setShowUpdateEmailPopup] = useState(false);
  const [showUpdatePasswordPopup, setShowUpdatePasswordPopup] = useState(false);
  const [successMessage, setSuccessMessage] = useState(""); // For displaying success messages

  const showMessage = (message: string) => {
    setSuccessMessage(message);
    setTimeout(() => setSuccessMessage(""), 3000); // Clear the message after 3 seconds
  };

  return (
    <div className="flex flex-col items-center min-h-screen text-darkblue">
      {/* Topbar */}
      <Topbar />

      {/* Main Content */}
      <main className="mt-10 flex flex-col items-start w-full px-4 py-6 pt-10">
        {/* Header with Back Arrow and Title */}
        <div className="flex flex-col items-start w-full max-w-md">
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

          {/* Success Message Container */}
          <p
            className={`block text-lg ${
              successMessage ? "text-green-600" : "text-transparent"
            } mb-4`}
          >
            {successMessage || "\u00A0"} {/*holds space for success message for screen consistency*/}
          </p>
        </div>

        {/* Content Section */}
        <div className="w-full max-w-md flex flex-col items-start mb-8 pt-10">
          {/* Current Email Address */}
          <div className="w-full mb-6 flex flex-col items-start mt-10 px-4">
            <label className="block text-lg text-black mb-2">
              Current email address: example@ucalgary.ca
            </label>
            <button
              type="button"
              className="max-w-lg w-full h-[50px] bg-darkblue text-white rounded-md border border-black text-lg mb-[60px]"
              onClick={() => {
                setShowUpdateEmailPopup(true);
              }}
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
                setShowUpdatePasswordPopup(true);
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
          onComplete={() => {
            setShowUpdateEmailPopup(false);
            showMessage("Email was updated successfully");
          }}
        />
      )}

      {/* Update Password Popup */}
      {showUpdatePasswordPopup && (
        <UpdatePasswordPopup
          onCancel={() => setShowUpdatePasswordPopup(false)}
          onComplete={() => {
            setShowUpdatePasswordPopup(false);
            showMessage("Password was updated successfully");
          }}
        />
      )}
    </div>
  );
};

export default AccountSettings;
