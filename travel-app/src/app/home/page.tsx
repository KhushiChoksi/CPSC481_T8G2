import Navbar from "../components/Navbar";
import Image from "next/image";
import Topbar from "../components/Topbar";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center min-h-screen text-darkblue">
      <Topbar/>
      {/* Welcome Section */}
      <main className="mt-10 flex flex-col items-start w-full px-4 py-6 pt-10">
        <h1 className="text-2xl font-bold text-black mb-2">Welcome, [user name]!</h1> 

        {/* Date Section */}

        <p className="text-sm text-navy-800 italic mb-4">Tuesday, October 29th, 2024</p> {/* Dynamically add date based on today's Date */}

        {/* Todays plan */}

        <div className="w-full bg-white shadow-md rounded-lg p-4 text-center mb-6">
          <h2 className="font-bold mb-2">TODAY'S PLAN</h2>
          <p className="text-gray-500">Nothing planned for today!</p>
        </div>

        {/* images section */}
        <div className="w-full space-y-4">
          <Image
            src="/images/backdrop1.jpg"
            alt="Backdrop 1"
            width={400}
            height={200}
            className="rounded-lg shadow-lg"
          />
          <Image
            src="/images/backdrop2.jpg"
            alt="Backdrop 2"
            width={400}
            height={200}
            className="rounded-lg shadow-lg"
          />
          <Image
            src="/images/backdrop3.jpg"
            alt="Backdrop 3"
            width={400}
            height={200}
            className="rounded-lg shadow-lg"
          />
        </div>
      </main>

      {/* Bottom Navbar */}
      <Navbar />
    </div>
  );
}
