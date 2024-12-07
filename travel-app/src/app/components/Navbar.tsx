'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaListUl, FaHotel } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { BiHomeAlt } from "react-icons/bi";
import { GiForkKnifeSpoon } from "react-icons/gi";




export default function Navbar() {
    const pathname = usePathname();

    const isActive = (path: string) => pathname === path;           // will be used to find out which one is active     

    const circleIcon = "flex items-center justify-center w-14 h-14 bg-light-yellow rounded-full mb-1";
    const labelText = "flex flex-col items-center text-center";
    const activeText = "flex flex-col items-center text-center font-bold";
    const activeIcon = "flex items-center justify-center w-14 h-14 bg-hl-orange rounded-full mb-1 font-bold";

    return (
        <div className="fixed bottom-0 left-0 w-full bg-darkblue text-white text-xs rounded-3xl">
            <div className="flex justify-around items-center py-3.5 ml-1 mr-1">
                <Link href="/itinerary">
                    <div className={isActive("/itinerary") ? activeIcon : circleIcon}>
                        <FaListUl className="text-black text-3xl"/>
                    </div>
                    <span className={isActive("/itinerary") ? activeText : labelText}>Itinerary</span>
                </Link>

                <Link href="/explore">
                    <div className={isActive("/explore") ? activeIcon : circleIcon}>
                        <FaSearch className="text-black text-3xl"/>
                    </div>
                    <span className={isActive("/explore") ? activeText : labelText}>Explore</span>
                </Link>

                <Link href="/home">
                    <div className={isActive("/home") ? activeIcon : circleIcon}>
                        <BiHomeAlt className="text-black text-4xl"/>
                    </div>
                    <span className={isActive("/home") ? activeText : labelText}>Home</span>
                </Link>

                <Link href="/restaurants" className={labelText}>
                    <div className={isActive("/restaurants") ? activeIcon : circleIcon}>
                        <GiForkKnifeSpoon className="text-black text-3xl"/>
                    </div>
                    <span className={isActive("/restaurants") ? activeText : labelText}>Restaurants</span>
                </Link>

                <Link href="/hotels">
                    <div className={isActive("/hotels") ? activeIcon : circleIcon}>
                        <FaHotel className="text-black text-3xl"/>
                    </div>
                    <span className={isActive("/hotels") ? activeText : labelText}>Hotels</span>
                </Link>

            </div>
        </div>
    );
}