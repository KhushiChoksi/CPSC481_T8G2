import React from "react";

type RestaurantCardProps = {
  imageSrc: string; // The URL of the restaurant image
  title: string; // The title of the restaurant
  description: string; // The description of the restaurant
  onButtonClick: () => void; // Function to handle button click
};

const RestaurantCard: React.FC<RestaurantCardProps> = ({
  imageSrc,
  title,
  description,
  onButtonClick,
}) => {
  return (
    <div
      style={{
        backgroundColor: "#fff",
        borderRadius: "10px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        padding: "20px",
        marginBottom: "20px",
        textAlign: "left",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%",
      }}
    >
      <img
        src={imageSrc}
        alt={title}
        style={{
          width: "50%",
          height: "200px",
          objectFit: "cover",
          borderRadius: "10px",
        }}
      />
      <div style={{ marginTop: "10px" }}>
        <h3 style={{ fontSize: "18px", fontWeight: "bold", color: "#333" }}>
          {title}
        </h3>
        <p style={{ fontSize: "14px", color: "#666", margin: "10px 0" }}>
          {description}
        </p>
      </div>
      <div style={{ marginTop: "10px", display: "flex", justifyContent: "flex-end" }}>
        <button
          onClick={onButtonClick}
          style={{
            padding: "10px 20px",
            fontSize: "14px",
            border: "1px solid #007BFF",
            borderRadius: "5px",
            backgroundColor: "#007BFF", 
            cursor: "pointer",
            
          }}
        >
          Menu
        </button>
      </div>
    </div>
  );
};

export default RestaurantCard;

