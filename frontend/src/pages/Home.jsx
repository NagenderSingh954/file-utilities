import React, { useState } from 'react'
import { FaCloudUploadAlt, FaMoon } from "react-icons/fa";
import { IoMoon } from "react-icons/io5";
import { FaSun, FaArrowRightLong } from "react-icons/fa6";
import Uploader from '../component/Uploader.jsx';
import Footer from '../component/Footer.jsx';
import FileDisplay from '../component/FileDisplay.jsx';
import { useEffect } from 'react';
import { getAllFiles } from '../utils/Api.js';
import Textuplaod from '../component/Textuplaod.jsx';

function Home() {
    const [theme, setTheme] = useState('light')
    const [filesinfo,setFilesinfo]=useState()
    const [textuplaoad,setTextuplaod]=useState(false)
    useEffect(()=>{
        const fetchData = async () => {
    const res = await getAllFiles()

    setFilesinfo(res.data)
    console.log(res.data)
  };

  fetchData();
    },[])
     const [dark, setDark] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
      setDark(true);
    }
  }, []);

  const toggleTheme = () => {
    if (dark) {
      document.documentElement.classList.remove("dark");
      document.body.style.backgroundColor ="#fff";
    //   localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      document.body.style.backgroundColor ="#0b1120";
    //   localStorage.setItem("theme", "dark");
    }

    setDark(!dark);
  };

    const toggleuploader=()=>{
        setTextuplaod(prev=>!prev)
    }
    return (
        <>

            <div className='w-full min-h-screen flex justify-center items-center mt-15 '>
                <div className='w-180 max-md:w-200  rounded-4xl px-10 py-8 shadow-2xl dark:bg-[#162032]'>
                    <div className='flex items-center w-full'><FaCloudUploadAlt className='inline text-5xl text-blue-400' />
                        <span className='p-3 font-medium text-3xl dark:text-yellow-300 '>DropShare </span>
                        <button className='shadow-amber-300 shadow-2xl bg-slate-300 p-3 rounded-full ml-auto'
                            onClick={toggleTheme}
                        >
                            {!dark ? <IoMoon /> : <FaSun />}
                        </button>
                    </div>

                    <div className='py-1 px-4 '>
                        <FaArrowRightLong className='text-blue-300 inline' />
                        <span className='text-slate-400 ml-5'> Upload · add title & description · share instantly</span>
                    </div>
                    <div className='py-1 px-4 '>
                       <p className=' ml-5 dark:text-white'>Want to upload {!textuplaoad? "Text":"File"} ? <button className='text-blue-500' onClick={()=>{toggleuploader()}}>click here </button></p> 
                    </div>

                    {!textuplaoad?(<div className='mt-6'>
                        <Uploader filesinfo={filesinfo} setFilesinfo={setFilesinfo}/>
                    </div>):
                    (<div className='mt-6'>
                        <Textuplaod filesinfo={filesinfo} setFilesinfo={setFilesinfo}/>
                    </div>)}
                    <div className='mt-6'>
                        <FileDisplay filesinfo={filesinfo} setFilesinfo={setFilesinfo}/>
                    </div>
                    <div className='mt-6 '>
                        <Footer/>
                    </div>
                </div>

            </div>

        </>
    )
}

export default Home