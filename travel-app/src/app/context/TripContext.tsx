"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

// Define the shape of a trip
interface Trip {
  name: string;
  dates: string;
}

// Define the shape of the context
interface TripContextType {
  trips: Trip[];
  selectedTrip: string;
  setSelectedTrip: (trip: string) => void;
  setTrips: React.Dispatch<React.SetStateAction<Trip[]>>;
  removeTrip: (tripName: string) => void;
}

// Create the context
const TripContext = createContext<TripContextType | undefined>(undefined);

// Create a provider component
export const TripProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [trips, setTrips] = useState<Trip[]>([
    { name: "Trip 1", dates: "2024/09/02 - 2024/09/16" },
    { name: "Trip 2", dates: "2024/10/20 - 2024/11/20" },
    { name: "Trip 3", dates: "2025/01/05 - 2025/02/05" },
  ]);
  const [selectedTrip, setSelectedTrip] = useState(trips[0]?.name || "");

  // Function to remove a trip
  const removeTrip = (tripName: string) => {
    setTrips((prevTrips) => {
      const updatedTrips = prevTrips.filter((trip) => trip.name !== tripName);
      if (selectedTrip === tripName) {
        setSelectedTrip(updatedTrips[0]?.name || ""); // Update selectedTrip if removed
      }
      return updatedTrips;
    });
  };

  return (
    <TripContext.Provider
      value={{ trips, selectedTrip, setSelectedTrip, setTrips, removeTrip }}
    >
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
