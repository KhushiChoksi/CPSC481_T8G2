import React, { useState } from "react";
import DateTimePopup from "./DateTimePopup";

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
  selectedRestaurant: Restaurant | null;
}

const MenuPopup: React.FC<MenuPopupProps> = ({
  isOpen,
  onClose,
  selectedRestaurant,
}) => {
  const [showDateTimePicker, setShowDateTimePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Value>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>("12:00");

  const handleAddToSchedule = () => {
    if (selectedRestaurant && selectedDate instanceof Date && selectedTime) {
        const formattedDate = selectedDate.toLocaleDateString('en-CA');
        selectedRestaurant.visitDate = formattedDate;
        selectedRestaurant.timeStart = selectedTime;
        selectedRestaurant.timeEnd = selectedTime; // Changed endTime to selectedTime
        selectedRestaurant.booked = true;
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
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              backgroundColor: "#A5B6C2",
              borderRadius: "10px",
              padding: "20px",
              width: "95%",
              height: "80%",
              maxWidth: "none",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              overflow: "auto",
            }}
          >
            {/* Restaurant Menu */}
            <div style={{ color: "black", textAlign: "left", width: "100%", maxWidth: "400px" }}>
              <h3
                style={{
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
                  padding: "15px 30px",
                  backgroundColor: "#003554",
                  color: "#fff",
                  border: "none",
                  borderRadius: "8px",
                  fontSize: "1.2rem",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                Confirm
              </button>

              <div
                onClick={onClose}
                style={{
                  marginTop: "15px",
                  textDecoration: "underline",
                  color: "#003554",
                  cursor: "pointer",
                  fontSize: "1rem",
                  fontWeight: "bold",
                }}
              >
                Back
              </div>
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

