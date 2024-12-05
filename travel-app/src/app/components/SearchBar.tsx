"use client";
import React, { useState } from "react";

interface SearchBarProps {
  onSearchChange: (query: string) => void;
}

export default function SearchBar({ onSearchChange }: SearchBarProps) {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      onSearchChange(inputValue); // Trigger filtering on Enter key
    }
  };

  return (
    <section style={{ padding: "20px", textAlign: "center" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "10px",
        }}
      >
        <input
          type="text"
          placeholder="Search for a restaurant..."
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown} // Add event listener for Enter key
          style={{
            width: "590%",
            padding: "10px",
            fontSize: "16px",
            borderRadius: "20px",
            border: "2px solid #252F40",
          }}
        />
      </div>
      <style>
        
      </style>
    </section>
  );
}
