"use client";


type confirmBookingProps = {
  isOpen: boolean;
  onClose: () => void;
  selectedHotel: {
    title: string;
    address: string;
    timeStart: string;
    timeEnd: string;
    visitdate: string; 
    booked: boolean;
  } | null;
  guests: number; 
  rooms: number; 
};

export default function confirmBooking({
  isOpen,
  onClose,
  selectedHotel,
  guests, 
  rooms,
}: confirmBookingProps) {
  if (!isOpen || !selectedHotel) {
    return null;
  }


  const handleConfirmBooking = () => {
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
      <div
        className="shadow-lg flex flex-col justify-between relative"
        style={{
          width: "96vw",
          height: "90vh",
          backgroundColor: "#A5B6C2",
          padding: "25px",
          borderRadius: "20px",
          border: "1px solid #000000",
        }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-black hover:text-gray-600"
          style={{
            background: "none",
            border: "none",
            fontSize: "2rem",
            cursor: "pointer",
          }}
          aria-label="Close"
        >
          &times;
        </button>

        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-black">Confirm Your Booking</h2>
        </div>

        <div className="text-center mb-4 text-gray-600">
          <p className="text-lg">Booking Details:</p>
        </div>

        {/* Details */}
        <div className="text-left mb-8">
          <div className="mb-4">
            <h3 className="text-2xl font-bold text-black">Hotel:</h3>
            <p className="text-lg text-black font-semibold">{selectedHotel.title}</p>
          </div>

          <div className="mb-4">
            <h3 className="text-2xl font-bold text-black">Address:</h3>
            <p className="text-lg text-black font-semibold">{selectedHotel.address}</p> 
          </div>

          <div className="mb-4">
            <h3 className="text-2xl font-bold text-black">Time of Stay:</h3>
            <p className="text-lg text-black font-semibold">
              {selectedHotel.visitdate ? selectedHotel.visitdate : "No dates selected"} 
            </p>
          </div>

          <div className="mb-4">
            <h3 className="text-2xl font-bold text-black">Guests:</h3>
            <p className="text-lg text-black font-semibold">{guests}</p> 
          </div>

          <div className="mb-4">
            <h3 className="text-2xl font-bold text-black">Rooms:</h3>
            <p className="text-lg text-black font-semibold">{rooms}</p> 
          </div>
        </div>

        <div className="mt-auto flex justify-center pt-8">
          <button
            onClick={handleConfirmBooking}
            className="bg-[#003554] text-white px-8 py-4 text-lg rounded-lg hover:bg-[#002a42]"
            style={{
              border: "1px solid #000000",
            }}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
