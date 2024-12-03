import React, { useState } from "react";

type FilterBarProps = {
  activeFilters: {
    cuisine: string[];
    price: string[];
    reservation: string[];
  };
  onFilterChange: (filterType: "cuisine" | "price" | "reservation", value: string) => void;
  onFilterReset: (filterType: "cuisine" | "price" | "reservation") => void;
};

export const FilterBar: React.FC<FilterBarProps> = ({ activeFilters, onFilterChange, onFilterReset }) => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const filterOptions = {
    cuisine: ["Japanese", "Mediterranean", "International"],
    price: ["$", "$$", "$$$"],
    reservation: ["Halal", "Gluten Free"],
  };

  const toggleDropdown = (filterType: string) => {
    setActiveDropdown((prev) => (prev === filterType ? null : filterType));
  };

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "20px", padding: "10px 20px",  color: "#000", }}>
      <span style={{ fontWeight: "bold" }}>Filters:</span>

      {Object.entries(filterOptions).map(([filterType, options]) => (
        <div style={{ position: "relative" }} key={filterType}>
          <button
            onClick={() => toggleDropdown(filterType)}
            style={{
              padding: "10px 20px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              backgroundColor: activeFilters[filterType as keyof typeof activeFilters].length > 0 ? "#ddd" : "#fff",
              cursor: "pointer",
              fontWeight: activeFilters[filterType as keyof typeof activeFilters].length > 0 ? "bold" : "normal",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "10px",
            }}
          >
            {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
            {activeFilters[filterType as keyof typeof activeFilters].length > 0 && (
              <span
                onClick={(e) => {
                  e.stopPropagation(); // Prevent dropdown toggle
                  onFilterReset(filterType as "cuisine" | "price" | "reservation");
                }}
                style={{
                  marginLeft: "10px",
                  fontSize: "14px",
                  fontWeight: "bold",
                  color: "red",
                  cursor: "pointer",
                }}
              >
                ✕
              </span>
            )}
          </button>

          {activeDropdown === filterType && (
            <div
              style={{
                position: "absolute",
                top: "100%",
                left: 0,
                background: "#fff",
                border: "1px solid #ccc",
                borderRadius: "5px",
                zIndex: 10,
                width: "150px",
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
              }}
            >
              {options.map((option) => (
                <div
                  key={option}
                  onClick={() => {
                    onFilterChange(filterType as "cuisine" | "price" | "reservation", option);
                    setActiveDropdown(null); // Close dropdown
                  }}
                  style={{
                    padding: "10px",
                    cursor: "pointer",
                    backgroundColor: activeFilters[filterType as keyof typeof activeFilters].includes(option)
                      ? "#ddd"
                      : "#fff",
                    borderBottom: "1px solid #eee",
                  }}
                >
                  {option}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FilterBar;
