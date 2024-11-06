import React from 'react'
import { NavLink } from 'react-router-dom';
import homeImg from '../assets/img/footer-img/cricket-home.svg'
import match from '../assets/img/footer-img/cricket-matches.svg'
import live from '../assets/img/footer-img/cricket-live.svg'
import schedule from '../assets/img/footer-img/cricket-calendar.svg'
import history from '../assets/img/footer-img/cricket-history.svg'
import { IoIosArrowUp } from "react-icons/io";


function Footer() {

    const scrollToTop = (()=> {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth' // Smooth scroll effect
        });
    })

    return (
        <div className='bg-[#0D8888] fixed bottom-0 py-[18px] px-6 w-full  max-w-[767px] flex items-center justify-between gap-4  rounded-tr-[24px] rounded-tl-[24px] shadow-custom'>
            <NavLink to='/' className="flex flex-col items-center justify-center gap-2 ">
                <img className='w-full max-w-6' src={homeImg} alt="home" />
                <span className='text-white font-bold text-[10px] text-center'>Home</span>
            </NavLink>
            <NavLink to='/live-score' className="flex flex-col items-center justify-center gap-2 ">
                <img className='w-full max-w-6' src={match} alt="home" />
                <span className='text-white font-bold text-[10px] text-center'>Matches</span>
            </NavLink>
            <NavLink to='/live-score' className="flex flex-col items-center justify-center gap-2 ">
                <img className='w-full max-w-6' src={live} alt="home" />
                <span className='text-white font-bold text-[10px] text-center'>Live Score</span>
            </NavLink>
            <NavLink to='/schedule' className="flex flex-col items-center justify-center gap-2 ">
                <img className='w-full max-w-6' src={schedule} alt="home" />
                <span className='text-white font-bold text-[10px] text-center'>Schedule</span>
            </NavLink>
            <NavLink to='/history' className="flex flex-col items-center justify-center gap-2 ">
                <img className='w-full max-w-6' src={history} alt="home" />
                <span className='text-white font-bold text-[10px] text-center'>History</span>
            </NavLink>
            <button onClick={scrollToTop} className='w-[44px] h-[44px] bg-white flex items-center justify-center fixed right-[10px] bottom-24 shadow-md'>
            <IoIosArrowUp size='20px' className='text-[#0d8888]' />
            </button>
        </div>
    )
}

export default Footer