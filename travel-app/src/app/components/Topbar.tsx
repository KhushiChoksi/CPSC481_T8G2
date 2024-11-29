"use client";

import CircleWithIcon from "./UserProfile";
import TripButton from "./TripButton";

import Logo from "./Logo";


export default function Topbar() {
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

      <TripButton iconColor='text-white' tripName="Trip 1"/>

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
            onClick={() => alert('Profile button clicked!')}>
                
            <CircleWithIcon circleColor='bg-black' iconColor='text-white' />
        </button>
      </div>
    </div>
  );
}
    
