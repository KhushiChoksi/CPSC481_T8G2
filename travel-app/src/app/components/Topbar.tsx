"use client";
import { FaUserCircle } from "react-icons/fa";
import { FaPlaneDeparture } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";

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
      }}
    >
      <div><Logo/></div>

      
      <div
        style={{
          display: 'flex',
          alignItems: 'center', 
          backgroundColor: 'black',
          padding: '15px 50px',
          borderRadius: '40px',
          cursor: 'pointer',
        }}
        onClick={() => alert('Trip button clicked!')}
      >
        
        <FaPlaneDeparture style={{ fontSize: '16px', marginRight: '8px', color: 'white' }} />

     
        <span style={{ fontSize: '14px', color: 'white', marginRight: '8px' }}>Trip 1</span>

        
        <IoIosArrowDown style={{ fontSize: '14px', color: 'white' }} />
    
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <button
          style={{
            width: '40px',
            height: '40px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onClick={() => alert('Profile button clicked!')}
        >
          <FaUserCircle style={{ fontSize: '24px', color: '#252F40' }} />
        </button>
      </div>
    </div>
  );
}
    
