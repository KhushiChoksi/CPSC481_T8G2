'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaListUl, FaHotel } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { BiHomeAlt } from "react-icons/bi";
import { GiForkKnifeSpoon } from "react-icons/gi";

export default function Navbar() {
    const pathname = usePathname(); // Get the current route

    // CSS classes for icons and labels
    const circleIcon = "flex items-center justify-center w-14 h-14 bg-light-yellow rounded-full mb-1";
    const labelText = "flex flex-col items-center text-center";

    // Function to check if a link is active
    const isActive = (path: string) => pathname === path;

    return (
        <div className="fixed bottom-0 left-0 w-full bg-darkblue text-white text-xs rounded-3xl">
            <div className="flex justify-around items-center py-3.5 ml-1 mr-1">

                <Link href="/itinerary" className={`${labelText} ${isActive('/itinerary') ? 'text-yellow-500' : ''}`}>
                    <div className={`${circleIcon} ${isActive('/itinerary') ? 'bg-yellow-500' : ''}`}>
                        <FaListUl className="text-black text-3xl" />
                    </div>
                    Itinerary
                </Link>

                <Link href="/explore" className={`${labelText} ${isActive('/explore') ? 'text-yellow-500' : ''}`}>
                    <div className={`${circleIcon} ${isActive('/explore') ? 'bg-yellow-500' : ''}`}>
                        <FaSearch className="text-black text-3xl" />
                    </div>
                    Explore
                </Link>

                <Link href="/home" className={`${labelText} ${isActive('/home') ? 'text-yellow-500' : ''}`}>
                    <div className={`${circleIcon} ${isActive('/home') ? 'bg-yellow-500' : ''}`}>
                        <BiHomeAlt className="text-black text-4xl" />
                    </div>
                    Home
                </Link>

                <Link href="/restaurants" className={`${labelText} ${isActive('/restaurants') ? 'text-yellow-500' : ''}`}>
                    <div className={`${circleIcon} ${isActive('/restaurants') ? 'bg-yellow-500' : ''}`}>
                        <GiForkKnifeSpoon className="text-black text-3xl" />
                    </div>
                    Restaurants
                </Link>

                <Link href="/hotels" className={`${labelText} ${isActive('/hotels') ? 'text-yellow-500' : ''}`}>
                    <div className={`${circleIcon} ${isActive('/hotels') ? 'bg-yellow-500' : ''}`}>
                        <FaHotel className="text-black text-3xl" />
                    </div>
                    Hotels
                </Link>

            </div>
        </div>
    );
}