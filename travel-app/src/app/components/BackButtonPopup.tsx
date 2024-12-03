"use client";

import React from "react";
import { FaArrowLeft } from "react-icons/fa";

interface BackButtonPopupProps {
  onClick: () => void; // Callback for going back one step
  ariaLabel?: string;   // Optional aria-label for accessibility
  title?: string;       // Optional title attribute
}

const BackButtonPopup: React.FC<BackButtonPopupProps> = ({
  onClick,
  ariaLabel = "Go back",
  title = "",
}) => {
  return (
    <div className="flex flex-row mt-2">
      <button
        type="button"
        onClick={onClick}
        className="mr-2 pl-1 pr-2 text-black"
        aria-label={ariaLabel}
        title={title}
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
        <FaArrowLeft size="1.8rem" style={{ color: "black" }} />
      </button>
      <h2 className="ml-2 text-2xl font-bold">{title}</h2>
    </div>
  );
};

export default BackButtonPopup;
