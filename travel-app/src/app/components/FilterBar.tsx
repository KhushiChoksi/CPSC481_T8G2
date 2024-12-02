import React, { useState } from "react";

type FilterBarProps = {
  onFilterChange: (filterType: string, value: string) => void; // Callback for filter change
};

const FilterBar: React.FC<FilterBarProps> = ({ onFilterChange }) => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [selectedFilters, setSelectedFilters] = useState({
    cuisine: "",
    price: "",
    regulation: "",
  });

  // Toggle dropdown
  const toggleDropdown = (filter: string) => {
    setActiveDropdown((prev) => (prev === filter ? null : filter));
  };

  // Handle selection from dropdown
  const handleSelection = (filterType: string, value: string) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
    onFilterChange(filterType, value); // Apply filter
    setActiveDropdown(null); // Close dropdown
  };

  // Handle filter reset (cross click)
  const handleReset = (filterType: string) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [filterType]: "",
    }));
    onFilterChange(filterType, ""); // Reset filter
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        padding: "10px 20px",
        position: "relative",
      }}
    >
      <span style={{ fontWeight: "bold", color: "#333" }}>Filters:</span>

      {/* Cuisine Filter */}
      <div style={{ position: "relative" }}>
        <button
          onClick={() => toggleDropdown("cuisine")}
          style={{
            padding: "10px 20px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            backgroundColor: "#f9f9f9",
            fontWeight: selectedFilters.cuisine ? "bold" : "normal",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "10px",
            color: "#333"
          }}
        >
          Cuisine
          {selectedFilters.cuisine && (
            <span
              onClick={(e) => {
                e.stopPropagation(); // Prevent dropdown toggle
                handleReset("cuisine");
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
        {activeDropdown === "cuisine" && (
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
              color: "#333"
            }}
          >
            <div
              onClick={() => handleSelection("cuisine", "Japanese")}
              style={{
                padding: "10px",
                cursor: "pointer",
                borderBottom: "1px solid #eee",
              }}
            >
              Japanese
            </div>
            <div
              onClick={() => handleSelection("cuisine", "Mediterranean")}
              style={{
                padding: "10px",
                cursor: "pointer",
                borderBottom: "1px solid #eee",
              }}
            >
              Mediterranean
            </div>
            <div
              onClick={() => handleSelection("cuisine", "International")}
              style={{
                padding: "10px",
                cursor: "pointer",
              }}
            >
              International
            </div>
          </div>
        )}
      </div>

      {/* Price Filter */}
      <div style={{ position: "relative" }}>
        <button
          onClick={() => toggleDropdown("price")}
          style={{
            padding: "10px 20px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            backgroundColor: "#f9f9f9",
            fontWeight: selectedFilters.price ? "bold" : "normal",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "10px",
            color: "#333"
          }}
        >
          Price
          {selectedFilters.price && (
            <span
              onClick={(e) => {
                e.stopPropagation(); // Prevent dropdown toggle
                handleReset("price");
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
        {activeDropdown === "price" && (
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
              color: "#333"
            }}
          >
            <div
              onClick={() => handleSelection("price", "$")}
              style={{
                padding: "10px",
                cursor: "pointer",
                borderBottom: "1px solid #eee",
              }}
            >
              $
            </div>
            <div
              onClick={() => handleSelection("price", "$$")}
              style={{
                padding: "10px",
                cursor: "pointer",
                borderBottom: "1px solid #eee",
              }}
            >
              $$
            </div>
            <div
              onClick={() => handleSelection("price", "$$$")}
              style={{
                padding: "10px",
                cursor: "pointer",
              }}
            >
              $$$
            </div>
          </div>
        )}
      </div>

      {/* Regulation Filter */}
      <div style={{ position: "relative" }}>
        <button
          onClick={() => toggleDropdown("regulation")}
          style={{
            padding: "10px 20px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            backgroundColor: "#f9f9f9",
            fontWeight: selectedFilters.regulation ? "bold" : "normal",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "10px",
            color: "#333"
          }}
        >
          Regulation
          {selectedFilters.regulation && (
            <span
              onClick={(e) => {
                e.stopPropagation(); 
                handleReset("regulation");
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
        {activeDropdown === "regulation" && (
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
              color: "#333"
            }}
          >
            <div
              onClick={() => handleSelection("regulation", "Halal")}
              style={{
                padding: "10px",
                cursor: "pointer",
                borderBottom: "1px solid #eee",
              }}
            >
              Halal
            </div>
            <div
              onClick={() => handleSelection("regulation", "Gluten Free")}
              style={{
                padding: "10px",
                cursor: "pointer",
              }}
            >
              Gluten Free
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterBar;


