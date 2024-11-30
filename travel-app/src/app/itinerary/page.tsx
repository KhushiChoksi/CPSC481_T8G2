import Navbar from "../components/Navbar";
import Topbar from "../components/Topbar";
import DayView from "./components/DayView";

export default function ItineraryPage() {
    const buttonStyle = "bg-darkblue text-white p-1 h-8";

    return (
      <div className="flex flex-col items-center min-h-screen text-darkblue">
        <Topbar/>
        <main className="mt-10 flex flex-col items-start w-full px-4 py-6 pt-10">
          <div className="ml-5 justify-center"><DayView/></div>
          <div className="mt-5 ml-5 flex flex-row items-top space-x-40">
            <button className={buttonStyle}>Edit</button>
            <div className="mb-10 flex flex-col space-y-2">
              <button className={buttonStyle}>Add events</button>
              <button className={buttonStyle}>Add restaurants</button>
            </div>
          </div>
        </main>
        <Navbar/>
      </div>
    );
}