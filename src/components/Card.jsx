import React from 'react';
import vs from '../assets/img/cricket-vs.png';
import { Link } from 'react-router-dom';
import { formatDate } from '../assets/data'

function Card({ match }) {
   
    return (
        <div className='bg-white p-[15px] rounded-[9.6px] min-w-[310px]  mr-4 '>
            <div className='flex items-center justify-between'>
                <span className='text-[#5C5C5C] text-[14px] font-normal'>{match.tournament.name}</span>
                <span className='w-[53px] h-[28px] bg-[#EDEDED] text-[#292929] flex items-center justify-center text-[12px] rounded-sm font-medium'>{match.tournament.type}</span>
            </div>
            <div className='flex justify-center my-6 flex-1 gap-10'>
                <div className='flex flex-col items-center gap-1 flex-1'>
                    <img className='w-[64px] h-[42px] rounded-[4px] object-cover' src={match.match.team1.flag} alt={match.match.team1.name} />
                    <span className='text-[#5C5C5C] text-[14px] font-medium text-center mt-[2px]'>{match.match.team1.shortName}</span>
                </div>
                <div className='flex self-center'>
                    <img className='w-[42px]' src={vs} alt="vs" />
                </div>
                <div className='flex flex-col items-center gap-1 flex-1'>
                    <img className='w-[64px] h-[42px] rounded-[4px] object-cover' src={match.match.team2.flag} alt={match.match.team2.name} />
                    <span className='text-[#5C5C5C] text-[14px] font-medium text-center mt-[2px]'>{match.match.team2.shortName}</span>
                    <span className='text-[#5C5C5C] text-[12px] font-normal text-center mt-[2px]'>208/3(20.0)</span>
                </div>
            </div>
            <div className='bg-[#D1EEEE] rounded-[4px] text-[#0D8888] text-center py-[10px] px-4 text-[14px]'>
            {formatDate(match.match.time)}
            </div>
            <div className='flex items-center justify-between gap-3 mt-4 px-1'>
                <Link className='text-[#5C5C5C] text-[12px] leading-[14.06px] uppercase hover:text-[#0D8888] underline'>FANTASY</Link>
                <Link className='text-[#5C5C5C] text-[12px] leading-[14.06px] uppercase hover:text-[#0D8888] underline'>TABLE</Link>
                <Link className='text-[#5C5C5C] text-[12px] leading-[14.06px] uppercase hover:text-[#0D8888] underline'>SCHEDULE</Link>
            </div>
        </div>
    );
}

export default Card;