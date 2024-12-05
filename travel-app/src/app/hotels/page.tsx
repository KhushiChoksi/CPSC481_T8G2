"use client";
import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import Topbar from "../components/Topbar";
import BackButton from "../components/BackButton";
import { useState } from "react";
import PopupModal from "./addHotelPopup";
import DateSelectionPopup from "./dateSelectionPopup";

export default function HotelsPage() {
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);
  const [isDatePopupOpen, setIsDatePopupOpen] = useState(false);
  const [selectedDates, setSelectedDates] = useState<string>("");
  const [buttonColor, setButtonColor] = useState<string>("bg-[#ADD8E6]");
  const [isBooked, setIsBookedState] = useState(false);

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
    const updatedHotel = {
      ...hotel,
      visitdate: selectedDates,
    };
    setSelectedHotel(updatedHotel);
    setIsBookedState(hotel.booked);
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
  };

  const [hotels, setHotels] = useState<Hotel[]>([
    {
      id: 1,
      title: "Comfort Inn & Suites",
      description:
        "With an indoor pool and hot tub, only 5 minutes' drive away from the airport.",
      address: "147 Freeport Crescent Northeast, Calgary",
      imageUrl: "/images/hotel1.jpg",
      visitdate: "",
      timeStart: "",
      timeEnd: "",
      booked: false,
    },
    {
      id: 2,
      title: "Hilton Garden Inn",
      description:
        "Featuring a rooftop hot tub, this hotel is close to downtown attractions.",
      address: "711 4th St. S.E., Calgary",
      imageUrl: "/images/hotel2.jpg",
      visitdate: "",
      timeStart: "",
      timeEnd: "",
      booked: false,
    },
  ]);

  return (
    <div className="min-h-screen bg-lightblue px-4 pt-6">
      <Topbar />
      <div className="flex items-center mt-12">
        <BackButton title="Hotels" />
      </div>

      <div className="mt-2">
        <button
          onClick={handleOpenDatePopup}
          className={`border-2 border-black rounded-full px-3 py-1 flex items-center shadow-md hover:shadow-lg transition text-sm ${buttonColor}`}
        >
          {selectedDates ? (
            <div className="flex items-center">
              <span className="text-black mr-1">{selectedDates}</span>
              <span
                onClick={handleClearDates}
                className="text-black ml-2 font-bold cursor-pointer"
              >
                X
              </span>
            </div>
          ) : (
            <>
              <span className="mr-1 text-black">📅</span>
              <span className="text-black">Select Dates for Stay</span>
            </>
          )}
        </button>
      </div>

      <div className="mt">
        <SearchBar />
      </div>

      <div style={{ padding: "20px" }}>
        {hotels.map((hotel) => (
          <div
            key={hotel.id}
            onClick={() => handleHotelClick(hotel)}
            style={{
              display: "flex",
              flexDirection: "column",
              backgroundColor: "#e5f2ff",
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
                  maxWidth: "calc(100% - 220px)",
                }}
              >
                <span style={{ fontSize: "1rem", color: "#4a90e2" }}>📍</span>
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
        setIsBooked={setIsBookedState}
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
