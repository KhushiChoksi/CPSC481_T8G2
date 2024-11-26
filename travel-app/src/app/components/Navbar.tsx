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
    const activeIcon = "flex items-center justify-center w-14 h-14 bg-hl-orange rounded-full mb-1 font-bold";
    const activeText = "flex flex-col items-center text-center font-bold";

    // Function to check if a link is active
    const isActive = (path: string) => pathname === path;

    return (
        <div className="fixed bottom-0 left-0 w-full bg-darkblue text-white text-xs rounded-3xl">
            <div className="flex justify-around items-center py-3.5 ml-1 mr-1">

                <Link href="/itinerary" className={`${labelText} ${isActive('/itinerary') ? 'text-yellow-500' : ''}`}>
                    <div className={`${circleIcon} ${isActive('/itinerary') ? 'bg-yellow-500' : ''}`}>
                        <FaListUl className="text-black text-3xl" />
                    </div>
                    <span className={isActive("/itinerary") ? activeText : labelText}>Itinerary</span>
                </Link>

                <Link href="/explore" className={`${labelText} ${isActive('/explore') ? 'text-yellow-500' : ''}`}>
                    <div className={`${circleIcon} ${isActive('/explore') ? 'bg-yellow-500' : ''}`}>
                        <FaSearch className="text-black text-3xl" />
                    </div>
                    <span className={isActive("/explore") ? activeText : labelText}>Explore</span>
                </Link>

                <Link href="/home" className={`${labelText} ${isActive('/home') ? 'text-yellow-500' : ''}`}>
                    <div className={`${circleIcon} ${isActive('/home') ? 'bg-yellow-500' : ''}`}>
                        <BiHomeAlt className="text-black text-4xl" />
                    </div>
                    <span className={isActive("/home") ? activeText : labelText}>Home</span>
                </Link>

                <Link href="/restaurants" className={`${labelText} ${isActive('/restaurants') ? 'text-yellow-500' : ''}`}>
                    <div className={`${circleIcon} ${isActive('/restaurants') ? 'bg-yellow-500' : ''}`}>
                        <GiForkKnifeSpoon className="text-black text-3xl" />
                    </div>
                    <span className={isActive("/restaurants") ? activeText : labelText}>Restaurants</span>
                </Link>

                <Link href="/hotels" className={`${labelText} ${isActive('/hotels') ? 'text-yellow-500' : ''}`}>
                    <div className={`${circleIcon} ${isActive('/hotels') ? 'bg-yellow-500' : ''}`}>
                        <FaHotel className="text-black text-3xl" />
                    </div>
                    <span className={isActive("/hotels") ? activeText : labelText}>Hotels</span>
                </Link>

            </div>
        </div>
    );
}