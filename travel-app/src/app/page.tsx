"use client";

import React, { useState } from "react";
import ResetPasswordPopup from "../app/components/ResetPasswordPopup";
import CreateAccountModal from "../app/welcome-login/CreateAccountPopup";
import Logo from "../app/components/Logo";

const WelcomeScreen: React.FC = () => {
  const [showResetPopup, setShowResetPopup] = useState(false); // For Reset Password Popup
  const [showCreateAccountPopup, setShowCreateAccountPopup] = useState(false); // For Create Account Popup

  return (
    <div className="flex flex-col items-center min-h-screen text-darkblue py-1 px-4">
      <Logo />

      {/* Main Content */}
      <main className="mt-8 flex flex-col items-center w-full max-w-lg px-6 py-6">
        {/* Welcome Header */}
        <h1 className="text-3xl md:text-4xl font-bold text-black text-center mt-8 mb-8">
          Welcome!
          <span className="block w-full h-1 bg-black mt-2"></span>
        </h1>

        {/* Input Section */}
        <div className="w-full flex flex-col items-center mb-8 space-y-6">
          <div className="w-full">
            <label className="block text-lg md:text-xl text-black mb-2">
              Please enter your email:
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-black rounded-lg text-black"
            />
          </div>
          <div className="w-full">
            <label className="block text-lg md:text-xl text-black mb-2">
              Please enter your password:
            </label>
            <input
              type="password"
              className="w-full px-4 py-2 border border-black rounded-lg text-black"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="w-full flex flex-col space-y-16 py-10">
          <button
            className="w-full h-12 bg-darkblue text-white rounded-md border border-black text-base md:text-lg"
          >
            Login
          </button>
          <button
            className="w-full h-12 bg-darkblue text-white rounded-md border border-black text-base md:text-lg"
            onClick={() => setShowResetPopup(true)}
          >
            Reset Password
          </button>
          <button
            className="w-full h-12 bg-darkblue text-white rounded-md border border-black text-base md:text-lg"
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
      {showCreateAccountPopup && (
        <CreateAccountModal onClose={() => setShowCreateAccountPopup(false)} />
      )}
    </div>
  );
};

export default WelcomeScreen;
