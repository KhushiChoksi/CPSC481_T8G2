"use client";

import React, { useState } from "react";
import ResetPasswordPopupLogin from "./components/welcome-login/ResetPasswordPopupLogin";
import CreateAccountModal from "./components/welcome-login/CreateAccountPopup";
import Logo from "./components/Logo";
import { useAccount } from "./context/AccountContext"; // Use the AccountContext for login validation
import { useRouter } from "next/navigation"; // Use router for navigation

const WelcomeScreen: React.FC = () => {
  const { account } = useAccount(); // Access the account details from the context
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showResetPopup, setShowResetPopup] = useState(false); // For Reset Password Popup
  const [showCreateAccountPopup, setShowCreateAccountPopup] = useState(false); // For Create Account Popup
  const router = useRouter();

  const handleLogin = () => {
    if (!email || !password) {
      setErrorMessage("Email and password cannot be empty.");
      return;
    }

    if (email !== account.email) {
      setErrorMessage("Email is not linked to an account.");
      return;
    }

    if (password !== account.password) {
      setErrorMessage("Incorrect password.");
      return;
    }

    // Clear errors and navigate to home page
    setErrorMessage("");
    router.push("/home");
  };

  return (
    <div className="flex flex-col items-center min-h-screen text-darkblue py-1 px-4">
      <Logo />

      {/* Main Content */}
      <main className="mt-8 flex flex-col items-center w-full max-w-lg px-6 py-6">
        {/* Welcome Header */}
        <h1 className="text-3xl md:text-4xl font-bold text-black text-center mt-8 mb-8">
          Welcome!
          <span className="block w-full h-1 bg-black mt-0"></span>
        </h1>

        {/* Input Section */}
        <div className="w-full flex flex-col items-center mb-8 space-y-6">
          <div className="w-full">
            <label className="block text-lg md:text-xl text-black mb-2">
              Please enter your email:
            </label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-black rounded-lg text-black"
              placeholder="Enter your email"
            />
          </div>
          <div className="w-full">
            <label className="block text-lg md:text-xl text-black mb-2">
              Please enter your password:
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-black rounded-lg text-black"
              placeholder="Enter your password"
            />
          </div>
        </div>

        {/* Error Message */}
        <div className="w-full h-8 flex justify-center items-center mb-4">
          {errorMessage && (
            <div className="text-red-600 text-lg text-center">{errorMessage}</div>
          )}
        </div>

        {/* Buttons */}
        <div className="w-full flex flex-col space-y-16 py-10">
          <button
            className="w-full h-12 bg-darkblue text-white rounded-md border border-black text-base md:text-lg"
            onClick={handleLogin}
          >
            Login
          </button>
          <button
            className="w-full h-12 bg-darkblue text-white rounded-md border border-black text-base md:text-lg"
            onClick={() => setShowResetPopup(true)}
          >
            Forgot password?
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
        <ResetPasswordPopupLogin
          onClose={() => setShowResetPopup(false)} // Close Reset Password Popup
          redirectTo="/" // Redirect to the login page
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
