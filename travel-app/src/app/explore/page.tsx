"use client";

import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import Topbar from "../components/Topbar";
import { useState } from "react";
import PopupModal from "./addVisitPopup";

// Define the type for a suggestion object
type Suggestion = {
  name: string;
  description: string;
  address: string;
  imageUrl: string;
  category: string;
  timeOpen: string;
};

// Suggestions data array with the correct type
const suggestions: Suggestion[] = [
  {
    name: "Calgary Tower",
    description: "The Calgary Tower is a 190.8-metre free standing observation tower.",
    address: "101 9 Ave SW",
    imageUrl: "/images/Calgary_Tower.jpg",
    category: "Sights",
    timeOpen: "9 a.m. - 9 p.m."
  },
  {
    name: "Bowness Park",
    description: "Bowness Park is a scenic Calgary park with seasonal boating and skating.",
    address: "8900 48 Ave NW",
    imageUrl: "/images/Bowness_Park.jpg",
    category: "Parks",
    timeOpen: "5 a.m. - 11 p.m."
  },
  {
    name: "Peace Bridge",
    description: "Peace Bridge is a bridge across the Bow River. The bridge was designed by Spanish architect Santiago Calatrava",
    address: "916 Memorial Dr NW",
    imageUrl: "/images/peace_bridge.jpg",
    category: "Sights",
    timeOpen: "Open 24/7"
  },
  {
    name: "Calgary Zoo",
    description: "Home to a wide array of animals and habitats, including a prominent penguin facility.",
    address: "1300 Zoo Rd NE",
    imageUrl: "/images/calgary_zoo.jpg",
    category: "Museums",
    timeOpen: "9 a.m. - 5 p.m."
  },
  {
    name: "Glenbow Museum",
    description: "Explore art and history with a vast collection of cultural artifacts and international exhibitions",
    address: "130 9 Ave SE",
    imageUrl: "/images/glenbow_museum.jpg",
    category: "Museums",
    timeOpen: "10 a.m. - 5 p.m."
  },
  {
    name: "Prince's Island Park",
    description: "A green oasis in downtown Calgary offering trails, wetlands, and spaces for outdoor events",
    address: "698 Eau Claire Ave SW",
    imageUrl: "/images/prince_park.jpg",
    category: "Parks",
    timeOpen: "5 a.m. - 11 p.m."
  }
];

export default function ExplorePage() {
  const [activeFilter, setActiveFilter] = useState<string>(""); // Type the filter state as a string
  const [selectedSuggestion, setSelectedSuggestion] = useState<Suggestion | null>(null); // Explicit type for selected suggestion

  const handleFilterClick = (category: string) => {
    setActiveFilter((prevFilter) => (prevFilter === category ? "" : category));
  };

  const handleSuggestionClick = (suggestion: Suggestion) => {
    setSelectedSuggestion(suggestion); // Open the modal with the selected suggestion
  };

  const closeModal = () => {
    setSelectedSuggestion(null); // Close the modal
  };

  const filteredSuggestions = activeFilter
    ? suggestions.filter((suggestion) => suggestion.category === activeFilter)
    : suggestions;

  return (
    <div>
      {/* Main Content */}
      <div
        style={{
          filter: selectedSuggestion ? "blur(5px)" : "none", // Add blur if modal is open
          pointerEvents: selectedSuggestion ? "none" : "auto", // Disable interaction if modal is open
        }}
      >
        <Topbar />
        <div style={{ marginTop: "75px", marginLeft: "20px" }}>
          <h2
            style={{
              fontSize: "24px",
              fontWeight: "bold",
              color: "#000",
              marginBottom: "10px",
            }}
          >
            Explore:
          </h2>
        </div>

        {/* Filters */}
        <div style={{ marginLeft: "20px", marginBottom: "10px" }}>
          <span
            style={{
              fontWeight: "bold",
              marginRight: "10px",
              color: "black",
            }}
          >
            Filters:
          </span>
          {["Parks", "Museums", "Sights"].map((category) => (
            <button
              key={category}
              onClick={() => handleFilterClick(category)}
              style={{
                marginRight: "10px",
                padding: "5px 10px",
                borderRadius: "5px",
                borderWidth: "1px",
                borderColor: activeFilter === category ? "#000" : "#bbb",
                backgroundColor: activeFilter === category ? "#ddd" : "",
                cursor: "pointer",
                color: "black",
              }}
            >
              {category}
            </button>
          ))}
        </div>

        <SearchBar />

        {/* Explore options */}
        <div style={{ padding: "20px" }}>
          {filteredSuggestions.map((suggestion, index) => (
            <div
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              style={{
                display: "flex",
                flexDirection: "row",
                backgroundColor: "#e5f2ff",
                borderRadius: "15px",
                marginBottom: "20px",
                overflow: "hidden",
                boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                position: "relative",
                color: "black",
                cursor: "pointer",
              }}
            >
              <div style={{ position: "relative", flexShrink: "0" }}>
                <img
                  src={suggestion.imageUrl}
                  alt={suggestion.name}
                  style={{
                    width: "150px",
                    height: "200px",
                    objectFit: "cover",
                  }}
                />
                {suggestion.address && (
                  <div
                    style={{
                      position: "absolute",
                      bottom: "10px",
                      left: "5px",
                      right: "5px",
                      backgroundColor: "#fff",
                      padding: "5px 10px",
                      borderRadius: "10px",
                      fontSize: "0.8rem",
                      textAlign: "center",
                    }}
                  >
                    {suggestion.address}
                  </div>
                )}
              </div>
              <div
                style={{
                  paddingLeft: "20px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <h3
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: "bold",
                    marginBottom: "5px",
                  }}
                >
                  {suggestion.name}
                </h3>
                <p style={{ color: "#5a5a5a", paddingRight: "10px" }}>
                  {suggestion.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <PopupModal
        isOpen={!!selectedSuggestion}
        onClose={closeModal}
        selectedSuggestion={selectedSuggestion}
      />

      <Navbar />
    </div>
  );
}