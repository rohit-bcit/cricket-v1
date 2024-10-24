import React from 'react';

function HistorySection({ heading, archives }) {
    return (
        <div className='mt-4 bg-white py-5 px-4  rounded-[10px] flex-col flex gap-2 justify-between'>
            <h3 className='text-[#0D8888] text-[16px] leading-[16.41px] font-medium'>{heading}</h3>
            {archives.map((data, index) => (
                    <div  key={index} className='flex flex-col'>
                        <div className='flex gap-1 items-center border-b py-1 '>
                            <p className='text-[#292929] text-[12px] font-medium'>{data.title}</p>
                            <span className='text-[#5C5C5C] text-[10px]'>{data.dates}</span>
                        </div>
                    </div>
               
            ))}
        </div>
    );
}

export default HistorySection;
