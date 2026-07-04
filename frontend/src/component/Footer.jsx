import React from 'react'
import { IoCheckmarkCircleSharp } from "react-icons/io5";
import { FaDatabase } from "react-icons/fa6";
import { FaTag } from "react-icons/fa";

function Footer() {
  return (
   <>
   <div className='flex justify-center items-center border-t-1 border-slate-200'>
       <div className='p-2 '>
        <IoCheckmarkCircleSharp className='inline text-green-300' />
        <span className='text-slate-400 text-[12px] ml-1'>no sign-up</span>
       </div>
       <div className='p-2 '>
        <FaDatabase className='inline text-slate-400'/>
        <span className='text-slate-400 text-[12px] ml-1'>stored in memory</span>
       </div>
       <div className='p-2 '>
        <FaTag className='inline text-slate-400'/>
        <span className='text-slate-400 text-[12px] ml-1'>title + desc</span>
       </div>
   </div>
   
   </>
  )
}

export default Footer