"use client";

import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import Topbar from "../components/Topbar";
import BackButton from "../components/BackButton";
import { useState } from "react";
import PopupModal from "./addVisitPopup";
import { IoLocationSharp } from "react-icons/io5";

// Define the type for a suggestion object
type Suggestion = {
  id: number;
  title: string;
  description: string;
  address: string;
  imageUrl: string;
  category: string;
  timeOpen: string;
  visitDate: string;
  booked: boolean;
  timeStart: string | null;
  timeEnd: string | null;
};

// Suggestions data array with the correct type
const suggestions: Suggestion[] = [
  {
    id: 12,
    title: "Calgary Tower",
    description: "The Calgary Tower is a 190.8-metre free standing observation tower.",
    address: "101 9 Ave SW, Calgary",
    imageUrl: "/images/Calgary_Tower.jpg",
    category: "Sights",
    timeOpen: "9 a.m. - 9 p.m.",
    visitDate: "",
    booked: false,
    timeStart: "",
    timeEnd: "",
  },
  {
    id: 13,
    title: "Bowness Park",
    description: "Bowness Park is a scenic Calgary park with seasonal boating and skating.",
    address: "8900 48 Ave NW, Calgary",
    imageUrl: "/images/Bowness_Park.jpg",
    category: "Parks",
    timeOpen: "5 a.m. - 11 p.m.",
    visitDate: "",
    booked: false,
    timeStart: "",
    timeEnd: "",
  },
  {
    id: 14,
    title: "Peace Bridge",
    description: "Peace Bridge is a bridge across the Bow River. The bridge was designed by Spanish architect Santiago Calatrava",
    address: "916 Memorial Dr NW, Calgary",
    imageUrl: "/images/peace_bridge.jpg",
    category: "Sights",
    timeOpen: "Open 24/7",
    visitDate: "",
    booked: false,
    timeStart: "",
    timeEnd: "",
  },
  {
    id: 15,
    title: "Calgary Zoo",
    description: "Home to a wide array of animals and habitats, including a prominent penguin facility.",
    address: "1300 Zoo Rd NE, Calgary",
    imageUrl: "/images/calgary_zoo.jpg",
    category: "Museums",
    timeOpen: "9 a.m. - 5 p.m.",
    visitDate: "",
    booked: false,
    timeStart: "",
    timeEnd: "",
  },
  {
    id: 16,
    title: "Glenbow Museum",
    description: "Explore art and history with a vast collection of cultural artifacts and international exhibitions",
    address: "130 9 Ave SE, Calgary",
    imageUrl: "/images/glenbow_museum.jpg",
    category: "Museums",
    timeOpen: "10 a.m. - 5 p.m.",
    visitDate: "",
    booked: false,
    timeStart: "",
    timeEnd: "",
  },
  {
    id: 17,
    title: "Prince's Island Park",
    description: "A green oasis in downtown Calgary offering trails, wetlands, and spaces for outdoor events",
    address: "698 Eau Claire Ave SW, Calgary",
    imageUrl: "/images/prince_park.jpg",
    category: "Parks",
    timeOpen: "5 a.m. - 11 p.m.",
    visitDate: "",
    booked: false,
    timeStart: "",
    timeEnd: "",
  }
];

export default function ExplorePage() {
  const [activeFilter, setActiveFilter] = useState<string>(""); // Type the filter state as a string
  const [selectedSuggestion, setSelectedSuggestion] = useState<Suggestion | null>(null); // Explicit type for selected suggestion
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleFilterClick = (category: string) => {
    setActiveFilter((prevFilter) => (prevFilter === category ? "" : category));
  };

  const handleSuggestionClick = (suggestion: Suggestion) => {
    setSelectedSuggestion(suggestion); // Open the modal with the selected suggestion
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query.trim().toLowerCase());
  };

  const closeModal = () => {
    setSelectedSuggestion(null); // Close the modal
  };

  // const filteredSuggestions = activeFilter
  //   ? suggestions.filter((suggestion) => suggestion.category === activeFilter)
  //   : suggestions;

  const filteredSuggestions = suggestions.filter((suggestion) => {
    const matchesFilter = activeFilter ? suggestion.category === activeFilter : true;
    const matchesSearch = searchQuery
      ? suggestion.title.toLowerCase().includes(searchQuery) ||
        suggestion.description.toLowerCase().includes(searchQuery)
      : true;

    return matchesFilter && matchesSearch;
  });

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
        <div style={{ marginTop: "80px", marginLeft: "20px", marginBottom: "6px" }}>
          <BackButton title="Explore"/>
        </div>

        {/* Filters */}
        <div style={{ 
          marginLeft: "20px", 
          marginBottom: "10px",
          marginTop: "10px",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: "10px"
        }}>
          <span
            style={{
              fontWeight: "bold",
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
                padding: "5px 10px",
                borderRadius: "5px",
                borderWidth: "1px",
                borderColor: activeFilter === category ? "#000" : "#bbb",
                backgroundColor: activeFilter === category ? "#ddd" : "rgba(0, 53, 84, 0.1)",
                cursor: "pointer",
                color: "black",
                display: "flex",
                alignItems: "center",
                gap: "7px"
              }}
            >
              {category}
              {activeFilter === category && (
                <span style={{ marginLeft: "3px", color: "red" }}>×</span>
              )}
            </button>
          ))}
        </div>        
        
        <SearchBar onSearchChange={handleSearchChange} />

        {/* Explore options */}
        <div style={{ padding: "20px", marginBottom: "120px" }}>
          {filteredSuggestions.map((suggestion, index) => (
            <div
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              style={{
                display: "flex",
                flexDirection: "column",
                backgroundColor: "#edf2ff",
                borderRadius: "15px",
                marginBottom: "15px",
                padding: "15px",
                boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                color: "black",
                cursor: "pointer",
                position: "relative",
                border: "1px solid black"
              }}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <img
                  src={suggestion.imageUrl}
                  alt={suggestion.title}
                  style={{
                    width: "180px",
                    height: "180px",
                    borderRadius: "5px",
                    marginRight: "10px",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                    backgroundColor: "#f7f7f7",
                    border: "1px solid #ccc",
                    borderRadius: "8px",
                    padding: "5px 10px",
                    fontSize: "0.8rem",
                    textAlign: "left",
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                    maxWidth: "calc(100% - 220px)", // Ensures it fits within the box width minus image space
                  }}
                >
                  {/* <span style={{ fontSize: "1.2rem", color: "#4a90e2" }}>📍</span> */}
                  <div style={{ marginRight:"1px", fontSize: "1rem", color: "black" }} > <IoLocationSharp/>  </div>
                  <span
                    style={{
                      overflowWrap: "break-word",
                      wordBreak: "break-word",
                      whiteSpace: "normal", // Allow wrapping
                    }}
                  >
                    {suggestion.address}
                  </span>
                </div>
              </div>
        
              <div style={{ marginTop: "10px", textAlign: "left" }}>
                <h3 style={{
                  fontSize: "1.4rem",
                  fontWeight: "bold",
                  marginBottom: "5px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px"
                }}>
                  {suggestion.title}
                  {suggestion.booked && (
                    <span style={{ color: "green", fontSize: "1.2rem" }}>✓</span>
                  )}
                </h3>
                <p style={{ color: "#5a5a5a", fontSize: "1rem" }}>
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