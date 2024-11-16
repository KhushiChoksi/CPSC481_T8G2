'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";


export default function Navbar() {
    const pathname = usePathname();

    const isActive = (path: string) => pathname === path;

    return (
        <div className="fixed bottom-0 left-0 w-full bg-gray-800 text-white">
        <div className="flex justify-around items-center py-4">
            <Link href="/itinerary">
                Itinerary
            </Link>
            <Link href="/explore">
                Explore
            </Link>
            <Link href="/home">
                Home
            </Link>
            <Link href="/restaurants">
                Restaurants
            </Link>
            <Link href="/hotels">
                Hotels
            </Link>
        </div>
      </div>
    );
}