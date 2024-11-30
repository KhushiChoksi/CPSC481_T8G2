"use client";

import React from "react";
import CircleWithIcon from "./UserProfile";
import TripButton from "./TripButton";
import Logo from "./Logo";
import { useRouter } from "next/navigation";

const Topbar = ({ tripTextColor = 'text-white', currentTrip = "Trip 1", profilePersonColor = 'text-white', profileBgColor = 'bg-black' }) => {
  const router = useRouter();
    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                height: '70px',
                display: 'flex',
                alignItems: 'center', 
                justifyContent: 'space-between', 
                padding: '0 20px',
                zIndex: 1000,
            }}>

      <Logo/>

      <TripButton iconColor={tripTextColor} tripName={currentTrip}/>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
        }}>
        <button
            title="User profile"
            style={{
            width: '40px',
            height: '40px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            }}
            onClick={() => router.push("/account-settings")}>
                
            <CircleWithIcon circleColor={profileBgColor} iconColor={profilePersonColor} />
        </button>
      </div>
    </div>
  );
};
    
export default Topbar;