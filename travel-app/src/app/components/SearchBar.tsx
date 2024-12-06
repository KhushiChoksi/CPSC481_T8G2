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
    <section style={{ padding: "28px 20px", textAlign: "center" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <input
          type="text"
          placeholder="Search for a restaurant..."
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown} // Add event listener for Enter key
          style={{
            width: "100%", // Dynamically adapt width
            maxWidth: "500px", // Limit max width
            padding: "10px",
            fontSize: "16px",
            color: "#000000",
            borderRadius: "20px",
            border: "2px solid #252F40",
          }}
        />
      </div>
    </section>
  );
}