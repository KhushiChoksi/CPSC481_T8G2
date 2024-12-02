"use client";
import { useState } from "react";
import { useRouter } from "next/navigation"; 
import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import Topbar from "../components/Topbar";
import { IoIosArrowBack } from "react-icons/io";
import FilterBar from "../components/FilterBar";
import RestaurantCard from "../components/RestaurantCard";

export default function RestaurantsPage() {
  const router = useRouter();

  // Restaurant data
  const restaurants = [
    {
      id: 1,
      imageSrc: "/images/cactus.jpg",
      title: "Cactus Club Cafe",
      description: "Fine casual dining restaurant offering the best in global cuisine.",
      cuisine: "International",
      tags: [],
      price: "$$",
    },
    {
      id: 2,
      imageSrc: "/images/osm.jpg",
      title: "Osmows",
      description: "A casual Mediterranean restaurant that offers a halal collection.",
      cuisine: "Mediterranean",
      tags: ["Halal"],
      price: "$",
    },
    {
      id: 3,
      imageSrc: "/images/ryuko.jpg",
      title: "Ryuko",
      description: "Fine Dining Japanese kitchen and bar with a mix of tradition and modernity.",
      cuisine: "Japanese",
      tags: [],
      price: "$$$",
    },
    {
      id: 4,
      imageSrc: "/images/Kinjo.jpg",
      title: "Kinjo",
      description: "A casual restaurant where a lot of people can meet up. Offers gluten free options.",
      cuisine: "Japanese",
      tags: ["Gluten Free"],
      price: "$",
    },
  ];

  // Filter state
  const [filters, setFilters] = useState({
    cuisine: "", // "Japanese", "Mediterranean"
    price: "", // "$", "$$", "$$$"
    regulation: "", // "Halal", "Gluten Free"
    
  });

  // Function to handle filter changes
  const handleFilterChange = (filterType: string, value: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterType]: value,
    }));
  };

  // Filtered restaurants based on the selected filters
  const filteredRestaurants = restaurants.filter((restaurant) => {
    const matchesCuisine =
      filters.cuisine === "" || restaurant.cuisine === filters.cuisine;
    const matchesRegulation =
      filters.regulation === "" || restaurant.tags.includes(filters.regulation);
    const matchesPrice = filters.price === "" || restaurant.price === filters.price;

    return matchesCuisine && matchesRegulation && matchesPrice;
  });

  const handleMenuClick = (restaurantId: number) => {
    alert(`View menu for restaurant ID: ${restaurantId}`);
  };

  return (
    <div>
      <Topbar />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          padding: "10px 20px",
          marginTop: "60px",
        }}
      >
        <button
          onClick={() => router.back()}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            border: "none",
            cursor: "pointer",
            marginRight: "10px",
          }}
        >
          <IoIosArrowBack style={{ fontSize: "20px", color: "#333" }} />
        </button>
        <span style={{ fontSize: "30px", fontWeight: "bold", color: "#333" }}>
          Restaurants
        </span>
      </div>

      
      <FilterBar onFilterChange={handleFilterChange} />

     
      <SearchBar />

      
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "20px",
          padding: "20px",
        }}
      >
        {filteredRestaurants.map((restaurant) => (
          <RestaurantCard
            key={restaurant.id}
            imageSrc={restaurant.imageSrc}
            title={restaurant.title}
            description={restaurant.description}
            onButtonClick={() => handleMenuClick(restaurant.id)}
          />
        ))}
      </div>

      <Navbar />
    </div>
  );
}



