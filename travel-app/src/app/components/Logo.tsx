import React from "react";

const Logo: React.FC = () => {
  // Function to calculate ray styles
  const getRayStyle = (index: number): React.CSSProperties => {
    const angle = index * 45; // Rays every 45 degrees
    return {
      transform: `rotate(${angle}deg) translateY(-26px)`, // Rays positioned outward
    };
  };

  // Styles specific to the logo
  const styles: { [key: string]: React.CSSProperties } = {
    logo: {
      position: "relative",
      width: "65px",
      height: "65px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    circle: {
      width: "37px", // Circle size
      height: "37px",
      backgroundColor: "#FFD426",
      borderRadius: "50%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)", // Center the circle
      zIndex: 2, // Above rays
    },
    logoText: {
      fontFamily: '"Comic Sans MS", "Brush Script MT", sans-serif',
      fontSize: "24px",
      fontStyle: "italic",
      color: "#000000",
    },
    ray: {
      position: "absolute",
      width: "4px", // Width of the ray
      height: "12px", // Length of the ray
      backgroundColor: "#FFD426",
      top: "calc(50% - 6px)", // Adjusted position to align rays
      left: "calc(50% - 2px)", // Adjusted position to align rays
      transformOrigin: "center center", // Rays rotate from the center
      zIndex: 1, // Behind the circle
    },
  };

  return (
    <div style={styles.logo}>
      {/* Rays */}
      {[...Array(8)].map((_, index) => (
        <div key={index} style={{ ...styles.ray, ...getRayStyle(index) }} />
      ))}
      {/* Circle with Text */}
      <div style={styles.circle}>
        <span style={styles.logoText}>TB</span>
      </div>
    </div>
  );
};

export default Logo;