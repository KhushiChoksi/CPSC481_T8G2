"use client";
import { FaUserCircle } from "react-icons/fa";
import Logo from "./Logo";


export default function Topbar() {
    return (
        <div
        style={{
            position: 'fixed', 
            top: 0,
            left: 0,
            right: 0,
            height: '60px', 
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 20px',            
            color: 'white',
            zIndex: 1000, 
      }}
    >
      
      <div>
        <Logo/>
      </div>

      
      <div style={{ marginLeft: 'auto', position: 'relative' }}>
        <button
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            
            border: 'none',
            cursor: 'pointer',
          }}
          onClick={() => alert('Profile button clicked!')}
        >
        
        <FaUserCircle style={{ fontSize: '24px', color: '#252F40' }} />
        </button>

        
        
      </div>
    </div>
  );
}
    
