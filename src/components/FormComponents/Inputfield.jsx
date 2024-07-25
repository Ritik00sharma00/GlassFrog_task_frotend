"use client"
import React, { useState } from 'react';


const Inputfield = ({ icon, label, type, name, onChange, value, error }) => {
  const [isfocused, setisfocused] = useState(false);


  return (
    <div className="lg:w-[40vw] w-[60vw]  relative flex items-center">
      <span className='text-white z-10 text-[18px] p-2'>{icon}</span>
      <label htmlFor="" className={`text-[#134B70] md:text-[16px] text-[14px] z-10 transform duration-500 ${isfocused || value ? '-translate-y-5 bg-white text-[8px] px-2' : 'mb-0'}`}>
        {label}
      </label>
      <input
        type={type}
        value={value}
        name={name}
        onChange={onChange}
        onFocus={() => { setisfocused(true); }}
        onBlur={() => { setisfocused(false); }}
        className={`w-full outline-none pr-2 pb-2 pt-2 pl-10 absolute rounded-lg text-[#201E43] bg-[#EEEEEE] ${isfocused ? 'border-red-500' : ''}`}
      />
    </div>
  );
}

export default Inputfield;
