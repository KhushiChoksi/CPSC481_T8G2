"use client";
import Navbar from "../components/Navbar";
import Topbar from "../components/Topbar";
import BackButton from "../components/BackButton";
import { useState } from "react";
import PopupModal from "./addHotelPopup";
import DateSelectionPopup from "./dateSelectionPopup";
import { FaRegCalendarAlt } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";

export default function HotelsPage() {
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);
  const [isDatePopupOpen, setIsDatePopupOpen] = useState(false);
  const [selectedDates, setSelectedDates] = useState<string>("");
  const [buttonColor, setButtonColor] = useState<string>("bg-[#ADD8E6]");
  const [searchQuery, setSearchQuery] = useState<string>(""); 
  const [showDateWarning, setShowDateWarning] = useState(false);


  const handleHotelBooked = () => {
    if (selectedHotel) {
      setHotels((prevHotels) =>
        prevHotels.map((hotel) =>
          hotel.id === selectedHotel.id ? { ...hotel, booked: true } : hotel
        )
      );
    }
  };

  

  const handleHotelClick = (hotel: Hotel) => {
    if (!selectedDates) {
      setShowDateWarning(true); // Show warning
      setTimeout(() => setShowDateWarning(false), 3000); // Hide warning after 3 seconds
      return;
    }
    const updatedHotel = {
      ...hotel,
      visitdate: selectedDates,
    };
    setSelectedHotel(updatedHotel);
  };

  const closeModal = () => {
    setSelectedHotel(null);
  };

  const handleClearDates = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedDates("");
    setButtonColor("bg-[#ADD8E6]");
  };

  const handleOpenDatePopup = () => {
    setIsDatePopupOpen(true);
  };

  const handleCloseDatePopup = () => {
    setIsDatePopupOpen(false);
  };

  const handleSelectDates = (startDate: string, endDate: string) => {
    const formattedStartDate = new Date(startDate).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
    const formattedEndDate = new Date(endDate).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
    const formattedDates = `${formattedStartDate} - ${formattedEndDate}`;

    setSelectedDates(formattedDates);
    setButtonColor("bg-[#7AC7E0]");

    if (selectedHotel) {
      setSelectedHotel({
        ...selectedHotel,
        visitdate: formattedDates,
      });
    }
  };

  type Hotel = {
    id: number;
    title: string;
    description: string;
    address: string;
    imageUrl: string;
    visitdate: string;
    timeStart: string;
    timeEnd: string;
    booked: boolean;
    accessible: boolean;
    pets: boolean; 
  };

  const [hotels, setHotels] = useState<Hotel[]>([
    {
      id: 1,
      title: "Comfort Inn & Suites",
      description:
        "With an indoor pool and hot tub, only 5 minutes' drive away from the airport.",
      address: "147 Freeport Crescent NE, Calgary",
      imageUrl: "/images/hotel1.jpg",
      visitdate: "",
      timeStart: "",
      timeEnd: "",
      booked: false,
      accessible: true,
      pets: true,
    },
    {
      id: 2,
      title: "Hilton Garden Inn",
      description:
        "Featuring a rooftop hot tub, this hotel is close to downtown attractions.",
      address: "711 4th St. SE, Calgary",
      imageUrl: "/images/hotel2.jpg",
      visitdate: "",
      timeStart: "",
      timeEnd: "",
      booked: false,
      accessible: true,
      pets: true,
    },
    {
      id: 3,
      title: "Fairfield by Marriott Calgary",
      description:
        "A modern hotel offering a fitness center and complimentary breakfast.",
      address: "239 12th Ave SW, Calgary",
      imageUrl: "/images/hotel3.jpg",
      visitdate: "",
      timeStart: "",
      timeEnd: "",
      booked: false,
      accessible: false,
      pets: true,
    },
    {
      id: 4,
      title: "The Westin Calgary",
      description:
        "Luxury accommodations in downtown Calgary with an on-site spa.",
      address: "320 4th Ave SW, Calgary",
      imageUrl: "/images/hotel4.jpg",
      visitdate: "",
      timeStart: "",
      timeEnd: "",
      booked: false,
      accessible: true,
      pets: false,
    },
    {
      id: 5,
      title: "Sandman Signature Airport Hotel",
      description:
        "Conveniently located near the airport, with spacious rooms and dining options.",
      address: "25 Hopewell Way NE, Calgary",
      imageUrl: "/images/hotel5.jpg",
      visitdate: "",
      timeStart: "",
      timeEnd: "",
      booked: false,
      accessible: true,
      pets: false,
    },
    {
      id: 6,
      title: "Hyatt Place",
      description:
        "Stylish and comfortable hotel in Calgary’s Beltline district.",
      address: "1455 5th Street SW, Calgary",
      imageUrl: "/images/hotel6.jpg",
      visitdate: "",
      timeStart: "",
      timeEnd: "",
      booked: false,
      accessible: false,
      pets: true,
    },
  ]);
    const filteredHotels = hotels.filter((hotel) =>
      hotel.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <div className="min-h-screen bg-lightblue px-4 pt-6">
      <div
        className={`transition-all duration-300 ${
          isDatePopupOpen || selectedHotel ? "z-0 opacity-50 pointer-events-none" : "z-50"
        }`}
      >
        <Topbar />
      </div>


      
      <div className="flex items-center mt-12 mb-4">
        <BackButton title="Hotels" />
      </div>

      <div className="mt-2 relative">
        <button
          onClick={handleOpenDatePopup}
          className={`bg-white ml-1 border-[1px] border-black rounded-full px-3 py-1 flex items-center shadow-md hover:shadow-lg transition text-sm ${buttonColor}`}
        >
          {selectedDates ? (
            <div className="flex items-center">
              <span className="text-black mr-1">{selectedDates}</span>
              <span
                onClick={handleClearDates}
                className="text-black ml-2 font-bold cursor-pointer"
              >
                <div style={{color:'red'}}>X</div>
              </span>
            </div>
          ) : (
            <>
              {/* <span className="mr-1 text-black">📅 </span> */}
              <div className="mr-2 text-[#003554] text-base"> <FaRegCalendarAlt/> </div>
              <span className="text-[#003554] text-sm">Select Dates for Stay</span>
            </>
          )}
        </button>
        {showDateWarning && (
          <div
            style={{
              position: "absolute",
              top: "100%",
              left: "0",
              marginTop: "0px",
              marginLeft: "4px",
              padding: "5px 10px",
              // backgroundColor: "rgba(255, 255, 255, 0.9)",
              color: "red", 
              // border: "1.5px solid black",
              // borderRadius: "5px",
              fontSize: "0.9rem",
              whiteSpace: "nowrap",
              // boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
              fontWeight: "bold",
            }}
          >
            Please select a date before booking.
          </div>
        )}
      </div>



      {/* Custom Search Bar */}
      <div style={{ padding: "20px", textAlign: "center" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            justifySelf: "center",
            marginTop: "15px",
            width: "110%",
    
          }}
        >
          <input
            type="text"
            placeholder="Search for hotels..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: "100%",
              padding: "8px",
              fontSize: "16px",
              borderRadius: "20px",
              border: "2px solid #252F40",
              color: "#000",
            }}
          />
        </div>
      </div>


      <div style={{
          display: "flex",
          flexDirection: "column", // Keeps the cards stacked vertically
          alignItems: "center", // Centers cards horizontally
          padding: "20px",
          marginBottom: "120px",
        }}>
        {filteredHotels.map((hotel) => (
          <div
            key={hotel.id}
            onClick={() => handleHotelClick(hotel)}
            style={{
              display: "flex",
              flexDirection: "column",
              backgroundColor: "#e5f2ff",
              width: "110%", 
    
              border: "1px solid black",
              borderRadius: "15px",
              marginBottom: "15px",
              padding: "1rem",
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
              color: "black",
              cursor: "pointer",
              position: "relative",
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>

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
                  maxWidth: "calc(100% - 220px)",
                }}
              >
                {/* <span style={{ fontSize: "1rem", color: "#4a90e2" }}>📍</span> */}
                <div style={{ marginRight:"1px", fontSize: "1rem", color: "black" }} > <IoLocationSharp/>  </div>
                <span
                  style={{
                    overflowWrap: "break-word",
                    wordBreak: "break-word",
                    whiteSpace: "normal",
                  }}
                >
                  {hotel.address}
                </span>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
  <img
    src={hotel.imageUrl}
    alt={hotel.title}
    style={{
      width: "180px",
      height: "180px",
      borderRadius: "5px",
      marginRight: "10px",
    }}
  />
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "flex-start", // Align left within the column
      gap: "8px",
    }}
  >
    {hotel.accessible && (
      <div style={{ display: "flex", alignItems: "center", marginTop:"32px" }}>
        <img
          src="/images/accessibility.png"
          alt="Accessible"
          style={{ width: "24px", height: "24px", marginRight: "5px" }}
        />
        <span
          style={{
            fontSize: "1.4rem",
            fontWeight: "bold",
            color: "navy",
          }}
        >
          ✓
        </span>
      </div>
    )}
    {hotel.pets && (
      <div style={{ display: "flex", alignItems: "center" }}>
        <img
          src="/images/paw.png"
          alt="Pets Allowed"
          style={{ width: "24px", height: "24px", marginRight: "5px" }}
        />
        <span
          style={{
            fontSize: "1.4rem",
            fontWeight: "bold",
            color: "navy",
          }}
        >
          ✓
        </span>
      </div>
    )}
  </div>
</div>



            <div style={{ marginTop: "10px", textAlign: "left" }}>
              <h3
                style={{
                  fontSize: "1.2rem",
                  fontWeight: "bold",
                  marginBottom: "5px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {hotel.title}
                {hotel.booked && (
                  <span
                    style={{ color: "green", fontSize: "1.2rem", marginLeft: "8px" }}
                  >
                    ✓
                  </span>
                )}
              </h3>
              <p style={{ color: "#5a5a5a", fontSize: "0.9rem" }}>
                {hotel.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <PopupModal
        isOpen={!!selectedHotel}
        onClose={closeModal}
        selectedHotel={selectedHotel}
        onHotelBooked={handleHotelBooked}
        />

      <DateSelectionPopup
        isOpen={isDatePopupOpen}
        onClose={handleCloseDatePopup}
        onSelectDates={handleSelectDates}
      />

      <Navbar />
    </div>
  );
}
