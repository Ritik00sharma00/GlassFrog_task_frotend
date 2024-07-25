"use client"
import React,{useState} from 'react'

const Taskfield = ({value,onChange,editbtnSubmit, type}) => {
    const [isfocused, setisfocused] = useState(false);
  return (
    <>
    
    <div className=" w-100 relative flex  items-center">
      <span className='text-white z-10 text-[18px] p-2'></span>
    
      <input
        type={type}
        value={value}
        onChange={onChange}
        onFocus={() => { setisfocused(true); }}
        onBlur={() => { setisfocused(false);  }}
        disabled ={editbtnSubmit}
        className={` w-[100%] text-center text-[#201E43] bg-[#EEEEEE] ${isfocused ? 'border-red-500' : ''}`}
      />
    </div>
    </>
  )
}

export default Taskfield
