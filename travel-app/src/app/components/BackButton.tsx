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
  title = "Go back",
}) => {
  const router = useRouter();

  const handleBackClick = () => {
    if (onClick) onClick(); // Call additional logic if provided
    router.back(); // Navigate back
  };

  return (
    <button
      type="button"
      onClick={handleBackClick}
      className="mr-2"
      aria-label={ariaLabel}
      title={title}
    >
      <FaArrowLeft className="text-black h-6 w-6" />
    </button>
  );
};

export default BackButton;
