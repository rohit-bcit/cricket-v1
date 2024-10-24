import React from 'react'
import { cricketflag } from '../assets/data'


function TeamCard() {
    const flag = cricketflag.teams;
    console.log("flag ", flag)

    return (
        <div className='flex flex-col bg-[#F5F5F5] mb-20 px-4 pb-5 pt-[30px]'>
            <h2 className='font-semibold text-[22px] leading-[25.78px] mb-[15px]'>CRICKET TEAM</h2>
            <div className='grid grid-cols-2 gap-[10px]'>
                {flag.map((items,index ) => (

                    <div key={index} className='flex items-center rounded-lg gap-3 bg-white p-4'>
                        <img className='w-[33.8px] h-[22px] rounded-sm object-cover' src={items.flag} alt="" />
                        <p className='font-medium text-[14px] leading-[16.41px] text-[#292929]'>{items.name}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default TeamCard;