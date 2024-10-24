import React from 'react';
import { NavLink } from 'react-router-dom';

const Navitems = [
    { text: 'Live Score', url: '/live-score' },
    { text: 'Recent Match', url: '/' },
    { text: 'Upcoming Match', url: '/' },
    { text: 'Match Result', url: '/' },
];

function FilterMenu() {
    return (
        <div>
            <div className='flex whitespace-nowrap p-[20px] pr-0 gap-4 overflow-x-auto scrollbar-hide'>
                {Navitems.map((item) => (
                    <NavLink 
                        key={item.text} 
                        to={item.url} 
                        className={({ isActive }) => 
                            `text-[#292929] font-normal text-[14px] leading-[16.41px] text-center py-[8px] px-[10px] rounded-[5px] ${isActive ? 'bg-[#0D8888] text-white' : 'bg-[#D1EEEE] text-[#292929]'}`
                        }
                    >
                        {item.text}
                    </NavLink>
                ))}
            </div>
        </div>
    );
}

export default FilterMenu;
