import React, { useState } from "react";
import DateTimePopup from "./DateTimePopup";
import CloseButton from "@/app/components/CloseButton";
import BackButtonPopup from "@/app/components/BackButtonPopup";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

type MenuItem = {
  name: string;
  price: string;
};

type Restaurant = {
  title: string;
  description: string;
  timeOpen: string;
  visitDate: string;
  booked: boolean;
  timeStart: string;
  timeEnd: string;
  menu: MenuItem[];
};

interface MenuPopupProps {
  isOpen: boolean;
  onClose: () => void;
  //onGoBack: () => void;
  selectedRestaurant: Restaurant | null;
}

const MenuPopup: React.FC<MenuPopupProps> = ({
  isOpen,
  onClose,
  //onGoBack,
  selectedRestaurant,
}) => {
  const [showDateTimePicker, setShowDateTimePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Value>(new Date());
  const [startTime, setStartTime] = useState<string | null>(null);
  const [endTime, setEndTime] = useState<string | null>(null);

  const handleAddToSchedule = () => {
    if (selectedRestaurant && selectedDate instanceof Date && startTime && endTime) {
      const formattedDate = selectedDate.toLocaleDateString("en-CA");
      selectedRestaurant.visitDate = formattedDate;
      selectedRestaurant.timeStart = startTime;
      selectedRestaurant.timeEnd = endTime;
      //selectedRestaurant.booked = true;
    }
    onClose(); // Close the modal
  };

  if (!isOpen || !selectedRestaurant) return null;

  return (
    <>
      {!showDateTimePicker ? (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: "1002",
          }}
        >
          <div
            style={{
              width: "96vw",
              height: "91vh",
              backgroundColor: "#A5B6C2",
              borderRadius: "20px",
              border: "1px solid #000000",
              padding: "20px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "center",
              overflowY: "auto",
              boxSizing: "border-box",
              gap: "1rem",
              position: "relative", // Allows absolute positioning for buttons
            }}
          >
            

            {/* Close Button */}
            <div
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                zIndex: 1100,
              }}
            >
              <CloseButton onClick={onClose} ariaLabel="Close Menu Popup" />
            </div>

            {/* Restaurant Menu */}
            <div style={{ color: "black", textAlign: "left", width: "100%", maxWidth: "400px" }}>
              <h3
                style={{
                  marginTop: "90px",
                  fontSize: "1.5rem",
                  fontWeight: "bold",
                  marginBottom: "20px",
                  textAlign: "center",
                }}
              >
                {selectedRestaurant.title}
              </h3>
              <p style={{ marginBottom: "20px" }}>{selectedRestaurant.description}</p>
              <h4
                style={{
                  fontSize: "1.2rem",
                  fontWeight: "bold",
                  marginBottom: "10px",
                }}
              >
                Menu:
              </h4>
              <ul style={{ listStyle: "none", padding: "0" }}>
                {selectedRestaurant.menu.map((item, index) => (
                  <li
                    key={index}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "10px",
                      borderBottom: "1px solid #ddd",
                      paddingBottom: "5px",
                    }}
                  >
                    <span>{item.name}</span>
                    <span>{item.price}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Buttons */}
            <div style={{ marginTop: "30px", textAlign: "center" }}>
              <button
                onClick={() => setShowDateTimePicker(true)}
                style={{
                  marginTop: "210px",
                  padding: "10px 145px",
                  backgroundColor: "#003554",
                  color: "#fff",
                  border: "none",
                  borderRadius: "8px",
                  fontSize: "1.2rem",
                  //fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      ) : (
        <DateTimePopup
          isOpen={showDateTimePicker}
          onClose={handleAddToSchedule}
          onBack={() => setShowDateTimePicker(false)}
          selectedRestaurant={selectedRestaurant}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
      )}
    </>
  );
};

export default MenuPopup;
