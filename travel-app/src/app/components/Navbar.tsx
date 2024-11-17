// 'use client';

import Link from "next/link";
// import { usePathname } from "next/navigation";
import { FaListUl, FaHotel } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { BiHomeAlt } from "react-icons/bi";
import { GiForkKnifeSpoon } from "react-icons/gi";


export default function Navbar() {
    // const pathname = usePathname();

    // const isActive = (path: string) => pathname === path;           // will be used to find out which one is active

    const circleIcon = "flex items-center justify-center w-14 h-14 bg-light-yellow rounded-full mb-1";
    const labelText = "flex flex-col items-center text-center";

    return (
        <div className="fixed bottom-0 left-0 w-full bg-darkblue text-white text-xs rounded-3xl">
            <div className="flex justify-around items-center py-3.5 ml-1 mr-1">
                <Link href="/itinerary" className={labelText}>
                    <div className={circleIcon}>
                        <FaListUl className="text-black text-3xl"/>
                    </div>
                    Itinerary
                </Link>

                <Link href="/explore" className={labelText}>
                    <div className={circleIcon}>
                        <FaSearch className="text-black text-3xl"/>
                    </div>
                    Explore
                </Link>

                <Link href="/home" className={labelText}>
                    <div className={circleIcon}>
                        <BiHomeAlt className="text-black text-4xl"/>
                    </div>
                    Home
                </Link>

                <Link href="/restaurants" className={labelText}>
                    <div className={circleIcon}>
                        <GiForkKnifeSpoon className="text-black text-3xl"/>
                    </div>
                    Restaurants
                </Link>

                <Link href="/hotels" className={labelText}>
                    <div className={circleIcon}>
                        <FaHotel className="text-black text-3xl"/>
                    </div>
                    Hotels
                </Link>
            </div>
        </div>
    );
}