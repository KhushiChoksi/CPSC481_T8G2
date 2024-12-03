"use client";

import React from "react";
import { IoClose } from "react-icons/io5";

interface CloseButtonProps {
  onClick: () => void; // Function to handle the click event
  size?: number; // Optional size for the "X" icon
  ariaLabel?: string; // Optional aria-label for accessibility
}

const CloseButton: React.FC<CloseButtonProps> = ({
  onClick,
  size = "2.8rem",
  ariaLabel = "Close",
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      style={{
        background: "none",
        border: "none",
        cursor: "pointer",
        padding: "0.5rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <IoClose size={size} style={{ color: "black" }} />
    </button>
  );
};

export default CloseButton;
