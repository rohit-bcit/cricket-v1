import React from 'react';
import vs from '../assets/img/cricket-vs.png';
import { Link } from 'react-router-dom';
// import { formatDate } from '../assets/data'

function MatchCard({ match,tournamentType, tournamentName }) {
  
    return (
        <div className='bg-white p-[15px] rounded-[9.6px] mt-[15px]'>
            <div className='flex items-center justify-between'>
                <span className='text-[#5C5C5C] text-[14px] font-normal'>{tournamentName}</span>
                <span className='w-[53px] h-[28px] bg-[#EDEDED] text-[#292929] flex items-center justify-center text-[12px] rounded-sm font-medium'>{tournamentType}</span>
            </div>
            <div className='flex justify-center my-6 flex-1 gap-10'>
                <div className='flex flex-col items-center gap-1 flex-1'>
                    <img className='w-[64px] h-[42px] rounded-[4px] object-cover' src={match.team1.flag} alt={match.team1.name} />
                    <span className='text-[#5C5C5C] text-[14px] font-medium text-center mt-[2px]'>{match.team1.shortName}</span>
                    <span className='text-[#5C5C5C] text-[12px] font-normal text-center mt-[2px]'>{match.scores.team1}</span>
                </div>
                <div className='flex self-center'>
                    <img className='w-[42px]' src={vs} alt="vs" />
                </div>
                <div className='flex flex-col items-center gap-1 flex-1'>
                    <img className='w-[64px] h-[42px] rounded-[4px] object-cover' src={match.team2.flag} alt={match.team2.name} />
                    <span className='text-[#5C5C5C] text-[14px] font-medium text-center mt-[2px]'>{match.team2.shortName}</span>
                    <span className='text-[#5C5C5C] text-[12px] font-normal text-center mt-[2px]'>{match.scores.team2}</span>
                </div>
            </div>
            <div className='bg-[#D1EEEE] rounded-[4px] text-[#0D8888] text-center py-[10px] px-4 text-[14px]'>
            {match.result}
            </div>
            <div className='flex items-center justify-between gap-3 mt-4 px-1'>
                <Link className='text-[#5C5C5C] text-[12px] leading-[14.06px] uppercase hover:text-[#0D8888] underline'>Scorecard</Link>
                <Link className='text-[#5C5C5C] text-[12px] leading-[14.06px] uppercase hover:text-[#0D8888] underline'>Full Commentary</Link>
                <Link to= '/news' className='text-[#5C5C5C] text-[12px] leading-[14.06px] uppercase hover:text-[#0D8888] underline'>News</Link>
            </div>
        </div>
    );
}

export default MatchCard;