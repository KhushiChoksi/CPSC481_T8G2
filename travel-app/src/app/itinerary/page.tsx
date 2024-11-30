import Navbar from "../components/Navbar";
import Topbar from "../components/Topbar";
import DayView from "./components/DayView";

export default function ItineraryPage() {
  const buttonStyle = "bg-white text-darkblue p-2 h-8 rounded-lg border border-solid border-black w-full h-full"; // Added w-full for uniform width

  return (
    <div className="flex flex-col min-h-screen">
      <Topbar />
      <div className="flex flex-col items-center w-full">
        <main className="mt-10 flex flex-col items-center w-full px-4 py-6">

          {/* Calendar */}
          <div className="flex justify-center w-full max-w-[300px]">
            <div className="flex justify-center items-center w-[300px] h-[630px]">
              <DayView />
            </div>
          </div>

          {/* Buttons Section */}
          <div className="mt-0.5 flex flex-row justify-center space-x-8 w-full">
            <button className={buttonStyle}>Edit</button>
            <div className="flex flex-col space-y-4 w-full">
              <button className={buttonStyle}>Add events</button>
              <button className={buttonStyle}>Add restaurants</button>
            </div>
          </div>
          
        </main>
      </div>
      <Navbar />
    </div>
  );
}
