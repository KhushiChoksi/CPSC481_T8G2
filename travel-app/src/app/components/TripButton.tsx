import React from 'react';
import { FaPlaneDeparture } from 'react-icons/fa';
import { IoIosArrowDown } from 'react-icons/io';

const TripButton = ({ iconColor = 'text-white', tripName = "Trip 1" }) => {
  return (
    <div
      className="flex items-center bg-black py-4 px-12 rounded-full cursor-pointer h-[56px]"
      onClick={() => alert('Trip button clicked!')}
    >

      <FaPlaneDeparture
        className={`-ml-6 mr-6 ${iconColor} text-[20px] `}
      />

      <span className={`${iconColor} text-[20px] mr-2`}>{tripName}</span>

      <IoIosArrowDown className={`ml-6 -mr-7 text-[14px] ${iconColor}`} />
    </div>
  );
};

export default TripButton;