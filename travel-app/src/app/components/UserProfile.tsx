import React from 'react';
import { FaUser } from 'react-icons/fa';

const CircleWithIcon = ({circleColor = 'bg-black', iconColor = 'text-white' }) => (
  <div className={`flex justify-center items-center ${circleColor} rounded-full w-10 h-10`}>
    <FaUser className={`${iconColor} text-[24px]`}/>
  </div>
);

export default CircleWithIcon;