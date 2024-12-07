import React, { useState } from "react";

type FilterBarProps = {
  activeFilters: {
    cuisine: string[];
    price: string[];
    Diet: string[];
  };
  onFilterChange: (filterType: "cuisine" | "price" | "Diet", value: string) => void;
  onFilterReset: (filterType: "cuisine" | "price" | "Diet") => void;
};

export const FilterBar: React.FC<FilterBarProps> = ({ activeFilters, onFilterChange, onFilterReset }) => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const filterOptions = {
    cuisine: ["Japanese", "Mediterranean", "International"],
    price: ["$", "$$", "$$$"],
    Diet: ["Halal", "Gluten Free"],
  };

  const toggleDropdown = (filterType: string) => {
    setActiveDropdown((prev) => (prev === filterType ? null : filterType));
  };

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "7px", padding: "10px 20px",  color: "#000"}}>
      <span style={{ fontWeight: "bold" }}>Filters:</span>

      {Object.entries(filterOptions).map(([filterType, options]) => (
        <div style={{ position: "relative" }} key={filterType}>
          <button
            onClick={() => toggleDropdown(filterType)}
            style={{
                marginRight: "10px",
                padding: "5px 10px",
                borderRadius: "5px",
                borderWidth: "1px",
                borderColor: activeFilters[filterType as keyof typeof activeFilters].length > 0 ? "#000" : "#bbb",
                backgroundColor:
                activeDropdown === filterType
                ? "#f0f8ff" 
                : activeFilters[filterType as keyof typeof activeFilters].length > 0
                ? "#ddd"
                : "rgba(0, 53, 84, 0.1)",
                cursor: "pointer",
                color: "black",
            }}
          >
            {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
            {activeFilters[filterType as keyof typeof activeFilters].length > 0 && (
              <span
                onClick={(e) => {
                  e.stopPropagation(); // Prevent dropdown toggle
                  onFilterReset(filterType as "cuisine" | "price" | "Diet");
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
                    onFilterChange(filterType as "cuisine" | "price" | "Diet", option);
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
