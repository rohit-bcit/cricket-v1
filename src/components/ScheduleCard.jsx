import React from 'react';
import vs from '../assets/img/cricket-vs.png';
import { Link } from 'react-router-dom';

function ScheduleCard({ match = {}, tournamentType , tournamentName  }) {
    // Check if match and its properties are defined
    const team1 = match.team1 || {};
    const team2 = match.team2 || {};
console.log(match)
    return (
        <div className='bg-white p-[15px] rounded-[9.6px] mt-[15px]'>
            <div className='flex items-center justify-between'>
                <span className='text-[#5C5C5C] text-[14px] font-normal'>{tournamentName}</span>
                <span className='w-[53px] h-[28px] bg-[#EDEDED] text-[#292929] flex items-center justify-center text-[12px] rounded-sm font-medium'>{tournamentType}</span>
            </div>
            <div className='flex justify-center my-6 flex-1 gap-10'>
                <div className='flex flex-col items-center gap-1 flex-1'>
                    <img className='w-[64px] h-[42px] rounded-[4px] object-cover' src={team1.flag} alt={team1.name} />
                    <span className='text-[#5C5C5C] text-[14px] font-medium text-center mt-[2px]'>{team1.shortName}</span>
                    {/* <span className='text-[#5C5C5C] text-[12px] font-normal text-center mt-[2px]'>{match.scores ? match.scores.team1 : 'N/A'}</span> */}
                </div>
                <div className='flex self-center'>
                    <img className='w-[42px]' src={vs} alt="vs" />
                </div>
                <div className='flex flex-col items-center gap-1 flex-1'>
                    <img className='w-[64px] h-[42px] rounded-[4px] object-cover' src={team2.flag} alt={team2.name} />
                    <span className='text-[#5C5C5C] text-[14px] font-medium text-center mt-[2px]'>{team2.shortName}</span>
                    {/* <span className='text-[#5C5C5C] text-[12px] font-normal text-center mt-[2px]'>{match.scores ? match.scores.team2 : 'N/A'}</span> */}
                </div>
            </div>
            <div className=' text-[#0D8888] text-center text-[14px]'>
                {match.time}
            </div>
            <div className='flex items-center justify-center gap-3 mt-4 px-1'>
              
                <Link className='text-[#5C5C5C] text-[12px] leading-[14.06px] uppercase hover:text-[#0D8888] underline'>Full Commentary</Link>
              
            </div>
        </div>
    );
}

export default ScheduleCard;
