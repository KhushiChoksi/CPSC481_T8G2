"use client";
import { useState } from "react";
 
import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import Topbar from "../components/Topbar";
import { FilterBar } from "../components/FilterBar";
import BackButton from "../components/BackButton";

import MenuPopup from "./components/MenuPopup";

type MenuItem = {
  name: string;
  price: string;
};

type Restaurant = {
  id:number;
  title: string;
  description: string;
  address: string;
  imageUrl: string;
  cuisine: string;
  price: string;
  reservation: string[];
  booked: boolean;
  menu: MenuItem[];
  timeOpen: string;
  visitDate: string;
  timeStart:string;
  timeEnd: string;
};

const restaurants: Restaurant[] = [
  {
    title: "Cactus Club Cafe",
    description: "Fine casual dining restaurant offering the best in global cuisine.",
    address: "101 3 Ave SW",
    imageUrl: "/images/cactus.jpg",
    cuisine: "International",
    price: "$$",
    reservation: [],
    timeOpen: "9am - 12am",
    booked: false,
    visitDate: "",
    timeStart: "",
    timeEnd: "",
    id: 1,
    menu: [
      { name: "Spaghetti Portifino", price: "$20.99" },
      { name: "Grilled Salmon", price: "$25.99" },
      { name: "Steak Fries", price: "$22.99" },
      { name: "Truffle Fries", price: "$12.99"},
      { name: "Tuna stack", price: "$21.99"},
      { name: "Teriyaki Chicken Bowl", price: "$23.99"}
    ],

  },
  {
    title: "Osmows",
    description: "A casual Mediterranean restaurant that offers a halal collection.",
    address: "890 32 Ave NW",
    imageUrl: "/images/osm.jpg",
    cuisine: "Mediterranean",
    price: "$",
    reservation: ["Halal"],
    timeOpen: "9am - 9pm",
    booked: false,
    visitDate: "",
    timeStart: "",
    timeEnd: "",
    id: 2,
    menu: [
      { name: "Caesar Salad", price: "$5.99" },
      { name: "Chicken Shwarama", price: "$10.99" },
      { name: "The Med Bowl", price: "$15.99" },
      { name: "Chicken on the rocks", price: "$12.99"}
    ],
  },
  {
    title: "Ryuko",
    description: "Fine Dining Japanese kitchen and bar with a mix of tradition and modernity.",
    address: "45 12 Ave SW",
    imageUrl: "/images/ryuko.jpg",
    cuisine: "Japanese",
    price: "$$$",
    reservation: [],
    timeOpen: "9am - 9pm",
    booked: false,
    visitDate: "",
    timeStart: "",
    timeEnd: "",
    id: 3,
    menu: [
      { name: "Premium Nigiri Set", price: "$50.99" },
      { name: "Surf and Turf Roll", price: "$25.99" },
      { name: "Rolls Royce", price: "$48.99" },
      { name: "Truffle Fries", price: "$12.99"},
      { name: "Premuim Sashimi Set", price: "$85.99"}
    ],
  },
  {
    title: "Kinjo",
    description: "A casual restaurant where a lot of people can meet up. Offers gluten-free options.",
    address: "990 64 Ave NW",
    imageUrl: "/images/kinjo.jpg",
    cuisine: "Japanese",
    price: "$",
    reservation: ["Gluten Free"],
    timeOpen: "10am - 12am",
    booked: false,
    visitDate: "",
    timeStart: "",
    timeEnd: "",
    id: 4,
    menu: [
      { name: "Caesar Salad", price: "$12.99" },
      { name: "Grilled Salmon", price: "$25.99" },
      { name: "Steak Sandwich", price: "$22.99" },
    ],
  },
];

export default function RestaurantsPage() {
  const [activeFilters, setActiveFilters] = useState({
    cuisine: [] as string[],
    price: [] as string[],
    reservation: [] as string[],
  });
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null); // For the selected restaurant
  const [isMenuPopupOpen, setIsMenuPopupOpen] = useState(false); // For popup visibility
  

  const handleFilterChange = (filterType: "cuisine" | "price" | "reservation", value: string) => {
    setActiveFilters((prev) => {
      const isActive = prev[filterType].includes(value);
      const updatedFilters = isActive
        ? prev[filterType].filter((item) => item !== value)
        : [...prev[filterType], value];

      return { ...prev, [filterType]: updatedFilters };
    });
  };

  const handleFilterReset = (filterType: "cuisine" | "price" | "reservation") => {
    setActiveFilters((prev) => ({ ...prev, [filterType]: [] }));
  };
  const handleMenuClick = (restaurant: Restaurant) => {
    setSelectedRestaurant(restaurant); // Set the selected restaurant
    setIsMenuPopupOpen(true); // Open the popup
  };
  const handleSearchChange = (query: string) => {
    setSearchQuery(query.trim().toLowerCase());
  };

  const closeMenuPopup = () => {
    setIsMenuPopupOpen(false); // Close the popup
    setSelectedRestaurant(null); // Clear the selected restaurant
  };

  const filteredRestaurants = restaurants.filter((restaurant) => {
    const matchesCuisine =
      activeFilters.cuisine.length === 0 || activeFilters.cuisine.includes(restaurant.cuisine);
    const matchesPrice =
      activeFilters.price.length === 0 || activeFilters.price.includes(restaurant.price);
    const matchesReservation =
      activeFilters.reservation.length === 0 ||
      activeFilters.reservation.some((r) => restaurant.reservation.includes(r));
    const matchesSearch =
      searchQuery === "" || restaurant.title.toLowerCase().includes(searchQuery);

    return matchesCuisine && matchesPrice && matchesReservation && matchesSearch;
  });

  return (
    <div>
      <div
        style={{
          filter: selectedRestaurant ? "blur(px)" : "none",
          pointerEvents: selectedRestaurant ? "none" : "auto",
        }}
        >
      <Topbar />
      <div style={{ marginTop: "75px", marginLeft: "20px" }}>
      <div className='mt-20' style={{ paddingLeft: "1px", paddingRight: "16px" }}> <BackButton title='Restaurants'/> </div>
        </div>

      <FilterBar
        activeFilters={activeFilters}
        onFilterChange={handleFilterChange}
        onFilterReset={handleFilterReset}
      />

      <SearchBar onSearchChange={handleSearchChange} />

      <div style={{ padding: "20px", marginBottom: "120px" }}>
        {filteredRestaurants.map((restaurant, index) => (
          <div
            key={index}
            style={{
                display: "flex",
                flexDirection: "column",
                backgroundColor: "#edf2ff",
                borderRadius: "15px",
                marginBottom: "20px",
                padding: "15px",
                boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                color: "black",
                cursor: "pointer",
                position: "relative",
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <img
                src={restaurant.imageUrl}
                alt={restaurant.title}
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
                    textAlign: "center",
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                    maxWidth: "calc(100% - 220px)", // Ensures it fits within the box width minus image space
                }}
              >
                <span style={{ fontSize: "1.2rem", color: "#4a90e2" }}>📍</span>
                  <span
                    style={{
                      overflowWrap: "break-word",
                      wordBreak: "break-word",
                      whiteSpace: "normal", // Allow wrapping
                    }}
                  >
                    {restaurant.address}
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
                  {restaurant.title}
                  {restaurant.booked && (
                    <span style={{ color: "green", fontSize: "1.2rem" }}>✓</span>
                  )}
                </h3>
                <button
                onClick={() => handleMenuClick(restaurant)}
                style={{
                  alignSelf: "flex-end",
                  marginLeft: "270px",
                  position:"absolute",
                  top:"190px",
                  //marginBottom: "5px",
                  padding: "10px 20px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                  backgroundColor: "#007bff",
                  color: "#fff",
                  cursor: "pointer",
                }}
              >
                Menu
              </button>
                <p style={{ color: "#5a5a5a", fontSize: "1rem" }}>
                  {restaurant.description}
                </p>
              </div>
              
            
            </div>
          
        ))}
      </div>
      </div>
      <MenuPopup
        isOpen={isMenuPopupOpen}
        onClose={closeMenuPopup}
        selectedRestaurant={selectedRestaurant}
      />

      <Navbar />
    </div>
  );
}


