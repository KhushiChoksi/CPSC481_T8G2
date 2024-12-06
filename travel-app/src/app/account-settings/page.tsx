"use client";

import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Topbar from "../components/Topbar";
import UpdateEmailPopup from "../components/account-settings/UpdateEmailPopup";
import UpdatePasswordPopup from "../components/account-settings/UpdatePasswordPopup";
import BackButton from "../components/BackButton";
import { useRouter } from "next/navigation";
import { useAccount } from "../context/AccountContext"; // Import the AccountContext

const AccountSettings: React.FC = () => {
  const router = useRouter();
  const { account } = useAccount(); // Access the account details from the context
  const [showUpdateEmailPopup, setShowUpdateEmailPopup] = useState(false);
  const [showUpdatePasswordPopup, setShowUpdatePasswordPopup] = useState(false);
  const [successMessage, setSuccessMessage] = useState(""); // For displaying success messages

  const showMessage = (message: string) => {
    setSuccessMessage(message);
    setTimeout(() => setSuccessMessage(""), 3000); // Clear the message after 3 seconds
  };

  // Helper to truncate text if it's too long
  const truncateText = (text: string) => {
    return text.length > 30 ? `${text.slice(0, 27)}...` : text;
  };

  return (
    <div className="flex flex-col items-center min-h-screen text-darkblue">
      {/* Topbar */}
      <Topbar profilePersonColor="text-hl-orange" />

      {/* Main Content */}
      <main className="mt-10 flex flex-col items-start w-full px-4 py-6 pt-10">
        {/* Header with Back Arrow and Title */}
        <div className="flex flex-col items-start w-full max-w-md">
          <div className="flex items-center mb-2">
            <BackButton title="Account Settings" />
          </div>

          {/* Success Message Container */}
          <p
            className={`block text-lg ${
              successMessage ? "text-green-600" : "text-transparent"
            } mb-4`}
          >
            {successMessage || "\u00A0"} {/* Placeholder for consistency */}
          </p>
        </div>

        {/* Content Section */}
        <div className="w-full max-w-md flex flex-col items-start mb-8 pt-10">
          {/* User Name */}
          <div className="w-full mb-4 flex flex-col items-start px-4">
            <label
              className="block text-lg text-black mb-2"
              title={`${account.firstName} ${account.lastName}`} // Show full name on hover
            >
              User: {truncateText(account.firstName)} {truncateText(account.lastName)}
            </label>
          </div>

          {/* Current Email Address */}
          <div className="w-full mb-6 flex flex-col items-start mt-4 px-4">
            <label
              className="block text-lg text-black mb-2"
              title={account.email} // Show full email on hover
            >
              Current email address: {truncateText(account.email)}
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
            <label className="block text-lg text-black mb-2">Security</label>
            <button
              type="button"
              className="max-w-lg w-full h-[50px] bg-darkblue text-white rounded-md border border-black text-lg mb-[60px]"
              onClick={() => setShowUpdatePasswordPopup(true)}
            >
              Update Password
            </button>
          </div>

          {/* Sign Out Section */}
          <div className="w-full mb-6 flex flex-col items-start px-4">
            <label className="block text-lg text-black mb-2">Sign Out</label>
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
          onClose={() => setShowUpdatePasswordPopup(false)} // Close all popups
          onGoBack={() => setShowUpdatePasswordPopup(false)} // Go back to this page
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
