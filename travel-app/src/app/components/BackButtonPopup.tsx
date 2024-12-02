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
        className="mr-2 pl-1 pr-2 border border-1 border-solid border-black"
        aria-label={ariaLabel}
        title={title}
      >
        <FaArrowLeft className="text-4xl text-black h-6 w-6" />
      </button>
      <h2 className="ml-2 text-2xl font-bold">{title}</h2>
    </div>
  );
};

export default BackButtonPopup;
