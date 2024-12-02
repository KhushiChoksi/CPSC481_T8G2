"use client";

import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useRouter } from "next/navigation";

interface BackButtonProps {
  onClick?: () => void; // Optional callback for additional logic
  ariaLabel?: string;   // Optional aria-label for accessibility
  title?: string;       // Optional title attribute
}

const BackButton: React.FC<BackButtonProps> = ({
  onClick,
  ariaLabel = "Go back",
  title = "",
}) => {
  const router = useRouter();

  const handleBackClick = () => {
    if (onClick) onClick(); // Call additional logic if provided
    router.back(); // Navigate back
  };

  return (
    <div className="flex flex-row mt-2">
    <button
      type="button"
      onClick={handleBackClick}
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

export default BackButton;