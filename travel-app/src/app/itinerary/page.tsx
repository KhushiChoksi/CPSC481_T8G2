import Navbar from "../components/Navbar";
import Topbar from "../components/Topbar";
import DayView from "./components/DayView";

// export default function ItineraryPage() {
//     const buttonStyle = "bg-white text-darkblue p-2 h-8 rounded-lg border border-solid border-black";

//     return (
//       <div className="flex flex-col items-center min-h-screen text-darkblue">
//         <Topbar/>
//         <main className="mt-10 flex flex-col items-start w-full px-4 py-6 pt-10">
//           <div className="ml-0 justify-center"><DayView/></div>
//           <div className="mt-5 ml-0 flex flex-row items-top space-x-40">
//             <button className={buttonStyle}>Edit</button>
//             <div className="mb-10 flex flex-col space-y-2">
//               <button className={buttonStyle}>Add events</button>
//               <button className={buttonStyle}>Add restaurants</button>
//             </div>
//           </div>
//         </main>
//         <Navbar/>
//       </div>
//     );
// }

export default function ItineraryPage() {
  const buttonStyle = "bg-white text-darkblue p-2 h-8 rounded-lg border border-solid border-black w-full h-full"; // Added w-full for uniform width

  return (
    <div className="flex flex-col items-center min-h-screen text-darkblue">
      <Topbar/>
      <main className="mt-10 flex flex-col items-start w-full px-4 py-6 pt-10">
        <div className="ml-0 justify-center"><DayView/></div>
        <div className="mt-5 ml-0 flex flex-row items-top space-x-12 w-full"> {/* Ensure parent is full width */}
          <button className={buttonStyle}>Edit</button>
          <div className="mb-10 flex flex-col space-y-2 w-full"> {/* Ensure column is full width */}
            <button className={buttonStyle}>Add events</button>
            <button className={buttonStyle}>Add restaurants</button>
          </div>
        </div>
      </main>
      <Navbar/>
    </div>
  );
}
