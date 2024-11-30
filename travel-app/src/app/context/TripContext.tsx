"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

// Define the shape of the context
interface TripContextType {
  selectedTrip: string;
  setSelectedTrip: (trip: string) => void;
}

// Create the context
const TripContext = createContext<TripContextType | undefined>(undefined);

// Create a provider component
export const TripProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedTrip, setSelectedTrip] = useState("Trip 1"); // Default trip

  return (
    <TripContext.Provider value={{ selectedTrip, setSelectedTrip }}>
      {children}
    </TripContext.Provider>
  );
};

// Custom hook to use the context
export const useTrip = (): TripContextType => {
  const context = useContext(TripContext);
  if (!context) {
    throw new Error("useTrip must be used within a TripProvider");
  }
  return context;
};
