"use client";
import { useState } from "react";
import { useRouter } from "next/navigation"; 
import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import Topbar from "../components/Topbar";
import { IoIosArrowBack } from "react-icons/io";
import { FilterBar } from "../components/FilterBar";
import BackButton from "../components/BackButton";

type Restaurant = {
  name: string;
  description: string;
  address: string;
  imageUrl: string;
  cuisine: string;
  price: string;
  reservation: string[];
};

const restaurants: Restaurant[] = [
  {
    name: "Cactus Club Cafe",
    description: "Fine casual dining restaurant offering the best in global cuisine.",
    address: "101 3 Ave SW",
    imageUrl: "/images/cactus.jpg",
    cuisine: "International",
    price: "$$",
    reservation: [],
  },
  {
    name: "Osmows",
    description: "A casual Mediterranean restaurant that offers a halal collection.",
    address: "890 32 Ave NW",
    imageUrl: "/images/osm.jpg",
    cuisine: "Mediterranean",
    price: "$",
    reservation: ["Halal"],
  },
  {
    name: "Ryuko",
    description: "Fine Dining Japanese kitchen and bar with a mix of tradition and modernity.",
    address: "45 12 Ave SW",
    imageUrl: "/images/ryuko.jpg",
    cuisine: "Japanese",
    price: "$$$",
    reservation: [],
  },
  {
    name: "Kinjo",
    description: "A casual restaurant where a lot of people can meet up. Offers gluten-free options.",
    address: "990 64 Ave NW",
    imageUrl: "/images/kinjo.jpg",
    cuisine: "Japanese",
    price: "$",
    reservation: ["Gluten Free"],
  },
];

export default function RestaurantsPage() {
  const [activeFilters, setActiveFilters] = useState({
    cuisine: [] as string[],
    price: [] as string[],
    reservation: [] as string[],
  });

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

  const filteredRestaurants = restaurants.filter((restaurant) => {
    const matchesCuisine =
      activeFilters.cuisine.length === 0 || activeFilters.cuisine.includes(restaurant.cuisine);
    const matchesPrice =
      activeFilters.price.length === 0 || activeFilters.price.includes(restaurant.price);
    const matchesReservation =
      activeFilters.reservation.length === 0 ||
      activeFilters.reservation.some((r) => restaurant.reservation.includes(r));

    return matchesCuisine && matchesPrice && matchesReservation;
  });

  return (
    <div>
      <Topbar />
      <div style={{ marginTop: "75px", marginLeft: "20px" }}>
      <div className='mt-20 px-4'> <BackButton title='Restaurants'/> </div>
        </div>

      <FilterBar
        activeFilters={activeFilters}
        onFilterChange={handleFilterChange}
        onFilterReset={handleFilterReset}
      />

      <SearchBar />

      <div style={{ padding: "20px" }}>
        {filteredRestaurants.map((restaurant, index) => (
          <div
            key={index}
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
            }}
          >
            <div style={{ position: "relative", flexShrink: "0" }}>
              <img
                src={restaurant.imageUrl}
                alt={restaurant.name}
                style={{
                  width: "150px",
                  height: "200px",
                  objectFit: "cover",
                }}
              />
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
                {restaurant.address}
              </div>
            </div>
            <div
              style={{
                paddingLeft: "20px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div>
                <h3
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: "bold",
                    marginBottom: "5px",
                  }}
                >
                  {restaurant.name}
                </h3>
                <p style={{ color: "#5a5a5a", paddingRight: "10px" }}>
                  {restaurant.description}
                </p>
              </div>
              <button
                style={{
                  alignSelf: "flex-end",
                  marginRight: "10px",
                  marginBottom: "10px",
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
            </div>
          </div>
        ))}
      </div>

      <Navbar />
    </div>
  );
}


