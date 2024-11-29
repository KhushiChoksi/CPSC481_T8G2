"use client";

import React, { useState } from "react";
import ResetPasswordPopup from "../components/ResetPasswordPopup";
import CreateAccountModal from "./CreateAccountPopup";
import Logo from "../components/Logo"; // Import the reusable Logo component
import { useRouter } from 'next/navigation';

const WelcomeScreen: React.FC = () => {
  const [showResetPopup, setShowResetPopup] = useState(false); // For Reset Password Popup
  const [showCreateAccountPopup, setShowCreateAccountPopup] = useState(false); // For Create Account Popup
  const router = useRouter();

  return (
    <div className="flex flex-col items-center min-h-screen text-darkblue py-1">
      <Logo />

      {/* Main Content */}
      <main className="mt-10 flex flex-col items-center w-full px-4 py-6">
        {/* Welcome Header */}
        <h1 className="text-4xl font-bold text-black text-center mt-10 mb-10 relative">
          Welcome!
          <span className="block w-full h-1 bg-black mt-2"></span>
        </h1>

        {/* Input Section */}
        <div className="w-full max-w-md flex flex-col items-center mb-8">
          <div className="w-[307px] mb-6">
            <label className="block text-lg text-black mb-2">Please enter your email:</label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-black rounded-lg text-black mb-2"
            />
          </div>
          <div className="w-[307px] mb-6">
            <label className="block text-lg text-black mb-2">Please enter your password:</label>
            <input
              type="password"
              className="w-full px-4 py-2 border border-black rounded-lg text-black mb-2"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="w-[307px] flex flex-col items-center">
          <button
            className="w-full h-[50px] bg-darkblue text-white rounded-md border border-black text-lg mb-[60px]"
            // **Add onClick handler to navigate to '/home'**
            onClick={() => router.push('/home')}
          >
            Login
          </button>
          <button
            className="w-full h-[50px] bg-darkblue text-white rounded-md border border-black text-lg mb-[60px]"
            onClick={() => setShowResetPopup(true)}
          >
            Reset Password
          </button>
          <button
            className="w-full h-[50px] bg-darkblue text-white rounded-md border border-black text-lg"
            onClick={() => setShowCreateAccountPopup(true)}
          >
            New? Create an Account!
          </button>
        </div>
      </main>

      {/* Reset Password Popup */}
      {showResetPopup && (
        <ResetPasswordPopup
          onCancel={() => setShowResetPopup(false)} // Close Reset Password Popup
          onComplete={() => setShowResetPopup(false)} // Close and return to login screen
        />
      )}

      {/* Create Account Popup */}
      {showCreateAccountPopup && <CreateAccountModal onClose={() => setShowCreateAccountPopup(false)} />}
    </div>
  );
};

export default WelcomeScreen;
