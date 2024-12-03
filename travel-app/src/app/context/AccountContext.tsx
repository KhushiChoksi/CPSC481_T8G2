"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

// Define the shape of an account
interface Account {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

// Define the shape of the context
interface AccountContextType {
  account: Account;
  updateEmail: (newEmail: string) => void;
  updatePassword: (currentPassword: string, newPassword: string) => boolean;
  resetPassword: (newPassword: string) => void; // Simplified resetPassword
}

// Create the context
const AccountContext = createContext<AccountContextType | undefined>(undefined);

// Create a provider component
export const AccountProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [account, setAccount] = useState<Account>({
    firstName: "John",
    lastName: "Doe",
    email: "example@ucalgary.ca",
    password: "password", // Default password for this example
  });

  // Function to update the email
  const updateEmail = (newEmail: string) => {
    setAccount((prevAccount) => ({ ...prevAccount, email: newEmail }));
  };

  // Function to update the password
  const updatePassword = (currentPassword: string, newPassword: string): boolean => {
    if (currentPassword !== account.password) {
      return false; // Validation failed: current password is incorrect
    }
    setAccount((prevAccount) => ({ ...prevAccount, password: newPassword }));
    return true; // Password successfully updated
  };

  // Function to reset the password (no checks)
  const resetPassword = (newPassword: string): void => {
    setAccount((prevAccount) => ({ ...prevAccount, password: newPassword }));
  };

  return (
    <AccountContext.Provider value={{ account, updateEmail, updatePassword, resetPassword }}>
      {children}
    </AccountContext.Provider>
  );
};

// Custom hook to use the context
export const useAccount = (): AccountContextType => {
  const context = useContext(AccountContext);
  if (!context) {
    throw new Error("useAccount must be used within an AccountProvider");
  }
  return context;
};